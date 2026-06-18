// Capa de persistencia — SQLite nativo de Node (node:sqlite, sin dependencias).
// La base de datos vive en data/restaurante644.db y guarda el progreso de las acciones (reservas).
import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
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
