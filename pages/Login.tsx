import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { ADMIN_PASSWORD } from '../constants';

const Login: React.FC = () => {
  const { teachers } = useData();
  const { loginAsLeader, loginAsTeacher } = useAuth();
  
  const [selectedTeacherId, setSelectedTeacherId] = useState('');
  const [teacherPass, setTeacherPass] = useState('');
  const [teacherError, setTeacherError] = useState('');
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
        setTeacherError('Contraseña incorrecta.');
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
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Abstract Background Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-uninunez-orange opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-uninunez-turquoise opacity-5 rounded-full blur-3xl"></div>

      <div className="mb-10 text-center z-10">
        <div className="flex items-center justify-center gap-3 mb-4 scale-125">
             <div className="bg-uninunez-orange w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-2xl italic shadow-xl">
                UN
            </div>
            <div className="text-left">
                <h1 className="text-uninunez-onix font-black text-2xl tracking-tighter leading-none">INÚÑEZ</h1>
                <p className="text-[10px] text-uninunez-ceniza font-bold uppercase tracking-widest mt-0.5">Gestor Académico CTeI</p>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl z-10">
        
        {/* Card Líder de Área */}
        <div className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 flex flex-col transition-transform hover:-translate-y-2">
          <div className="w-16 h-16 bg-uninunez-orange/10 rounded-2xl flex items-center justify-center mb-6 text-uninunez-orange">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
          </div>
          <h2 className="text-2xl font-black text-uninunez-onix mb-2 font-heading">Líder de Área</h2>
          <p className="text-uninunez-ceniza mb-8 text-sm leading-relaxed">
            Administración institucional, gestión de catálogos y auditoría de reportes consolidados.
          </p>

          <form onSubmit={handleAdminLogin} className="w-full mt-auto space-y-5">
            <div className="text-left">
              <label className="block text-[10px] font-black text-uninunez-ceniza uppercase mb-1.5 ml-1">Clave de Acceso</label>
              <input 
                type="password"
                required
                placeholder="Ingrese clave maestra"
                className={`w-full border-2 ${adminError ? 'border-red-400 bg-red-50' : 'border-slate-100 bg-slate-50'} text-slate-900 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-uninunez-orange/20 focus:border-uninunez-orange outline-none transition-all font-medium`}
                value={adminPass}
                onChange={(e) => {
                    setAdminPass(e.target.value);
                    setAdminError('');
                }}
              />
              {adminError && <p className="text-red-500 text-xs mt-2 font-bold px-1">{adminError}</p>}
            </div>
            <button 
                type="submit"
                className="w-full bg-uninunez-orange hover:bg-uninunez-orange-light text-white font-black py-4 px-6 rounded-2xl transition-all shadow-lg hover:shadow-uninunez-orange/30 flex items-center justify-center gap-2 text-sm uppercase tracking-widest"
            >
                Entrar como Admin
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </button>
          </form>
        </div>

        {/* Card Docente */}
        <div className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 flex flex-col transition-transform hover:-translate-y-2">
          <div className="w-16 h-16 bg-uninunez-turquoise/10 rounded-2xl flex items-center justify-center mb-6 text-uninunez-turquoise">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </div>
          <h2 className="text-2xl font-black text-uninunez-onix mb-2 font-heading">Portal Docente</h2>
          <p className="text-uninunez-ceniza mb-8 text-sm leading-relaxed">
            Gestión personal de actividades, carga de evidencias de cumplimiento y registro de logros.
          </p>
          
          <form onSubmit={handleTeacherLogin} className="w-full mt-auto space-y-4">
            <div className="text-left">
              <label className="block text-[10px] font-black text-uninunez-ceniza uppercase mb-1.5 ml-1">Docente</label>
              <select 
                required
                className="w-full border-2 border-slate-100 bg-slate-50 text-slate-900 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-uninunez-turquoise/20 focus:border-uninunez-turquoise outline-none transition-all cursor-pointer font-medium appearance-none"
                value={selectedTeacherId}
                onChange={(e) => {
                  setSelectedTeacherId(e.target.value);
                  setTeacherError('');
                }}
              >
                <option value="">Seleccione su nombre</option>
                {teachers.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            <div className="text-left">
              <label className="block text-[10px] font-black text-uninunez-ceniza uppercase mb-1.5 ml-1">Cédula</label>
              <input 
                type="password"
                required
                placeholder="Número de documento"
                className={`w-full border-2 ${teacherError ? 'border-red-400 bg-red-50' : 'border-slate-100 bg-slate-50'} text-slate-900 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-uninunez-turquoise/20 focus:border-uninunez-turquoise outline-none transition-all font-medium`}
                value={teacherPass}
                onChange={(e) => {
                  setTeacherPass(e.target.value);
                  setTeacherError('');
                }}
              />
              {teacherError && <p className="text-red-500 text-xs mt-2 font-bold px-1">{teacherError}</p>}
            </div>

            <button 
              type="submit"
              disabled={!selectedTeacherId || !teacherPass}
              className="w-full bg-uninunez-turquoise hover:bg-uninunez-turquoise-dark disabled:bg-slate-200 text-white font-black py-4 px-6 rounded-2xl transition-all shadow-lg hover:shadow-uninunez-turquoise/30 flex items-center justify-center gap-2 text-sm uppercase tracking-widest mt-2"
            >
              Acceder al Portal
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </button>
          </form>
        </div>

      </div>

      <div className="mt-12 text-center z-10 flex flex-col items-center">
         <div className="w-10 h-1 bg-uninunez-orange rounded-full mb-4"></div>
         <p className="text-uninunez-ceniza text-[10px] uppercase font-black tracking-[0.2em]">
            Corporación Universitaria Rafael Núñez
         </p>
         <p className="text-slate-400 text-[9px] mt-1 font-medium">Vigilada Mineducación</p>
      </div>
    </div>
  );
};

export default Login;