// ============================================================
// CONFIGURACIÓN COMPARTIDA — AULA VIRTUAL IFN
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyADH13E-UEtnRMEx_qf2CXYxsKQR0JHklw",
  authDomain: "portal-ifn.firebaseapp.com",
  projectId: "portal-ifn",
  storageBucket: "portal-ifn.firebasestorage.app",
  messagingSenderId: "82140985396",
  appId: "1:82140985396:web:4204b5f22930c591507261"
};

const CODIGO_DEMO = "DEMO-2026";
const ESTUDIANTE_DEMO = { nombre: "Estudiante Demo", grado: "10°C" };

// --- Mapa materia → grados ---
const MATERIA_GRUPOS = {
  'comercio':   ['8°F'],
  'tecnologia': ['10°C','10°D'],
  'multimedia': ['11°A','11°B'],
  'robotica':   ['12°A','12°B']
};

// --- Especialidades mostradas en index.html ---
const MATERIAS = [
  { id:'comercio',   n:'Comercio',   d:'Historia, sectores económicos, moneda y sistema bancario.',              icon:'ti-briefcase', prog:62, lvl:'8°' },
  { id:'tecnologia', n:'TIC',        d:'Hardware, software, redes y sistemas operativos.',                       icon:'ti-cpu',       prog:80, lvl:'10°' },
  { id:'multimedia', n:'Multimedia', d:'Diseño gráfico, edición multimedia, HTML, CSS y JavaScript.',            icon:'ti-palette',   prog:45, lvl:'11°' },
  { id:'robotica',   n:'Robótica',   d:'Arduino, Tinkercad, electricidad, programación y prototipos tecnológicos.', icon:'ti-robot',  prog:38, lvl:'12°' }
];

// --- Fórmula MEDUCA ---
function notaMeduca(correctas, total){
  if(!total) return 1.0;
  return Math.round((1.0 + (correctas/total)*4.0)*10)/10;
}

// --- Catálogo de actividades ---
// FORMA MÍNIMA: solo necesitas id, nombre, grupos, url y trimestre.
// La MATERIA se detecta automáticamente por la carpeta donde está el archivo:
//   comercio/archivo.html   → materia 'comercio'
//   tecnologia/archivo.html → materia 'tecnologia'
//   multimedia/archivo.html → materia 'multimedia'
//   robotica/archivo.html   → materia 'robotica'
// trimestre: 1, 2 o 3 — trimestre por defecto al crearla (se puede mover después desde el panel).
// Si necesitas más detalle (sub, icon propio, tipo), puedes agregarlos opcionalmente.
const CATALOGO_ACTIVIDADES_RAW = [
  {
    id: 'hardware-vs-software',
    nombre: 'Hardware vs Software',
    grupos: ['10°C','10°D'],
    url: 'tec-hardware-software.html',
    sub: '1ª Apreciación · 50 preguntas',
    trimestre: 2
  },
  {
    id: 'tec-dispositivos-eso',
    nombre: 'Dispositivos E/S/M',
    grupos: ['10°C','10°D'],
    url: 'tecnologia/tec-dispositivos-eso.html',
    sub: 'Taller #2 · 45 dispositivos',
    trimestre: 2
  }
];

// --- Rúbrica estándar de 20 pts para los laboratorios (editable por laboratorio si hace falta) ---
const RUBRICA_LAB_DEFAULT = [
  { criterio:'Estructura HTML', pts:5 },
  { criterio:'Uso correcto de etiquetas', pts:5 },
  { criterio:'Organización del código', pts:5 },
  { criterio:'Cumplimiento de la actividad', pts:5 }
];

// --- Laboratorio Virtual de Programación (Multimedia · 11°A / 11°B) ---
// Los 15 laboratorios viven en UN SOLO archivo: multimedia/laboratorio-virtual.html?lab=N
// Solo el Laboratorio 1 está construido y disponible; el resto se completará progresivamente
// (ya están en el catálogo para que aparezcan en Notas del Aula y en el panel desde ahora).
const TEMAS_LAB = [
  'Estructura HTML, encabezados, párrafos y formato básico',
  'Listas y organización del contenido',
  'Enlaces y navegación',
  'Imágenes y rutas',
  'Tablas',
  'Formularios I',
  'Formularios II',
  'Multimedia (audio, video, mapas)',
  'HTML semántico',
  'Estructura de un sitio web con varias páginas',
  'Buenas prácticas y validación HTML',
  'Proyecto guiado I',
  'Proyecto guiado II',
  'Optimización y revisión final',
  'Presentación y evaluación del proyecto final'
];
// NUEVA ARQUITECTURA: cada laboratorio es un archivo HTML independiente y
// autocontenido en multimedia/lab-XX-tema.html (no un solo archivo con ?lab=N).
// Se van agregando aquí uno por uno, en el mismo orden en que se construyen.
// Mientras un laboratorio no tenga entrada propia abajo, usa la url genérica
// (aún no construida) solo como marcador de posición en Notas del Aula.
const URLS_LABS_CONSTRUIDOS = {
  1: 'multimedia/lab-01-estructura-html.html'
};
const CATALOGO_LABS = TEMAS_LAB.map((tema,i)=>{
  const n = i+1;
  const construido = !!URLS_LABS_CONSTRUIDOS[n];
  return {
    id: 'lab-'+String(n).padStart(2,'0'),
    nombre: 'Laboratorio '+n+' — '+tema,
    materia: 'multimedia',
    grupos: ['11°A','11°B'],
    url: construido ? URLS_LABS_CONSTRUIDOS[n] : '#',
    sub: construido ? 'Laboratorio Virtual · 20 pts' : 'Próximamente',
    trimestre: n<=5 ? 1 : (n<=10 ? 2 : 3),
    tipo: 'laboratorio',
    construido,
    rubrica: RUBRICA_LAB_DEFAULT
  };
});
CATALOGO_ACTIVIDADES_RAW.push(...CATALOGO_LABS);

