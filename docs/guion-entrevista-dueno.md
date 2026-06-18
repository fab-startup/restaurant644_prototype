# Guion de entrevista con el dueño — Fase 1: Captura

Este guion es para que tú lo uses **en vivo** mientras hablas con el dueño. No es un cuestionario para leerle de corrido. Es un mapa para tener una conversación: dejas que cuente, escuchas dónde le duele, y tiras del hilo.

Tu objetivo en esta sesión no es definir features, es **entender cómo funciona el restaurante hoy y dónde está el dolor**. Las funcionalidades salen solas después.

---

## Antes de empezar

- **Tiempo:** reserva 60–90 min. Es mucho terreno; no pasa nada si queda una segunda sesión.
- **Graba la conversación** (con permiso). Así no escribes mientras hablas y puedes mirarle a la cara.
- **Pídele material real:** el plano del salón, una foto de su libro de reservas actual, una lista de proveedores, su carta. Esto te sirve para sembrar el prototipo con datos realistas más adelante.
- **Lleva los apuntes a "lápiz".** Toma notas rápidas aquí; la estructura limpia la haces después en la plantilla de captura.

### Cómo conducirla

- Empieza ancho y cierra estrecho: primero el panorama, luego cada módulo.
- Cuando mencione algo que le molesta o le quita tiempo, **párate ahí y profundiza**. Ese dolor es tu mejor pista de prioridad.
- Pregunta "¿y entonces qué haces?" mucho. Quieres el flujo real, no el ideal.
- Pide ejemplos concretos: "cuéntame de la última vez que pasó eso".
- Está bien saltarte el orden. Si se entusiasma con inventario, ve a inventario.

---

## Bloque 0 — Encuadre y panorama

Arranca relajado, dejándole contar de su negocio.

- "Cuéntame del restaurante: ¿qué tipo de sitio es, qué tipo de cliente viene?"
- "¿Cuánta gente entra una noche normal? ¿Y una noche fuerte?"
- "¿Quiénes trabajan ahí y qué hace cada uno?" (anfitrión, camareros, encargado, cocina, él)
- "¿Qué usas hoy para llevar todo esto: papel, Excel, OpenTable, un TPV, WhatsApp...?"
- "¿Es un solo local o varios?" (decisión grande para el modelo de datos)
- 🔑 "Si tuvieras que decirme **la parte más molesta** de operar el restaurante día a día, ¿cuál sería?"

> Esa última suele revelar la prioridad real más rápido que cualquier pregunta sobre features. Anótala destacada.

**Apuntes:**


---

## Bloque 1 — Un día/una noche típica (el recorrido completo)

Esta es la pregunta más potente del guion. Déjale narrar y tú vas anotando dónde aparecen reservas, eventos, inventario y fricciones.

- "Llévame por una noche típica de principio a fin. Llegas, abres... ¿y luego qué pasa?"
- Pistas para profundizar según lo que cuente:
  - "¿Quién es la primera persona que llega y qué es lo primero que mira?"
  - "Cuando entra un cliente sin reserva, ¿qué haces?"
  - "¿En qué momento de la noche se complica todo?"
  - "Al cerrar, ¿qué tienes que dejar listo o anotado para el día siguiente?"

> De aquí sale el 70% del flujo de trabajo. Lo demás son los bloques siguientes para rellenar huecos.

**Apuntes:**


---

## Bloque 2 — Reservas

El módulo que más se usará a diario. Busca el flujo real.

**Cómo entran hoy:**
- "¿De dónde llegan las reservas: teléfono, gente que pasa, web, alguna plataforma tipo OpenTable?"
- "¿Quién las apunta y dónde quedan ahora mismo?"
- "Cuando apuntas una reserva, ¿qué datos anotas?" (nombre, nº personas, hora, teléfono, peticiones, alergias, si es cliente habitual o VIP)

**El salón:**
- "¿Cómo están distribuidas las mesas? ¿Asignas mesa concreta o llevas solo el total de cubiertos?"
- "¿Llegas a usar la misma mesa dos veces en una noche? ¿Cómo manejas el tiempo entre una y otra?"
- "¿Y los que no aparecen o cancelan? ¿Pides señal/depósito?"

**El ritmo diario:**
- "Cuando el anfitrión llega a su turno, ¿qué necesita ver para arrancar?"
- "En una noche llena, ¿cómo manejas la lista de espera?"
- "¿Confirmáis las reservas de algún modo (un recordatorio, una llamada)?"

> 🔎 Para el modelo de datos, intenta salir con: qué campos tiene una reserva y qué estados puede tener (reservada / llegó / sentada / no-show / cancelada).

**Apuntes:**


---

## Bloque 3 — Eventos

Normalmente un evento es más grande, se planea con antelación y tiene más piezas que una reserva.

- "¿Qué cuenta para ti como 'evento'? ¿Una fiesta privada, un grupo grande, alquilar el local entero, algo fijo cada semana?"
- "¿Cómo es el proceso desde que alguien pregunta hasta que el evento queda cerrado?" (depósito, carta acordada, nº de personas, contrato)
- "¿Qué necesitas apuntar de un evento que no apuntarías de una reserva normal?" (menú cerrado, sala/espacio, depósito pagado, montaje especial, persona de contacto)
- "¿Quién gestiona los eventos y con cuánta antelación se reservan?"
- "Cuando hay un evento, ¿bloquea mesas o capacidad que ya no deberías poder reservar para clientes normales?"

