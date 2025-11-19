
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { Teacher, ActivityCatalogItem, Assignment, Project } from '../types';
import { INITIAL_ACTIVITIES, INITIAL_TEACHERS, INITIAL_PROJECTS } from '../constants';

interface DataContextType {
  teachers: Teacher[];
  activities: ActivityCatalogItem[];
  projects: Project[];
  assignments: Assignment[];
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
  // Initialize from localStorage or constants
  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    const saved = localStorage.getItem('teachers');
    return saved ? JSON.parse(saved) : INITIAL_TEACHERS;
  });

  const [activities, setActivities] = useState<ActivityCatalogItem[]>(() => {
    const saved = localStorage.getItem('activities');
    const initial = saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
    // Migration: Ensure area exists for old data
    return initial.map((a: any) => ({
      ...a,
      area: a.area || 'Investigación'
    }));
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    const saved = localStorage.getItem('assignments');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist to localStorage
  useEffect(() => { localStorage.setItem('teachers', JSON.stringify(teachers)); }, [teachers]);
  useEffect(() => { localStorage.setItem('activities', JSON.stringify(activities)); }, [activities]);
  useEffect(() => { localStorage.setItem('projects', JSON.stringify(projects)); }, [projects]);
  useEffect(() => { localStorage.setItem('assignments', JSON.stringify(assignments)); }, [assignments]);

  // Teacher Actions
  const addTeacher = (t: Teacher) => setTeachers([...teachers, t]);
  const updateTeacher = (t: Teacher) => setTeachers(teachers.map(x => x.id === t.id ? t : x));
  const deleteTeacher = (id: string) => setTeachers(teachers.filter(x => x.id !== id));

  // Activity Actions
  const addActivity = (a: ActivityCatalogItem) => setActivities([...activities, a]);
  const updateActivity = (a: ActivityCatalogItem) => setActivities(activities.map(x => x.id === a.id ? a : x));
  const deleteActivity = (id: string) => setActivities(activities.filter(x => x.id !== id));

  // Project Actions
  const addProject = (p: Project) => setProjects([...projects, p]);
  const updateProject = (p: Project) => setProjects(projects.map(x => x.id === p.id ? p : x));
  const deleteProject = (id: string) => setProjects(projects.filter(x => x.id !== id));

  // Assignment Actions
  const addAssignment = (a: Assignment) => setAssignments([...assignments, a]);
  const updateAssignment = (a: Assignment) => setAssignments(assignments.map(x => x.id === a.id ? a : x));
  const deleteAssignment = (id: string) => setAssignments(assignments.filter(x => x.id !== id));

  const getAssignmentsByActivity = (activityId: string) => 
    assignments.filter(a => a.activityCatalogId === activityId);

  return (
    <DataContext.Provider value={{
      teachers, activities, projects, assignments,
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
