import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { AssignmentReportRow, ActivityArea } from '../types';

const Reports: React.FC = () => {
  const { assignments, teachers, activities, projects } = useData();
  const { role, currentUser } = useAuth();
  const [selectedItem, setSelectedItem] = useState<AssignmentReportRow | null>(null);
  const [selectedAreaFilter, setSelectedAreaFilter] = useState<string>('Todas');

  const AREAS: ActivityArea[] = [
    'Desarrollo Académico',
    'Investigación',
    'Egresados',
    'Proyección Social',
    'Visibilidad Nacional e Internacional',
    'Vida Universitaria'
  ];

  // 1. First Filter: Based on Role
  const roleFilteredAssignments = (role === 'teacher' && currentUser)
    ? assignments.filter(a => a.teacherId === currentUser.id)
    : assignments;

  // 2. Second Filter: Based on Area Selection
  const filteredAssignments = roleFilteredAssignments.filter(a => {
      if (selectedAreaFilter === 'Todas') return true;
      const activity = activities.find(ac => ac.id === a.activityCatalogId);
      return activity?.area === selectedAreaFilter;
  });

  const reportData: AssignmentReportRow[] = filteredAssignments.map(a => {
    const activity = activities.find(ac => ac.id === a.activityCatalogId);
    return {
      ...a,
      teacherName: teachers.find(t => t.id === a.teacherId)?.name || 'Desconocido',
      activityName: activity?.name || 'Desconocido',
      projectName: projects.find(p => p.id === a.projectId)?.code || 'N/A',
      area: activity?.area || 'Investigación',
      totalProgress: (a.progress1 || 0) + (a.progress2 || 0)
    };
  });

  // Calculate Summary Stats
  const totalItems = reportData.length;
  const avgProgress = totalItems > 0 
    ? Math.round(reportData.reduce((acc, curr) => acc + curr.totalProgress, 0) / totalItems) 
    : 0;
  const statusCounts = {
    planificado: reportData.filter(r => r.status === 'Planificado').length,
    enProgreso: reportData.filter(r => r.status === 'En Progreso').length,
    completado: reportData.filter(r => r.status === 'Completado').length,
  };

  const handleExport = () => {
    const headers = [
      'ID Asignación', 
      'Área', 
      'Nombre Docente', 
      'Email Docente',
      'Vinculación',
      'Actividad', 
      'Descripción Actividad',
      'Código Proyecto', 
      'Horas Asignadas', 
      'Fecha Inicio', 
      'Fecha Fin', 
      'Estado', 
      'Meta Definida', 
      'Entregable 1',
      'Entregable 2',
      'Formatos Requeridos',
      'Fecha Rev 1', 
      'Avance Momento 1 (%)', 
      'Observación Líder M1',
      'Fecha Rev 2', 
      'Avance Momento 2 (%)', 
      'Observación Líder M2',
      'Total Acumulado (%)',
      'Descripción del Logro (Docente)', 
      'URL Evidencia'
    ];
    
    // Helper seguro que maneja strings, números y nulos
    const esc = (value: any) => {
        if (value === null || value === undefined) return '""';
        return `"${String(value).replace(/"/g, '""').replace(/\n/g, ' ')}"`;
    };

    const csvRows = [
      headers.join(","),
      ...reportData.map(e => {
        const teacher = teachers.find(t => t.id === e.teacherId);
        const activity = activities.find(a => a.id === e.activityCatalogId);

        return [
          e.id, 
          esc(e.area), 
          esc(e.teacherName), 
          esc(teacher?.email),
          esc(teacher?.contractType),
          esc(e.activityName),
          esc(activity?.description),
          esc(e.projectName),
          esc(e.allocatedHours), 
          e.startDate, 
          e.endDate, 
          e.status, 
          esc(e.goal),
          esc(e.deliverable1),
          esc(e.deliverable2),
          esc(e.requiredFormats ? e.requiredFormats.join('; ') : ''),
          e.review1Date || '',
          esc(e.progress1 || 0),
          esc(e.observation1),
          e.review2Date || '',
          esc(e.progress2 || 0),
          esc(e.observation2),
          esc(e.totalProgress),
          esc(e.achievementDescription),
          esc(e.evidenceUrl)
        ].join(",");
      })
    ];

    const csvContent = csvRows.join("\n");
    
    // Usar Blob y BOM (\uFEFF) para asegurar compatibilidad UTF-8 con Excel
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", role === 'teacher' ? `reporte_actividades_${currentUser?.name.replace(/\s+/g, '_')}.csv` : "reporte_detallado_completo_ctei.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-slate-800">
          {role === 'teacher' ? 'Mi Reporte de Actividades' : 'Reporte Consolidado'}
        </h1>
        
        <div className="flex gap-3 w-full md:w-auto">
            <select 
                className="border border-slate-300 rounded-lg px-3 py-2 bg-white text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
                value={selectedAreaFilter}
                onChange={(e) => setSelectedAreaFilter(e.target.value)}
            >
                <option value="Todas">Todas las Áreas</option>
                {AREAS.map(area => (
                    <option key={area} value={area}>{area}</option>
                ))}
            </select>
            
            <button onClick={handleExport} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm flex items-center transition-colors whitespace-nowrap">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Exportar CSV
            </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase">Total Registros</p>
          <p className="text-2xl font-bold text-slate-800">{totalItems}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase">Avance Promedio</p>
          <p className={`text-2xl font-bold ${avgProgress >= 70 ? 'text-green-600' : 'text-blue-600'}`}>{avgProgress}%</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm col-span-2">
           <p className="text-xs font-bold text-slate-500 uppercase mb-2">Estado de Actividades</p>
           <div className="flex gap-4 items-center h-full">
              <div className="flex items-center text-sm"><div className="w-3 h-3 rounded-full bg-slate-300 mr-2"></div> Planif: <strong>{statusCounts.planificado}</strong></div>
              <div className="flex items-center text-sm"><div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div> En Prog: <strong>{statusCounts.enProgreso}</strong></div>
              <div className="flex items-center text-sm"><div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div> Compl: <strong>{statusCounts.completado}</strong></div>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Área/Docente</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Actividad</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Fechas</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">M1</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">M2</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Total</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Estado</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Detalle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {reportData.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm text-slate-700">
                    <div className="font-bold text-xs uppercase text-slate-500">{row.area}</div>
                    <div className="font-medium text-slate-900">{row.teacherName}</div>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600 min-w-[200px]">
                    <div className="font-medium text-slate-800">{row.activityName}</div>
                    {row.projectName !== 'N/A' && <div className="text-xs text-blue-600 mt-0.5">Proy: {row.projectName}</div>}
                </td>
                <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">
                    <div>Del: {row.startDate}</div>
                    <div>Al: {row.endDate}</div>
                    <div className="font-bold text-slate-500 mt-1">{row.allocatedHours} Horas</div>
                </td>
                <td className="px-4 py-3 text-center text-sm text-slate-600">
                    <span className={(row.progress1 || 0) > 0 ? "font-bold text-slate-800" : "text-slate-400"}>{row.progress1 || 0}%</span>
                    {row.observation1 && <div className="w-2 h-2 bg-blue-400 rounded-full mx-auto mt-1" title="Tiene observación"></div>}
                </td>
                <td className="px-4 py-3 text-center text-sm text-slate-600">
                    <span className={(row.progress2 || 0) > 0 ? "font-bold text-slate-800" : "text-slate-400"}>{row.progress2 || 0}%</span>
                    {row.observation2 && <div className="w-2 h-2 bg-blue-400 rounded-full mx-auto mt-1" title="Tiene observación"></div>}
                </td>
                <td className="px-4 py-3 text-center">
                    <span className={`font-bold ${row.totalProgress === 100 ? 'text-green-600' : 'text-blue-600'}`}>
                        {row.totalProgress}%
                    </span>
                </td>
                 <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold 
                      ${row.status === 'Completado' ? 'bg-green-100 text-green-800' : 
                        row.status === 'En Progreso' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-slate-100 text-slate-800'}`}>
                      {row.status}
                    </span>
                  </td>
                 <td className="px-4 py-3 text-center">
                   <button 
                    onClick={() => setSelectedItem(row)}
                    className="text-blue-600 hover:bg-blue-100 p-2 rounded-full transition-colors"
                    title="Ver Detalle Completo"
                   >
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                   </button>
                 </td>
              </tr>
            ))}
            {reportData.length === 0 && (
                <tr>
                    <td colSpan={8} className="px-6 py-10 text-center text-slate-500">
                        No hay registros para el filtro seleccionado.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de Detalle Completo */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6 m-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6 border-b pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800">{selectedItem.activityName}</h2>
                <p className="text-slate-500 text-sm">{selectedItem.teacherName} | {selectedItem.area}</p>
              </div>
              <button onClick={() => setSelectedItem(null)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Panel Izquierdo: Definición */}
                <div className="space-y-4">
                    <h3 className="font-bold text-blue-800 border-b border-blue-100 pb-2">1. Detalles de Asignación</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="block font-bold text-slate-600 text-xs uppercase">Proyecto</span>
                            <span className="text-slate-800">{selectedItem.projectName}</span>
                        </div>
                        <div>
                            <span className="block font-bold text-slate-600 text-xs uppercase">Horas Asignadas</span>
                            <span className="text-slate-800">{selectedItem.allocatedHours} h</span>
                        </div>
                        <div>
                            <span className="block font-bold text-slate-600 text-xs uppercase">Inicio</span>
                            <span className="text-slate-800">{selectedItem.startDate}</span>
                        </div>
                        <div>
                            <span className="block font-bold text-slate-600 text-xs uppercase">Fin</span>
                            <span className="text-slate-800">{selectedItem.endDate}</span>
                        </div>
                    </div>
                    
                    <div className="bg-slate-50 p-3 rounded text-sm border border-slate-100">
                        <span className="block font-bold text-slate-600 text-xs uppercase mb-1">Meta</span>
                        <p className="text-slate-800 italic">{selectedItem.goal || 'No definida'}</p>
                    </div>

                    <div className="space-y-2 text-sm">
                        <div>
                            <span className="block font-bold text-slate-600 text-xs uppercase">Entregable 1</span>
                            <p className="text-slate-700">{selectedItem.deliverable1 || 'N/A'}</p>
                        </div>
                        <div>
                            <span className="block font-bold text-slate-600 text-xs uppercase">Entregable 2</span>
                            <p className="text-slate-700">{selectedItem.deliverable2 || 'N/A'}</p>
                        </div>
                        <div>
                            <span className="block font-bold text-slate-600 text-xs uppercase">Formatos</span>
                            <p className="text-slate-700">{selectedItem.requiredFormats ? selectedItem.requiredFormats.join(', ') : 'N/A'}</p>
                        </div>
                    </div>
                </div>

                {/* Panel Derecho: Evaluación y Ejecución */}
                <div className="space-y-4">
                    <h3 className="font-bold text-green-800 border-b border-green-100 pb-2">2. Ejecución y Evaluación</h3>
                    
                    <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                         <span className="block font-bold text-slate-600 text-xs uppercase mb-2">Logro del Docente</span>
                         <p className="text-sm text-slate-700 bg-slate-50 p-2 rounded mb-3">
                             {selectedItem.achievementDescription || "Sin reporte del docente."}
                         </p>
                         <span className="block font-bold text-slate-600 text-xs uppercase mb-1">Evidencia</span>
                         {selectedItem.evidenceUrl ? (
                             <a href={selectedItem.evidenceUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm flex items-center break-all">
                                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                {selectedItem.evidenceUrl}
                             </a>
                         ) : <span className="text-sm text-slate-400">No se adjuntó enlace.</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-3 rounded border border-blue-100">
                            <div className="text-xs font-bold text-blue-800 uppercase mb-2 text-center">Momento 1</div>
                            <div className="text-center text-2xl font-bold text-blue-600 mb-1">{selectedItem.progress1 || 0}%</div>
                            <div className="text-xs text-center text-slate-500 mb-2">{selectedItem.review1Date || 'Sin fecha'}</div>
                            {selectedItem.observation1 && (
                                <p className="text-xs text-slate-700 italic border-t border-blue-200 pt-2 mt-1">"{selectedItem.observation1}"</p>
                            )}
                        </div>
                        <div className="bg-blue-50 p-3 rounded border border-blue-100">
                            <div className="text-xs font-bold text-blue-800 uppercase mb-2 text-center">Momento 2</div>
                            <div className="text-center text-2xl font-bold text-blue-600 mb-1">{selectedItem.progress2 || 0}%</div>
                            <div className="text-xs text-center text-slate-500 mb-2">{selectedItem.review2Date || 'Sin fecha'}</div>
                             {selectedItem.observation2 && (
                                <p className="text-xs text-slate-700 italic border-t border-blue-200 pt-2 mt-1">"{selectedItem.observation2}"</p>
                            )}
                        </div>
                    </div>
                    
                    <div className="bg-green-50 p-3 rounded border border-green-100 flex justify-between items-center">
                         <span className="font-bold text-green-900">Total Acumulado</span>
                         <span className="font-bold text-2xl text-green-700">{selectedItem.totalProgress}%</span>
                    </div>
                </div>
            </div>
            
            <div className="mt-6 flex justify-end">
                 <button onClick={() => setSelectedItem(null)} className="bg-slate-800 text-white px-6 py-2 rounded hover:bg-slate-700">Cerrar Detalle</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;