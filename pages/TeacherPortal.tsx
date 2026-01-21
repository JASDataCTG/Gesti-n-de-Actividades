import React from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Assignment } from '../types';

const TeacherPortal: React.FC = () => {
  const { assignments, activities, updateAssignment } = useData();
  const { currentUser } = useAuth();

  if (!currentUser) return <div className="p-10 text-center font-bold text-red-500">Acceso no autorizado</div>;

  const myAssignments = assignments.filter(a => a.teacherId === currentUser.id);

  const handleStatusChange = (assignment: Assignment, newStatus: Assignment['status']) => {
    updateAssignment({ ...assignment, status: newStatus });
  };

  const handleUrlChange = (assignment: Assignment, newUrl: string) => {
    updateAssignment({ ...assignment, evidenceUrl: newUrl });
  };

  const handleDescriptionChange = (assignment: Assignment, newDesc: string) => {
      updateAssignment({ ...assignment, achievementDescription: newDesc });
  };

  return (
    <div className="space-y-6 md:space-y-8 pb-20 md:pb-10">
      <div className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-xl border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-uninunez-orange/5 rounded-full -mr-10 -mt-10"></div>
        <h1 className="text-2xl md:text-3xl font-black text-uninunez-onix font-heading uppercase tracking-tight leading-tight">Mi Portafolio CTeI</h1>
        <p className="text-uninunez-ceniza mt-1 font-medium text-sm italic">Docente: {currentUser.name}</p>
        <div className="h-1.5 w-16 bg-uninunez-orange mt-4 rounded-full"></div>
      </div>

      <div className="grid gap-6 md:gap-8">
          {myAssignments.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-[2rem] shadow-lg border border-slate-100 px-6">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              </div>
              <p className="text-lg font-bold text-slate-400 leading-tight">Actualmente no tiene actividades asignadas.</p>
              <p className="text-slate-300 text-xs mt-2 font-medium">Contacte a su líder para la planeación del PAT.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:gap-8">
              {myAssignments.map(assign => {
                const act = activities.find(a => a.id === assign.activityCatalogId);
                const totalProgress = (assign.progress1 || 0) + (assign.progress2 || 0);

                return (
                  <div key={assign.id} className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-2xl border border-white p-5 md:p-8 flex flex-col lg:flex-row gap-6 md:gap-10 hover:shadow-uninunez-orange/10 transition-shadow overflow-hidden">
                    
                    {/* Contenido Principal */}
                    <div className="flex-1 space-y-5 md:space-y-6">
                      <div className="flex flex-wrap items-center gap-2 md:gap-3">
                          <span className="bg-uninunez-orange text-white text-[8px] md:text-[10px] font-black px-2 md:px-3 py-1 rounded-lg uppercase tracking-widest shadow-md">
                              {assign.allocatedHours} Horas
                          </span>
                          <span className="bg-uninunez-turquoise text-white text-[8px] md:text-[10px] font-black px-2 md:px-3 py-1 rounded-lg uppercase tracking-widest shadow-md">
                              {act?.area}
                          </span>
                          <span className="text-[8px] md:text-[10px] font-black text-uninunez-ceniza bg-slate-50 px-2 md:px-3 py-1 rounded-lg border border-slate-100 flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                              {assign.endDate}
                          </span>
                      </div>

                      <div>
                          <h3 className="text-xl md:text-2xl font-black text-uninunez-onix mb-2 md:mb-3 font-heading uppercase leading-tight">{act?.name}</h3>
                          <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">{act?.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-white border-2 border-uninunez-turquoise/10 p-4 md:p-5 rounded-2xl shadow-sm">
                            <span className="text-[9px] font-black text-uninunez-turquoise uppercase tracking-widest block mb-2">Meta Institucional</span>
                            <p className="text-uninunez-ceniza text-xs md:text-sm font-bold leading-snug">{assign.goal || 'En definición.'}</p>
                          </div>
                      </div>

                      <div>
                          <label className="block text-[9px] font-black text-uninunez-ceniza uppercase tracking-widest mb-2 ml-1">Mi Informe de Logros</label>
                          <textarea 
                              className="w-full border-2 border-slate-100 bg-slate-50 text-slate-800 rounded-[1.2rem] md:rounded-[1.5rem] p-4 md:p-5 text-sm font-medium focus:ring-4 focus:ring-uninunez-orange/10 focus:border-uninunez-orange focus:bg-white outline-none transition-all shadow-inner"
                              rows={4}
                              placeholder="Describa aquí sus avances..."
                              value={assign.achievementDescription || ''}
                              onChange={(e) => handleDescriptionChange(assign, e.target.value)}
                          />
                      </div>
                    </div>

                    {/* Gestión y Status */}
                    <div className="w-full lg:w-[320px] flex flex-col gap-6 lg:border-l lg:pl-10 border-slate-50 pt-4 md:pt-0">
                      <div className="bg-uninunez-onix p-5 md:p-6 rounded-2xl md:rounded-3xl shadow-xl text-white">
                        <label className="block text-[9px] font-black text-uninunez-orange uppercase tracking-[0.2em] mb-3">Estado Actual</label>
                        <select 
                          className="w-full bg-uninunez-ceniza border-none text-white rounded-xl px-4 py-3 text-xs font-black uppercase tracking-widest focus:ring-2 focus:ring-uninunez-orange outline-none transition-all cursor-pointer"
                          value={assign.status}
                          onChange={(e) => handleStatusChange(assign, e.target.value as Assignment['status'])}
                        >
                          <option value="Planificado">Planificado</option>
                          <option value="En Progreso">En Progreso</option>
                          <option value="Completado">Completado</option>
                        </select>
                      </div>

                      <div className="bg-slate-50 p-5 md:p-6 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm">
                        <label className="block text-[9px] font-black text-uninunez-ceniza uppercase tracking-widest mb-3">Evidencia (URL)</label>
                        <div className="relative">
                          <input 
                            type="url" 
                            placeholder="Carpeta Drive"
                            className="w-full border-2 border-white bg-white rounded-2xl pl-4 pr-10 py-3 md:py-4 text-[11px] font-bold text-uninunez-turquoise focus:ring-4 focus:ring-uninunez-turquoise/10 focus:border-uninunez-turquoise outline-none shadow-sm transition-all"
                            value={assign.evidenceUrl || ''}
                            onChange={(e) => handleUrlChange(assign, e.target.value)}
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-uninunez-turquoise">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                          </div>
                        </div>
                      </div>

                      {/* Feedback */}
                      <div className="mt-auto space-y-4 pt-2 md:pt-4 border-t border-slate-100">
                          <h4 className="text-[9px] font-black text-uninunez-ceniza uppercase tracking-widest mb-3 flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-uninunez-orange"></div>
                             Cumplimiento PAT
                          </h4>
                          
                          <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-center">
                                  <span className="block text-[8px] font-black text-uninunez-ceniza uppercase mb-1">M1</span>
                                  <span className="text-sm font-black text-uninunez-turquoise">{assign.progress1 || 0}%</span>
                                </div>
                                <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-center">
                                  <span className="block text-[8px] font-black text-uninunez-ceniza uppercase mb-1">M2</span>
                                  <span className="text-sm font-black text-uninunez-orange">{assign.progress2 || 0}%</span>
                                </div>
                              </div>

                              <div className="bg-uninunez-onix rounded-2xl p-4 flex justify-between items-center shadow-xl border-b-4 border-uninunez-orange transition-transform active:scale-95">
                                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Total</span>
                                  <span className="text-2xl font-black text-white">{totalProgress}%</span>
                              </div>
                          </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
      </div>
    </div>
  );
};

export default TeacherPortal;