// Detecta la materia a partir de la ruta del archivo (carpeta) o de un prefijo conocido (tec-/com-/mul-/rob-)
function detectarMateria(url){
  const carpeta = url.split('/')[0];
  if(MATERIA_GRUPOS[carpeta]) return carpeta;
  if(url.startsWith('tec-')) return 'tecnologia';
  if(url.startsWith('com-')) return 'comercio';
  if(url.startsWith('mul-')) return 'multimedia';
  if(url.startsWith('rob-')) return 'robotica';
  return 'tecnologia'; // valor por defecto si no se puede deducir
}

// Completa cada actividad con materia/icon/sub deducidos automáticamente
const CATALOGO_ACTIVIDADES = CATALOGO_ACTIVIDADES_RAW.map(a=>{
  const materia = a.materia || detectarMateria(a.url);
  const matInfo = MATERIAS.find(m=>m.id===materia) || {};
  return {
    ...a,
    materia,
    icon: a.icon || matInfo.icon || 'ti-book',
    sub: a.sub || 'Actividad de '+(matInfo.n||materia),
    tipo: a.tipo || 'quiz',
    trimestre: a.trimestre || 1
  };
});

// Columnas sugeridas para el libro de notas
const COLUMNAS_SUGERIDAS = [
  'Act#1','Act#2','Act#3','Act#4',
  'Lab#1','Lab#2','Lab#3',
  'Taller','Proyecto','Quiz#1','Quiz#2',
  'Parcial#1','Parcial#2'
];

// --- Preguntas: Hardware vs Software ---
const PREGUNTAS_HWSW = [
  {t:"Monitor",r:"HW"},{t:"Microsoft Word",r:"SW"},
  {t:"Teclado",r:"HW"},{t:"Sistema Operativo Windows",r:"SW"},
  {t:"Mouse / Ratón",r:"HW"},{t:"Navegador Google Chrome",r:"SW"},
  {t:"Memoria RAM",r:"HW"},{t:"Antivirus",r:"SW"},
  {t:"Disco Duro (HDD)",r:"HW"},{t:"WhatsApp",r:"SW"},
  {t:"Procesador (CPU)",r:"HW"},{t:"Photoshop",r:"SW"},
  {t:"Impresora",r:"HW"},{t:"Excel",r:"SW"},
  {t:"Tarjeta Madre",r:"HW"},{t:"PowerPoint",r:"SW"},
  {t:"Bocinas / Parlantes",r:"HW"},{t:"YouTube (app)",r:"SW"},
  {t:"Webcam / Cámara",r:"HW"},{t:"Spotify",r:"SW"},
  {t:"Tarjeta de Video (GPU)",r:"HW"},{t:"Zoom",r:"SW"},
  {t:"Memoria USB",r:"HW"},{t:"Linux (sistema operativo)",r:"SW"},
  {t:"Fuente de Poder",r:"HW"},{t:"Microsoft Teams",r:"SW"},
  {t:"Escáner",r:"HW"},{t:"Calculadora (app)",r:"SW"},
  {t:"Micrófono",r:"HW"},{t:"Paint",r:"SW"},
  {t:"Audífonos",r:"HW"},{t:"VLC Media Player",r:"SW"},
  {t:"Disco SSD",r:"HW"},{t:"Android",r:"SW"},
  {t:"Ventilador / Cooler",r:"HW"},{t:"WinRAR",r:"SW"},
  {t:"Pantalla Táctil",r:"HW"},{t:"Gmail (app)",r:"SW"},
  {t:"Router / Módem",r:"HW"},{t:"Instagram",r:"SW"},
  {t:"Joystick / Control",r:"HW"},{t:"AutoCAD",r:"SW"},
  {t:"Proyector",r:"HW"},{t:"Firefox",r:"SW"},
  {t:"Lápiz Óptico",r:"HW"},{t:"Canva",r:"SW"},
  {t:"Tableta Gráfica",r:"HW"},{t:"iOS (iPhone)",r:"SW"},
  {t:"Lector de Huella",r:"HW"},{t:"Microsoft Edge",r:"SW"}
];
