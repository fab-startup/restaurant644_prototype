# Aurora — Protótipo clicável (Fase 1)

Mockup de demonstração del sistema de **reservas + eventos** para enseñarle al dueño del restaurante. Construido a partir del MVP recibido, el guion de entrevista y las preguntas pendientes.

## Cómo abrirlo
- **Opción simple:** doble clic en `index.html` (se abre en cualquier navegador, sin instalar nada).
- Es 100% estático y autocontenido. Ningún pago real se procesa.
- Arriba a la derecha hay un conmutador **PT / ES** — el dueño lo ve en portugués; tú puedes revisarlo en español.

## Qué se puede mostrar (clicable)

Hay un **conmutador arriba** para saltar entre las dos caras del producto:

### 👤 Cliente (lo que ve quien reserva)
- **Início** — hero + próximos eventos + adelanto del cardápio.
- **Reservar** (asistente de 4 pasos): fecha/turno (almuerzo 12–16 / cena 18–23) y nº de personas → ambiente (Salão / Varanda / Salão de Eventos) y mesa → datos del cliente con **CPF** y **consentimiento LGPD** → **pago PIX** (QR + chave) → confirmación con **mensaje simulado de WhatsApp** (comprovante).
- **Cardápio** completo en R$, con etiquetas (veg, picante, esgotado).
- **Eventos** con menú exclusivo, precio por persona y vagas.
- Reservar un evento usa el mismo flujo con fecha/menú fijados.

### 🏠 Painel do Dono (administración)
- **Visão geral** — KPIs del día (reservas, comensais, ocupación, receita PIX), agenda por horario y próximo evento.
- **Reservas** — tres vistas (**Hoje / Semana / Calendário**): tabla del día con estados (Pago / Pendente / Sentado / No-show / Cancelada), agenda de la semana y calendario mensual con nº de reservas por día y eventos marcados. Clic en una fila/chip abre el detalle con acciones.
- **Eventos** — vagas vendidas, ocupación y receita prevista por evento.
- **Clientes** — historial, nº de faltas y **confiabilidade (estrellas)** para detectar no-shows repetidos.
- **Cardápio** — edición de pratos, precios y disponibilidad.
- **Pedidos / Cozinha / Estoque** aparecen como "em breve" para mostrar que la arquitectura deja espacio a las fases siguientes.

## Decisiones aplicadas en el mockup (asunciones a confirmar con el dueño)
- Idioma: **bilingüe PT/ES** con conmutador (por defecto portugués BR para el dueño).
- Pago: **100% antecipado vía PIX**; cancelación con 24h → **crédito** (no reembolso).
- Reserva: el cliente **elige mesa por ambiente**; grupos de **5+** los aloca la casa.
- Cliente identificado por **CPF**; casilla de **consentimiento LGPD**.
- Confirmación/comprobante por **WhatsApp**.
- Alcance = **Fase 1** (reservas + eventos + pagos + cardápio + panel). Pedidos, cocina e inventario quedan fuera.

> Todos estos puntos están en `Preguntas_Pendientes_Dueno_Restaurante.docx` como pendientes de cerrar — el mockup propone una respuesta concreta para cada uno, para que la reunión sea de validación.
