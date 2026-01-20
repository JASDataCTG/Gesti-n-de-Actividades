import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { role, currentUser, logout } = useAuth();

  const NavItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center space-x-3 px-6 py-3 transition-all duration-200 ${
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
    <div className="w-64 bg-uninunez-onix min-h-screen flex flex-col fixed left-0 top-0 shadow-2xl z-20 border-r border-slate-700">
      <div className="h-24 flex flex-col items-center justify-center bg-white p-4">
        <div className="flex items-center gap-2">
            <div className="bg-uninunez-orange w-10 h-10 rounded-lg flex items-center justify-center text-white font-black text-xl italic shadow-md">
                UN
            </div>
            <div className="flex flex-col">
                <span className="text-uninunez-onix font-extrabold text-sm tracking-tighter leading-none">INÚÑEZ</span>
                <span className="text-[8px] text-uninunez-ceniza font-medium uppercase tracking-widest mt-0.5">Gestor Académico</span>
            </div>
        </div>
      </div>
      
      <nav className="flex-1 py-6 space-y-1 overflow-y-auto">
        {role === 'leader' && (
          <>
            <NavItem 
              to="/" 
              label="Dashboard" 
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>} 
            />
            <NavItem 
              to="/projects" 
              label="Proyectos" 
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>} 
            />
            <NavItem 
              to="/assignments" 
              label="Asignaciones" 
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} 
            />
            <NavItem 
              to="/activities" 
              label="Catálogo" 
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>} 
            />
            <NavItem 
              to="/teachers" 
              label="Docentes" 
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>} 
            />
            <NavItem 
              to="/reports" 
              label="Reportes" 
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} 
            />
          </>
        )}

        {role === 'teacher' && (
          <>
            <NavItem 
              to="/portal" 
              label="Mis Actividades" 
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} 
            />
            <NavItem 
              to="/reports" 
              label="Mi Reporte" 
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} 
            />
          </>
        )}
      </nav>
      
      <div className="p-4 border-t border-slate-700 bg-uninunez-onix">
        <div className="mb-4 px-2">
          <p className="text-[10px] text-uninunez-orange font-black uppercase tracking-widest">Usuario</p>
          <p className="text-sm text-white font-bold truncate">
            {role === 'leader' ? 'Líder Institucional' : currentUser?.name}
          </p>
          <p className="text-[11px] text-slate-400 truncate italic">
            {role === 'leader' ? 'Administrador CTeI' : currentUser?.email}
          </p>
        </div>
        <button 
          onClick={logout}
          className="flex items-center text-uninunez-turquoise hover:text-white hover:bg-uninunez-turquoise px-3 py-2 rounded-lg transition-all w-full font-bold text-xs"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;