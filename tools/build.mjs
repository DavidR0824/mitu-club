// Genera index.html y las páginas de /servicios a partir de los datos de abajo.
// Uso: node tools/build.mjs
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = "https://davidr0824.github.io/mitu-club/";

// ---------------------------------------------------------------------------
// Datos del negocio (Google Business Profile)
// ---------------------------------------------------------------------------
const biz = {
  name: "Mitu Club Salón de Uñas",
  phone: "7885 9025",
  phoneIntl: "+50578859025",
  wa: "50578859025",
  address: "Plaza el Sol, de la Gasolinera UNO 2 cuadras al sur, 80 varas arriba",
  city: "Managua",
  postal: "14035",
  lat: 12.1280834,
  lng: -86.2606583,
  rating: "4.7",
  reviews: 185,
  maps: "https://maps.google.com/?cid=15493119852081437505",
  directions: "https://www.google.com/maps/dir/?api=1&destination=12.1280834,-86.2606583",
  facebook: "https://www.facebook.com/mitu.clubbb/",
  instagram: "https://www.instagram.com/tatamanicurista/",
  igHandle: "@tatamanicurista",
  mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.767072542963!2d-86.2606583!3d12.1280834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f715591283459fb%3A0xd7029e6b5ddddb41!2sMitu%20Club%20Sal%C3%B3n%20de%20U%C3%B1as!5e0!3m2!1sen!2sni!4v1793937082504!5m2!1sen!2sni",
};
// getDay(): 0 domingo ... 6 sábado
const hours = [
  { day: 2, label: "Martes", time: "10:00 a.m. – 7:00 p.m." },
  { day: 3, label: "Miércoles", time: "10:00 a.m. – 7:00 p.m." },
  { day: 4, label: "Jueves", time: "10:00 a.m. – 7:00 p.m." },
  { day: 5, label: "Viernes", time: "10:00 a.m. – 7:00 p.m." },
  { day: 6, label: "Sábado", time: "10:00 a.m. – 7:00 p.m." },
  { day: 0, label: "Domingo", time: "10:00 a.m. – 2:00 p.m." },
  { day: 1, label: "Lunes", time: "Cerrado" },
];

const wa = (msg) => `https://wa.me/${biz.wa}?text=${encodeURIComponent(msg)}`;
const WA_GENERAL = wa("¡Hola Mitu Club! Quiero agendar una cita para mis uñas.");

// ---------------------------------------------------------------------------
// Fotos
// ---------------------------------------------------------------------------
const photos = [
  { f: "unas-rosa-oro-cromo.jpg", alt: "Uñas almendra rosa con detalles dorados en relieve y estrella", cap: "Rosa con oro en relieve", w: 1440, h: 1800 },
  { f: "unas-cromo-rosa-aurora.jpg", alt: "Uñas almendra con efecto cromo rosa aurora", cap: "Cromo rosa aurora", w: 1440, h: 1910 },
  { f: "unas-diseno-luchadores.jpg", alt: "Uñas cortas con diseño a mano de máscaras de luchador", cap: "Diseño a mano: luchadores", w: 1440, h: 1578 },
  { f: "unas-magenta-ojo-de-gato.jpg", alt: "Uñas cuadradas magenta con efecto ojo de gato", cap: "Magenta ojo de gato", w: 1440, h: 1800 },
  { f: "unas-lila-dorado-celestial.jpg", alt: "Uñas almendra lila con brillo y diseño celestial dorado de lunas y estrellas", cap: "Lila celestial con dorado", w: 1440, h: 1910 },
  { f: "unas-micro-frances-blanco.jpg", alt: "Uñas cortas nude con micro francés blanco", cap: "Micro francés", w: 1440, h: 1800 },
  { f: "unas-frances-rosa-neon.jpg", alt: "Uñas cuadradas con francés rosa neón y brillo dorado", cap: "Francés rosa neón", w: 1440, h: 1800 },
  { f: "unas-frances-amarillo-pastel.jpg", alt: "Uñas almendra nude con francés amarillo pastel", cap: "Francés amarillo pastel", w: 1440, h: 1702 },
];
const P = Object.fromEntries(photos.map((p) => [p.f.replace(".jpg", ""), p]));

// ---------------------------------------------------------------------------
// Servicios (precios tomados del menú oficial de Mitu Club)
// ---------------------------------------------------------------------------
const INCLUYE_MANOS = "Todos nuestros servicios incluyen manicura en seco (russian manicure) y esmaltado semipermanente, máximo 3 tonos.";

