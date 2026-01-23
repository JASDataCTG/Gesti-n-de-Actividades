
import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Assignment, ActivityArea } from '../types';

const Assignments: React.FC = () => {
  const { assignments, activities, teachers, projects, addAssignment, updateAssignment, deleteAssignment, getAssignmentsByActivity } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [hoursError, setHoursError] = useState<string | null>(null);
  const [selectedAreaFilter, setSelectedAreaFilter] = useState<string>('Todas');
  const [selectedTeacherFilter, setSelectedTeacherFilter] = useState<string>('Todos');
  const [formAreaFilter, setFormAreaFilter] = useState<string>('');

  const AREAS: ActivityArea[] = [
    'Desarrollo Académico',
    'Investigación',
    'Egresados',
    'Proyección Social',
    'Visibilidad Nacional e Internacional',
    'Vida Universitaria'
  ];

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

  // Define totalProgress to fix the reference errors on lines 380 and 381
  const totalProgress = (formData.progress1 || 0) + (formData.progress2 || 0);

  const getPreviousAssignmentForActivity = (activityId: string) => {
    const activityAssignments = assignments
      .filter(a => a.activityCatalogId === activityId)
      .sort((a, b) => b.id.localeCompare(a.id));
    return activityAssignments.length > 0 ? activityAssignments[0] : null;
  };

  const handleLoadTemplate = () => {
    const prev = getPreviousAssignmentForActivity(formData.activityCatalogId);
    if (prev) {
      setFormData(prevData => ({
        ...prevData,
        goal: prev.goal || '',
        deliverable1: prev.deliverable1 || '',
        deliverable2: prev.deliverable2 || '',
        requiredFormats: prev.requiredFormats ? prev.requiredFormats.join(', ') : '',
        startDate: prev.startDate || '',
        endDate: prev.endDate || '',
      }));
    }
  };

  const checkHoursAvailability = (activityId: string, currentAssignId: string | null, newHours: number) => {
    const activity = activities.find(a => a.id === activityId);
    if (!activity) return true;
    const existingAssignments = getAssignmentsByActivity(activityId);
    const otherAssignmentsHours = existingAssignments
      .filter(a => a.id !== currentAssignId)
      .reduce((sum, a) => sum + a.allocatedHours, 0);
    const total = otherAssignmentsHours + newHours;
    if (total > activity.maxHours) {
      setHoursError(`Excede máximo permitido (${activity.maxHours}h). Asignado: ${otherAssignmentsHours}h`);
      return false;
    }
    setHoursError(null);
    return true;
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(initialFormState);
    setFormAreaFilter('');
    setHoursError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (a: Assignment) => {
    setEditingId(a.id);
    const activity = activities.find(act => act.id === a.activityCatalogId);
    setFormAreaFilter(activity?.area || '');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkHoursAvailability(formData.activityCatalogId, editingId, formData.allocatedHours)) return;
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

  const filteredAssignments = assignments.filter(assign => {
      const areaMatch = selectedAreaFilter === 'Todas' || activities.find(a => a.id === assign.activityCatalogId)?.area === selectedAreaFilter;
      const teacherMatch = selectedTeacherFilter === 'Todos' || assign.teacherId === selectedTeacherFilter;
      return areaMatch && teacherMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-uninunez-onix font-heading uppercase tracking-tight leading-tight">Asignación y Seguimiento</h1>
          <div className="h-1.5 w-16 bg-uninunez-turquoise mt-2 rounded-full"></div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <select 
                className="w-full sm:w-auto border-2 border-slate-200 rounded-xl px-4 py-2 bg-white text-slate-700 font-bold text-xs focus:ring-4 focus:ring-uninunez-turquoise/20 focus:border-uninunez-turquoise outline-none"
                value={selectedTeacherFilter}
                onChange={(e) => setSelectedTeacherFilter(e.target.value)}
            >
                <option value="Todos">Todos los Docentes</option>
                {teachers.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                ))}
            </select>

            <select 
                className="w-full sm:w-auto border-2 border-slate-200 rounded-xl px-4 py-2 bg-white text-slate-700 font-bold text-xs focus:ring-4 focus:ring-uninunez-turquoise/20 focus:border-uninunez-turquoise outline-none"
                value={selectedAreaFilter}
                onChange={(e) => setSelectedAreaFilter(e.target.value)}
            >
                <option value="Todas">Todas las Áreas</option>
                {AREAS.map(area => (
                    <option key={area} value={area}>{area}</option>
                ))}
            </select>

            <button onClick={handleOpenCreate} className="bg-uninunez-orange hover:bg-uninunez-orange-light text-white px-6 py-3 rounded-xl font-black shadow-lg flex items-center justify-center whitespace-nowrap text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
              Nueva Asignación
            </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 md:px-6 py-4 text-left text-[10px] font-black text-uninunez-ceniza uppercase tracking-widest">Docente / Área</th>
                <th className="px-4 md:px-6 py-4 text-left text-[10px] font-black text-uninunez-ceniza uppercase tracking-widest hidden sm:table-cell">Actividad</th>
                <th className="px-4 md:px-6 py-4 text-center text-[10px] font-black text-uninunez-ceniza uppercase tracking-widest">Avance</th>
                <th className="px-4 md:px-6 py-4 text-left text-[10px] font-black text-uninunez-ceniza uppercase tracking-widest hidden md:table-cell">Estado</th>
                <th className="px-4 md:px-6 py-4 text-right text-[10px] font-black text-uninunez-ceniza uppercase tracking-widest">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredAssignments.map(assign => {
                const t = teachers.find(x => x.id === assign.teacherId);
                const a = activities.find(x => x.id === assign.activityCatalogId);
                const currentTotal = (assign.progress1 || 0) + (assign.progress2 || 0);
                return (
                  <tr key={assign.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 md:px-6 py-5">
                      <div className="font-bold text-uninunez-onix text-sm truncate max-w-[120px] sm:max-w-none">{t?.name}</div>
                      <div className="text-[9px] font-black text-uninunez-turquoise uppercase tracking-tight mt-0.5">{a?.area}</div>
                    </td>
                    <td className="px-4 md:px-6 py-5 hidden sm:table-cell">
                      <div className="text-sm text-slate-600 font-medium max-w-[200px] truncate" title={a?.name}>{a?.name}</div>
                    </td>
                    <td className="px-4 md:px-6 py-5">
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-black text-uninunez-onix mb-1">{currentTotal}%</span>
                        <div className="w-16 md:w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner border border-slate-50">
                          <div className={`h-full rounded-full transition-all duration-700 ${currentTotal === 100 ? 'bg-uninunez-green-jade' : 'bg-uninunez-orange'}`} style={{width: `${currentTotal}%`}}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-5 hidden md:table-cell">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter
                        ${assign.status === 'Completado' ? 'bg-uninunez-green-jade/10 text-uninunez-green-jade' : 
                          assign.status === 'En Progreso' ? 'bg-uninunez-orange/10 text-uninunez-orange' : 
                          'bg-slate-100 text-slate-500'}`}>
                        {assign.status}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-5 text-right whitespace-nowrap">
                      <button onClick={() => handleOpenEdit(assign)} className="text-uninunez-turquoise hover:text-uninunez-turquoise-dark font-black text-[10px] uppercase tracking-widest p-2 rounded-lg hover:bg-uninunez-turquoise/5 transition-colors">
                         <svg className="w-5 h-5 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                         <span className="hidden sm:inline ml-1">Gestionar</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredAssignments.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-400 font-medium italic">
                    No se encontraron asignaciones con los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-uninunez-onix/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl max-w-6xl w-full p-6 md:p-8 my-0 sm:my-8 border border-white max-h-[95vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl md:text-2xl font-black text-uninunez-onix font-heading uppercase tracking-tight">{editingId ? 'Evaluación' : 'Nueva Asignación'}</h2>
                <p className="text-uninunez-ceniza text-xs font-medium mt-1">Gestión del Plan de Acción y Trabajo (PAT)</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="bg-slate-100 hover:bg-slate-200 p-3 rounded-2xl transition-colors">
                <svg className="w-6 h-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                {/* Panel 1 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-7 h-7 rounded-lg bg-uninunez-orange flex items-center justify-center text-white font-bold text-xs">1</div>
                    <h3 className="font-black text-uninunez-onix uppercase text-[10px] tracking-widest">Actividad</h3>
                  </div>
                  <div className="bg-slate-50 p-5 md:p-6 rounded-2xl border border-slate-100 space-y-4">
                    <div>
                      <label className="block text-[10px] font-black text-uninunez-ceniza uppercase mb-1.5">Área Operativa</label>
                      <select className="w-full border-2 border-white bg-white rounded-xl text-sm p-3 font-bold focus:ring-4 focus:ring-uninunez-orange/10 focus:border-uninunez-orange outline-none shadow-sm"
                        value={formAreaFilter}
                        onChange={e => { setFormAreaFilter(e.target.value); setFormData({...formData, activityCatalogId: ''}); }}
                      >
                        <option value="">Todas las Áreas</option>
                        {AREAS.map(area => <option key={area} value={area}>{area}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-uninunez-ceniza uppercase mb-1.5">Actividad Específica</label>
                      <select required className="w-full border-2 border-white bg-white rounded-xl text-sm p-3 font-bold focus:ring-4 focus:ring-uninunez-orange/10 focus:border-uninunez-orange outline-none shadow-sm"
                        value={formData.activityCatalogId}
                        onChange={e => { setFormData({...formData, activityCatalogId: e.target.value}); checkHoursAvailability(e.target.value, editingId, formData.allocatedHours); }}
                      >
                        <option value="">Seleccionar...</option>
                        {activities.filter(a => !formAreaFilter || a.area === formAreaFilter).map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-uninunez-ceniza uppercase mb-1.5">Responsable</label>
                      <select required className="w-full border-2 border-white bg-white rounded-xl text-sm p-3 font-bold focus:ring-4 focus:ring-uninunez-orange/10 focus:border-uninunez-orange outline-none shadow-sm"
                        value={formData.teacherId}
                        onChange={e => setFormData({...formData, teacherId: e.target.value})}
                      >
                        <option value="">Seleccionar...</option>
                        {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-uninunez-ceniza uppercase mb-1.5">Horas</label>
                        <input type="number" min="1" className="w-full border-2 border-white bg-white rounded-xl text-sm p-3 font-bold focus:ring-4 focus:ring-uninunez-orange/10 focus:border-uninunez-orange outline-none shadow-sm"
                          value={formData.allocatedHours}
                          onChange={e => { const h = parseInt(e.target.value) || 0; setFormData({...formData, allocatedHours: h}); checkHoursAvailability(formData.activityCatalogId, editingId, h); }}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-uninunez-ceniza uppercase mb-1.5">Estado</label>
                        <select className="w-full border-2 border-white bg-white rounded-xl text-sm p-3 font-bold focus:ring-4 focus:ring-uninunez-orange/10 focus:border-uninunez-orange outline-none shadow-sm"
                            value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})}
                        >
                            <option value="Planificado">Planificado</option>
                            <option value="En Progreso">En Progreso</option>
                            <option value="Completado">Completado</option>
                        </select>
                      </div>
                    </div>
                    {hoursError && <p className="bg-red-50 text-red-500 text-[10px] font-bold p-2 rounded-lg border border-red-100">{hoursError}</p>}
                  </div>
                </div>

                {/* Panel 2 */}
                <div className="space-y-4">
                   <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-uninunez-turquoise flex items-center justify-center text-white font-bold text-xs">2</div>
                        <h3 className="font-black text-uninunez-onix uppercase text-[10px] tracking-widest">Metas</h3>
                      </div>
                      <button type="button" onClick={handleLoadTemplate} className="text-[8px] bg-uninunez-turquoise/10 text-uninunez-turquoise px-2 py-1.5 rounded-lg border border-uninunez-turquoise/20 font-black uppercase tracking-widest hover:bg-uninunez-turquoise hover:text-white transition-all">
                        Plantilla
                      </button>
                   </div>
                   <div className="bg-slate-50 p-5 md:p-6 rounded-2xl border border-slate-100 space-y-4">
                      <div>
                        <label className="block text-[10px] font-black text-uninunez-ceniza uppercase mb-1.5">Meta PAT</label>
                        <textarea className="w-full border-2 border-white bg-white rounded-xl text-sm p-3 font-medium focus:ring-4 focus:ring-uninunez-turquoise/10 focus:border-uninunez-turquoise outline-none transition-all shadow-sm" rows={2}
                          value={formData.goal} onChange={e => setFormData({...formData, goal: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-uninunez-ceniza uppercase mb-1.5">Entregable M1</label>
                        <input type="text" className="w-full border-2 border-white bg-white rounded-xl text-sm p-3 font-medium focus:ring-4 focus:ring-uninunez-turquoise/10 focus:border-uninunez-turquoise outline-none shadow-sm"
                          value={formData.deliverable1} onChange={e => setFormData({...formData, deliverable1: e.target.value})} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-black text-uninunez-ceniza uppercase mb-1.5">Inicio</label>
                            <input type="date" required className="w-full border-2 border-white bg-white rounded-xl text-[11px] p-3 font-bold focus:ring-4 focus:ring-uninunez-turquoise/10 focus:border-uninunez-turquoise outline-none shadow-sm" 
                            value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} />
                        </div>
                         <div>
                            <label className="block text-[10px] font-black text-uninunez-ceniza uppercase mb-1.5">Fin</label>
                            <input type="date" required className="w-full border-2 border-white bg-white rounded-xl text-[11px] p-3 font-bold focus:ring-4 focus:ring-uninunez-turquoise/10 focus:border-uninunez-turquoise outline-none shadow-sm"
                            value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} />
                        </div>
                      </div>
                   </div>
                </div>

                {/* Panel 3 */}
                <div className="space-y-4">
                   <div className="flex items-center gap-3 mb-1">
                    <div className="w-7 h-7 rounded-lg bg-uninunez-green-jade flex items-center justify-center text-white font-bold text-xs">3</div>
                    <h3 className="font-black text-uninunez-onix uppercase text-[10px] tracking-widest">Seguimiento</h3>
                  </div>
                   <div className="bg-uninunez-green-jade/5 p-5 md:p-6 rounded-3xl border border-uninunez-green-jade/10 space-y-4">
                        <div className="flex justify-between items-center mb-2 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                             <span className="text-[10px] font-black text-uninunez-ceniza uppercase tracking-widest">Logro Total</span>
                             <span className={`text-2xl font-black ${totalProgress === 100 ? 'text-uninunez-green-jade' : 'text-uninunez-orange'}`}>
                                {totalProgress}%
                             </span>
                        </div>

                        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                            <div className="flex justify-between items-center border-b pb-2">
                                <span className="text-[9px] font-black text-uninunez-ceniza uppercase">Momento 1</span>
                                <input type="number" min="0" max="50" className="w-16 border-2 border-slate-50 bg-slate-50 rounded-lg text-center text-xs font-black p-1 focus:border-uninunez-turquoise outline-none"
                                    value={formData.progress1} onChange={e => setFormData({...formData, progress1: Math.min(50, Math.max(0, parseInt(e.target.value) || 0))})} />
                            </div>
                            <textarea className="w-full bg-slate-50 border-none rounded-xl text-[10px] p-2 font-medium placeholder:text-slate-300 focus:ring-2 focus:ring-uninunez-turquoise/20 outline-none" rows={2}
                              placeholder="Observaciones de revisión..."
                              value={formData.observation1} onChange={e => setFormData({...formData, observation1: e.target.value})}
                           />
                        </div>

                        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                            <div className="flex justify-between items-center border-b pb-2">
                                <span className="text-[9px] font-black text-uninunez-ceniza uppercase">Momento 2</span>
                                <input type="number" min="0" max="50" className="w-16 border-2 border-slate-50 bg-slate-50 rounded-lg text-center text-xs font-black p-1 focus:border-uninunez-turquoise outline-none"
                                    value={formData.progress2} onChange={e => setFormData({...formData, progress2: Math.min(50, Math.max(0, parseInt(e.target.value) || 0))})} />
                            </div>
                        </div>

                        {formData.evidenceUrl && (
                          <div className="pt-2">
                            <a href={formData.evidenceUrl} target="_blank" rel="noreferrer" className="w-full bg-uninunez-turquoise text-white p-3 rounded-xl flex items-center justify-center gap-2 font-black text-[9px] uppercase tracking-widest shadow-lg shadow-uninunez-turquoise/20">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                Ver Evidencia
                            </a>
                          </div>
                        )}
                   </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 border-t border-slate-100 pt-6 mt-4 pb-8 sm:pb-0">
                 <button type="button" onClick={() => setIsModalOpen(false)} className="w-full sm:w-auto px-8 py-4 text-uninunez-ceniza font-black uppercase text-xs tracking-widest hover:bg-slate-100 rounded-2xl transition-all">Cancelar</button>
                 <button type="submit" className="w-full sm:w-auto px-10 py-4 bg-uninunez-orange text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:shadow-uninunez-orange/30 transition-all">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignments;
