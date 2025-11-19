
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { Teacher, ActivityCatalogItem, Assignment, Project } from '../types';
import { INITIAL_ACTIVITIES, INITIAL_TEACHERS, INITIAL_PROJECTS } from '../constants';
import { supabase } from '../services/supabase';

interface DataContextType {
  teachers: Teacher[];
  activities: ActivityCatalogItem[];
  projects: Project[];
  assignments: Assignment[];
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
  getAssignmentsByActivity: (activityId: string) => Assignment[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [activities, setActivities] = useState<ActivityCatalogItem[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Teachers
      const { data: teachersData, error: teachersError } = await supabase.from('teachers').select('*');
      if (teachersError) throw teachersError;
      
      // Auto-seed Teachers if empty
      if (!teachersData || teachersData.length === 0) {
         console.log("Seeding Teachers...");
         const { error: seedError } = await supabase.from('teachers').insert(INITIAL_TEACHERS);
         if (!seedError) setTeachers(INITIAL_TEACHERS);
      } else {
         setTeachers(teachersData);
      }

      // 2. Fetch Projects
      const { data: projectsData, error: projectsError } = await supabase.from('projects').select('*');
      if (projectsError) throw projectsError;

      // Auto-seed Projects if empty
      if (!projectsData || projectsData.length === 0) {
         console.log("Seeding Projects...");
         const { error: seedError } = await supabase.from('projects').insert(INITIAL_PROJECTS);
         if (!seedError) setProjects(INITIAL_PROJECTS);
      } else {
         setProjects(projectsData);
      }

      // 3. Fetch Activities
      const { data: activitiesData, error: activitiesError } = await supabase.from('activities').select('*');
      if (activitiesError) throw activitiesError;

      // Auto-seed Activities if empty
      if (!activitiesData || activitiesData.length === 0) {
         console.log("Seeding Activities...");
         // Ensure area exists
         const seededActivities = INITIAL_ACTIVITIES.map(a => ({ ...a, area: a.area || 'Investigación' }));
         const { error: seedError } = await supabase.from('activities').insert(seededActivities);
         if (!seedError) setActivities(seededActivities);
      } else {
         setActivities(activitiesData);
      }

      // 4. Fetch Assignments
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

  // --- Teacher Actions ---
  const addTeacher = async (t: Teacher) => {
    const { error } = await supabase.from('teachers').insert(t);
    if (!error) setTeachers(prev => [...prev, t]);
    else console.error(error);
  };

  const updateTeacher = async (t: Teacher) => {
    const { error } = await supabase.from('teachers').update(t).eq('id', t.id);
    if (!error) setTeachers(prev => prev.map(x => x.id === t.id ? t : x));
    else console.error(error);
  };

  const deleteTeacher = async (id: string) => {
    const { error } = await supabase.from('teachers').delete().eq('id', id);
    if (!error) setTeachers(prev => prev.filter(x => x.id !== id));
    else console.error(error);
  };

  // --- Activity Actions ---
  const addActivity = async (a: ActivityCatalogItem) => {
    const { error } = await supabase.from('activities').insert(a);
    if (!error) setActivities(prev => [...prev, a]);
    else console.error(error);
  };

  const updateActivity = async (a: ActivityCatalogItem) => {
    const { error } = await supabase.from('activities').update(a).eq('id', a.id);
    if (!error) setActivities(prev => prev.map(x => x.id === a.id ? a : x));
    else console.error(error);
  };

  const deleteActivity = async (id: string) => {
    const { error } = await supabase.from('activities').delete().eq('id', id);
    if (!error) setActivities(prev => prev.filter(x => x.id !== id));
    else console.error(error);
  };

  // --- Project Actions ---
  const addProject = async (p: Project) => {
    const { error } = await supabase.from('projects').insert(p);
    if (!error) setProjects(prev => [...prev, p]);
    else console.error(error);
  };

  const updateProject = async (p: Project) => {
    const { error } = await supabase.from('projects').update(p).eq('id', p.id);
    if (!error) setProjects(prev => prev.map(x => x.id === p.id ? p : x));
    else console.error(error);
  };

  const deleteProject = async (id: string) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) setProjects(prev => prev.filter(x => x.id !== id));
    else console.error(error);
  };

  // --- Assignment Actions ---
  const addAssignment = async (a: Assignment) => {
    const { error } = await supabase.from('assignments').insert(a);
    if (!error) setAssignments(prev => [...prev, a]);
    else console.error(error);
  };

  const updateAssignment = async (a: Assignment) => {
    const { error } = await supabase.from('assignments').update(a).eq('id', a.id);
    if (!error) setAssignments(prev => prev.map(x => x.id === a.id ? a : x));
    else console.error(error);
  };

  const deleteAssignment = async (id: string) => {
    const { error } = await supabase.from('assignments').delete().eq('id', id);
    if (!error) setAssignments(prev => prev.filter(x => x.id !== id));
    else console.error(error);
  };

  const getAssignmentsByActivity = (activityId: string) => 
    assignments.filter(a => a.activityCatalogId === activityId);

  return (
    <DataContext.Provider value={{
      teachers, activities, projects, assignments, loading,
      addTeacher, updateTeacher, deleteTeacher,
      addActivity, updateActivity, deleteActivity,
      addProject, updateProject, deleteProject,
      addAssignment, updateAssignment, deleteAssignment,
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
