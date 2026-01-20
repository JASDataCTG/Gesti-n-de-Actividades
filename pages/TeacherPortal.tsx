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
    <div className="space-y-8 pb-20">
      <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-uninunez-orange/5 rounded-full -mr-10 -mt-10"></div>
        <h1 className="text-3xl font-black text-uninunez-onix font-heading uppercase tracking-tight">Mi Portafolio CTeI</h1>
        <p className="text-uninunez-ceniza mt-1 font-medium italic">Docente: {currentUser.name}</p>
        <div className="h-1.5 w-24 bg-uninunez-orange mt-4 rounded-full"></div>
      </div>

      <div className="grid gap-8">
          {myAssignments.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[2rem] shadow-lg border border-slate-100">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              </div>
              <p className="text-xl font-bold text-slate-400">Actualmente no tiene actividades asignadas.</p>
              <p className="text-slate-300 text-sm mt-2 font-medium">Contacte a su líder de área para más información.</p>
            </div>
          ) : (
            <div className="grid gap-8">
              {myAssignments.map(assign => {
                const act = activities.find(a => a.id === assign.activityCatalogId);
                const totalProgress = (assign.progress1 || 0) + (assign.progress2 || 0);

                return (
                  <div key={assign.id} className="bg-white rounded-[2rem] shadow-2xl border border-white p-8 flex flex-col lg:flex-row gap-10 hover:shadow-uninunez-orange/10 transition-shadow">
                    
                    {/* Contenido Principal */}
                    <div className="flex-1 space-y-6">
                      <div className="flex flex-wrap items-center gap-3">
                          <span className="bg-uninunez-orange text-white text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest shadow-md">
                              {assign.allocatedHours} Horas
                          </span>
                          <span className="bg-uninunez-turquoise text-white text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest shadow-md">
                              {act?.area}
                          </span>
                          <span className="text-[10px] font-black text-uninunez-ceniza bg-slate-50 px-3 py-1 rounded-lg border border-slate-100 flex items-center gap-1.5">
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                              {assign.startDate} al {assign.endDate}
                          </span>
                      </div>

                      <div>
                          <h3 className="text-2xl font-black text-uninunez-onix mb-3 font-heading uppercase leading-tight">{act?.name}</h3>
                          <p className="text-slate-500 text-sm font-medium leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">{act?.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-white border-2 border-uninunez-turquoise/10 p-5 rounded-2xl shadow-sm">
                            <span className="text-[10px] font-black text-uninunez-turquoise uppercase tracking-widest block mb-2">Meta de Cumplimiento</span>
                            <p className="text-uninunez-ceniza text-sm font-bold leading-snug">{assign.goal || 'No definida por el líder.'}</p>
                          </div>
                          <div className="bg-white border-2 border-uninunez-orange/10 p-5 rounded-2xl shadow-sm">
                            <span className="text-[10px] font-black text-uninunez-orange uppercase tracking-widest block mb-2">Entregables Clave</span>
                            <div className="space-y-1.5">
                                <p className="text-slate-600 text-[11px] font-bold">1. {assign.deliverable1 || 'N/A'}</p>
                                <p className="text-slate-600 text-[11px] font-bold">2. {assign.deliverable2 || 'N/A'}</p>
                            </div>
                          </div>
                      </div>

                      <div>
                          <label className="block text-[10px] font-black text-uninunez-ceniza uppercase tracking-widest mb-2 ml-1">Informe de Logros del Docente</label>
                          <textarea 
                              className="w-full border-2 border-slate-100 bg-slate-50 text-slate-800 rounded-[1.5rem] p-5 text-sm font-medium focus:ring-4 focus:ring-uninunez-orange/10 focus:border-uninunez-orange focus:bg-white outline-none transition-all shadow-inner"
                              rows={4}
                              placeholder="Redacte aquí sus avances detallados y logros alcanzados..."
                              value={assign.achievementDescription || ''}
                              onChange={(e) => handleDescriptionChange(assign, e.target.value)}
                          />
                      </div>
                    </div>

                    {/* Gestión y Status */}
                    <div className="w-full lg:w-[320px] flex flex-col gap-6 lg:border-l lg:pl-10 border-slate-50">
                      <div className="bg-uninunez-onix p-6 rounded-3xl shadow-xl text-white">
                        <label className="block text-[10px] font-black text-uninunez-orange uppercase tracking-[0.2em] mb-3">Estado de Gestión</label>
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

                      <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <label className="block text-[10px] font-black text-uninunez-ceniza uppercase tracking-widest mb-3">Repositorio de Evidencias</label>
                        <div className="relative group">
                          <input 
                            type="url" 
                            placeholder="URL de carpeta Drive/Sharepoint"
                            className="w-full border-2 border-white bg-white rounded-2xl pl-4 pr-12 py-4 text-xs font-bold text-uninunez-turquoise focus:ring-4 focus:ring-uninunez-turquoise/10 focus:border-uninunez-turquoise outline-none shadow-sm group-hover:shadow-md transition-all"
                            value={assign.evidenceUrl || ''}
                            onChange={(e) => handleUrlChange(assign, e.target.value)}
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-uninunez-turquoise">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-3 font-medium text-center italic">Pegue el enlace compartido para validación del líder.</p>
                      </div>

                      {/* Feedback del Líder */}
                      <div className="mt-auto space-y-5 pt-4 border-t border-slate-100">
                          <h4 className="text-[10px] font-black text-uninunez-ceniza uppercase tracking-widest mb-4 flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-uninunez-orange"></div>
                             Calificación y Feedback
                          </h4>
                          
                          <div className="space-y-6">
                              <div>
                                  <div className="flex justify-between text-[11px] mb-2 font-black text-uninunez-onix uppercase tracking-tighter">
                                      <span>Evaluación M1</span>
                                      <span className="text-uninunez-turquoise">{assign.progress1 || 0}% / 50%</span>
                                  </div>
                                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden shadow-inner border border-white">
                                      <div className="bg-uninunez-turquoise h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(20,170,159,0.3)]" style={{width: `${(assign.progress1 || 0) * 2}%`}}></div>
                                  </div>
                                  {assign.observation1 && (
                                    <div className="bg-slate-50 border-l-4 border-uninunez-turquoise p-3 rounded-r-xl mt-3">
                                      <p className="text-[11px] text-slate-600 font-bold italic leading-snug">"{assign.observation1}"</p>
                                    </div>
                                  )}
                              </div>

                              <div>
                                  <div className="flex justify-between text-[11px] mb-2 font-black text-uninunez-onix uppercase tracking-tighter">
                                      <span>Evaluación M2</span>
                                      <span className="text-uninunez-orange">{assign.progress2 || 0}% / 50%</span>
                                  </div>
                                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden shadow-inner border border-white">
                                      <div className="bg-uninunez-orange h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(240,126,18,0.3)]" style={{width: `${(assign.progress2 || 0) * 2}%`}}></div>
                                  </div>
                                  {assign.observation2 && (
                                    <div className="bg-slate-50 border-l-4 border-uninunez-orange p-3 rounded-r-xl mt-3">
                                      <p className="text-[11px] text-slate-600 font-bold italic leading-snug">"{assign.observation2}"</p>
                                    </div>
                                  )}
                              </div>

                              <div className="bg-uninunez-onix rounded-2xl p-5 flex justify-between items-center shadow-xl border-b-4 border-uninunez-orange transition-transform hover:scale-[1.02]">
                                  <span className="text-xs font-black text-white uppercase tracking-widest">Cumplimiento Total</span>
                                  <span className={`text-3xl font-black ${totalProgress >= 80 ? 'text-uninunez-green-jade' : 'text-white'}`}>{totalProgress}%</span>
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