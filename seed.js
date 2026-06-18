// Datos de demostración para sembrar la base de datos la primera vez.
// Reflejan exactamente las reservas del mockup, para que la app servida desde
// el servidor se vea idéntica a la demo offline.
export const SEED_RESERVATIONS = [
  { id:'R-1042', nome:'Mariana Lopes', pax:2, hora:'12:30', turno:'lunch',  area:'salao',   mesa:'S1', status:'seated', valor:80,  tel:'(21) 98888-1010', cpf:'123.456.789-00', pago:true,  date:'2026-06-17', obs:{pt:'Aniversário',es:'Cumpleaños'} },
  { id:'R-1043', nome:'Carlos Pereira', pax:5, hora:'13:00', turno:'lunch',  area:'varanda', mesa:'V5', status:'paid',   valor:200, tel:'(21) 97777-2020', cpf:'987.654.321-00', pago:true,  date:'2026-06-17', obs:{pt:'Grupo — alocado pela casa',es:'Grupo — asignado por la casa'} },
  { id:'R-1044', nome:'Júlia Andrade', pax:2, hora:'13:15', turno:'lunch',  area:'salao',   mesa:'S2', status:'noshow', valor:80,  tel:'(21) 96666-3030', cpf:'111.222.333-44', pago:true,  date:'2026-06-17', obs:{pt:'Histórico de faltas',es:'Historial de faltas'} },
  { id:'R-1045', nome:'Rafael Mendes', pax:4, hora:'19:30', turno:'dinner', area:'salao',   mesa:'S4', status:'paid',   valor:160, tel:'(21) 95555-4040', cpf:'222.333.444-55', pago:true,  date:'2026-06-17', obs:{pt:'Alergia a frutos do mar',es:'Alergia a mariscos'} },
  { id:'R-1046', nome:'Bianca Rocha', pax:2, hora:'20:00', turno:'dinner', area:'varanda', mesa:'V1', status:'pending', valor:80, tel:'(21) 94444-5050', cpf:'333.444.555-66', pago:false, date:'2026-06-17', obs:{pt:'Aguardando PIX',es:'Esperando PIX'} },
  { id:'R-1047', nome:'Thiago Nunes', pax:6, hora:'20:30', turno:'dinner', area:'salao',   mesa:'S7', status:'paid',   valor:240, tel:'(21) 93333-6060', cpf:'444.555.666-77', pago:true,  date:'2026-06-17', obs:{pt:'Comemoração de trabalho',es:'Celebración de trabajo'} },
  { id:'R-1048', nome:'Sofia Carvalho', pax:2, hora:'21:00', turno:'dinner', area:'salao',  mesa:'S8', status:'cancel', valor:80, tel:'(21) 92222-7070', cpf:'555.666.777-88', pago:false, date:'2026-06-17', obs:{pt:'Cancelou (crédito gerado)',es:'Canceló (crédito generado)'} },
  { id:'R-1051', nome:'Pedro Alves', pax:4, hora:'20:00', turno:'dinner', area:'salao',   mesa:'S5', status:'paid', valor:160, tel:'(21) 90000-1111', cpf:'—', pago:true, date:'2026-06-18', obs:'' },
  { id:'R-1052', nome:'Luana Dias', pax:2, hora:'13:00', turno:'lunch',  area:'varanda', mesa:'V2', status:'paid', valor:80,  tel:'(21) 90000-2222', cpf:'—', pago:true, date:'2026-06-18', obs:'' },
  { id:'R-1053', nome:'Família Souza', pax:8, hora:'21:00', turno:'dinner', area:'eventos', mesa:'E1', status:'paid', valor:320, tel:'(21) 90000-3333', cpf:'—', pago:true, date:'2026-06-19', obs:{pt:'Grupo grande',es:'Grupo grande'} },
  { id:'R-1054', nome:'Camila Reis', pax:2, hora:'19:30', turno:'dinner', area:'salao',   mesa:'S1', status:'paid', valor:80,  tel:'(21) 90000-4444', cpf:'—', pago:true, date:'2026-06-19', obs:'' },
  { id:'R-1055', nome:'Bruno Teixeira', pax:6, hora:'20:30', turno:'dinner', area:'salao', mesa:'S7', status:'paid', valor:240, tel:'(21) 90000-5555', cpf:'—', pago:true, date:'2026-06-20', obs:'' },
  { id:'R-1056', nome:'Aline Castro', pax:4, hora:'13:30', turno:'lunch',  area:'varanda', mesa:'V4', status:'paid', valor:160, tel:'(21) 90000-6666', cpf:'—', pago:true, date:'2026-06-20', obs:'' },
  { id:'R-1057', nome:'Evento: Noite de Samba', pax:60, hora:'20:00', turno:'dinner', area:'eventos', mesa:'—', status:'paid', valor:7200, tel:'—', cpf:'—', pago:true, date:'2026-06-21', obs:{pt:'46 lugares vendidos',es:'46 plazas vendidas'} },
];
