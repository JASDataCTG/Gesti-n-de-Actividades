
import React from 'react';
import { useData } from '../context/DataContext';
import { AssignmentReportRow } from '../types';

const Reports: React.FC = () => {
  const { assignments, teachers, activities, projects } = useData();

  const reportData: AssignmentReportRow[] = assignments.map(a => {
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

  const handleExport = () => {
    const headers = [
      'ID', 'Área', 'Persona', 'Actividad', 'Proyecto', 'Horas', 
      'Inicio', 'Fin', 'Estado', 'Meta', 
      'Fecha Rev 1', 'Avance 1 (%)', 'Observación 1',
      'Fecha Rev 2', 'Avance 2 (%)', 'Observación 2',
      'Total (%)',
      'Logro', 'Evidencia URL'
    ];
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + reportData.map(e => {
        return [
          e.id, 
          `"${e.area}"`, 
          `"${e.teacherName}"`, 
          `"${e.activityName}"`, 
          e.projectName, 
          e.allocatedHours, 
          e.startDate, 
          e.endDate, 
          e.status, 
          `"${e.goal}"`,
          e.review1Date || '',
          e.progress1 || 0,
          `"${(e.observation1 || '').replace(/"/g, '""')}"`,
          e.review2Date || '',
          e.progress2 || 0,
          `"${(e.observation2 || '').replace(/"/g, '""')}"`,
          e.totalProgress,
          `"${(e.achievementDescription || '').replace(/"/g, '""')}"`,
          `"${e.evidenceUrl || ''}"`
        ].join(",");
      }).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "reporte_actividades_ctei.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800">Reporte Consolidado de Avances</h1>
        <button onClick={handleExport} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          Exportar CSV
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Área</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Persona</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Actividad</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">M1 (%)</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">M2 (%)</th>
              <th className="px-4 py-3 text-center text-xs font-bold text-slate-600 uppercase tracking-wider">Total</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Estado</th>
              <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Logros & Evidencia</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {reportData.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-xs font-semibold text-slate-700 whitespace-nowrap">{row.area}</td>
                <td className="px-4 py-3 text-sm font-medium text-slate-900 whitespace-nowrap">{row.teacherName}</td>
                <td className="px-4 py-3 text-sm text-slate-600 min-w-[200px]">
                    {row.activityName}
                    <div className="text-xs text-slate-400 mt-1">{row.projectName}</div>
                </td>
                <td className="px-4 py-3 text-center text-sm text-slate-600">
                    {row.progress1 || 0}%
                    {row.review1Date && <div className="text-[10px] text-slate-400">{row.review1Date}</div>}
                </td>
                <td className="px-4 py-3 text-center text-sm text-slate-600">
                    {row.progress2 || 0}%
                    {row.review2Date && <div className="text-[10px] text-slate-400">{row.review2Date}</div>}
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
                 <td className="px-4 py-3 text-xs text-slate-600 min-w-[200px]">
                   {row.achievementDescription ? (
                       <p className="mb-2 italic text-slate-500 line-clamp-2" title={row.achievementDescription}>"{row.achievementDescription}"</p>
                   ) : <p className="mb-2 text-slate-300">Sin descripción</p>}
                   
                   {row.evidenceUrl ? (
                     <a href={row.evidenceUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        Ver Evidencia
                     </a>
                   ) : (
                     <span className="text-slate-400">Sin enlace</span>
                   )}
                 </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
