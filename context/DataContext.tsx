
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { Teacher, ActivityCatalogItem, Assignment, Project, Faculty, Program } from '../types';
import { INITIAL_ACTIVITIES, INITIAL_TEACHERS, INITIAL_PROJECTS, INITIAL_FACULTIES, INITIAL_PROGRAMS } from '../constants';
import { supabase } from '../services/supabase';

interface DataContextType {
  teachers: Teacher[];
  activities: ActivityCatalogItem[];
  projects: Project[];
  assignments: Assignment[];
  faculties: Faculty[];
  programs: Program[];
  loading: boolean;
  addTeacher: (t: Teacher) => void;
  updateTeacher: (t: Teacher) => void;
  deleteTeacher: (id: string) => void;
  addActivity: (a: ActivityCatalogItem) => void;
  updateActivity: (a: ActivityCatalogItem) => void;
  deleteActivity: (id: string) => void;
  addProject: (p: Project) => void;
  updateProject: (p: Project) => void;
  deleteProject: (id: string) => void;
  addAssignment: (a: Assignment) => void;
  updateAssignment: (a: Assignment) => void;
  deleteAssignment: (id: string) => void;
  addFaculty: (f: Faculty) => void;
  updateFaculty: (f: Faculty) => void;
  deleteFaculty: (id: string) => void;
  addProgram: (p: Program) => void;
  updateProgram: (p: Program) => void;
  deleteProgram: (id: string) => void;
  getAssignmentsByActivity: (activityId: string) => Assignment[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [activities, setActivities] = useState<ActivityCatalogItem[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTableData = async <T,>(
    tableName: string,
    initialData: T[],
    setter: (data: T[]) => void
  ) => {
    try {
      const { data, error } = await supabase.from(tableName).select('*');
      if (error) {
        console.warn(`Error cargando tabla ${tableName}:`, error.message);
        // Si la tabla no existe o hay error, usamos los datos iniciales locales
        setter(initialData);
        return;
      }
      
      if (!data || data.length === 0) {
        // Intentar sembrar datos iniciales si la tabla está vacía
        try {
          await supabase.from(tableName).insert(initialData);
        } catch (e) {
          console.warn(`No se pudieron sembrar datos en ${tableName}:`, e);
        }
        setter(initialData);
      } else {
        setter(data);
      }
    } catch (err) {
      console.error(`Fallo crítico en fetchTableData para ${tableName}:`, err);
      setter(initialData);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    
    // Ejecutamos las cargas en paralelo pero de forma resiliente
    await Promise.all([
      fetchTableData('faculties', INITIAL_FACULTIES, setFaculties),
      fetchTableData('programs', INITIAL_PROGRAMS, setPrograms),
      fetchTableData('teachers', INITIAL_TEACHERS, setTeachers),
      fetchTableData('projects', INITIAL_PROJECTS, setProjects),
      fetchTableData('activities', INITIAL_ACTIVITIES, setActivities),
      // Las asignaciones no tienen datos iniciales estáticos, se cargan directo
      (async () => {
        try {
          const { data, error } = await supabase.from('assignments').select('*');
          if (!error && data) setAssignments(data);
        } catch (e) {
          console.warn("Error cargando asignaciones:", e);
        }
      })()
    ]);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- CRUD Actions con manejo de errores ---
  const addFaculty = async (f: Faculty) => {
    const { error } = await supabase.from('faculties').insert(f);
    if (!error) setFaculties(prev => [...prev, f]);
  };
  const updateFaculty = async (f: Faculty) => {
    const { error } = await supabase.from('faculties').update(f).eq('id', f.id);
    if (!error) setFaculties(prev => prev.map(x => x.id === f.id ? f : x));
  };
  const deleteFaculty = async (id: string) => {
    const { error } = await supabase.from('faculties').delete().eq('id', id);
    if (!error) setFaculties(prev => prev.filter(x => x.id !== id));
  };

  const addProgram = async (p: Program) => {
    const { error } = await supabase.from('programs').insert(p);
    if (!error) setPrograms(prev => [...prev, p]);
  };
  const updateProgram = async (p: Program) => {
    const { error } = await supabase.from('programs').update(p).eq('id', p.id);
    if (!error) setPrograms(prev => prev.map(x => x.id === p.id ? p : x));
  };
  const deleteProgram = async (id: string) => {
    const { error } = await supabase.from('programs').delete().eq('id', id);
    if (!error) setPrograms(prev => prev.filter(x => x.id !== id));
  };

  const addTeacher = async (t: Teacher) => {
    const { error } = await supabase.from('teachers').insert(t);
    if (!error) setTeachers(prev => [...prev, t]);
  };
  const updateTeacher = async (t: Teacher) => {
    const { error } = await supabase.from('teachers').update(t).eq('id', t.id);
    if (!error) setTeachers(prev => prev.map(x => x.id === t.id ? t : x));
  };
  const deleteTeacher = async (id: string) => {
    const { error } = await supabase.from('teachers').delete().eq('id', id);
    if (!error) setTeachers(prev => prev.filter(x => x.id !== id));
  };

  const addActivity = async (a: ActivityCatalogItem) => {
    const { error } = await supabase.from('activities').insert(a);
    if (!error) setActivities(prev => [...prev, a]);
  };
  const updateActivity = async (a: ActivityCatalogItem) => {
    const { error } = await supabase.from('activities').update(a).eq('id', a.id);
    if (!error) setActivities(prev => prev.map(x => x.id === a.id ? a : x));
  };
  const deleteActivity = async (id: string) => {
    const { error } = await supabase.from('activities').delete().eq('id', id);
    if (!error) setActivities(prev => prev.filter(x => x.id !== id));
  };

  const addProject = async (p: Project) => {
    const { error } = await supabase.from('projects').insert(p);
    if (!error) setProjects(prev => [...prev, p]);
  };
  const updateProject = async (p: Project) => {
    const { error } = await supabase.from('projects').update(p).eq('id', p.id);
    if (!error) setProjects(prev => prev.map(x => x.id === p.id ? p : x));
  };
  const deleteProject = async (id: string) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) setProjects(prev => prev.filter(x => x.id !== id));
  };

  const addAssignment = async (a: Assignment) => {
    const { error } = await supabase.from('assignments').insert(a);
    if (!error) setAssignments(prev => [...prev, a]);
  };
  const updateAssignment = async (a: Assignment) => {
    const { error } = await supabase.from('assignments').update(a).eq('id', a.id);
    if (!error) setAssignments(prev => prev.map(x => x.id === a.id ? a : x));
  };
  const deleteAssignment = async (id: string) => {
    const { error } = await supabase.from('assignments').delete().eq('id', id);
    if (!error) setAssignments(prev => prev.filter(x => x.id !== id));
  };

  const getAssignmentsByActivity = (activityId: string) => 
    assignments.filter(a => a.activityCatalogId === activityId);

  return (
    <DataContext.Provider value={{
      teachers, activities, projects, assignments, faculties, programs, loading,
      addTeacher, updateTeacher, deleteTeacher,
      addActivity, updateActivity, deleteActivity,
      addProject, updateProject, deleteProject,
      addAssignment, updateAssignment, deleteAssignment,
      addFaculty, updateFaculty, deleteFaculty,
      addProgram, updateProgram, deleteProgram,
      getAssignmentsByActivity
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
};