const services = [
  {
    slug: "extensiones",
    name: "Extensiones",
    script: "Extensiones",
    short: "Acrílico, polygel o Gel-X para darle largo y forma a tus uñas, con el acabado que tú quieras.",
    from: 1300,
    photo: "unas-rosa-oro-cromo",
    title: "Extensiones de uñas en Managua: acrílico, polygel y Gel-X",
    desc: "Extensiones de uñas en Managua desde C$1,300: acrílico, polygel y Gel-X con manicura rusa y semipermanente incluidos. Reserva en Mitu Club por WhatsApp.",
    lead: "¿Quieres uñas largas y con forma perfecta? Te las hacemos en acrílico, polygel o Gel-X. Tú eliges el largo y el diseño, y nosotras nos encargamos de que queden parejas y bien terminadas.",
    groups: [
      { title: "Extensiones", items: [
        { n: "Acrílico", d: "En tips", p: 1450 },
        { n: "Polygel", d: "En tips", p: 1300 },
        { n: "Gel-X", p: 1300 },
      ] },
      { title: "Extras", items: [
        { n: "Largo mayor a 3", d: "Por cada 3 números", p: 150, plus: true },
        { n: "Esculpidas", d: "Moldes de papel o tips dual", p: 200, plus: true },
      ] },
    ],
    notes: [INCLUYE_MANOS],
    gallery: ["unas-rosa-oro-cromo", "unas-cromo-rosa-aurora", "unas-lila-dorado-celestial"],
  },
  {
    slug: "recubrimiento",
    name: "Recubrimiento",
    script: "Recubrimiento",
    short: "Refuerza tu uña natural con acrílico, polygel, builder, rubber base o esmaltado gel.",
    from: 600,
    photo: "unas-micro-frances-blanco",
    title: "Recubrimiento de uñas en Managua: rubber base, builder y más",
    desc: "Recubrimiento de uñas naturales en Managua desde C$600: rubber base, builder, polygel, acrílico y esmaltado gel. Manicura rusa incluida en Mitu Club.",
    lead: "Si te gustan tus uñas naturales pero quieres que se vean más bonitas y fuertes, el recubrimiento es para ti. Te protege la uña, le da estructura y te deja un acabado limpio por semanas.",
    groups: [
      { title: "Recubrimiento", items: [
        { n: "Acrílico", p: 1200 },
        { n: "Polygel", p: 1100 },
        { n: "Builder", p: 1000 },
        { n: "Rubber base", p: 920 },
        { n: "Esmaltado gel", p: 600 },
      ] },
    ],
    notes: [
      "El material del recubrimiento te lo recomienda la especialista de Mitu Club, según tu estilo de vida, el largo natural de tus uñas y el diseño que elijas.",
      INCLUYE_MANOS,
    ],
    gallery: ["unas-micro-frances-blanco", "unas-magenta-ojo-de-gato", "unas-frances-amarillo-pastel"],
  },
  {
    slug: "mantenimiento",
    name: "Mantenimiento",
    script: "Mantenimiento",
    short: "Retoques y rebalances para que tus uñas sigan viéndose recién hechas.",
    from: 1000,
    photo: "unas-frances-rosa-neon",
    title: "Mantenimiento de uñas en Managua: retoque y rebalance",
    desc: "Retoque y rebalance de uñas en Managua desde C$1,000 con acrílico, polygel, builder o base rubber. Mantén tus uñas como nuevas en Mitu Club.",
    lead: "Tus uñas crecen y el material necesita cariño. Con un retoque o un rebalance a tiempo, tus uñas se mantienen fuertes, con buena forma y como el primer día.",
    groups: [
      { title: "Retoque", items: [
        { n: "Retoque con acrílico", p: 1200 },
        { n: "Retoque con polygel", p: 1100 },
        { n: "Retoque con balance", p: 1000 },
      ] },
      { title: "Rebalance", items: [
        { n: "Rebalance rígido", d: "Con acrílico o polygel", p: 1300 },
        { n: "Rebalance flexible", d: "Con builder o base rubber", p: 1200 },
      ] },
    ],
    notes: [
      "<strong>Retoque:</strong> aplica en servicios con menos de 25 días desde la última aplicación, o que regresen nítidos (sin desprendimientos graves).",
      "<strong>Rebalance:</strong> aplica en servicios de más de 25 días, o que estén bastante afectados (desprendimientos graves, mucha curvatura, pérdida de la estructura o mucho crecimiento). Material recomendado por la especialista.",
      INCLUYE_MANOS,
    ],
    gallery: ["unas-frances-rosa-neon", "unas-micro-frances-blanco", "unas-magenta-ojo-de-gato"],
  },
  {
    slug: "diseno",
    name: "Diseño",
    script: "Diseño",
    short: "Arte a mano, francés de color, cromo, ojo de gato y relieve dorado. Tráenos tu idea.",
    fromText: "Cotiza tu idea",
    photo: "unas-diseno-luchadores",
    title: "Diseño de uñas en Managua: arte a mano, cromo y francés",
    desc: "Diseños de uñas a mano en Managua: francés de color, cromo, ojo de gato, relieve dorado y arte personalizado. Mándanos tu idea por WhatsApp a Mitu Club.",
    lead: "Aquí es donde tus uñas cuentan algo de ti. Desde un francés finito hasta máscaras de luchador pintadas a mano: si lo puedes imaginar, lo platicamos y lo hacemos.",
    design: true,
    styles: [
      { n: "Francés de color", d: "Clásico blanco, micro francés o con tu color favorito en la punta." },
      { n: "Efecto cromo", d: "Ese brillo tipo perla o aurora que cambia con la luz." },
      { n: "Ojo de gato", d: "Un brillo profundo que se mueve, ideal en tonos intensos." },
      { n: "Relieve dorado", d: "Detalles en oro con volumen: estrellas, lunas y marcos." },
      { n: "Arte a mano", d: "Diseños pintados uno por uno, como los luchadores de la galería." },
      { n: "Tu idea", d: "Mándanos la foto que te gustó y la adaptamos a tus uñas." },
    ],
    notes: [
      "El precio del diseño depende del detalle y de cuántas uñas lleven arte. Mándanos tu foto de referencia por WhatsApp y te decimos el precio exacto antes de tu cita.",
      INCLUYE_MANOS,
    ],
    gallery: photos.map((p) => p.f.replace(".jpg", "")),
  },
  {
    slug: "extras",
    name: "Extras",
    script: "Extras",
    short: "Retiro, cambio de forma, manicura spa, aftercare y manicura express.",
    from: 150,
    photo: "unas-cromo-rosa-aurora",
    title: "Extras de manicura en Managua: manicura spa, retiro y más",
    desc: "Extras de manicura en Mitu Club, Managua: retiro al 100%, cambio de forma, manicura spa, aftercare y manicura express desde C$150.",
    lead: "Los detalles que hacen la diferencia. Agrégale a tu servicio un retiro completo, un cambio de forma o un ratito de spa para tus manos.",
    groups: [
      { title: "Extras", items: [
        { n: "Retiro al 100%", d: "Remoción total", p: 300 },
        { n: "Cambio de forma", p: 150 },
        { n: "1 extensión", d: "Aplica en recubrimientos y mantenimientos", p: 150 },
        { n: "Manicura spa", d: "Sumersión, exfoliante, mascarilla, crema y masaje", p: 400 },
        { n: "AfterCare", d: "Crema y masaje", p: 200 },
        { n: "Manicura express", d: "Servicio aparte: limado, limpieza de cutículas y aceite", p: 400 },
      ] },
    ],
    notes: ["No ofrecemos servicios con esmaltes regulares."],
    gallery: ["unas-cromo-rosa-aurora", "unas-lila-dorado-celestial", "unas-frances-amarillo-pastel"],
  },
  {
    slug: "pedicura",
    name: "Pedicura",
    script: "Pedicura",
    short: "Pedi dry, pedi spa, pedi experience y baby feet, con o sin esmalte.",
    from: 800,
    art: true,
    title: "Pedicura en Managua: pedi spa, pedi dry y baby feet",
    desc: "Pedicura en Managua desde C$800: pedi dry, pedi spa sencillo e intensivo, pedi experience y baby feet treatment. Russian pedicure incluida en Mitu Club.",
    lead: "Tus pies también merecen su momento. Elige entre una pedicura en seco enfocada en uñas y cutículas, o date un spa completo con sales, exfoliante, mascarilla y masaje.",
    table: {
      cols: ["Sin esmalte", "Con esmalte"],
      rows: [
        { n: "Pedi dry", d: "Enfoque en uñas y cutículas", p: [800, 950] },
        { n: "Pedi spa sencillo", d: "Sumersión, sales, exfoliante, tallado y crema", p: [900, 1100] },
        { n: "Pedi spa intensivo", d: "Sumersión, sales, exfoliante, tallado, mascarilla y mantequilla", p: [1050, 1250] },
        { n: "Pedi experience", d: "Pedi spa de 4 pasos con líneas TGB, Voesh, Cuccio o Kiara Sky", p: [1200, 1380] },
        { n: "Baby feet treatment", d: "En seco, pulido plantar y parafina", p: [1100, 1250] },
      ],
    },
    notes: ["Todos nuestros servicios incluyen limpieza de cutículas en seco (russian pedicure) y limado de uñas. No ofrecemos esmalte regular."],
  },
  {
    slug: "extras-pedicura",
    name: "Extras pedicura",
    script: "Extras pedicura",
    short: "Parafina, jelly spa, pulido baby feet, reconstrucción y masajito express.",
    from: 150,
    art: true,
    title: "Extras de pedicura en Managua: parafina, jelly spa y más",
    desc: "Extras para tu pedicura en Mitu Club, Managua: parafina, jelly spa, pulido baby feet, reconstrucción de uñas y masajito express desde C$150.",
    lead: "Súmale algo especial a tu pedicura. Parafina para hidratar, jelly spa para relajarte o una reconstrucción para que tus uñas de los pies se vean parejas.",
    groups: [
      { title: "Extras pedicura", items: [
        { n: "Parafina", p: 280 },
        { n: "Jelly spa", p: 400 },
        { n: "Pulido baby feet", p: 250 },
        { n: "Reconstrucción dedos mayores", p: 300 },
        { n: "Reconstrucción completa", p: 650 },
        { n: "Reconstrucción individual", p: 150 },
        { n: "Masajito express", d: "10 minutos", p: 200 },
      ] },
    ],
    notes: ["Los extras solo se pueden agregar a un servicio de pedicura, no se hacen por separado."],
  },
];

