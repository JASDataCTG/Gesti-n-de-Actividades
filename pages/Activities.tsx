import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { ActivityCatalogItem, ActivityArea } from '../types';

const Activities: React.FC = () => {
  const { activities, addActivity, updateActivity, deleteActivity } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ActivityCatalogItem | null>(null);

  // Form State
  const [formData, setFormData] = useState<Omit<ActivityCatalogItem, 'id'>>({
    name: '',
    description: '',
    maxHours: 0,
    area: 'Investigación'
  });

  const AREAS: ActivityArea[] = [
    'Desarrollo Académico',
    'Investigación',
    'Egresados',
    'Proyección Social',
    'Visibilidad Nacional e Internacional',
    'Vida Universitaria'
  ];

  const getAreaColor = (area: string) => {
    switch(area) {
      case 'Investigación': return 'bg-purple-100 text-purple-800';
      case 'Desarrollo Académico': return 'bg-blue-100 text-blue-800';
      case 'Proyección Social': return 'bg-green-100 text-green-800';
      case 'Vida Universitaria': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({ name: '', description: '', maxHours: 0, area: 'Investigación' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: ActivityCatalogItem) => {
    setEditingItem(item);
    setFormData({ 
      name: item.name, 
      description: item.description ?? '', 
      maxHours: item.maxHours,
      area: item.area 
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateActivity({ ...editingItem, ...formData });
    } else {
      addActivity({
        id: `A-${Date.now()}`,
        ...formData
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800">Catálogo de Actividades</h1>
        <button 
          onClick={handleOpenCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Nueva Actividad
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Área</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actividad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Descripción</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Max Horas</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {activities.map((act) => (
              <tr key={act.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${getAreaColor(act.area)}`}>
                    {act.area}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-900">{act.name}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{act.description}</td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-bold">
                    {act.maxHours} h
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleOpenEdit(act)} className="text-blue-600 hover:text-blue-900 mr-4">Editar</button>
                  <button onClick={() => deleteActivity(act.id)} className="text-red-600 hover:text-red-900">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">{editingItem ? 'Editar Actividad' : 'Nueva Actividad'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Área</label>
                <select 
                  required
                  className="w-full border border-slate-300 bg-white text-slate-900 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.area}
                  onChange={e => setFormData({...formData, area: e.target.value as ActivityArea})}
                >
                  {AREAS.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
                <input 
                  required
                  type="text" 
                  className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Descripción</label>
                <textarea 
                  className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  value={formData.description ?? ''}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Horas Máximas Permitidas</label>
                <input 
                  required
                  type="number" 
                  min="1"
                  className="w-full border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.maxHours}
                  onChange={e => setFormData({...formData, maxHours: parseInt(e.target.value) || 0})}
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;