# Restaurant Ops Tool — Requirements-Gathering Framework

A working guide for interviewing the owner, capturing how the restaurant actually runs, and turning it into structured requirements you can prototype against.

How to use this: don't read questions off a list at him. Have a conversation, take notes against these sections, and follow the threads that surface pain. The goal of Phase 1 is to understand the *current* workflow and where it hurts — features come after.

---

## 0. Frame the conversation first

Before features, get the lay of the land:

- What kind of restaurant is it? (fine dining, casual, fast-casual, bar, cafe) — this shapes everything about reservations and inventory.
- How many covers on an average night? Busiest night?
- How many staff, and what roles? (host, servers, manager, kitchen, owner)
- What tools does he use today? (paper book, OpenTable, spreadsheets, a POS, WhatsApp, nothing)
- What's the single most annoying part of running the place operationally? — this often reveals the real priority faster than any feature question.

---

## 1. Roles & who does what

Map the people who'll touch the system. For each, you want: what they do, what they need to see, what they're allowed to change.

- **Host / front desk** — takes bookings, seats guests, manages the floor tonight
- **Server / floor staff** — may need to see their tables, mark guests arrived
- **Manager** — oversees the night, handles events, watches inventory, runs reports
- **Kitchen** — cares about covers coming, prep, ingredient stock
- **Owner** — wants the bird's-eye view: revenue, occupancy, what's running low

Questions to ask:
- Who would actually log into this, and on what device? (front-desk computer, manager's phone, kitchen tablet)
- Does everyone see everything, or do some people need restricted views?
- Who's responsible for keeping inventory numbers accurate?

---

## 2. Reservations

The most-used module daily. Dig into the real flow.

**How bookings happen today:**
- Where do reservations come from? (phone, walk-in, website, third-party like OpenTable)
- Who enters them and where do they live right now?
- What info gets captured per booking? (name, party size, time, phone, special requests, allergies, VIP/regular flag)

**The floor:**
- How are tables laid out? Do they assign specific tables, or just track total covers?
- How do they handle the timeline — turning a table twice in a night, buffer between seatings?
- What about no-shows and cancellations? Deposits?

**Daily rhythm:**
- What does the host need to see when they walk in for a shift? (tonight's book, by time slot)
- How do they handle the waitlist on a busy night?
- Any notion of confirming bookings (reminder texts/calls)?

**Prototype implication:** you'll likely want a calendar/day view, a per-reservation detail panel, party-size and time-slot fields, status (booked / arrived / seated / no-show / cancelled), and notes/tags.

---

## 3. Event management

How is this different from a normal reservation? Usually: bigger, planned ahead, more moving parts.

- What counts as an "event"? (private party, large group booking, buyout, recurring weekly thing)
- What's the workflow from inquiry → confirmed event? (deposit, menu agreed, headcount, contract)
- What info does an event need that a reservation doesn't? (set menu, room/space, deposit paid, special setup, point of contact)
- Who manages events, and how far ahead are they booked?
- Does an event block tables / capacity that should then be unavailable for normal reservations?

**Prototype implication:** events probably share the calendar with reservations but carry extra fields (deposit, headcount, menu, status pipeline). Worth clarifying whether they're a *type* of reservation or a separate object — that decision flows into your data model.

---

## 4. Inventory tracking

Often the messiest and most variable, so spend time here.

**What gets tracked:**
- What are they actually tracking — raw ingredients, prepped items, drinks/bar, supplies, all of it?
- How granular? (by the bottle? by the case? by weight?)
- How many distinct items roughly? (20, 200, 2000 — this changes the UI a lot)

**The process today:**
- How and how often do they count stock? (daily, weekly, by eye)
- How do they know when to reorder? (gut feel, par levels, running out)
- Who orders, from which suppliers, and how?
- Do they track waste / spoilage?

**What they'd want from a tool:**
- Low-stock alerts when an item drops below a threshold (par level)?
- Supplier info attached to items for quick reordering?
- Does inventory need to connect to anything else (menu items depleting stock automatically), or is manual update fine for now?

**Prototype implication:** an item list with current quantity, unit, par level / reorder point, low-stock flagging, supplier field, and a way to adjust counts. Auto-depletion from sales is almost certainly out of scope for a prototype — note it as a future/real-build idea.

---

## 5. Dashboard / "the front door"

What's the one screen that tells the owner or manager how things stand right now?

- What three or four things do they most want to see at a glance? (tonight's covers, low-stock alerts, upcoming events, occupancy %)
- Is this a daily-operations view, or a business-performance view, or both?
- Daily vs. weekly vs. monthly framing?

This is where your friend forms his first impression of the prototype, so nail down what *he* considers the key numbers.

---

## 6. The "and more stuff" — capture but park it

Your friend mentioned "more stuff." Surface it now so it doesn't derail scope later. Common additions:

- Staff scheduling / shifts
- POS / sales integration
- Customer database (regulars, history, marketing)
- Reporting & analytics (revenue, popular items, peak times)
- Supplier / purchase order management
- Menu management
- Table-side ordering

For each thing he raises, capture it but tag it explicitly: **must-have for v1 / nice-to-have / future**. Resist building these into the prototype unless they're genuinely core — the prototype's job is to validate the three pillars (reservations, events, inventory) plus the dashboard.

---

## 7. Cross-cutting questions

- **Devices:** desktop at the host stand? phones? tablets in the kitchen? (decides responsive priorities)
- **Multi-location:** one restaurant or several? (big data-model decision)
- **Existing data:** does he have reservation history / supplier lists you could seed the demo with for realism?
- **Single most important outcome:** if the tool only did one thing well, what would make it worth using?

---

## 8. Output of this phase

By the end you should be able to produce:

1. **A workflow summary** — how reservations, events, and inventory actually flow today, and where the pain is.
2. **A role map** — who uses it, what they see, what they can change.
3. **A prioritized feature list** — must-have / nice-to-have / future, for each module.
4. **A rough data model** — the core entities (Reservation, Event, Table, InventoryItem, Supplier, Staff) and the key fields each carries. This is the most valuable artifact: it drives the prototype's mock data *and* becomes the backbone of your PRDs.

That data model is the thread that connects all three phases — get it roughly right here and the prototype and PRDs fall into place much more easily.
