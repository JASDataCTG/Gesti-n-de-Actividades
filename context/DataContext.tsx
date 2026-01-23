
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

  const fetchTable = async <T,>(
    tableName: string,
    initialData: T[],
    setter: (data: T[]) => void
  ) => {
    try {
      const { data, error } = await supabase.from(tableName).select('*');
      if (error) throw error;
      
      if (!data || data.length === 0) {
        // Sembrar datos iniciales si está vacío
        try {
          await supabase.from(tableName).insert(initialData);
        } catch (e) {
          console.error(`Error sembrando ${tableName}:`, e);
        }
        setter(initialData);
      } else {
        setter(data);
      }
    } catch (err) {
      console.warn(`Tabla ${tableName} no disponible o vacía, usando locales:`, err);
      setter(initialData);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // Cargar tablas secuencialmente para mayor estabilidad
      await fetchTable('faculties', INITIAL_FACULTIES, setFaculties);
      await fetchTable('programs', INITIAL_PROGRAMS, setPrograms);
      await fetchTable('teachers', INITIAL_TEACHERS, setTeachers);
      await fetchTable('projects', INITIAL_PROJECTS, setProjects);
      await fetchTable('activities', INITIAL_ACTIVITIES, setActivities);
      
      const { data: assignData } = await supabase.from('assignments').select('*');
      if (assignData) setAssignments(assignData);

    } catch (err) {
      console.error("Error crítico cargando datos:", err);
    } finally {
      // ESTO ES CRUCIAL: Siempre quitamos el loading
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- CRUD Actions ---
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
