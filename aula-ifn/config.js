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
  { id:'comercio',   n:'Comercio',   d:'Contabilidad, emprendimiento y gestión empresarial aplicada.', icon:'ti-briefcase', prog:62, lvl:'8°' },
  { id:'tecnologia', n:'TIC',        d:'Hardware, software, redes y tecnologías de la información.',    icon:'ti-cpu',       prog:80, lvl:'10°' },
  { id:'multimedia', n:'Multimedia', d:'Diseño gráfico, edición de imagen, video y producción digital.',icon:'ti-palette',   prog:45, lvl:'11°' },
  { id:'robotica',   n:'Robótica',   d:'Circuitos, sensores, programación y construcción de prototipos.',icon:'ti-robot',    prog:38, lvl:'12°' }
];

// --- Fórmula MEDUCA ---
function notaMeduca(correctas, total){
  if(!total) return 1.0;
  return Math.round((1.0 + (correctas/total)*4.0)*10)/10;
}

// --- Catálogo de actividades ---
// id único: '{materia}-{slug}'  → clave en Firestore actividades/{id}
// grupos: array de grados donde aplica (vacío = todos los de esa materia)
const CATALOGO_ACTIVIDADES = [
  {
    id: 'hardware-vs-software',
    nombre: 'Hardware vs Software',
    materia: 'tecnologia',
    grupos: ['10°C','10°D'],
    sub: '1ª Apreciación · T2 · 50 preguntas',
    url: 'tec-hardware-software.html',
    icon: 'ti-cpu',
    tipo: 'quiz'  // quiz | taller | lab | proyecto
  }
];

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