const reviews = [
  { a: "Leticia Mendoza", date: "hace 3 meses", stars: 5, c: "#E5766A", t: "Les mandé mensaje por WhatsApp y me respondieron en segundos. Pude llegar sin cita y me atendieron luego. Kaylee se lució con su trabajo y atención a los pequeños detalles. Me quedé encantadisima. Aceptan tarjeta y efectivo. Los recomiendo!!" },
  { a: "Jeniffer Sanchez", date: "hace un año", stars: 5, c: "#B9805E", t: "¡La calidad de trabajo de las chicas es increíble! Ellas me recomendaron el rubber base y me lo seguí haciendo con ellas por todo un año y siempre salí encantada. Lastimosamente ahora vivo muy largo y se me hace muy difícil ir hasta sus nuevas instalaciones, pero siempre extraño mis uñas del Mitu." },
  { a: "Alejandra Urbina", date: "hace 2 años", stars: 5, c: "#C98BA5", t: "Realmente el mejor salón de uñas al que he ido, me atiende increíble y nunca he tenido una sola mala experiencia con su equipo o servicio. Lo recomiendo al 100%. Me encanta ir al Mitu 💗" },
  { a: "Ony Salguti", date: "hace un año", stars: 5, c: "#D9A441", t: "Me encanta, un ambiente súper agradable, las chicas muy profesionales y amables. Del servicio podría hablar maravillas porque me ha encantado como cuidan mis manitos y pies." },
  { a: "Joaquín Núñez", date: "hace 2 años", stars: 5, c: "#7A9E8E", t: "Mi novia se hace las uñas aquí y sale encantada, hay una área de espera para uno, con aire acondicionado. Solo recomendaría un minibar para poder comprar algo mientras uno está esperando. Ya que a veces a procesos largos." },
  { a: "Karen Gómez", date: "hace un año", stars: 4, c: "#8E7CC3", t: "El servicio y la atención es excelente! Super lindas las chicas que te atienden. Solamente que el esmalte no ha durado el tiempo prometido, a los 7 días se había levantado el esmalte de una uña y de otras hay esquinas sin pintura." },
];

