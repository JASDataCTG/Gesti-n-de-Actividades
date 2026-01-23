
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

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Faculties
      const { data: facData, error: facErr } = await supabase.from('faculties').select('*');
      if (facErr) throw facErr;
      if (!facData || facData.length === 0) {
        await supabase.from('faculties').insert(INITIAL_FACULTIES);
        setFaculties(INITIAL_FACULTIES);
      } else {
        setFaculties(facData);
      }

      // 2. Fetch Programs
      const { data: progData, error: progErr } = await supabase.from('programs').select('*');
      if (progErr) throw progErr;
      if (!progData || progData.length === 0) {
        await supabase.from('programs').insert(INITIAL_PROGRAMS);
        setPrograms(INITIAL_PROGRAMS);
      } else {
        setPrograms(progData);
      }

      // 3. Fetch Teachers
      const { data: teachersData, error: teachersError } = await supabase.from('teachers').select('*');
      if (teachersError) throw teachersError;
      if (!teachersData || teachersData.length === 0) {
         await supabase.from('teachers').insert(INITIAL_TEACHERS);
         setTeachers(INITIAL_TEACHERS);
      } else {
         setTeachers(teachersData);
      }

      // 4. Projects
      const { data: projectsData, error: projectsError } = await supabase.from('projects').select('*');
      if (projectsError) throw projectsError;
      if (!projectsData || projectsData.length === 0) {
         await supabase.from('projects').insert(INITIAL_PROJECTS);
         setProjects(INITIAL_PROJECTS);
      } else {
         setProjects(projectsData);
      }

      // 5. Activities
      const { data: activitiesData, error: activitiesError } = await supabase.from('activities').select('*');
      if (activitiesError) throw activitiesError;
      if (!activitiesData || activitiesData.length === 0) {
         await supabase.from('activities').insert(INITIAL_ACTIVITIES);
         setActivities(INITIAL_ACTIVITIES);
      } else {
         setActivities(activitiesData);
      }

      // 6. Assignments
      const { data: assignmentsData, error: assignmentsError } = await supabase.from('assignments').select('*');
      if (assignmentsError) throw assignmentsError;
      setAssignments(assignmentsData || []);

    } catch (error) {
      console.error('Error loading data from Supabase:', error);
    } finally {
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
