
import { ActivityCatalogItem, Teacher, Project, Faculty, Program } from './types';

export const ADMIN_PASSWORD = 'admin2024';

export const INITIAL_FACULTIES: Faculty[] = [
  { id: 'F-01', name: 'Facultad de Ciencias de la Salud' },
  { id: 'F-02', name: 'Facultad de Ciencias Sociales y Humanas' },
  { id: 'F-03', name: 'Facultad de Ingeniería' },
];

export const INITIAL_PROGRAMS: Program[] = [
  { id: 'PR-01', name: 'Medicina', facultyId: 'F-01' },
  { id: 'PR-02', name: 'Enfermería', facultyId: 'F-01' },
  { id: 'PR-03', name: 'Derecho', facultyId: 'F-02' },
  { id: 'PR-04', name: 'Ingeniería de Sistemas', facultyId: 'F-03' },
];

export const INITIAL_PROJECTS: Project[] = [
  { id: 'P-001', name: 'Fortalecimiento de Competencias CTeI', code: 'INV-2024-01' },
  { id: 'P-002', name: 'Innovación Pedagógica en Aula', code: 'EDU-2024-05' },
  { id: 'P-003', name: 'Desarrollo Sostenible Regional', code: 'EXT-2024-10' },
];

export const INITIAL_TEACHERS: Teacher[] = [
  { id: 'T-001', name: 'Ana María Pérez', email: 'ana.perez@uni.edu.co', idNumber: '12345', contractType: 'Tiempo Completo', programId: 'PR-01' },
  { id: 'T-002', name: 'Carlos Rodríguez', email: 'carlos.r@uni.edu.co', idNumber: '54321', contractType: 'Medio Tiempo', programId: 'PR-04' },
  { id: 'T-003', name: 'Luisa Fernanda Gómez', email: 'luisa.g@uni.edu.co', idNumber: '67890', contractType: 'Catedrático', programId: 'PR-03' },
];

export const INITIAL_ACTIVITIES: ActivityCatalogItem[] = [
  { id: 'A-001', name: 'Orientación de SIEF – PAT Colectivo', description: 'Direccionamiento estratégico de semilleros.', maxHours: 40, area: 'Investigación' },
  { id: 'A-002', name: 'Generación de producto como valor agregado de PAT Colectivo', description: 'Producción académica derivada.', maxHours: 80, area: 'Investigación' },
  { id: 'DA-012', name: 'Construcción de condiciones de calidad 3, 4 y 7', description: 'Alineación con lineamientos del MEN y evidencias.', maxHours: 180, area: 'Desarrollo Académico' },
];
