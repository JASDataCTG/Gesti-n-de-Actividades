
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Activities from './pages/Activities';
import Teachers from './pages/Teachers';
import Assignments from './pages/Assignments';
import Reports from './pages/Reports';
import Projects from './pages/Projects';
import TeacherPortal from './pages/TeacherPortal';

const AppContent: React.FC = () => {
  const { role } = useAuth();

  if (!role) {
    return <Login />;
  }

  return (
    <Router>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <main className="ml-64 flex-1 p-8 overflow-auto h-screen">
          <div className="max-w-7xl mx-auto">
            <Routes>
              {role === 'leader' ? (
                <>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/activities" element={<Activities />} />
                  <Route path="/teachers" element={<Teachers />} />
                  <Route path="/assignments" element={<Assignments />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </>
              ) : (
                <>
                  <Route path="/portal" element={<TeacherPortal />} />
                  <Route path="*" element={<Navigate to="/portal" replace />} />
                </>
              )}
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </DataProvider>
  );
};

export default App;
