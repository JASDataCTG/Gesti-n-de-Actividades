
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
  { id: 'A-011', name: 'Participación como Co-investigador', description: 'Apoyo en proyecto CTeI.', maxHours: 60, area: 'Investigación' },
  { id: 'A-012', name: 'Estancia investigativa', description: 'Movilidad académica.', maxHours: 160, area: 'Investigación' },
  { id: 'A-013', name: 'Escritura de Artículo Original o de Revisión', description: 'Generación de nuevo conocimiento.', maxHours: 80, area: 'Investigación' },
  { id: 'A-014', name: 'Escritura de capítulo de libro', description: 'Resultado de investigación.', maxHours: 60, area: 'Investigación' },
  { id: 'A-015', name: 'Dirección de Trabajos de Maestría o Doctorado', description: 'Posgrado.', maxHours: 90, area: 'Investigación' },
  { id: 'A-016', name: 'Edición de revista científica', description: 'Gestión editorial.', maxHours: 100, area: 'Investigación' },
  { id: 'A-017', name: 'Registro calificado en Creación/Renovación', description: 'Procesos de acreditación.', maxHours: 50, area: 'Investigación' },
  { id: 'A-018', name: 'Liderazgo Grupo de Investigación', description: 'Gestión administrativa del grupo.', maxHours: 40, area: 'Investigación' },
  { id: 'A-019', name: 'Desarrollar PATC orientados a Emprendimiento', description: 'Fomento a la innovación.', maxHours: 40, area: 'Investigación' },
];
