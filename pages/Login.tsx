
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { ADMIN_PASSWORD } from '../constants';

const Login: React.FC = () => {
  const { teachers } = useData();
  const { loginAsLeader, loginAsTeacher } = useAuth();
  
  // Estados para Login de Docente
  const [selectedTeacherId, setSelectedTeacherId] = useState('');
  const [teacherPass, setTeacherPass] = useState('');
  const [teacherError, setTeacherError] = useState('');

  // Estados para Login de Líder
  const [adminPass, setAdminPass] = useState('');
  const [adminError, setAdminError] = useState('');

  const handleTeacherLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setTeacherError('');
    
    const teacher = teachers.find(t => t.id === selectedTeacherId);
    if (teacher) {
      if (teacher.idNumber === teacherPass) {
        loginAsTeacher(teacher);
      } else {
        setTeacherError('Cédula incorrecta.');
      }
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');

    if (adminPass === ADMIN_PASSWORD) {
      loginAsLeader();
    } else {
      setAdminError('Clave administrativa incorrecta.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-900 tracking-wider">GEST<span className="text-blue-500">ACAD</span></h1>
        <p className="text-slate-500 mt-2">Sistema de Gestión Académica CTeI</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        
        {/* Card Líder de Área */}
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-slate-200 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-600">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Líder de Área</h2>
          <p className="text-slate-500 mb-6 text-sm">
            Gestión de catálogo, asignación de actividades y reportes consolidados.
          </p>

          <form onSubmit={handleAdminLogin} className="w-full mt-auto space-y-4">
            <div className="text-left">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Clave Administrativa</label>
              <input 
                type="password"
                required
                placeholder="Ingrese clave maestra"
                className={`w-full border ${adminError ? 'border-red-500' : 'border-slate-300'} bg-white text-slate-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
                value={adminPass}
                onChange={(e) => {
                    setAdminPass(e.target.value);
                    setAdminError('');
                }}
              />
              {adminError && <p className="text-red-500 text-xs mt-1 font-medium">{adminError}</p>}
            </div>
            <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
            >
                Acceso Administrativo
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </form>
        </div>

        {/* Card Docente */}
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-slate-200 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Docente</h2>
          <p className="text-slate-500 mb-6 text-sm">
            Registro de avances, carga de evidencias y seguimiento de logros personales.
          </p>
          
          <form onSubmit={handleTeacherLogin} className="w-full mt-auto space-y-4">
            <div className="text-left">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Seleccionar Docente</label>
              <select 
                required
                className="w-full border border-slate-300 bg-white text-slate-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none transition-all cursor-pointer"
                value={selectedTeacherId}
                onChange={(e) => {
                  setSelectedTeacherId(e.target.value);
                  setTeacherError('');
                }}
              >
                <option value="">-- Elija su nombre --</option>
                {teachers.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            <div className="text-left">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Contraseña (Cédula)</label>
              <input 
                type="password"
                required
                placeholder="Número de documento"
                className={`w-full border ${teacherError ? 'border-red-500' : 'border-slate-300'} bg-white text-slate-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none transition-all`}
                value={teacherPass}
                onChange={(e) => {
                  setTeacherPass(e.target.value);
                  setTeacherError('');
                }}
              />
              {teacherError && <p className="text-red-500 text-xs mt-1 font-medium">{teacherError}</p>}
            </div>

            <button 
              type="submit"
              disabled={!selectedTeacherId || !teacherPass}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-300 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
            >
              Ingresar al Portal
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </form>
        </div>

      </div>

      <p className="mt-8 text-slate-400 text-xs">
        Para acceso de administrador utilice la clave definida en el sistema.
      </p>
    </div>
  );
};

export default Login;
