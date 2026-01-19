
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
  // --- INVESTIGACIÓN (Existentes) ---
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

  // --- PROYECCIÓN SOCIAL (Nuevas actividades cargadas desde el adjunto) ---
  { id: 'PS-001', name: 'Coordinacion y seguimiento de la gestion de extension y proyeccion social', description: 'Labores propias del cargo', maxHours: 120, area: 'Proyección Social' },
  { id: 'PS-002', name: 'Organización, contruccion documento Registro Calificado', description: 'Históricos de gestión de Proyección Social y Extensión, fichas de condición 6 de RSE y demás anexos.', maxHours: 90, area: 'Proyección Social' },
  { id: 'PS-003', name: 'Diapositivas- guiones-simulacros Registro calificados', description: 'Elaboracion , Diapositivas institucionales, simulacros, libretos.', maxHours: 30, area: 'Proyección Social' },
  { id: 'PS-004', name: 'Generacion de productos de valor agregado de PAT Colectivo', description: 'Productos de apropiacion social.', maxHours: 32, area: 'Proyección Social' },
  { id: 'PS-005', name: 'Proyectos Macroproyectos e Intervencion Social y Ambientales', description: 'Cronogramas, intervenciones. Elaboracion de informe de avances o finales del mismo.', maxHours: 52, area: 'Proyección Social' },
  { id: 'PS-006', name: 'Participacion en Jornadas de atencion integral', description: 'Implica gestion, participacion entrega de informe de resultados.', maxHours: 12, area: 'Proyección Social' },
  { id: 'PS-007', name: 'Participacion en Divulgacion de R.S.U - Docente', description: 'Rastreo, organización de documento, escritura de la ficha, poster y participacion.', maxHours: 24, area: 'Proyección Social' },
  { id: 'PS-008', name: 'Diagnostico y desarrollo de la ruta social', description: 'Implica organización, planeacion ejecucion, analisis, e implementacion de las estrategias.', maxHours: 16, area: 'Proyección Social' },
  { id: 'PS-009', name: 'Escritura de contenidos de cartillas, boletines, revistas, guias', description: 'Diseño y elaboracion de documentos derivados de proyectos de intervencion social.', maxHours: 48, area: 'Proyección Social' },
  { id: 'PS-010', name: 'Gestion de alianzas, convenios, mesas de trabajo', description: 'Rastreo, participacion en mesas de trabajo y propuesta de actividad con Aliados.', maxHours: 48, area: 'Proyección Social' },
  { id: 'PS-011', name: 'Programas de extension y educacion continuas vendidos', description: 'Implica rastreo, diseño, presentacion de propuesta y gestión de ventas al CEPEC.', maxHours: 48, area: 'Proyección Social' },
  { id: 'PS-012', name: 'Organizacion de congresos-simposios autosostenibles', description: 'Apoyo de docentes con funciones al area en la organización.', maxHours: 16, area: 'Proyección Social' },
  { id: 'PS-013', name: 'Colaborar con entidades públicas y privadas en mesas de trabajo', description: 'Identificar oportunidades de asesorias y consultorias.', maxHours: 32, area: 'Proyección Social' },
  { id: 'PS-014', 'name': 'Rastreo, formulacion y presentacion de proyectos en convocatorias', 'description': 'Convocatorias a Nivel Distrital y/o Departamental de corte social ambiental.', 'maxHours': 80, 'area': 'Proyección Social' },
  { id: 'PS-015', 'name': 'Gestion de la Supervision de la Practica', 'description': 'Supervisor de Practicas. Organizacion, seguimiento, comites y anexos RDS.', 'maxHours': 385, 'area': 'Proyección Social' },
];