// ---------------------------------------------------------------------------
// Íconos
// ---------------------------------------------------------------------------
const STAR = `<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l2.9 6.14 6.6.78-4.9 4.6 1.3 6.6L12 17.6l-5.9 3.02 1.3-6.6-4.9-4.6 6.6-.78L12 2.5Z"/></svg>`;
const GOOGLE = (cls = "icon") => `<svg class="${cls}" aria-hidden="true" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.52 12.27c0-.79-.07-1.54-.19-2.27H12v4.3h6.44c-.28 1.5-1.13 2.77-2.4 3.62v3.01h3.88c2.27-2.09 3.6-5.17 3.6-8.66z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.92l-3.88-3.01c-1.08.72-2.45 1.15-4.05 1.15-3.11 0-5.74-2.1-6.68-4.92H1.3v3.09C3.26 21.3 7.3 24 12 24z"/><path fill="#FBBC05" d="M5.32 14.3A7.2 7.2 0 0 1 4.96 12c0-.8.14-1.57.36-2.3V6.61H1.3A11.98 11.98 0 0 0 0 12c0 1.94.46 3.77 1.3 5.39l4.02-3.09z"/><path fill="#EA4335" d="M12 4.75c1.76 0 3.34.6 4.58 1.78l3.44-3.44C17.95 1.19 15.24 0 12 0 7.3 0 3.26 2.7 1.3 6.61l4.02 3.09C6.26 6.88 8.89 4.75 12 4.75z"/></svg>`;
const I = {
  arrow: `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  close: `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
  spark: (cls) => `<svg class="${cls}" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z"/></svg>`,
  wa: `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.43 9.43 0 0 1-4.8-1.31l-.35-.2-3.57.93.95-3.48-.22-.36a9.41 9.41 0 0 1-1.44-5.02c0-5.2 4.24-9.43 9.45-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.44 9.43m8.04-17.47A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.96 1.52 5.68L.58 23.7l6.1-1.6a11.36 11.36 0 0 0 5.37 1.37h.01c6.26 0 11.36-5.1 11.36-11.37 0-3.03-1.18-5.89-3.33-8.04"/></svg>`,
  ig: `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/></svg>`,
  fb: `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.7h2.6l.4-3h-3V8.4c0-.87.24-1.46 1.5-1.46h1.6V4.25A21 21 0 0 0 14.27 4.1c-2.3 0-3.87 1.4-3.87 3.98v2.22H7.8v3h2.6V21h3.1Z"/></svg>`,
  pin: `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>`,
  clock: `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
  phone: `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>`,
  check: `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>`,
  hand: `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12M11 11.5V4a1.5 1.5 0 0 1 3 0v8M14 11.5V5.5a1.5 1.5 0 0 1 3 0v8.5a7 7 0 0 1-7 7h-.5a6 6 0 0 1-4.9-2.6L3.3 15.3a1.5 1.5 0 0 1 2.4-1.8L8 16"/></svg>`,
  drop: `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11Z"/><path d="M9.5 15a2.5 2.5 0 0 0 2.5 2.5"/></svg>`,
  leaf: `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15"/><path d="M5 19l7-7"/></svg>`,
  chat: `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/></svg>`,
};

const money = (n) => "C$" + n.toLocaleString("en-US");
const starsHtml = (n) => Array.from({ length: 5 }, (_, i) => (i < n ? STAR : STAR.replace('class="icon"', 'class="icon off"'))).join("");

// ---------------------------------------------------------------------------
// Partes compartidas
// ---------------------------------------------------------------------------
function head({ title, desc, path, base, image = "assets/img/galeria/unas-rosa-oro-cromo.jpg", extraLd = "" }) {
  const url = SITE_URL + path;
  const ld = {
    "@context": "https://schema.org",
    "@type": "NailSalon",
    name: biz.name,
    image: SITE_URL + image,
    url: SITE_URL,
    telephone: biz.phoneIntl,
    priceRange: "C$150 – C$1,450",
    address: { "@type": "PostalAddress", streetAddress: biz.address, addressLocality: biz.city, postalCode: biz.postal, addressCountry: "NI" },
    geo: { "@type": "GeoCoordinates", latitude: biz.lat, longitude: biz.lng },
    hasMap: biz.maps,
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:00", closes: "19:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "10:00", closes: "14:00" },
    ],
    aggregateRating: { "@type": "AggregateRating", ratingValue: biz.rating, reviewCount: biz.reviews },
    sameAs: [biz.facebook, biz.instagram],
  };
  return `<!doctype html>
<html lang="es" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#FBF6F1">
<meta property="og:type" content="website">
<meta property="og:locale" content="es_NI">
<meta property="og:site_name" content="${biz.name}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE_URL + image}">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%23E5766A'/%3E%3Cpath d='M32 10c1.2 12 10 20.8 22 22-12 1.2-20.8 10-22 22-1.2-12-10-20.8-22-22 12-1.2 20.8-10 22-22Z' fill='%23fff'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400;1,9..144,500&family=Raleway:wght@400;500;600;700&family=Sacramento&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${base}css/styles.css">
<script type="application/ld+json">${JSON.stringify(ld)}</script>${extraLd}
</head>`;
}

function header(base, current) {
  const home = base || "./";
  const link = (href, label, key) => `<li><a href="${href}"${current === key ? ' aria-current="page"' : ""}>${label}</a></li>`;
  return `<a class="skip-link" href="#contenido">Saltar al contenido</a>
<header class="site-header">
  <div class="container header-inner">
    <a class="logo" href="${home}" aria-label="${biz.name}, inicio">
      ${I.spark("logo-spark")}
      <span class="logo-script">Mitu</span><span class="logo-word">Club</span>
    </a>
    <nav class="nav" aria-label="Principal">
      <ul class="nav-links" id="menu">
        ${link(home + "#servicios", "Servicios", "servicios")}
        ${link(home + "#galeria", "Galería", "galeria")}
        ${link(home + "#resenas", "Reseñas", "resenas")}
        ${link(home + "#ubicacion", "Ubicación", "ubicacion")}
      </ul>
      <a class="btn btn--primary btn--sm" href="${WA_GENERAL}" target="_blank" rel="noopener">${I.wa} Reservar</a>
      <button class="nav-toggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="menu"><span></span></button>
    </nav>
  </div>
</header>`;
}

