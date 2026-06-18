# Aurora · Sistema de Reservas y Eventos

Sistema de reservas y eventos para un restaurante (proyecto **Aurora**). Empezó como un
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
├── data/            # aurora.db (se crea y siembra solo; ignorado por git)
└── docs/            # Material de descubrimiento (entrevistas, requisitos, mockup)
```

## API
| Método | Ruta                 | Descripción                          |
|--------|----------------------|--------------------------------------|
| GET    | `/api/health`        | Estado del servicio                  |
| GET    | `/api/reservations`  | Lista de reservas (desde SQLite)     |
| POST   | `/api/reservations`  | Crea una reserva (la persiste)       |

Al confirmar una reserva en el sitio del cliente, se hace `POST` y queda guardada;
el panel del dueño la lee desde la base de datos.

## Subir a GitHub
El repositorio ya está inicializado y configurado para commitear con tu correo personal
(`jlbolanosr@gmail.com`). Como no hay `gh` CLI instalado, crea el repo vacío en
github.com (sin README) y luego:

```bash
git remote add origin https://github.com/<tu-usuario>/aurora-reservas.git
git push -u origin main
```

(Si prefieres, instala el CLI con `brew install gh`, ejecuta `gh auth login` y luego
`gh repo create aurora-reservas --private --source=. --push`.)

## Próximos pasos sugeridos
- Conectar también **eventos** y **clientes** a la base de datos.
- Acciones del panel (confirmar pago, marcar llegada/no-show) que actualicen la DB.
- Autenticación del panel del dueño.
- Notificaciones reales por WhatsApp y conciliación de PIX.
