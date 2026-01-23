
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import Faculties from './pages/Faculties';
import TeacherPortal from './pages/TeacherPortal';

const AppContent: React.FC = () => {
  const { role } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!role) {
    return <Login />;
  }

  return (
    <Router>
      <div className="flex min-h-screen bg-slate-50 relative overflow-x-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-30 flex items-center justify-between px-4 shadow-sm">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-uninunez-onix hover:bg-slate-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </button>
          <img 
            src="https://axis.uninunez.edu.co/images/uninunez/vm/logoqteal.svg" 
            alt="Logo" 
            className="h-8 w-auto"
          />
          <div className="w-10"></div>
        </header>

        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <main className="flex-1 p-4 md:p-8 pt-20 lg:pt-8 lg:ml-64 overflow-x-hidden transition-all duration-300">
          <div className="max-w-7xl mx-auto">
            <Routes>
              {role === 'leader' ? (
                <>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/faculties" element={<Faculties />} />
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
                  <Route path="/reports" element={<Reports />} />
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