function footer(base) {
  const svc = services.map((s) => `<li><a href="${base}servicios/${s.slug}.html">${s.name}</a></li>`).join("\n          ");
  return `<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <a class="logo" href="${base || "./"}" aria-label="${biz.name}, inicio">${I.spark("logo-spark")}<span class="logo-script">Mitu</span><span class="logo-word">Club</span></a>
        <p class="footer-about">Salón de uñas en Managua. Extensiones, recubrimientos, diseño a mano y pedicura spa, siempre con manicura rusa y semipermanente.</p>
        <div class="socials">
          <a href="${biz.instagram}" target="_blank" rel="noopener" aria-label="Instagram ${biz.igHandle}">${I.ig}</a>
          <a href="${biz.facebook}" target="_blank" rel="noopener" aria-label="Facebook de Mitu Club">${I.fb}</a>
          <a href="${WA_GENERAL}" target="_blank" rel="noopener" aria-label="WhatsApp de Mitu Club">${I.wa}</a>
        </div>
      </div>
      <div>
        <h4>Servicios</h4>
        <ul>
          ${svc}
        </ul>
      </div>
      <div>
        <h4>Horario</h4>
        <ul>
          <li>Martes a sábado<br>10:00 a.m. – 7:00 p.m.</li>
          <li>Domingo<br>10:00 a.m. – 2:00 p.m.</li>
          <li>Lunes cerrado</li>
        </ul>
      </div>
      <div>
        <h4>Contacto</h4>
        <ul>
          <li><a href="${WA_GENERAL}" target="_blank" rel="noopener">WhatsApp ${biz.phone}</a></li>
          <li><a href="tel:${biz.phoneIntl}">Llamar ${biz.phone}</a></li>
          <li><a href="${biz.maps}" target="_blank" rel="noopener">${biz.address}, ${biz.city}</a></li>
          <li><a href="${biz.instagram}" target="_blank" rel="noopener">${biz.igHandle}</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© <span data-year>2026</span> ${biz.name}. Managua, Nicaragua.</span>
      <span>Precios en córdobas, sujetos a cambio.</span>
    </div>
  </div>
</footer>
<a class="wa-float" href="${WA_GENERAL}" target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp">${I.wa}<span class="wa-float-label">¿Agendamos tu cita?</span></a>
<script src="${base}js/main.js" defer></script>
</body>
</html>
`;
}

const img = (base, key, { cls = "", eager = false, sizes = "(max-width: 700px) 100vw, 50vw" } = {}) => {
  const p = P[key];
  return `<img src="${base}assets/img/galeria/${p.f}" alt="${p.alt}" width="${p.w}" height="${p.h}"${cls ? ` class="${cls}"` : ""} ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" sizes="${sizes}">`;
};

function galleryHtml(base, keys) {
  const items = keys.map((k, i) => {
    const p = P[k];
    return `<button class="gallery-item" type="button" data-full="${base}assets/img/galeria/${p.f}" data-reveal style="--d:${(i % 4) * 0.08}s" aria-label="Ampliar foto: ${p.cap}">
          ${img(base, k, { sizes: "(max-width: 600px) 100vw, 25vw" })}
          <span class="gallery-cap">${p.cap}</span>
        </button>`;
  }).join("\n        ");
  return `<div class="gallery">
        ${items}
      </div>
      <div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Foto ampliada" aria-hidden="true">
        <button class="lightbox-btn lightbox-close" type="button" aria-label="Cerrar">${I.close}</button>
        <button class="lightbox-btn lightbox-prev" type="button" aria-label="Foto anterior">${I.arrow}</button>
        <img alt="">
        <button class="lightbox-btn lightbox-next" type="button" aria-label="Foto siguiente">${I.arrow}</button>
      </div>`;
}

