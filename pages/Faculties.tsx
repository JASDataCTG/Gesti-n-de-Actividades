
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Faculty, Program } from '../types';

const Faculties: React.FC = () => {
  const { faculties, programs, addFaculty, updateFaculty, deleteFaculty, addProgram, updateProgram, deleteProgram } = useData();
  const [activeTab, setActiveTab] = useState<'faculties' | 'programs'>('faculties');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Form States
  const [facName, setFacName] = useState('');
  const [progName, setProgName] = useState('');
  const [progFacId, setProgFacId] = useState('');

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFacName('');
    setProgName('');
    setProgFacId(faculties[0]?.id || '');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingItem(item);
    if (activeTab === 'faculties') {
      setFacName(item.name);
    } else {
      setProgName(item.name);
      setProgFacId(item.facultyId);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'faculties') {
      const payload: Faculty = { id: editingItem?.id || `F-${Date.now()}`, name: facName };
      if (editingItem) updateFaculty(payload);
      else addFaculty(payload);
    } else {
      const payload: Program = { id: editingItem?.id || `PR-${Date.now()}`, name: progName, facultyId: progFacId };
      if (editingItem) updateProgram(payload);
      else addProgram(payload);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-uninunez-onix font-heading uppercase tracking-tight">Estructura Académica</h1>
          <div className="h-1.5 w-16 bg-uninunez-orange mt-2 rounded-full"></div>
        </div>
        <button onClick={handleOpenCreate} className="bg-uninunez-orange hover:bg-uninunez-orange-light text-white px-6 py-3 rounded-xl font-black shadow-lg flex items-center text-xs uppercase tracking-widest transition-all hover:scale-105">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
          Añadir {activeTab === 'faculties' ? 'Facultad' : 'Programa'}
        </button>
      </div>

      <div className="flex space-x-2 border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('faculties')}
          className={`px-6 py-3 font-black text-xs uppercase tracking-widest border-b-4 transition-all ${activeTab === 'faculties' ? 'border-uninunez-orange text-uninunez-orange' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
          Facultades
        </button>
        <button 
          onClick={() => setActiveTab('programs')}
          className={`px-6 py-3 font-black text-xs uppercase tracking-widest border-b-4 transition-all ${activeTab === 'programs' ? 'border-uninunez-turquoise text-uninunez-turquoise' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
          Programas Académicos
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === 'faculties' ? (
          faculties.map(fac => (
            <div key={fac.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center group hover:shadow-md transition-all">
              <div>
                <h3 className="font-black text-uninunez-onix text-lg leading-tight uppercase">{fac.name}</h3>
                <p className="text-[10px] text-uninunez-turquoise font-black mt-1 uppercase tracking-widest">
                  {programs.filter(p => p.facultyId === fac.id).length} Programas
                </p>
              </div>
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleOpenEdit(fac)} className="p-2 text-slate-400 hover:text-uninunez-orange"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                <button onClick={() => deleteFaculty(fac.id)} className="p-2 text-slate-400 hover:text-red-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
              </div>
            </div>
          ))
        ) : (
          programs.map(prog => {
            const fac = faculties.find(f => f.id === prog.facultyId);
            return (
              <div key={prog.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="font-black text-uninunez-onix text-base uppercase leading-tight">{prog.name}</h3>
                   <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-4">
                      <button onClick={() => handleOpenEdit(prog)} className="text-slate-400 hover:text-uninunez-turquoise"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                      <button onClick={() => deleteProgram(prog.id)} className="text-slate-400 hover:text-red-500"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                   </div>
                </div>
                <p className="text-[10px] bg-slate-100 text-slate-500 font-black px-2 py-1 rounded-md inline-block uppercase tracking-widest">{fac?.name || 'Sin Facultad'}</p>
              </div>
            )
          })
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-uninunez-onix/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2rem] shadow-2xl max-w-md w-full p-8 border border-white">
            <h2 className="text-2xl font-black text-uninunez-onix mb-6 font-heading uppercase tracking-tight">
              {editingItem ? 'Editar' : 'Nuevo'} {activeTab === 'faculties' ? 'Facultad' : 'Programa'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              {activeTab === 'faculties' ? (
                <div>
                  <label className="block text-[10px] font-black text-uninunez-ceniza uppercase mb-1.5 ml-1">Nombre de Facultad</label>
                  <input required type="text" className="w-full border-2 border-slate-50 bg-slate-50 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-uninunez-orange/10 focus:border-uninunez-orange outline-none transition-all font-medium"
                    value={facName} onChange={e => setFacName(e.target.value)} />
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-[10px] font-black text-uninunez-ceniza uppercase mb-1.5 ml-1">Facultad Perteneciente</label>
                    <select required className="w-full border-2 border-slate-50 bg-slate-50 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-uninunez-turquoise/10 focus:border-uninunez-turquoise outline-none appearance-none font-bold"
                      value={progFacId} onChange={e => setProgFacId(e.target.value)}>
                      {faculties.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-uninunez-ceniza uppercase mb-1.5 ml-1">Nombre del Programa</label>
                    <input required type="text" className="w-full border-2 border-slate-50 bg-slate-50 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-uninunez-turquoise/10 focus:border-uninunez-turquoise outline-none transition-all font-medium"
                      value={progName} onChange={e => setProgName(e.target.value)} />
                  </div>
                </>
              )}
              <div className="flex justify-end space-x-3 mt-8 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-slate-400 font-black uppercase text-xs tracking-widest hover:bg-slate-50 rounded-xl">Cancelar</button>
                <button type="submit" className="bg-uninunez-onix text-white px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest shadow-lg">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Faculties;
