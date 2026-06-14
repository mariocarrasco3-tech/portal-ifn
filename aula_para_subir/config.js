// ============================================================
// CONFIGURACIÓN COMPARTIDA — AULA VIRTUAL IFN
// ============================================================

// --- Firebase (mismo proyecto del portal) ---
const firebaseConfig = {
  apiKey: "AIzaSyADH13E-UEtnRMEx_qf2CXYxsKQR0JHklw",
  authDomain: "portal-ifn.firebaseapp.com",
  projectId: "portal-ifn",
  storageBucket: "portal-ifn.firebasestorage.app",
  messagingSenderId: "82140985396",
  appId: "1:82140985396:web:4204b5f22930c591507261"
};

// --- Código del usuario demo (no se mezcla con notas reales) ---
const CODIGO_DEMO = "DEMO-2026";
const ESTUDIANTE_DEMO = { nombre: "Estudiante Demo", grado: "Demo" };

// --- Especialidades del aula ---
const MATERIAS = [
  { id:'comercio',   n:'Comercio',         d:'Contabilidad, emprendimiento y gestión empresarial aplicada.', icon:'ti-briefcase', prog:62, lvl:4 },
  { id:'tecnologia', n:'Tecnología (TIC)', d:'Hardware, software, redes y tecnologías de la información.',    icon:'ti-cpu',       prog:80, lvl:5 },
  { id:'multimedia', n:'Multimedia',       d:'Diseño gráfico, edición de imagen, video y producción digital.', icon:'ti-palette',   prog:45, lvl:3 },
  { id:'robotica',   n:'Robótica',         d:'Circuitos, sensores, programación y construcción de prototipos.', icon:'ti-robot',     prog:38, lvl:3 }
];

// --- Fórmula MEDUCA: convierte puntaje (correctas/total) a nota 1.0–5.0 ---
// Base mínima 1.0 + proporción de aciertos * 4.0, redondeado a 1 decimal.
// Ej: 50/50 = 5.0 | 40/50 = 4.2 | 30/50 = 3.4 | 25/50 = 3.0 | 0/50 = 1.0
function notaMeduca(correctas, total){
  if(!total) return 1.0;
  const nota = 1.0 + (correctas/total) * 4.0;
  return Math.round(nota*10)/10;
}

// --- Las 50 preguntas: Hardware vs Software ---
// tipo: "HW" = Hardware (físico) | "SW" = Software (programa)
const PREGUNTAS_HWSW = [
  {t:"Monitor", r:"HW"},        {t:"Microsoft Word", r:"SW"},
  {t:"Teclado", r:"HW"},        {t:"Sistema Operativo Windows", r:"SW"},
  {t:"Mouse / Ratón", r:"HW"},  {t:"Navegador Google Chrome", r:"SW"},
  {t:"Memoria RAM", r:"HW"},    {t:"Antivirus", r:"SW"},
  {t:"Disco Duro (HDD)", r:"HW"}, {t:"WhatsApp", r:"SW"},
  {t:"Procesador (CPU)", r:"HW"}, {t:"Photoshop", r:"SW"},
  {t:"Impresora", r:"HW"},      {t:"Excel", r:"SW"},
  {t:"Tarjeta Madre", r:"HW"},  {t:"PowerPoint", r:"SW"},
  {t:"Bocinas / Parlantes", r:"HW"}, {t:"YouTube (app)", r:"SW"},
  {t:"Webcam / Cámara", r:"HW"}, {t:"Spotify", r:"SW"},
  {t:"Tarjeta de Video (GPU)", r:"HW"}, {t:"Zoom", r:"SW"},
  {t:"Memoria USB", r:"HW"},    {t:"Linux (sistema operativo)", r:"SW"},
  {t:"Fuente de Poder", r:"HW"}, {t:"Microsoft Teams", r:"SW"},
  {t:"Escáner", r:"HW"},        {t:"Calculadora (app)", r:"SW"},
  {t:"Micrófono", r:"HW"},      {t:"Paint", r:"SW"},
  {t:"Audífonos", r:"HW"},      {t:"VLC Media Player", r:"SW"},
  {t:"Disco SSD", r:"HW"},      {t:"Android", r:"SW"},
  {t:"Ventilador / Cooler", r:"HW"}, {t:"WinRAR", r:"SW"},
  {t:"Pantalla Táctil", r:"HW"}, {t:"Gmail (app)", r:"SW"},
  {t:"Router / Módem", r:"HW"}, {t:"Instagram", r:"SW"},
  {t:"Joystick / Control", r:"HW"}, {t:"AutoCAD", r:"SW"},
  {t:"Proyector", r:"HW"},      {t:"Firefox", r:"SW"},
  {t:"Lápiz Óptico", r:"HW"},   {t:"Canva", r:"SW"},
  {t:"Tableta Gráfica", r:"HW"}, {t:"iOS (iPhone)", r:"SW"},
  {t:"Lector de Huella", r:"HW"}, {t:"Microsoft Edge", r:"SW"}
];
