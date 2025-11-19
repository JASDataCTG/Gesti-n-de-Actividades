
export interface Teacher {
  id: string;
  name: string;
  email: string;
  contractType: 'Tiempo Completo' | 'Medio Tiempo' | 'Catedrático';
}

export type ActivityArea =
  | 'Desarrollo Académico'
  | 'Investigación'
  | 'Egresados'
  | 'Proyección Social'
  | 'Visibilidad Nacional e Internacional'
  | 'Vida Universitaria';

export interface ActivityCatalogItem {
  id: string;
  name: string;
  description: string | null;
  maxHours: number; // Maximum hours allowed for this type of activity per period
  area: ActivityArea;
}

export interface Project {
  id: string;
  name: string;
  code: string;
}

export interface Assignment {
  id: string;
  activityCatalogId: string; // Links to the definition
  teacherId: string;
  projectId?: string | null; // Optional association
  allocatedHours: number;
  startDate: string;
  endDate: string;
  goal: string; // Meta
  deliverable1: string; // Entregable Revisión 1
  deliverable2: string; // Entregable Revisión 2
  requiredFormats: string[]; // Registros/Formatos
  status: 'Planificado' | 'En Progreso' | 'Completado';
  
  // Teacher Inputs
  evidenceUrl?: string | null; // URL to Drive/Evidence
  achievementDescription?: string | null; // Descripción del logro
  
  // Leader/Evaluator Inputs
  review1Date?: string | null; // Fecha revisión momento 1
  progress1?: number | null; // Avance momento 1 (Max 50)
  observation1?: string | null; // Observaciones momento 1

  review2Date?: string | null; // Fecha revisión momento 2
  progress2?: number | null; // Avance momento 2 (Max 50)
  observation2?: string | null; // Observaciones momento 2
}

// Combined type for reporting
export interface AssignmentReportRow extends Assignment {
  teacherName: string;
  activityName: string;
  projectName: string;
  area: string;
  totalProgress: number;
}