// ---------------------------------------------------------------------------
// Home
// ---------------------------------------------------------------------------
function buildHome() {
  const base = "";
  const cards = services.map((s, i) => {
    const media = s.art
      ? `<div class="service-media service-media--art"><span class="script">${s.script}</span></div>`
      : `<div class="service-media">${img(base, s.photo, { sizes: "(max-width: 640px) 100vw, 33vw" })}</div>`;
    const price = s.from ? `<span class="service-price">Desde <strong>${money(s.from)}</strong></span>` : `<span class="service-price">Precio según diseño <strong>${s.fromText}</strong></span>`;
    const wide = i >= 3 ? " service-card--wide" : "";
    return `<article class="service-card${wide}" data-reveal style="--d:${(i % 3) * 0.08}s">
          <span class="service-num">0${i + 1}</span>
          ${media}
          <div class="service-body">
            <h3>${s.name}</h3>
            <p>${s.short}</p>
            <div class="service-foot">
              ${price}
              <a class="service-link stretched" href="servicios/${s.slug}.html">Ver precios ${I.arrow}<span class="sr-only"> de ${s.name}</span></a>
            </div>
          </div>
        </article>`;
  }).join("\n        ");

  const reviewCards = reviews.map((r) => `<article class="review-card">
            <div class="review-card-head">
              <span class="review-avatar" style="background:${r.c}">${r.a[0]}</span>
              <div class="review-card-id">
                <span class="review-card-author">${r.a}</span>
                <span class="review-card-date">${r.date}</span>
              </div>
              ${GOOGLE("icon icon-google-mark")}
            </div>
            <span class="stars" role="img" aria-label="${r.stars} de 5 estrellas">${starsHtml(r.stars)}</span>
            <p>${r.t}</p>
          </article>`).join("\n          ");

  const marqueeItems = ["Acrílico", "Polygel", "Gel-X", "Rubber base", "Builder", "Russian manicure", "Diseño a mano", "Pedi spa", "Baby feet", "Efecto cromo"];
  const marqueeGroup = (hidden) => `<div class="marquee-group"${hidden ? ' aria-hidden="true"' : ""}>${marqueeItems.map((m) => `<span class="marquee-item">${m}</span>${I.spark("marquee-dot icon")}`).join("")}</div>`;

  const hoursRows = hours.map((h) => `<tr data-day="${h.day}"><td>${h.label}</td><td>${h.time}</td></tr>`).join("");

  const html = `${head({
    title: "Mitu Club Salón de Uñas en Managua | Extensiones, diseño y pedicura",
    desc: "Salón de uñas en Managua con 4.7★ en Google. Extensiones, rubber base, diseño a mano y pedicura spa con manicura rusa incluida. Reserva por WhatsApp al 7885 9025.",
    path: "",
    base,
  })}
<body>
${header(base, "")}
<main id="contenido">

  <section class="hero">
    <div class="container hero-grid">
      <div>
        <span class="eyebrow" data-hero style="--d:.05s">Salón de uñas en Managua</span>
        <h1 class="hero-title" data-hero style="--d:.15s">Uñas hechas al detalle, para que salgas <span class="script">encantada</span></h1>
        <p class="hero-lead" data-hero style="--d:.3s">Extensiones, recubrimientos, diseños a mano y pedicura spa. Cada servicio de manos lleva manicura rusa en seco y esmaltado semipermanente, sin costo extra. Escríbenos y te apartamos tu espacio.</p>
        <div class="hero-actions" data-hero style="--d:.45s">
          <a class="btn btn--primary" href="${WA_GENERAL}" target="_blank" rel="noopener">${I.wa} Reserva por WhatsApp</a>
          <a class="btn btn--ghost" href="#servicios">Ver servicios y precios</a>
        </div>
        <div class="hero-trust" data-hero style="--d:.6s">
          <div class="trust-item">
            <div>
              <strong>${biz.rating} <span class="trust-stars" aria-hidden="true">${STAR}${STAR}${STAR}${STAR}${STAR}</span></strong>
              <span>${biz.reviews} reseñas en Google</span>
            </div>
          </div>
          <div class="trust-item">
            <div>
              <strong>Mar a dom</strong>
              <span>Desde las 10:00 a.m.</span>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-visual" aria-hidden="false">
        <div class="hero-photo hero-photo--main">${img(base, "unas-rosa-oro-cromo", { eager: true })}</div>
        <div class="hero-photo hero-photo--small" data-hero style="--d:.7s">${img(base, "unas-cromo-rosa-aurora", { sizes: "220px" })}</div>
        <div class="hero-badge" data-hero style="--d:.9s">
          ${GOOGLE("icon icon-google")}
          <div><strong>${biz.rating}</strong><small>${biz.reviews} reseñas</small></div>
        </div>
        ${I.spark("hero-spark hero-spark--a")}
        ${I.spark("hero-spark hero-spark--b")}
      </div>
    </div>
  </section>

  <div class="marquee" aria-label="Técnicas que trabajamos">
    <div class="marquee-track">${marqueeGroup(false)}${marqueeGroup(true)}</div>
  </div>

  <section class="section" aria-labelledby="perks-title">
    <div class="container">
      <div class="section-head" data-reveal>
        <span class="eyebrow">La experiencia Mitu</span>
        <h2 class="section-title" id="perks-title">Lo que vas a notar desde tu <span class="script">primera cita</span></h2>
      </div>
      <div class="perks">
        <div class="perk" data-reveal style="--d:0s">
          <div class="perk-icon">${I.hand}</div>
          <h3>Manicura rusa incluida</h3>
          <p>Limpiamos la cutícula en seco, sin remojar. El acabado queda más limpio y prolijo, y viene en todos los servicios de manos.</p>
        </div>
        <div class="perk" data-reveal style="--d:.08s">
          <div class="perk-icon">${I.drop}</div>
          <h3>Solo semipermanente</h3>
          <p>No trabajamos con esmalte regular. Tu servicio incluye esmaltado semipermanente de hasta 3 tonos.</p>
        </div>
        <div class="perk" data-reveal style="--d:.16s">
          <div class="perk-icon">${I.leaf}</div>
          <h3>El material ideal para ti</h3>
          <p>La especialista te recomienda acrílico, polygel, builder o rubber base según tu rutina y el largo natural de tus uñas.</p>
        </div>
        <div class="perk" data-reveal style="--d:.24s">
          <div class="perk-icon">${I.chat}</div>
          <h3>Te respondemos rápido</h3>
          <p>Nos escribes por WhatsApp, te damos tu hora y listo. Y si vienes acompañada, hay área de espera con aire acondicionado.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--alt" id="servicios" aria-labelledby="servicios-title">
    <div class="container">
      <div class="section-head section-head--center" data-reveal>
        <span class="eyebrow">Servicios y precios</span>
        <h2 class="section-title" id="servicios-title">Elige lo que tus uñas <span class="script">necesitan</span></h2>
        <p class="section-sub" style="margin-inline:auto;">Toca cualquier servicio para ver la lista completa con precios. Si no sabes cuál elegir, escríbenos y te ayudamos.</p>
      </div>
      <div class="services-grid">
        ${cards}
      </div>
    </div>
  </section>

  <section class="section" id="galeria" aria-labelledby="galeria-title">
    <div class="container">
      <div class="section-head section-head--center" data-reveal>
        <span class="eyebrow">Galería</span>
        <h2 class="section-title" id="galeria-title">Trabajos reales, hechos <span class="script">aquí</span></h2>
        <p class="section-sub" style="margin-inline:auto;">Estas son uñas de nuestras clientas. ¿Te gustó alguna? Mándanos la foto y la hacemos a tu medida.</p>
      </div>
      ${galleryHtml(base, photos.map((p) => p.f.replace(".jpg", "")))}
      <div class="gallery-cta" data-reveal>
        <a class="btn btn--ghost" href="${biz.instagram}" target="_blank" rel="noopener">${I.ig} Más diseños en ${biz.igHandle}</a>
      </div>
    </div>
  </section>

  <section class="section section--alt" id="resenas" aria-labelledby="reviews-title">
    <div class="container">
      <div class="section-head section-head--center" data-reveal>
        <span class="eyebrow">Reseñas</span>
        <h2 class="section-title" id="reviews-title">Lo que dicen nuestras <span class="script">clientas</span></h2>
        <p class="section-sub" style="margin-inline:auto;">Tenemos ${biz.rating} estrellas en Google con ${biz.reviews} reseñas. Estas son algunas, tal cual las escribieron.</p>
      </div>
      <div class="reviews-layout">
        <div class="reviews-panel" data-reveal>
          <span class="reviews-panel-badge">Excelente</span>
          <span class="reviews-panel-score">${biz.rating}</span>
          <span class="stars reviews-panel-stars" aria-hidden="true">${STAR}${STAR}${STAR}${STAR}${STAR}</span>
          <p class="reviews-panel-count">Basado en <strong>${biz.reviews} reseñas</strong></p>
          <div class="reviews-panel-google">${GOOGLE()}<span>Google</span></div>
          <a class="btn btn--google btn--sm" href="${biz.maps}" target="_blank" rel="noopener">Ver todas en Google</a>
        </div>
        <div class="reviews-carousel">
          <div class="reviews-track" id="reviewsTrack" tabindex="0" aria-label="Reseñas de clientas: usa las flechas o desliza para ver más">
          ${reviewCards}
          </div>
          <div class="reviews-nav">
            <button class="reviews-nav-btn" id="reviewsPrev" type="button" aria-label="Reseña anterior">${I.arrow}</button>
            <button class="reviews-nav-btn" id="reviewsNext" type="button" aria-label="Reseña siguiente">${I.arrow}</button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="pasos-title">
    <div class="container">
      <div class="section-head" data-reveal>
        <span class="eyebrow">Cómo reservar</span>
        <h2 class="section-title" id="pasos-title">Tu cita en tres <span class="script">pasos</span></h2>
      </div>
      <div class="steps">
        <div class="step" data-reveal style="--d:0s">
          <h3>Escríbenos por WhatsApp</h3>
          <p>Mándanos un mensaje al ${biz.phone} con el día que te queda mejor.</p>
        </div>
        <div class="step" data-reveal style="--d:.1s">
          <h3>Cuéntanos tu idea</h3>
          <p>Dinos qué servicio quieres. Si tienes una foto de referencia, mejor: así te damos el precio exacto.</p>
        </div>
        <div class="step" data-reveal style="--d:.2s">
          <h3>Llega y disfruta</h3>
          <p>Ven a tu hora, relájate y sal con las uñas que querías. Aceptamos tarjeta y efectivo.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--alt" id="ubicacion" aria-labelledby="ubicacion-title">
    <div class="container">
      <div class="section-head" data-reveal>
        <span class="eyebrow">Ubicación</span>
        <h2 class="section-title" id="ubicacion-title">Te esperamos en <span class="script">Plaza el Sol</span></h2>
      </div>
      <div class="location">
        <div class="location-card" data-reveal>
          <ul class="info-list">
            <li><span class="info-ico">${I.pin}</span><div><strong>Dirección</strong><a href="${biz.maps}" target="_blank" rel="noopener">${biz.address}, ${biz.city}</a></div></li>
            <li><span class="info-ico">${I.phone}</span><div><strong>WhatsApp y teléfono</strong><a href="tel:${biz.phoneIntl}">${biz.phone}</a></div></li>
            <li><span class="info-ico">${I.clock}</span><div><strong>Horario</strong><table class="hours"><tbody>${hoursRows}</tbody></table></div></li>
          </ul>
          <div class="location-actions">
            <a class="btn btn--primary btn--sm" href="${biz.directions}" target="_blank" rel="noopener">${I.pin} Cómo llegar</a>
            <a class="btn btn--ghost btn--sm" href="${WA_GENERAL}" target="_blank" rel="noopener">${I.wa} Escribir</a>
          </div>
          <div class="socials" style="margin-top:1.5rem">
            <a href="${biz.instagram}" target="_blank" rel="noopener" aria-label="Instagram ${biz.igHandle}" style="color:var(--color-text);border-color:var(--color-line)">${I.ig}</a>
            <a href="${biz.facebook}" target="_blank" rel="noopener" aria-label="Facebook de Mitu Club" style="color:var(--color-text);border-color:var(--color-line)">${I.fb}</a>
          </div>
        </div>
        <div class="map-wrap" data-reveal style="--d:.1s">
          <iframe src="${biz.mapEmbed}" title="Mapa de Mitu Club Salón de Uñas en Managua" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      <div class="cta-band" data-reveal>
        <h2>¿Lista para estrenar <span class="script">uñas</span>?</h2>
        <p>Escríbenos ahora y te apartamos tu espacio. Te respondemos rápido.</p>
        <a class="btn btn--light" href="${WA_GENERAL}" target="_blank" rel="noopener">${I.wa} Reservar por WhatsApp</a>
      </div>
    </div>
  </section>

</main>
${footer(base)}`;
  write("index.html", html);
}

