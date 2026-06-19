// Servidor de 644 Restaurante Pizzeria — Node.js puro (sin dependencias externas).
// Sirve el frontend (public/) y expone una API REST respaldada por SQLite.
//   npm start  ->  http://localhost:3000
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  listReservations, createReservation, seedIfEmpty,
  createUser, authenticate, createSession, getUserByToken, deleteSession, seedUsersIfEmpty,
} from './db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, 'public');
const PORT = process.env.PORT || 4000;

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2',
};

const json = (res, code, data) => {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
};

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (c) => { raw += c; if (raw.length > 1e6) req.destroy(); });
    req.on('end', () => { try { resolve(raw ? JSON.parse(raw) : {}); } catch (e) { reject(e); } });
    req.on('error', reject);
  });
}

async function serveStatic(req, res) {
  const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const rel = urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, '');
  const filePath = path.join(PUBLIC_DIR, rel);
  // Evita salir del directorio público (path traversal).
  if (!filePath.startsWith(PUBLIC_DIR)) { json(res, 403, { error: 'forbidden' }); return; }
  try {
    const data = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
    res.end(data);
  } catch {
    json(res, 404, { error: 'not found' });
  }
}

const bearer = (req) => (req.headers.authorization || '').replace(/^Bearer\s+/i, '') || null;

async function handleApi(req, res, pathname) {
  if (pathname === '/api/health') return json(res, 200, { ok: true, service: '644-restaurante-pizzeria', time: new Date().toISOString() });

  // ---------- Auth ----------
  // Registro: SIEMPRE crea cuentas de tipo 'cliente'. No se pueden crear gestores aquí.
  if (pathname === '/api/auth/register' && req.method === 'POST') {
    try {
      const { nome, email, senha, tel, cpf } = await readBody(req);
      const user = createUser({ nome, email, senha, tel, cpf }, { allowRole: 'cliente' });
      const token = createSession(user.id);
      return json(res, 201, { token, user });
    } catch (e) {
      return json(res, 400, { error: String(e.message || e) });
    }
  }
  if (pathname === '/api/auth/login' && req.method === 'POST') {
    try {
      const { email, senha } = await readBody(req);
      const u = authenticate(email, senha);
      if (!u) return json(res, 401, { error: 'e-mail o contraseña incorrectos' });
      const token = createSession(u.id);
      return json(res, 200, { token, user: { id: u.id, nome: u.nome, email: u.email, role: u.role, tel: u.tel, cpf: u.cpf } });
    } catch (e) {
      return json(res, 400, { error: String(e.message || e) });
    }
  }
  if (pathname === '/api/auth/me' && req.method === 'GET') {
    const user = getUserByToken(bearer(req));
    if (!user) return json(res, 401, { error: 'no autenticado' });
    return json(res, 200, { user });
  }
  if (pathname === '/api/auth/logout' && req.method === 'POST') {
    deleteSession(bearer(req));
    return json(res, 200, { ok: true });
  }

  if (pathname === '/api/reservations' && req.method === 'GET') {
    return json(res, 200, listReservations());
  }
  if (pathname === '/api/reservations' && req.method === 'POST') {
    try {
      const body = await readBody(req);
      const created = createReservation(body);
      return json(res, 201, created);
    } catch (e) {
      return json(res, 400, { error: 'invalid body', detail: String(e.message || e) });
    }
  }
  return json(res, 404, { error: 'unknown endpoint' });
}

const server = http.createServer((req, res) => {
  const { pathname } = new URL(req.url, 'http://x');
  if (pathname.startsWith('/api/')) return handleApi(req, res, pathname);
  return serveStatic(req, res);
});

const seeded = seedIfEmpty();
seedUsersIfEmpty();
server.listen(PORT, () => {
  console.log(`\n  🍕 644 Restaurante Pizzeria rodando em http://localhost:${PORT}`);
  console.log(`     ${seeded ? 'Base de datos sembrada con datos de demostración.' : 'Base de datos existente cargada.'}`);
  console.log(`     API: /api/reservations · /api/auth/{register,login,me,logout} · /api/health`);
  console.log(`     Cuenta demo cliente:  mariana@644.com / cliente123\n`);
});
