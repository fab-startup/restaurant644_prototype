// Capa de persistencia — SQLite nativo de Node (node:sqlite, sin dependencias).
// La base de datos vive en data/restaurante644.db y guarda el progreso de las acciones (reservas).
import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SEED_RESERVATIONS } from './seed.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, 'data');
mkdirSync(DATA_DIR, { recursive: true });

export const db = new DatabaseSync(path.join(DATA_DIR, 'restaurante644.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS reservations (
    id         TEXT PRIMARY KEY,
    nome       TEXT NOT NULL,
    pax        INTEGER NOT NULL,
    hora       TEXT,
    turno      TEXT,            -- 'lunch' | 'dinner'
    area       TEXT,            -- 'salao' | 'varanda' | 'eventos'
    mesa       TEXT,
    status     TEXT,            -- 'pending' | 'paid' | 'seated' | 'noshow' | 'cancel'
    valor      REAL,
    tel        TEXT,
    cpf        TEXT,
    pago       INTEGER,         -- 0 | 1
    date       TEXT,            -- ISO yyyy-mm-dd
    obs_pt     TEXT,
    obs_es     TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    nome       TEXT NOT NULL,
    email      TEXT NOT NULL UNIQUE,   -- guardado en minúsculas
    senha_hash TEXT NOT NULL,
    salt       TEXT NOT NULL,
    role       TEXT NOT NULL DEFAULT 'cliente',  -- 'cliente' | 'gestor'
    tel        TEXT,
    cpf        TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS sessions (
    token      TEXT PRIMARY KEY,
    user_id    INTEGER NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

/* ---------- Auth: hash de contraseña (scrypt) ---------- */
function hashPassword(senha) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(senha, salt, 64).toString('hex');
  return { salt, hash };
}
function verifyPassword(senha, salt, hash) {
  const calc = scryptSync(senha, salt, 64);
  const stored = Buffer.from(hash, 'hex');
  return calc.length === stored.length && timingSafeEqual(calc, stored);
}
// Versión pública del usuario (nunca expone hash/salt).
const publicUser = (u) => u && ({ id: u.id, nome: u.nome, email: u.email, role: u.role, tel: u.tel, cpf: u.cpf });

export function findUserByEmail(email) {
  return db.prepare('SELECT * FROM users WHERE email = ?').get(String(email || '').trim().toLowerCase());
}
export function getUserById(id) {
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
}

// Crea un usuario. El rol SIEMPRE es 'cliente' salvo que se siembre internamente (allowRole).
export function createUser({ nome, email, senha, tel, cpf }, { allowRole = 'cliente' } = {}) {
  const mail = String(email || '').trim().toLowerCase();
  if (!nome || !mail || !senha) throw new Error('faltan campos obligatorios');
  if (senha.length < 6) throw new Error('la contraseña debe tener al menos 6 caracteres');
  if (findUserByEmail(mail)) throw new Error('ese e-mail ya tiene una cuenta');
  const { salt, hash } = hashPassword(senha);
  const info = db.prepare(
    'INSERT INTO users (nome,email,senha_hash,salt,role,tel,cpf) VALUES (?,?,?,?,?,?,?)'
  ).run(nome.trim(), mail, hash, salt, allowRole, tel || null, cpf || null);
  return publicUser(getUserById(info.lastInsertRowid));
}

export function authenticate(email, senha) {
  const u = findUserByEmail(email);
  if (!u || !verifyPassword(senha, u.salt, u.senha_hash)) return null;
  return u;
}

/* ---------- Sesiones por token ---------- */
export function createSession(userId) {
  const token = randomBytes(24).toString('hex');
  db.prepare('INSERT INTO sessions (token,user_id) VALUES (?,?)').run(token, userId);
  return token;
}
export function getUserByToken(token) {
  if (!token) return null;
  const s = db.prepare('SELECT user_id FROM sessions WHERE token = ?').get(token);
  if (!s) return null;
  return publicUser(getUserById(s.user_id));
}
export function deleteSession(token) {
  if (token) db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
}

export { publicUser };

// Siembra cuentas de demostración: un cliente (Mariana, con reservas previas) y un gestor.
export function seedUsersIfEmpty() {
  const n = db.prepare('SELECT COUNT(*) AS c FROM users').get().c;
  if (n > 0) return false;
  createUser(
    { nome: 'Mariana Lopes', email: 'mariana@644.com', senha: 'cliente123', tel: '(21) 98888-1010', cpf: '123.456.789-00' },
    { allowRole: 'cliente' },
  );
  createUser(
    { nome: 'Gerente 644', email: 'gerente@644.com', senha: 'gerente123' },
    { allowRole: 'gestor' }, // los gestores solo se crean por siembra interna, nunca por registro público
  );
  return true;
}

// Reconstruye el objeto tal como lo consume el frontend (obs como {pt,es} o '').
function rowToReservation(r) {
  return {
    id: r.id, nome: r.nome, pax: r.pax, hora: r.hora, turno: r.turno,
    area: r.area, mesa: r.mesa, status: r.status, valor: r.valor,
    tel: r.tel, cpf: r.cpf, pago: !!r.pago, date: r.date,
    obs: r.obs_pt ? { pt: r.obs_pt, es: r.obs_es || r.obs_pt } : '',
  };
}

export function listReservations() {
  return db.prepare('SELECT * FROM reservations ORDER BY date, hora').all().map(rowToReservation);
}

export function createReservation(input) {
  const n = db.prepare('SELECT COUNT(*) AS c FROM reservations').get().c;
  const id = input.id || `R-${1100 + n}`;
  const obs = input.obs && typeof input.obs === 'object' ? input.obs : null;
  db.prepare(`
    INSERT INTO reservations (id,nome,pax,hora,turno,area,mesa,status,valor,tel,cpf,pago,date,obs_pt,obs_es)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `).run(
    id, input.nome || 'Cliente', input.pax || 1, input.hora || null, input.turno || null,
    input.area || null, input.mesa || null, input.status || 'paid', input.valor || 0,
    input.tel || null, input.cpf || null, input.pago ? 1 : 0, input.date || null,
    obs ? obs.pt : null, obs ? obs.es : null,
  );
  return rowToReservation(db.prepare('SELECT * FROM reservations WHERE id = ?').get(id));
}

// Siembra los datos de demostración la primera vez (para que la DB refleje el mockup).
export function seedIfEmpty() {
  const n = db.prepare('SELECT COUNT(*) AS c FROM reservations').get().c;
  if (n > 0) return false;
  const insert = db.prepare(`
    INSERT INTO reservations (id,nome,pax,hora,turno,area,mesa,status,valor,tel,cpf,pago,date,obs_pt,obs_es)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `);
  for (const r of SEED_RESERVATIONS) {
    insert.run(
      r.id, r.nome, r.pax, r.hora, r.turno, r.area, r.mesa, r.status, r.valor,
      r.tel, r.cpf, r.pago ? 1 : 0, r.date,
      r.obs ? r.obs.pt : null, r.obs ? r.obs.es : null,
    );
  }
  return true;
}