// ---------------------------------------------------------------------------
// Páginas de servicio
// ---------------------------------------------------------------------------
function priceListHtml(s) {
  if (s.table) {
    const rows = s.table.rows.map((r) => `<tr><td>${r.n}${r.d ? `<small>${r.d}</small>` : ""}</td><td data-label="${s.table.cols[0]}">${money(r.p[0])}</td><td data-label="${s.table.cols[1]}">${money(r.p[1])}</td></tr>`).join("\n              ");
    return `<div class="menu-group">
            <h2 class="menu-group-title">${s.script}</h2>
            <table class="price-table">
              <thead><tr><th scope="col">Servicio</th><th scope="col">${s.table.cols[0]}</th><th scope="col">${s.table.cols[1]}</th></tr></thead>
              <tbody>
              ${rows}
              </tbody>
            </table>
          </div>`;
  }
  return s.groups.map((g) => `<div class="menu-group">
            <h2 class="menu-group-title">${g.title}</h2>
            <ul class="price-list">
              ${g.items.map((it) => `<li class="price-row"><span class="price-name">${it.n}</span><span class="price-val">${it.plus ? "<small>+</small>" : ""}${money(it.p)}</span>${it.d ? `<span class="price-desc">${it.d}</span>` : ""}</li>`).join("\n              ")}
            </ul>
          </div>`).join("\n          ");
}

