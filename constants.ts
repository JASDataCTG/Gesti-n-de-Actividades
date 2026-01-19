
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
  { id: 'DA-013', name: 'Ejecución de acciones de mejoramiento (Autoevaluación)', description: 'Informes semestrales derivados del proceso.', maxHours: 48, area: 'Desarrollo Académico' },
  { id: 'DA-014', name: 'Proceso de evaluación docente y núcleos problémicos', description: 'Informes consolidados y compromisos de mejoramiento.', maxHours: 32, area: 'Desarrollo Académico' },
  { id: 'DA-015', name: 'Procesos de evaluación de programa', description: 'Autoevaluación Docente y Proceso de Evaluación de Núcleo.', maxHours: 3, area: 'Desarrollo Académico' },
  { id: 'DA-016', name: 'Asistencia a Órganos Asesores (Docentes invitados)', description: 'Asistencia a reuniones de comités.', maxHours: 12, area: 'Desarrollo Académico' },
  { id: 'DA-017', name: 'Cátedra de la Paz', description: 'Preparación, desarrollo de temática y reporte.', maxHours: 6, area: 'Desarrollo Académico' },
  { id: 'DA-018', name: 'Gestión académico administrativo (Apoyo Dirección)', description: 'Entrevistas, reingresos y homologaciones.', maxHours: 15, area: 'Desarrollo Académico' },
  { id: 'DA-019', name: 'Articulos en revistas no científicas', description: 'Horas por cada artículo publicado.', maxHours: 48, area: 'Desarrollo Académico' },
  { id: 'DA-020', name: 'Edición "Portal de las Palabras"', description: 'Aplica exclusivamente para el editor de la revista.', maxHours: 96, area: 'Desarrollo Académico' },
  { id: 'DA-021', name: 'Gestión administrativa para seguimiento de plan', description: 'Sólo para Coordinadores de área.', maxHours: 15, area: 'Desarrollo Académico' },
  { id: 'DA-022', name: 'Asistencia a Órganos Asesores (Coordinadores)', description: 'Asistencia a comité de Organos Asesores.', maxHours: 36, area: 'Desarrollo Académico' },
  { id: 'DA-023', name: 'Diligencia del plan de trabajo y evidencias', description: 'Cargue de evidencias en drive.', maxHours: 6, area: 'Desarrollo Académico' },
  { id: 'DA-024', name: 'Virtualización de Informática', description: 'Apoyo en virtualización de asignaturas.', maxHours: 80, area: 'Desarrollo Académico' },
  { id: 'DA-025', name: 'Soporte técnico RA Institucional', description: 'Planeación y ejecución de evaluaciones RA.', maxHours: 70, area: 'Desarrollo Académico' },
  { id: 'DA-026', name: 'Coordinación De Laboratorios', description: 'Gestionar inventario de herramientas de laboratorios.', maxHours: 32, area: 'Desarrollo Académico' },
  { id: 'DA-027', name: 'Formación Recursos Humanos', description: 'Formación a administrativos acorde a RRHH.', maxHours: 4, area: 'Desarrollo Académico' },
  { id: 'DA-028', name: 'Módulo razonamiento lógico premédico', description: 'Razonamiento lógico y cuantitativo.', maxHours: 60, area: 'Desarrollo Académico' },

  // --- EGRESADOS (Sin descripción ni máximo de horas) ---
  { id: 'EG-001', name: 'Realizar un informe cuali-cuantitativo, analizando la tasa de gradualidad de los egresados del programa.', description: null, maxHours: 0, area: 'Egresados' },
  { id: 'EG-002', name: 'De regreso al Aula por programa dirigido a los futuros egresados y Egresado Nuñista Destacado', description: null, maxHours: 0, area: 'Egresados' },
  { id: 'EG-003', name: 'Asistir a las reuniones y realizar seguimiento a la participación del egresado electo en comités.', description: null, maxHours: 0, area: 'Egresados' },
  { id: 'EG-004', name: 'Apoyar en la actualización de datos y aplicación de encuestas a egresados.', description: null, maxHours: 0, area: 'Egresados' },
  { id: 'EG-005', name: 'Realizar junto a la Coordinación de egresados el instrumento del estudio de impacto institucional.', description: null, maxHours: 0, area: 'Egresados' },
  { id: 'EG-006', name: 'Preparándote para la vida laboral: habilidades para la vida', description: null, maxHours: 0, area: 'Egresados' },
  { id: 'EG-007', name: 'Organizar jornadas de actualización como Seminarios o Simposios para egresados.', description: null, maxHours: 0, area: 'Egresados' },
  { id: 'EG-008', name: 'Emprendimiento y Empleabilidad', description: null, maxHours: 0, area: 'Egresados' },
  { id: 'EG-009', name: 'Socializar el avance del Plan de Mejoramiento, producto del estudio de impacto de egresados.', description: null, maxHours: 0, area: 'Egresados' },
  { id: 'EG-010', name: 'Mentoría con Egresados Destacados para acompañamiento a estudiantes próximos a graduarse.', description: null, maxHours: 0, area: 'Egresados' },
  { id: 'EG-011', name: 'Organizar en Drive y/o Docuware la carpeta de seguimiento de egresados por programa.', description: null, maxHours: 0, area: 'Egresados' },
];
