
import { ActivityCatalogItem, Teacher, Project } from './types';

// Credencial maestra para el administrador
export const ADMIN_PASSWORD = 'admin2024';

export const INITIAL_PROJECTS: Project[] = [
  { id: 'P-001', name: 'Fortalecimiento de Competencias CTeI', code: 'INV-2024-01' },
  { id: 'P-002', name: 'Innovación Pedagógica en Aula', code: 'EDU-2024-05' },
  { id: 'P-003', name: 'Desarrollo Sostenible Regional', code: 'EXT-2024-10' },
];

export const INITIAL_TEACHERS: Teacher[] = [
  { id: 'T-001', name: 'Ana María Pérez', email: 'ana.perez@uni.edu.co', idNumber: '12345', contractType: 'Tiempo Completo' },
  { id: 'T-002', name: 'Carlos Rodríguez', email: 'carlos.r@uni.edu.co', idNumber: '54321', contractType: 'Medio Tiempo' },
  { id: 'T-003', name: 'Luisa Fernanda Gómez', email: 'luisa.g@uni.edu.co', idNumber: '67890', contractType: 'Catedrático' },
  { id: 'T-004', name: 'Jorge Torres', email: 'jorge.t@uni.edu.co', idNumber: '11111', contractType: 'Tiempo Completo' },
];

export const INITIAL_ACTIVITIES: ActivityCatalogItem[] = [
  // --- INVESTIGACIÓN ---
  { id: 'A-001', name: 'Orientación de SIEF – PAT Colectivo', description: 'Direccionamiento estratégico de semilleros.', maxHours: 40, area: 'Investigación' },
  { id: 'A-002', name: 'Generación de producto como valor agregado de PAT Colectivo', description: 'Producción académica derivada.', maxHours: 80, area: 'Investigación' },
  { id: 'A-003', name: 'Organización y desarrollo de Club de Revista', description: 'Espacios de formación para la investigación.', maxHours: 20, area: 'Investigación' },
  { id: 'A-004', name: 'Capacitación a estudiantes semilleristas', description: 'Docente dicta capacitación o conferencias.', maxHours: 30, area: 'Investigación' },
  { id: 'A-005', name: 'Organización y seguimiento plan de trabajo estudiantes', description: 'Vinculados al proyecto CTeI.', maxHours: 40, area: 'Investigación' },
  { id: 'A-006', name: 'Generación de publicación /divulgación semilleristas', description: 'Artículos o ponencias de estudiantes.', maxHours: 60, area: 'Investigación' },
  { id: 'A-007', name: 'Trabajo de Grado pregrado (Jurado Calificador)', description: 'Evaluación de proyecto e informe final.', maxHours: 10, area: 'Investigación' },
  { id: 'A-008', name: 'Trabajo de Grado pregrado (Director y/o Asesor)', description: 'Dirección de tesis de pregrado.', maxHours: 48, area: 'Investigación' },
  { id: 'A-009', name: 'Formulación y presentación de Proyecto CTeI', description: 'Aprobación de ejecución institucional.', maxHours: 100, area: 'Investigación' },
  { id: 'A-010', name: 'Ejecución como Investigador Principal', description: 'Proyecto con recurso propio or externo.', maxHours: 120, area: 'Investigación' },

  // --- PROYECCIÓN SOCIAL ---
  { id: 'PS-001', name: 'Coordinacion y seguimiento de la gestion de extension y proyeccion social', description: 'Labores propias del cargo', maxHours: 120, area: 'Proyección Social' },
  { id: 'PS-002', name: 'Organización, contruccion documento Registro Calificado', description: 'Históricos de gestión de Proyección Social y Extensión.', maxHours: 90, area: 'Proyección Social' },
  { id: 'PS-003', name: 'Diapositivas- guiones-simulacros Registro calificados', description: 'Elaboracion , Diapositivas institucionales, simulacros.', maxHours: 30, area: 'Proyección Social' },
  { id: 'PS-004', name: 'Generacion de productos de valor agregado de PAT Colectivo', description: 'Productos de apropiacion social.', maxHours: 32, area: 'Proyección Social' },
  { id: 'PS-005', name: 'Proyectos Macroproyectos e Intervencion Social y Ambientales', description: 'Cronogramas, intervenciones e informes.', maxHours: 52, area: 'Proyección Social' },
  { id: 'PS-006', name: 'Participacion en Jornadas de atencion integral', description: 'Implica gestion, participacion entrega de informe de resultados.', maxHours: 12, area: 'Proyección Social' },
  { id: 'PS-007', name: 'Participacion en Divulgacion de R.S.U - Docente', description: 'Rastreo, organización de documento y divulgación.', maxHours: 24, area: 'Proyección Social' },
  { id: 'PS-008', name: 'Diagnostico y desarrollo de la ruta social', description: 'Planeacion ejecucion, analisis, e implementacion.', maxHours: 16, area: 'Proyección Social' },
  { id: 'PS-009', name: 'Escritura de contenidos de cartillas, boletines, revistas', description: 'Diseño y elaboracion de documentos derivados.', maxHours: 48, area: 'Proyección Social' },
  { id: 'PS-010', name: 'Gestion de alianzas, convenios, mesas de trabajo', description: 'Rastreo y participacion en mesas de trabajo con sectores productivos.', maxHours: 48, area: 'Proyección Social' },
  { id: 'PS-011', name: 'Programas de extension y educacion continuas vendidos', description: 'Diseño, presentacion y gestión de ventas al CEPEC.', maxHours: 48, area: 'Proyección Social' },
  { id: 'PS-012', name: 'Organizacion de congresos-simposios autosostenibles', description: 'Apoyo en la organización de eventos institucionales.', maxHours: 16, area: 'Proyección Social' },
  { id: 'PS-013', name: 'Colaborar con entidades públicas y privadas en mesas', description: 'Identificar oportunidades de asesorias y consultorias.', maxHours: 32, area: 'Proyección Social' },
  { id: 'PS-014', name: 'Rastreo, formulacion y presentacion de proyectos en convocatorias', description: 'Nivel Distrital y/o Departamental de corte social ambiental.', maxHours: 80, area: 'Proyección Social' },
  { id: 'PS-015', name: 'Gestion de la Supervision de la Practica', description: 'Supervisor de Practicas. Seguimiento y anexos RDS.', maxHours: 385, area: 'Proyección Social' },

  // --- DESARROLLO ACADÉMICO ---
  { id: 'DA-001', name: 'Lider PIT por programa', description: 'Acompañamiento, seguimiento y control a docentes y estudiantes.', maxHours: 48, area: 'Desarrollo Académico' },
  { id: 'DA-002', name: 'Jornadas Pedagógicas del programa', description: 'Asistencia a jornadas pedagógicas según convocatoria.', maxHours: 9, area: 'Desarrollo Académico' },
  { id: 'DA-003', name: 'Asistencias a procesos formativos (Formación Pedagógica)', description: 'Asistencia a actividades de formación en educación continua.', maxHours: 25, area: 'Desarrollo Académico' },
  { id: 'DA-004', name: 'Seguimiento al desarrollo académico por área', description: 'Entrega de PAT, contenido y reporte de calificaciones.', maxHours: 40, area: 'Desarrollo Académico' },
  { id: 'DA-005', name: 'Saber Pro', description: 'Diligenciamiento del plan de acción y sensibilización.', maxHours: 50, area: 'Desarrollo Académico' },
  { id: 'DA-006', name: 'Resultados de Aprendizaje', description: 'Seguimiento a la asistencia de estudiantes y plan de mejoramiento.', maxHours: 50, area: 'Desarrollo Académico' },
  { id: 'DA-007', name: 'Talleres Saber Pro - Genéricas (Iniciales)', description: 'Coordinación y desarrollo de talleres institucionales.', maxHours: 5, area: 'Desarrollo Académico' },
  { id: 'DA-008', name: 'Talleres Saber Pro - Genéricas (Avanzado)', description: 'Desarrollo de talleres para el fortalecimiento de competencias.', maxHours: 5, area: 'Desarrollo Académico' },
  { id: 'DA-009', name: 'Talleres preparación Saber Pro (Específicas)', description: 'Desarrollo de talleres en competencias específicas.', maxHours: 8, area: 'Desarrollo Académico' },
  { id: 'DA-010', name: 'Construcción de programas ETDH, Pregrado o Postgrado', description: 'Responder a objetivos de procesos del PDI.', maxHours: 64, area: 'Desarrollo Académico' },
  { id: 'DA-011', name: 'Revisión y ajuste de los planes de estudio', description: 'Ajuste de matriz de correspondencia competencias-RA.', maxHours: 64, area: 'Desarrollo Académico' },
  { id: 'DA-012', name: 'Construcción de condiciones de calidad 3, 4 y 7', description: 'Alineación con lineamientos del MEN y evidencias.', maxHours: 180, area: 'Desarrollo Académico' },

  // --- EGRESADOS (Sin descripción ni máximo de horas) ---
  { id: 'EG-001', name: 'Realizar un informe cuali-cuantitativo de tasa de gradualidad.', description: null, maxHours: 0, area: 'Egresados' },
  { id: 'EG-002', name: 'De regreso al Aula por programa.', description: null, maxHours: 0, area: 'Egresados' },
  { id: 'EG-003', name: 'Asistencia a comités de egresados.', description: null, maxHours: 0, area: 'Egresados' },
  { id: 'EG-004', name: 'Actualización de datos y aplicación de encuestas.', description: null, maxHours: 0, area: 'Egresados' },
  { id: 'EG-005', name: 'Instrumento del estudio de impacto institucional.', description: null, maxHours: 0, area: 'Egresados' },
  { id: 'EG-006', name: 'Habilidades para la vida laboral.', description: null, maxHours: 0, area: 'Egresados' },
  { id: 'EG-007', name: 'Jornadas de actualización (Seminarios/Simposios).', description: null, maxHours: 0, area: 'Egresados' },
  { id: 'EG-008', name: 'Emprendimiento y Empleabilidad.', description: null, maxHours: 0, area: 'Egresados' },
  { id: 'EG-009', name: 'Socialización del Plan de Mejoramiento.', description: null, maxHours: 0, area: 'Egresados' },
  { id: 'EG-010', name: 'Mentoría con Egresados Destacados.', description: null, maxHours: 0, area: 'Egresados' },
  { id: 'EG-011', name: 'Carpeta de seguimiento de egresados (Drive).', description: null, maxHours: 0, area: 'Egresados' },

  // --- VISIBILIDAD NACIONAL E INTERNACIONAL ---
  { id: 'VNI-001', name: 'Asistencia a comité centrales planeación RNEI', description: 'Actividad solo del docente líder.', maxHours: 8, area: 'Visibilidad Nacional e Internacional' },
  { id: 'VNI-002', name: 'Gestión convenios interinstitucionales', description: 'Operacionalizar convenios con otras IES o empresas.', maxHours: 32, area: 'Visibilidad Nacional e Internacional' },
  { id: 'VNI-003', name: 'Operacionalizar Redes y Asociaciones', description: 'Gestión y operacionalización de redes académicas.', maxHours: 24, area: 'Visibilidad Nacional e Internacional' },
  { id: 'VNI-004', name: 'Actividades Simposio Industria 5.0', description: 'Actividades académicas y científicas con lengua extranjera.', maxHours: 44, area: 'Visibilidad Nacional e Internacional' },
  { id: 'VNI-005', name: 'Internacionalización del currículo', description: 'Utilización de elementos de internacionalización en aula.', maxHours: 100, area: 'Visibilidad Nacional e Internacional' },
  { id: 'VNI-006', name: 'Acompañamiento a estudiantes convocatorias', description: 'POA, estancias, intercambios y rutas académicas.', maxHours: 124, area: 'Visibilidad Nacional e Internacional' },
  { id: 'VNI-007', name: 'Asistencia capacitaciones y reuniones', description: 'Summit, BPI, feria y semana internacional.', maxHours: 46, area: 'Visibilidad Nacional e Internacional' },
  { id: 'VNI-008', name: 'Rastreo proyectos de cooperación', description: 'Rastreo de proyectos nacionales e internacionales.', maxHours: 8, area: 'Visibilidad Nacional e Internacional' },
  { id: 'VNI-009', name: 'Formulación proyectos de cooperación', description: 'Formulación de proyectos de carácter internacional.', maxHours: 72, area: 'Visibilidad Nacional e Internacional' },
  { id: 'VNI-010', name: 'Gestión movilidades entrantes', description: 'Cartas de invitación y reporte a RNI.', maxHours: 60, area: 'Visibilidad Nacional e Internacional' },
  { id: 'VNI-011', name: 'Gestión movilidades salientes', description: 'Documentación y aplicación de convocatorias.', maxHours: 60, area: 'Visibilidad Nacional e Internacional' },
  { id: 'VNI-012', 'name': 'Documento y anexos registro calificado', 'description': 'Apoyo a renovación de registro o acreditación.', 'maxHours': 96, 'area': 'Visibilidad Nacional e Internacional' },
  { id: 'VNI-013', 'name': 'Preparación para visitas de pares MEN', 'description': 'Preparación para visitas de pares institucionales.', 'maxHours': 32, 'area': 'Visibilidad Nacional e Internacional' },
  { id: 'VNI-014', 'name': 'Organización Informe gestión semestral', 'description': 'Consolidado semestral de internacionalización.', 'maxHours': 50, 'area': 'Visibilidad Nacional e Internacional' },
];
