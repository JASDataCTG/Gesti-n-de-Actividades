
import React from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Assignment } from '../types';

const TeacherPortal: React.FC = () => {
  const { assignments, activities, updateAssignment } = useData();
  const { currentUser } = useAuth();

  if (!currentUser) return <div>No autorizado</div>;

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
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800">Mi Portal de Actividades</h1>
        <p className="text-slate-500 mt-1">Gestione sus avances, evidencias y logros.</p>
      </div>

      <div className="space-y-6">
          {myAssignments.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-slate-200">
              <svg className="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              <p className="text-lg text-slate-500">No tiene actividades asignadas actualmente.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {myAssignments.map(assign => {
                const act = activities.find(a => a.id === assign.activityCatalogId);
                const totalProgress = (assign.progress1 || 0) + (assign.progress2 || 0);

                return (
                  <div key={assign.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row gap-6">
                    {/* Left Column: Info & Description */}
                    <div className="flex-1 space-y-4">
                      <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">
                                {assign.allocatedHours} Horas
                            </span>
                            <span className="text-slate-500 text-xs font-medium bg-slate-100 px-2 py-1 rounded">
                                {assign.startDate} / {assign.endDate}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-bold ${act?.area === 'Investigación' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-700'}`}>
                                {act?.area}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 mb-2">{act?.name}</h3>
                          <p className="text-sm text-slate-600 mb-4 leading-relaxed">{act?.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-slate-50 p-4 rounded-lg border border-slate-100">
                          <div>
                            <span className="font-semibold block text-slate-800 mb-1">Meta:</span>
                            <p className="text-slate-600">{assign.goal || 'No definida'}</p>
                          </div>
                          <div>
                            <span className="font-semibold block text-slate-800 mb-1">Formatos Requeridos:</span>
                            <p className="text-slate-600">{assign.requiredFormats.join(', ') || 'Ninguno'}</p>
                          </div>
                      </div>

                      <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Descripción del Logro (Docente)</label>
                          <textarea 
                              className="w-full border border-slate-300 bg-white text-slate-900 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow shadow-sm"
                              rows={3}
                              placeholder="Describa aquí los avances y logros obtenidos..."
                              value={assign.achievementDescription || ''}
                              onChange={(e) => handleDescriptionChange(assign, e.target.value)}
                          />
                      </div>
                    </div>

                    {/* Right Column: Actions & Status */}
                    <div className="w-full md:w-80 flex flex-col gap-5 md:border-l md:pl-6 border-slate-100">
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Estado Actual</label>
                        <select 
                          className="w-full border border-slate-300 bg-white text-slate-900 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                          value={assign.status}
                          onChange={(e) => handleStatusChange(assign, e.target.value as Assignment['status'])}
                        >
                          <option value="Planificado">Planificado</option>
                          <option value="En Progreso">En Progreso</option>
                          <option value="Completado">Completado</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Evidencia (Link Drive)</label>
                        <div className="relative">
                          <input 
                            type="url" 
                            placeholder="https://drive.google.com/..."
                            className="w-full border border-slate-300 bg-white text-slate-900 rounded-lg pl-3 pr-10 py-2 text-sm focus:ring-2 focus:ring-blue-500 shadow-sm"
                            value={assign.evidenceUrl || ''}
                            onChange={(e) => handleUrlChange(assign, e.target.value)}
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Pegue el enlace a la carpeta de evidencias.</p>
                      </div>

                      {/* Evaluation Feedback Section (Read Only) */}
                      <div className="mt-auto pt-4 border-t border-slate-200">
                          <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">Evaluación y Observaciones</h4>
                          
                          <div className="space-y-4">
                              <div>
                                  <div className="flex justify-between text-xs mb-1 text-slate-700">
                                      <span>Momento 1</span>
                                      <span className="font-semibold">{assign.progress1 || 0}% / 50%</span>
                                  </div>
                                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden mb-1">
                                      <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{width: `${(assign.progress1 || 0) * 2}%`}}></div>
                                  </div>
                                  {assign.review1Date && <div className="text-[10px] text-slate-400 text-right">Rev: {assign.review1Date}</div>}
                                  {assign.observation1 && (
                                    <div className="bg-yellow-50 border border-yellow-100 p-2 rounded mt-1">
                                      <p className="text-[11px] text-slate-700 italic">"{assign.observation1}"</p>
                                    </div>
                                  )}
                              </div>

                              <div>
                                  <div className="flex justify-between text-xs mb-1 text-slate-700">
                                      <span>Momento 2</span>
                                      <span className="font-semibold">{assign.progress2 || 0}% / 50%</span>
                                  </div>
                                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden mb-1">
                                      <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{width: `${(assign.progress2 || 0) * 2}%`}}></div>
                                  </div>
                                  {assign.review2Date && <div className="text-[10px] text-slate-400 text-right">Rev: {assign.review2Date}</div>}
                                  {assign.observation2 && (
                                    <div className="bg-yellow-50 border border-yellow-100 p-2 rounded mt-1">
                                      <p className="text-[11px] text-slate-700 italic">"{assign.observation2}"</p>
                                    </div>
                                  )}
                              </div>

                              <div className="bg-blue-50 rounded-lg p-2 flex justify-between items-center border border-blue-100">
                                  <span className="text-xs font-bold text-blue-800">Total Acumulado</span>
                                  <span className="text-lg font-bold text-blue-700">{totalProgress}%</span>
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
