import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Assignment } from '../types';

const Assignments: React.FC = () => {
  const { assignments, activities, teachers, projects, addAssignment, updateAssignment, deleteAssignment, getAssignmentsByActivity } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [hoursError, setHoursError] = useState<string | null>(null);

  // Form State
  const initialFormState = {
    activityCatalogId: '',
    teacherId: '',
    projectId: '',
    allocatedHours: 0,
    startDate: '',
    endDate: '',
    goal: '',
    deliverable1: '',
    deliverable2: '',
    requiredFormats: '', 
    status: 'Planificado' as Assignment['status'],
    evidenceUrl: '',
    achievementDescription: '',
    review1Date: '',
    progress1: 0,
    observation1: '',
    review2Date: '',
    progress2: 0,
    observation2: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  // Calculate hours availability
  const checkHoursAvailability = (activityId: string, currentAssignId: string | null, newHours: number) => {
    const activity = activities.find(a => a.id === activityId);
    if (!activity) return true;

    const existingAssignments = getAssignmentsByActivity(activityId);
    const otherAssignmentsHours = existingAssignments
      .filter(a => a.id !== currentAssignId)
      .reduce((sum, a) => sum + a.allocatedHours, 0);

    const total = otherAssignmentsHours + newHours;
    if (total > activity.maxHours) {
      setHoursError(`Excede el máximo permitido (${activity.maxHours}h). Asignado actual: ${otherAssignmentsHours}h`);
      return false;
    }
    setHoursError(null);
    return true;
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(initialFormState);
    setHoursError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (a: Assignment) => {
    setEditingId(a.id);
    setFormData({
      activityCatalogId: a.activityCatalogId,
      teacherId: a.teacherId,
      projectId: a.projectId || '',
      allocatedHours: a.allocatedHours,
      startDate: a.startDate || '',
      endDate: a.endDate || '',
      goal: a.goal || '',
      deliverable1: a.deliverable1 || '',
      deliverable2: a.deliverable2 || '',
      requiredFormats: a.requiredFormats ? a.requiredFormats.join(', ') : '',
      status: a.status,
      evidenceUrl: a.evidenceUrl || '',
      achievementDescription: a.achievementDescription || '',
      review1Date: a.review1Date || '',
      progress1: a.progress1 || 0,
      observation1: a.observation1 || '',
      review2Date: a.review2Date || '',
      progress2: a.progress2 || 0,
      observation2: a.observation2 || ''
    });
    setHoursError(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Está seguro que desea eliminar esta asignación? Esta acción no se puede deshacer.')) {
      deleteAssignment(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!checkHoursAvailability(formData.activityCatalogId, editingId, formData.allocatedHours)) {
      return;
    }

    const payload: Assignment = {
      id: editingId || `AS-${Date.now()}`,
      activityCatalogId: formData.activityCatalogId,
      teacherId: formData.teacherId,
      projectId: formData.projectId || null,
      allocatedHours: formData.allocatedHours,
      startDate: formData.startDate,
      endDate: formData.endDate,
      goal: formData.goal,
      deliverable1: formData.deliverable1,
      deliverable2: formData.deliverable2,
      requiredFormats: formData.requiredFormats.split(',').map(s => s.trim()).filter(s => s),
      status: formData.status,
      evidenceUrl: formData.evidenceUrl || null,
      achievementDescription: formData.achievementDescription || null,
      review1Date: formData.review1Date || null,
      progress1: formData.progress1 || 0,
      observation1: formData.observation1 || null,
      review2Date: formData.review2Date || null,
      progress2: formData.progress2 || 0,
      observation2: formData.observation2 || null,
    };

    if (editingId) updateAssignment(payload);
    else addAssignment(payload);
    
    setIsModalOpen(false);
  };

  const totalProgress = (formData.progress1 || 0) + (formData.progress2 || 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800">Asignación y Evaluación (Líder)</h1>
        <button onClick={handleOpenCreate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          Nueva Asignación
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Docente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actividad</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase">Avance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Estado</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {assignments.map(assign => {
              const t = teachers.find(x => x.id === assign.teacherId);
              const a = activities.find(x => x.id === assign.activityCatalogId);
              const currentTotal = (assign.progress1 || 0) + (assign.progress2 || 0);
              
              return (
                <tr key={assign.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{t?.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate" title={a?.name}>{a?.name}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-bold text-slate-700">{currentTotal}%</span>
                      <div className="w-24 h-2 bg-slate-200 rounded-full mt-1">
                        <div className="h-full bg-blue-600 rounded-full" style={{width: `${currentTotal}%`}}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold 
                      ${assign.status === 'Completado' ? 'bg-green-100 text-green-800' : 
                        assign.status === 'En Progreso' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-slate-100 text-slate-800'}`}>
                      {assign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                    <button onClick={() => handleOpenEdit(assign)} className="text-blue-600 hover:text-blue-900 mr-3 flex inline-flex items-center">
                       <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                       Evaluar
                    </button>
                    <button onClick={() => handleDelete(assign.id)} className="text-red-600 hover:text-red-900">Borrar</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full p-6 my-8">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-xl font-bold text-slate-800">{editingId ? 'Evaluar y Gestionar Asignación' : 'Nueva Asignación'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Section 1: Assignment Definition */}
                <div className="space-y-4 lg:col-span-1 border-r border-slate-100 pr-4">
                  <h3 className="font-semibold text-slate-800 border-b pb-2 text-blue-600">1. Definición</h3>
                  
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Actividad</label>
                    <select required className="w-full border border-slate-300 bg-white text-slate-900 rounded text-sm p-2"
                      value={formData.activityCatalogId}
                      onChange={e => {
                        setFormData({...formData, activityCatalogId: e.target.value});
                        checkHoursAvailability(e.target.value, editingId, formData.allocatedHours);
                      }}
                    >
                      <option value="">Seleccionar...</option>
                      {activities.map(a => <option key={a.id} value={a.id}>{a.name} (Max {a.maxHours}h)</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Persona Responsable</label>
                    <select required className="w-full border border-slate-300 bg-white text-slate-900 rounded text-sm p-2"
                      value={formData.teacherId}
                      onChange={e => setFormData({...formData, teacherId: e.target.value})}
                    >
                      <option value="">Seleccionar...</option>
                      {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Proyecto (Opcional)</label>
                    <select className="w-full border border-slate-300 bg-white text-slate-900 rounded text-sm p-2"
                      value={formData.projectId}
                      onChange={e => setFormData({...formData, projectId: e.target.value})}
                    >
                      <option value="">Sin Proyecto</option>
                      {projects.map(p => <option key={p.id} value={p.id}>{p.code}</option>)}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Horas</label>
                      <input type="number" min="1" required className="w-full border border-slate-300 bg-white text-slate-900 rounded text-sm p-2"
                        value={formData.allocatedHours}
                        onChange={e => {
                          const h = parseInt(e.target.value) || 0;
                          setFormData({...formData, allocatedHours: h});
                          checkHoursAvailability(formData.activityCatalogId, editingId, h);
                        }}
                      />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Estado</label>
                        <select className="w-full border border-slate-300 bg-white text-slate-900 rounded text-sm p-2"
                            value={formData.status} 
                            onChange={e => setFormData({...formData, status: e.target.value as any})}
                        >
                            <option value="Planificado">Planificado</option>
                            <option value="En Progreso">En Progreso</option>
                            <option value="Completado">Completado</option>
                        </select>
                    </div>
                  </div>
                   {hoursError && <p className="text-red-500 text-xs">{hoursError}</p>}
                </div>

                {/* Section 2: Requirements & Deliverables */}
                <div className="space-y-4 lg:col-span-1 border-r border-slate-100 pr-4">
                   <h3 className="font-semibold text-slate-800 border-b pb-2 text-blue-600">2. Requerimientos</h3>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Meta</label>
                      <textarea className="w-full border border-slate-300 bg-white text-slate-900 rounded text-sm p-2" rows={2}
                        value={formData.goal} onChange={e => setFormData({...formData, goal: e.target.value})} />
                    </div>
                     <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Entregable 1</label>
                      <input type="text" className="w-full border border-slate-300 bg-white text-slate-900 rounded text-sm p-2"
                        value={formData.deliverable1} onChange={e => setFormData({...formData, deliverable1: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Entregable 2</label>
                      <input type="text" className="w-full border border-slate-300 bg-white text-slate-900 rounded text-sm p-2"
                        value={formData.deliverable2} onChange={e => setFormData({...formData, deliverable2: e.target.value})} />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Formatos (sep. por comas)</label>
                        <input type="text" className="w-full border border-slate-300 bg-white text-slate-900 rounded text-sm p-2"
                            value={formData.requiredFormats} onChange={e => setFormData({...formData, requiredFormats: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Inicio</label>
                            <input type="date" required className="w-full border border-slate-300 bg-white text-slate-900 rounded text-sm p-2" 
                            value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} />
                        </div>
                         <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Fin</label>
                            <input type="date" required className="w-full border border-slate-300 bg-white text-slate-900 rounded text-sm p-2"
                            value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} />
                        </div>
                    </div>
                </div>

                {/* Section 3: Evidence & Evaluation */}
                <div className="space-y-4 lg:col-span-1 bg-blue-50 p-4 rounded-lg border border-blue-100">
                   <h3 className="font-semibold text-slate-800 border-b border-blue-200 pb-2 mb-2 flex justify-between items-center">
                      <span className="text-blue-800">3. Evaluación y Seguimiento</span>
                      <span className={`text-sm font-bold ${totalProgress === 100 ? 'text-green-600' : 'text-blue-600'}`}>
                            Total: {totalProgress}%
                      </span>
                   </h3>
                   
                   {/* Evidence (Read Only mostly for leader, but editable here just in case) */}
                   <div className="bg-white p-3 rounded border border-slate-200 shadow-sm mb-4">
                      <div className="flex justify-between mb-2">
                        <label className="block text-xs font-bold text-slate-700">Evidencia (Link Drive)</label>
                        {formData.evidenceUrl && (
                              <a href={formData.evidenceUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-xs flex items-center">
                                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                  Abrir
                              </a>
                          )}
                      </div>
                      <div className="mb-2">
                          <input type="url" className="w-full border border-slate-300 bg-slate-50 text-slate-900 rounded text-xs p-2" 
                              value={formData.evidenceUrl} onChange={e => setFormData({...formData, evidenceUrl: e.target.value})} 
                              placeholder="https://..."
                          />
                      </div>
                      <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Logro del Docente</label>
                          <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded border border-slate-100 italic min-h-[40px]">
                            {formData.achievementDescription || "Sin descripción ingresada por el docente."}
                          </p>
                      </div>
                   </div>

                    {/* Moment 1 Evaluation */}
                    <div className="bg-white p-3 rounded border border-slate-200 shadow-sm">
                        <div className="text-xs font-bold text-slate-700 uppercase mb-2 border-b pb-1">Momento 1 (Max 50%)</div>
                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <div>
                                <label className="block text-[10px] text-slate-500">Fecha Revisión</label>
                                <input type="date" className="w-full border border-slate-300 bg-white text-slate-900 rounded text-xs p-1"
                                    value={formData.review1Date} onChange={e => setFormData({...formData, review1Date: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-[10px] text-slate-500">Avance (%)</label>
                                <input type="number" min="0" max="50" className="w-full border border-slate-300 bg-white text-slate-900 rounded text-xs p-1"
                                    value={formData.progress1} onChange={e => {
                                        const val = Math.min(50, Math.max(0, parseInt(e.target.value) || 0));
                                        setFormData({...formData, progress1: val});
                                    }} />
                            </div>
                        </div>
                        <div>
                           <label className="block text-[10px] text-slate-500 mb-1">Observaciones del Líder</label>
                           <textarea className="w-full border border-slate-300 bg-white text-slate-900 rounded text-xs p-2" rows={2}
                              placeholder="Retroalimentación para el docente..."
                              value={formData.observation1} onChange={e => setFormData({...formData, observation1: e.target.value})}
                           />
                        </div>
                    </div>

                    {/* Moment 2 Evaluation */}
                    <div className="bg-white p-3 rounded border border-slate-200 shadow-sm">
                        <div className="text-xs font-bold text-slate-700 uppercase mb-2 border-b pb-1">Momento 2 (Max 50%)</div>
                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <div>
                                <label className="block text-[10px] text-slate-500">Fecha Revisión</label>
                                <input type="date" className="w-full border border-slate-300 bg-white text-slate-900 rounded text-xs p-1"
                                    value={formData.review2Date} onChange={e => setFormData({...formData, review2Date: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-[10px] text-slate-500">Avance (%)</label>
                                <input type="number" min="0" max="50" className="w-full border border-slate-300 bg-white text-slate-900 rounded text-xs p-1"
                                    value={formData.progress2} onChange={e => {
                                        const val = Math.min(50, Math.max(0, parseInt(e.target.value) || 0));
                                        setFormData({...formData, progress2: val});
                                    }} />
                            </div>
                        </div>
                        <div>
                           <label className="block text-[10px] text-slate-500 mb-1">Observaciones del Líder</label>
                           <textarea className="w-full border border-slate-300 bg-white text-slate-900 rounded text-xs p-2" rows={2}
                              placeholder="Retroalimentación para el docente..."
                              value={formData.observation2} onChange={e => setFormData({...formData, observation2: e.target.value})}
                           />
                        </div>
                    </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 border-t pt-6 mt-6">
                 <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded">Cancelar</button>
                 <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium">Guardar Todo</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignments;