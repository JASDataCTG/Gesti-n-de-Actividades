
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { role, currentUser, logout } = useAuth();

  const NavItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        onClick={onClose}
        className={`flex items-center space-x-3 px-6 py-4 transition-all duration-200 ${
          isActive 
            ? 'bg-uninunez-orange text-white border-r-8 border-uninunez-orange-light shadow-lg scale-105 z-10' 
            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
        }`}
      >
        <div className={`${isActive ? 'text-white' : 'text-uninunez-turquoise'}`}>
          {icon}
        </div>
        <span className={`font-semibold text-sm tracking-wide ${isActive ? 'font-bold' : ''}`}>{label}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-uninunez-onix/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <div className={`
        fixed left-0 top-0 h-full w-64 bg-uninunez-onix flex flex-col shadow-2xl z-40 border-r border-slate-700
        sidebar-transition transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-24 flex flex-col items-center justify-center bg-white p-4 shrink-0 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-uninunez-ceniza lg:hidden"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <img 
            src="https://axis.uninunez.edu.co/images/uninunez/vm/logoqteal.svg" 
            alt="Logo Uninúñez" 
            className="h-10 w-auto mb-1"
          />
          <span className="text-[7px] text-uninunez-ceniza font-black uppercase tracking-widest leading-none">Gestor Académico CTeI</span>
        </div>
        
        <nav className="flex-1 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
          {role === 'leader' && (
            <>
              <NavItem to="/" label="Dashboard" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>} />
              <NavItem to="/faculties" label="Estructura" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>} />
              <NavItem to="/projects" label="Proyectos" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>} />
              <NavItem to="/assignments" label="Asignaciones" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} />
              <NavItem to="/activities" label="Catálogo" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>} />
              <NavItem to="/teachers" label="Docentes" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>} />
              <NavItem to="/reports" label="Reportes" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} />
            </>
          )}

          {role === 'teacher' && (
            <>
              <NavItem to="/portal" label="Mis Actividades" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
              <NavItem to="/reports" label="Mi Reporte" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} />
            </>
          )}
        </nav>
        
        <div className="p-4 border-t border-slate-700 bg-uninunez-onix shrink-0">
          <div className="mb-4 px-2">
            <p className="text-[10px] text-uninunez-orange font-black uppercase tracking-widest">Usuario</p>
            <p className="text-sm text-white font-bold truncate">
              {role === 'leader' ? 'Líder Institucional' : currentUser?.name}
            </p>
          </div>
          <button 
            onClick={() => { logout(); onClose(); }}
            className="flex items-center text-uninunez-turquoise hover:text-white hover:bg-uninunez-turquoise px-3 py-3 rounded-lg transition-all w-full font-bold text-xs"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
