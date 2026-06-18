# Plantilla de captura de requisitos — Salida de la Fase 1

Rellena esto **después** de la entrevista, pasando en limpio tus apuntes del guion. Lo que produzcas aquí es lo que alimenta directamente el prototipo y, más adelante, los PRDs.

Hay 4 entregables. El más importante es el **modelo de datos** (sección 4): es el hilo que conecta entrevista → prototipo → PRDs. Te lo dejo con un borrador inicial para que solo lo ajustes.

> Marca lo que sea suposición tuya (no confirmado por el dueño) con `[?]` para no confundirlo con lo que él dijo.

---

## Datos clave (rellenar primero, de un vistazo)

| Dato | Valor |
|---|---|
| Tipo de restaurante | |
| Cubiertos noche normal / noche fuerte | |
| Nº de personal y roles | |
| Herramientas que usa hoy | |
| Dispositivos donde se usaría | |
| ¿Un local o varios? | |
| **El dolor principal (su frase, tal cual)** | |
| Si la herramienta hiciera UNA cosa bien, sería... | |

---

## 1. Resumen de flujo de trabajo

Cómo funcionan hoy reservas, eventos e inventario, y dónde está el dolor. Escríbelo en prosa, como se lo contarías a otra persona.

**Reservas — cómo fluye hoy:**


_Dónde duele:_

**Eventos — cómo fluye hoy:**


_Dónde duele:_

**Inventario — cómo fluye hoy:**


_Dónde duele:_

---

## 2. Mapa de roles

Quién usa el sistema, qué ve y qué puede cambiar.

| Rol | Qué hace | Qué necesita ver | Qué puede cambiar | Dispositivo |
|---|---|---|---|---|
| Anfitrión / atril | | | | |
| Camarero / sala | | | | |
| Encargado | | | | |
| Cocina | | | | |
| Dueño | | | | |

Notas sobre permisos (¿todos ven todo, o hay vistas restringidas?):


---

## 3. Lista priorizada de features

Por cada módulo, clasifica: **Imprescindible v1** / **Deseable** / **A futuro**. El prototipo se construye solo con lo "Imprescindible v1".

### Reservas
- Imprescindible v1:
- Deseable:
- A futuro:

### Eventos
- Imprescindible v1:
- Deseable:
- A futuro:

### Inventario
- Imprescindible v1:
- Deseable:
- A futuro:

### Tablero / dashboard
- Las 3–4 cosas que quiere ver de un vistazo:

### "Y más cosas" (lo aparcado)
| Idea | Etiqueta (v1 / deseable / futuro) |
|---|---|
| | |
| | |

---

## 4. Modelo de datos (BORRADOR — ajustar tras la entrevista)

Las entidades principales del sistema y los campos que lleva cada una. Esto se convierte en los datos de ejemplo del prototipo y en la columna vertebral de los PRDs.

> Abajo va un borrador razonable. Tu trabajo: confirmar campos, borrar lo que no aplique, añadir lo que falte, y marcar con `[?]` lo que sigas sin tener claro.

**Decisiones de modelado a cerrar primero:**
- [ ] ¿Un **Evento** es un tipo de Reserva o un objeto aparte? → _decisión:_
- [ ] ¿Se asignan **mesas concretas** o solo se cuenta el total de cubiertos? → _decisión:_
- [ ] ¿El inventario se actualiza **a mano** (sí, en v1) o se descuenta solo con las ventas (futuro)? → _decisión:_

### Reserva (Reservation)
- id
- nombre_cliente
- nº_personas
- fecha_hora
- teléfono
- mesa_asignada [?] (depende de la decisión de arriba)
- peticiones_especiales / alergias
- etiqueta (habitual / VIP)
- estado: reservada / llegó / sentada / no-show / cancelada
- notas

### Evento (Event)
- id
- nombre / tipo (fiesta privada, grupo grande, buyout, recurrente)
- fecha_hora
- nº_personas (headcount)
- persona_de_contacto + teléfono
- espacio / sala
- menú_acordado
- depósito (importe + pagado sí/no)
- estado: consulta → presupuesto → confirmado → realizado
- ¿bloquea capacidad? sí/no
- notas

### Mesa (Table)
- id
- nombre / número
- capacidad
- zona / sala
- _(¿se necesita esta entidad? depende de si asigna mesas)_

### Artículo de inventario (InventoryItem)
- id
- nombre
- categoría (materia prima / preparado / bebida / suministro)
- cantidad_actual
- unidad (botella, caja, kg...)
- mínimo / punto_de_pedido (par level)
- proveedor (→ enlaza con Proveedor)
- alerta_stock_bajo (se dispara bajo el mínimo)

### Proveedor (Supplier)
- id
- nombre
- contacto (teléfono / email)
- artículos que suministra
- notas de pedido

### Personal / Usuario (Staff / User)
- id
- nombre
- rol (anfitrión / camarero / encargado / cocina / dueño)
- permisos (qué puede ver y cambiar)

---

## Checklist de cierre de la Fase 1

- [ ] Tengo claro el dolor principal del dueño
- [ ] Sé qué es "Imprescindible v1" en cada módulo
- [ ] Cerré las 3 decisiones de modelado
- [ ] Tengo (o pedí) datos reales para sembrar el prototipo
- [ ] Agendé la sesión para enseñarle el prototipo

Cuando esto esté lleno, el siguiente paso es **Fase 2: prototipo clicable** a partir de este modelo de datos.
