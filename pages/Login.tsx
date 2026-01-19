
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const { teachers } = useData();
  const { loginAsLeader, loginAsTeacher } = useAuth();
  const [selectedTeacherId, setSelectedTeacherId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleTeacherLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const teacher = teachers.find(t => t.id === selectedTeacherId);
    if (teacher) {
      // Validación: La clave corresponde al idNumber (Cédula)
      if (teacher.idNumber === password) {
        loginAsTeacher(teacher);
      } else {
        setError('Contraseña incorrecta. Debe ser su número de cédula.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-900 tracking-wider">GEST<span className="text-blue-500">ACAD</span></h1>
        <p className="text-slate-500 mt-2">Sistema de Gestión Académica CTeI</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        
        {/* Leader Card */}
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-slate-200 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-600">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Líder de Área</h2>
          <p className="text-slate-500 mb-8 flex-1">
            Acceso administrativo para gestionar actividades, asignar cargas, monitorear avances y generar reportes.
          </p>
          <button 
            onClick={loginAsLeader}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md"
          >
            Ingresar como Líder
          </button>
        </div>

        {/* Teacher Card */}
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-slate-200 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
             <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Docente / Investigador</h2>
          <p className="text-slate-500 mb-4">
            Ingrese sus credenciales personales para gestionar sus actividades.
          </p>
          
          <form onSubmit={handleTeacherLogin} className="w-full mt-auto space-y-4">
            <div className="text-left">
              <label className="block text-sm font-medium text-slate-700 mb-1">Seleccione su nombre</label>
              <select 
                required
                className="w-full border border-slate-300 bg-white text-slate-900 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 outline-none transition-all"
                value={selectedTeacherId}
                onChange={(e) => {
                  setSelectedTeacherId(e.target.value);
                  setError('');
                }}
              >
                <option value="">-- Seleccionar --</option>
                {teachers.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            <div className="text-left">
              <label className="block text-sm font-medium text-slate-700 mb-1">Contraseña (Cédula)</label>
              <input 
                type="password"
                required
                placeholder="Ingrese su número de documento"
                className={`w-full border ${error ? 'border-red-500' : 'border-slate-300'} bg-white text-slate-900 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 outline-none transition-all`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
              />
              {error && <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>}
            </div>

            <button 
              type="submit"
              disabled={!selectedTeacherId || !password}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md mt-2"
            >
              Ingresar al Portal
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;