function buildService(s) {
  const base = "../";
  const waMsg = wa(`¡Hola Mitu Club! Quiero agendar una cita de ${s.name.toLowerCase()}.`);
  const heroMedia = s.art
    ? `<div class="page-hero-media page-hero-media--art" data-hero><span class="script">${s.script}</span></div>`
    : `<div class="page-hero-media" data-hero style="--d:.2s">${img(base, s.photo, { eager: true, sizes: "(max-width: 900px) 360px, 40vw" })}</div>`;
  const fromHtml = s.from ? `<div class="from-price"><span>Desde</span><strong>${money(s.from)}</strong></div>` : "";
  const notes = s.notes.map((n) => `<p>${n}</p>`).join("");

  let body;
  if (s.design) {
    body = `<section class="section" aria-labelledby="estilos-title">
    <div class="container">
      <div class="section-head" data-reveal>
        <span class="eyebrow">Estilos</span>
        <h2 class="section-title" id="estilos-title">Algunas ideas para tu <span class="script">próximo set</span></h2>
      </div>
      <div class="styles-grid">
        ${s.styles.map((st, i) => `<div class="style-chip" data-reveal style="--d:${(i % 3) * 0.08}s"><h3>${st.n}</h3><p>${st.d}</p></div>`).join("\n        ")}
      </div>
      <div class="menu-note" data-reveal>${notes}</div>
    </div>
  </section>

  <section class="section section--alt" id="galeria" aria-labelledby="galeria-title">
    <div class="container">
      <div class="section-head section-head--center" data-reveal>
        <span class="eyebrow">Galería</span>
        <h2 class="section-title" id="galeria-title">Diseños que hemos <span class="script">hecho</span></h2>
      </div>
      ${galleryHtml(base, s.gallery)}
      <div class="gallery-cta" data-reveal>
        <a class="btn btn--primary" href="${wa("¡Hola Mitu Club! Quiero cotizar un diseño de uñas. Te mando mi foto de referencia.")}" target="_blank" rel="noopener">${I.wa} Cotizar mi diseño</a>
      </div>
    </div>
  </section>`;
  } else {
    const asidePhotos = (s.gallery || []).slice(1, 2).map((k) => `<div class="aside-photo">${img(base, k, { sizes: "400px" })}</div>`).join("");
    body = `<section class="section" aria-label="Lista de precios de ${s.name}">
    <div class="container menu-layout">
      <div class="menu-card" data-reveal>
          ${priceListHtml(s)}
        <div class="menu-note">${notes}</div>
      </div>
      <aside class="menu-aside" data-reveal style="--d:.1s">
        <div class="aside-card">
          <h3>Agenda tu cita</h3>
          <p>Escríbenos por WhatsApp, dinos qué te quieres hacer y te damos tu hora.</p>
          <ul class="aside-list">
            <li>${I.check}<span>Martes a sábado, 10:00 a.m. a 7:00 p.m.</span></li>
            <li>${I.check}<span>Domingo, 10:00 a.m. a 2:00 p.m.</span></li>
            <li>${I.check}<span>Aceptamos tarjeta y efectivo</span></li>
          </ul>
          <a class="btn btn--primary btn--block" href="${waMsg}" target="_blank" rel="noopener">${I.wa} Reservar ${s.name.toLowerCase()}</a>
        </div>
        ${asidePhotos}
      </aside>
    </div>
  </section>`;
    if (s.gallery) {
      body += `

  <section class="section section--alt section--tight" id="galeria" aria-labelledby="galeria-title">
    <div class="container">
      <div class="section-head" data-reveal>
        <span class="eyebrow">Inspiración</span>
        <h2 class="section-title" id="galeria-title">Trabajos <span class="script">reales</span></h2>
      </div>
      ${galleryHtml(base, s.gallery)}
    </div>
  </section>`;
    }
  }

  const others = services.filter((o) => o.slug !== s.slug).map((o) => `<a href="${o.slug}.html">${o.name} ${I.arrow}</a>`).join("\n        ");
  const breadcrumbLd = `\n<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Servicios", item: SITE_URL + "#servicios" },
      { "@type": "ListItem", position: 3, name: s.name, item: `${SITE_URL}servicios/${s.slug}.html` },
    ],
  })}</script>`;

  const html = `${head({ title: `${s.title} | Mitu Club`, desc: s.desc, path: `servicios/${s.slug}.html`, base, image: s.photo ? `assets/img/galeria/${P[s.photo].f}` : undefined, extraLd: breadcrumbLd })}
<body>
${header(base, "servicios")}
<main id="contenido">
  <section class="page-hero hero">
    <div class="container page-hero-grid">
      <div>
        <ol class="breadcrumb" data-hero>
          <li><a href="../">Inicio</a></li>
          <li><a href="../#servicios">Servicios</a></li>
          <li aria-current="page">${s.name}</li>
        </ol>
        <h1 class="page-title" data-hero style="--d:.1s"><span class="script">${s.script}</span></h1>
        <p class="page-lead" data-hero style="--d:.2s">${s.lead}</p>
        <div data-hero style="--d:.3s">${fromHtml}</div>
        <div class="hero-actions" data-hero style="--d:.4s">
          <a class="btn btn--primary" href="${s.design ? wa("¡Hola Mitu Club! Quiero cotizar un diseño de uñas. Te mando mi foto de referencia.") : waMsg}" target="_blank" rel="noopener">${I.wa} ${s.design ? "Cotizar por WhatsApp" : "Reservar por WhatsApp"}</a>
          <a class="btn btn--ghost" href="../#servicios">Ver otros servicios</a>
        </div>
      </div>
      ${heroMedia}
    </div>
  </section>

  ${body}

  <section class="section section--tight" aria-labelledby="otros-title">
    <div class="container">
      <div class="section-head" data-reveal>
        <span class="eyebrow">Sigue explorando</span>
        <h2 class="section-title" id="otros-title" style="font-size:clamp(1.7rem,3.4vw,2.4rem)">Otros servicios</h2>
      </div>
      <div class="other-services" data-reveal>
        ${others}
      </div>
    </div>
  </section>

  <section class="section section--tight">
    <div class="container">
      <div class="cta-band" data-reveal>
        <h2>¿Te animas a <span class="script">estrenar</span>?</h2>
        <p>Mándanos un mensaje y te apartamos tu espacio.</p>
        <a class="btn btn--light" href="${waMsg}" target="_blank" rel="noopener">${I.wa} Escribir a Mitu Club</a>
      </div>
    </div>
  </section>
</main>
${footer(base)}`;
  write(`servicios/${s.slug}.html`, html);
}

function write(rel, content) {
  const full = join(ROOT, rel);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content, "utf8");
  console.log("✓", rel);
}

buildHome();
services.forEach(buildService);

write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE_URL}</loc></url>
${services.map((s) => `  <url><loc>${SITE_URL}servicios/${s.slug}.html</loc></url>`).join("\n")}
</urlset>
`);
write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}sitemap.xml\n`);
