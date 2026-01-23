
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Teacher } from '../types';

const Teachers: React.FC = () => {
  const { teachers, addTeacher, updateTeacher, deleteTeacher, programs, faculties } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [formData, setFormData] = useState<Omit<Teacher, 'id'>>({ 
    name: '', 
    email: '', 
    idNumber: '',
    contractType: 'Tiempo Completo',
    programId: ''
  });

  const handleOpenCreate = () => {
    setEditingTeacher(null);
    setFormData({ name: '', email: '', idNumber: '', contractType: 'Tiempo Completo', programId: programs[0]?.id || '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: Teacher) => {
    setEditingTeacher(t);
    setFormData({ name: t.name, email: t.email, idNumber: t.idNumber || '', contractType: t.contractType, programId: t.programId || '' });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Está seguro que desea eliminar esta persona? Esta acción no se puede deshacer.')) {
      deleteTeacher(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTeacher) {
      updateTeacher({ ...editingTeacher, ...formData });
    } else {
      addTeacher({ id: `T-${Date.now()}`, ...formData });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-uninunez-onix font-heading uppercase tracking-tight">Gestión Docente</h1>
          <div className="h-1.5 w-16 bg-uninunez-orange mt-2 rounded-full"></div>
        </div>
        <button onClick={handleOpenCreate} className="bg-uninunez-orange text-white px-6 py-3 rounded-xl hover:bg-uninunez-orange-light font-black shadow-lg flex items-center text-xs uppercase tracking-widest transition-all">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
          Nueva Persona
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map(teacher => {
          const prog = programs.find(p => p.id === teacher.programId);
          const fac = faculties.find(f => f.id === prog?.facultyId);
          return (
            <div key={teacher.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-uninunez-turquoise/5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center space-x-4">
                  <div className="h-14 w-14 rounded-2xl bg-uninunez-onix text-uninunez-orange flex items-center justify-center font-black text-xl shadow-lg">
                    {teacher.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-black text-uninunez-onix uppercase tracking-tight leading-tight">{teacher.name}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{teacher.contractType}</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button onClick={() => handleOpenEdit(teacher)} className="p-2 text-slate-300 hover:text-uninunez-turquoise transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </button>
                  <button onClick={() => handleDelete(teacher.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
              
              <div className="mt-6 space-y-3 relative z-10">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p className="text-[9px] font-black text-uninunez-ceniza uppercase tracking-widest mb-1">Programa Académico</p>
                    <p className="text-xs font-bold text-uninunez-turquoise">{prog?.name || 'No asignado'}</p>
                    <p className="text-[8px] text-slate-400 font-medium uppercase mt-0.5">{fac?.name}</p>
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-400 px-1">
                   <span className="font-bold">C.C. {teacher.idNumber}</span>
                   <span className="font-medium">{teacher.email}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-uninunez-onix/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2rem] shadow-2xl max-w-lg w-full p-8 border border-white">
            <h2 className="text-2xl font-black text-uninunez-onix mb-6 font-heading uppercase tracking-tight">{editingTeacher ? 'Editar Docente' : 'Nuevo Docente'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-uninunez-ceniza uppercase mb-1.5 ml-1">Nombre Completo</label>
                  <input required type="text" className="w-full border-2 border-slate-50 bg-slate-50 rounded-2xl px-5 py-3 focus:ring-4 focus:ring-uninunez-orange/10 focus:border-uninunez-orange outline-none transition-all font-bold"
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-uninunez-ceniza uppercase mb-1.5 ml-1">Cédula (Password)</label>
                  <input required type="text" className="w-full border-2 border-slate-50 bg-slate-50 rounded-2xl px-5 py-3 focus:ring-4 focus:ring-uninunez-orange/10 focus:border-uninunez-orange outline-none transition-all font-bold"
                    value={formData.idNumber} onChange={e => setFormData({...formData, idNumber: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-uninunez-ceniza uppercase mb-1.5 ml-1">Programa Académico</label>
                <select required className="w-full border-2 border-slate-50 bg-slate-50 rounded-2xl px-5 py-3 focus:ring-4 focus:ring-uninunez-turquoise/10 focus:border-uninunez-turquoise outline-none appearance-none font-bold"
                  value={formData.programId || ''} onChange={e => setFormData({...formData, programId: e.target.value})}>
                  <option value="">Seleccionar programa...</option>
                  {programs.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-uninunez-ceniza uppercase mb-1.5 ml-1">Email Institucional</label>
                  <input required type="email" className="w-full border-2 border-slate-50 bg-slate-50 rounded-2xl px-5 py-3 focus:ring-4 focus:ring-uninunez-turquoise/10 focus:border-uninunez-turquoise outline-none transition-all font-bold"
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-uninunez-ceniza uppercase mb-1.5 ml-1">Vinculación</label>
                  <select className="w-full border-2 border-slate-50 bg-slate-50 rounded-2xl px-5 py-3 focus:ring-4 focus:ring-uninunez-turquoise/10 focus:border-uninunez-turquoise outline-none appearance-none font-bold"
                    value={formData.contractType} onChange={e => setFormData({...formData, contractType: e.target.value as any})}>
                    <option value="Tiempo Completo">Tiempo Completo</option>
                    <option value="Medio Tiempo">Medio Tiempo</option>
                    <option value="Catedrático">Catedrático</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-8 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-slate-400 font-black uppercase text-xs tracking-widest hover:bg-slate-50 rounded-xl transition-all">Cancelar</button>
                <button type="submit" className="bg-uninunez-onix text-white px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest shadow-xl shadow-uninunez-onix/20 transition-all hover:scale-105">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teachers;
