# 644 Restaurante Pizzeria · Sistema de Reservas y Eventos

Sistema de reservas y eventos para **644 Restaurante Pizzeria**. Empezó como un
prototipo clicable para presentar al dueño y ahora es un proyecto real: frontend servido
desde un servidor Node y una base de datos **SQLite** que persiste las reservas.

- **Fase 1 (actual):** Reservas + Eventos (anticipo) + Pago PIX + Panel del dueño.
- **Bilingüe** PT/ES (conmutador arriba a la derecha).
- **Fuera de alcance por ahora** (preparado para sumarse): Pedidos, Cocina, Inventario.

## Requisitos
- **Node.js ≥ 22.5** (usa el SQLite nativo `node:sqlite`, sin dependencias externas).
  Hay un `.nvmrc` con la versión sugerida (`nvm use`).

## Levantar en localhost
```bash
npm start          # http://localhost:4000
# o, con recarga automática al editar:
npm run dev
```
El puerto por defecto es **4000**. Para usar otro: `PORT=5000 npm start`.
No hace falta `npm install`: el proyecto no tiene dependencias externas.

> También puedes abrir `public/index.html` directamente (doble clic) para una demo
> rápida sin servidor — en ese modo no se persiste nada (usa datos de demostración).

## Estructura
```
.
├── server.js        # Servidor HTTP + API REST (Node puro)
├── db.js            # Capa de datos (SQLite nativo)
├── seed.js          # Datos de demostración para sembrar la DB
├── public/
│   └── index.html   # Frontend (cliente + panel del dueño)
├── data/            # base de datos local (se crea y siembra sola; ignorada por git)
└── docs/            # Material de descubrimiento (entrevistas, requisitos, mockup)
```

## API
| Método | Ruta                  | Descripción                                   |
|--------|-----------------------|-----------------------------------------------|
| GET    | `/api/health`         | Estado del servicio                           |
| GET    | `/api/reservations`   | Lista de reservas (desde SQLite)              |
| POST   | `/api/reservations`   | Crea una reserva (la persiste)                |
| POST   | `/api/auth/register`  | Crea una cuenta **de cliente** + token        |
| POST   | `/api/auth/login`     | Inicia sesión, devuelve token                 |
| GET    | `/api/auth/me`        | Devuelve el usuario del token (Bearer)        |
| POST   | `/api/auth/logout`    | Cierra la sesión del token                    |

Al confirmar una reserva en el sitio del cliente, se hace `POST` y queda guardada;
el panel del dueño la lee desde la base de datos.

## Autenticación
Login simple con contraseñas hasheadas (scrypt nativo) y sesiones por token (guardado en
`localStorage`). El usuario entra y solo ve **Inicio**; para reservar o ver **Mis reservas**
debe iniciar sesión o crear una cuenta.

- El registro **solo crea cuentas de tipo `cliente`**. Las cuentas de gestor (`gestor`) no se
  pueden crear desde el registro; se siembran internamente (`seedUsersIfEmpty` en `db.js`).
- Cuentas de demostración (se siembran en el primer arranque):
  - **Cliente:** `mariana@644.com` / `cliente123`
  - **Gestor:** `gerente@644.com` / `gerente123`

> Requiere el servidor (`npm start`). Abierto como archivo (`file://`) no hay autenticación.

## GitHub
El repositorio está en **https://github.com/jLB117/restaurant644** y se commitea con el
correo personal `jlbolanosr@gmail.com`.

La cuenta personal usa una llave SSH propia a través de un alias de host (`github-personal`
en `~/.ssh/config`), independiente de otras cuentas en la máquina. Por eso el `origin` es:

```
git@github-personal:jLB117/restaurant644.git
```

Flujo normal de trabajo:
```bash
git add -A
git commit -m "..."
git push
```

## Próximos pasos sugeridos
- Conectar también **eventos** y **clientes** a la base de datos.
- Acciones del panel (confirmar pago, marcar llegada/no-show) que actualicen la DB.
- Autenticación del panel del dueño.
- Notificaciones reales por WhatsApp y conciliación de PIX.