> 🔎 Decisión clave para el modelo de datos: ¿un evento es **un tipo de reserva** o **un objeto aparte**? Lo que respondas aquí define cómo se construye el prototipo.

**Apuntes:**


---

## Bloque 4 — Inventario

Suele ser lo más desordenado y variable, así que dedícale tiempo.

**Qué se controla:**
- "¿Qué controlas exactamente: materia prima, cosas ya preparadas, bebida/barra, suministros... todo?"
- "¿Con qué nivel de detalle? ¿Por botella, por caja, por peso?"
- "Más o menos, ¿cuántos artículos distintos manejas? ¿20, 200, 2000?" (cambia mucho la interfaz)

**El proceso de hoy:**
- "¿Cómo y cada cuánto cuentas el stock: a diario, semanal, a ojo?"
- "¿Cómo sabes cuándo toca volver a pedir? ¿Por instinto, por un mínimo fijo, cuando te quedas sin algo?"
- "¿Quién hace los pedidos, a qué proveedores y cómo?"
- "¿Llevas cuenta de lo que se desperdicia o se estropea?"

**Qué querría de una herramienta:**
- "¿Te serviría que te avise cuando algo baja de cierto nivel?"
- "¿Quieres tener el contacto del proveedor pegado a cada artículo para pedir rápido?"
- "¿El inventario tiene que conectarse con algo más (que un plato descuente ingredientes solo), o por ahora con actualizarlo a mano vale?"

> 🔎 Para el modelo de datos: artículo con cantidad actual, unidad, mínimo/punto de pedido, proveedor. El descuento automático por ventas casi seguro queda **fuera del prototipo** — anótalo como idea a futuro.

**Apuntes:**


---

## Bloque 5 — Roles y permisos

Quién toca el sistema y qué puede hacer cada uno.

- "¿Quién entraría de verdad a usar esto y desde qué dispositivo?" (ordenador del atril, móvil del encargado, tablet en cocina)
- "¿Todos ven todo, o hay cosas que solo algunos deberían poder ver o cambiar?"
- "¿Quién es el responsable de que los números del inventario estén bien?"

> 🔎 Para el modelo de datos / mapa de roles: por cada rol, qué hace, qué ve y qué puede cambiar.

**Apuntes:**


---

## Bloque 6 — El tablero ("la puerta de entrada")

La pantalla que te dice de un vistazo cómo va todo ahora mismo.

- "Si abres la app por la mañana o al empezar la noche, ¿qué 3 o 4 cosas quieres ver de un golpe?" (cubiertos de hoy, alertas de stock bajo, próximos eventos, % de ocupación)
- "¿Esto es más una vista de operación del día, o de cómo va el negocio (ventas, etc.), o las dos?"
- "¿Lo piensas por día, por semana, por mes?"

> Aquí se forma su primera impresión del prototipo, así que clava **qué números considera él los importantes**.

**Apuntes:**


---

## Bloque 7 — "Y más cosas" (recoger, pero aparcar)

Mencionaste que quería ir añadiendo cosas. Sácalas ahora para que no descarrilen el alcance luego. Las típicas:

- Horarios/turnos del personal
- Integración con TPV / ventas
- Base de datos de clientes (habituales, historial, marketing)
- Informes y analítica (ventas, platos más pedidos, horas pico)
- Gestión de proveedores y órdenes de compra
- Gestión de la carta
- Comandas en mesa

Por cada cosa que mencione, anótala y **etiquétala explícitamente**: imprescindible v1 / deseable / a futuro. No las metas en el prototipo salvo que sean realmente del núcleo. El prototipo valida los tres pilares (reservas, eventos, inventario) más el tablero.

**Apuntes (idea → etiqueta):**


---

## Bloque 8 — Cierre

Dos preguntas que valen oro al final:

- "Si la herramienta hiciera **una sola cosa muy bien**, ¿cuál tendría que ser para que te valiera la pena usarla?"
- "De todo lo que hablamos, ¿qué es lo que más urgentemente te quitaría un dolor de cabeza?"

Y cierra logística:
- "¿Tienes datos que me puedas pasar (historial de reservas, lista de proveedores) para que el prototipo se vea realista?"
- "¿Cuándo podríamos vernos otra vez para que pruebes una primera versión?"

**Apuntes:**


---

## Justo al terminar (5 minutos, no lo dejes para después)

Mientras está fresco, apunta en bruto:
- La **frase del dolor principal** tal cual la dijo.
- Las **3 cosas** que claramente son imprescindibles para él.
- Cualquier **número** que soltó (cubiertos, nº de artículos, antelación de eventos).
- Tu corazonada del **modelo de datos**: ¿evento = reserva o aparte? ¿asigna mesas o solo cubiertos?

Luego pasas todo esto en limpio a `plantilla-captura-requisitos.md`, que es donde se convierte en los 4 entregables que alimentan el prototipo.
