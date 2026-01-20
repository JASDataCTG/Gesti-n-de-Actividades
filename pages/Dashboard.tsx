import React from 'react';
import { useData } from '../context/DataContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Corporate Palette: Orange, Turquoise, Jade, Onix, Ceniza
const BRAND_COLORS = ['#F07E12', '#14AA9F', '#2FAC66', '#8CC04D', '#3C3C3B'];

const Dashboard: React.FC = () => {
  const { assignments, teachers, activities, projects } = useData();

  const totalHours = assignments.reduce((acc, curr) => acc + curr.allocatedHours, 0);
  const activeTeachers = new Set(assignments.map(a => a.teacherId)).size;
  
  const projectHours = projects.map(p => {
    const hours = assignments
      .filter(a => a.projectId === p.id)
      .reduce((sum, a) => sum + a.allocatedHours, 0);
    return { name: p.code, hours };
  });

  const statusData = [
    { name: 'Planificado', value: assignments.filter(a => a.status === 'Planificado').length },
    { name: 'En Progreso', value: assignments.filter(a => a.status === 'En Progreso').length },
    { name: 'Completado', value: assignments.filter(a => a.status === 'Completado').length },
  ].filter(d => d.value > 0);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-end">
        <div>
            <h1 className="text-3xl font-black text-uninunez-onix font-heading uppercase tracking-tight">Tablero Institucional</h1>
            <div className="h-1.5 w-24 bg-uninunez-orange mt-2 rounded-full"></div>
        </div>
        <div className="text-right hidden md:block">
            <p className="text-[10px] font-black text-uninunez-ceniza uppercase tracking-widest">Periodo Académico</p>
            <p className="text-lg font-bold text-uninunez-turquoise">2024-II</p>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 border-b-4 border-uninunez-orange">
          <p className="text-[10px] text-uninunez-ceniza font-black uppercase tracking-wider mb-1">Total Horas Asignadas</p>
          <p className="text-4xl font-black text-uninunez-orange font-heading">{totalHours}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6 border-b-4 border-uninunez-turquoise">
          <p className="text-[10px] text-uninunez-ceniza font-black uppercase tracking-wider mb-1">Docentes Activos</p>
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-black text-uninunez-turquoise font-heading">{activeTeachers}</p>
            <p className="text-sm text-slate-400 font-bold">/ {teachers.length}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6 border-b-4 border-uninunez-green-jade">
          <p className="text-[10px] text-uninunez-ceniza font-black uppercase tracking-wider mb-1">Catálogo Actividades</p>
          <p className="text-4xl font-black text-uninunez-green-jade font-heading">{activities.length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6 border-b-4 border-uninunez-onix">
          <p className="text-[10px] text-uninunez-ceniza font-black uppercase tracking-wider mb-1">Total Asignaciones</p>
          <p className="text-4xl font-black text-uninunez-onix font-heading">{assignments.length}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 border border-slate-100 h-[450px]">
          <h3 className="text-xl font-black text-uninunez-onix mb-8 font-heading uppercase tracking-tight flex items-center gap-3">
             <div className="w-2 h-6 bg-uninunez-orange rounded-full"></div>
             Horas por Proyecto CTeI
          </h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={projectHours} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#64748b" 
                fontSize={11} 
                fontWeight={700}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                stroke="#64748b" 
                fontSize={11} 
                fontWeight={700}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                cursor={{fill: '#fff7ed'}} 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
              />
              <Bar 
                dataKey="hours" 
                fill="#F07E12" 
                radius={[8, 8, 0, 0]} 
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 h-[450px] flex flex-col">
          <h3 className="text-xl font-black text-uninunez-onix mb-6 font-heading uppercase tracking-tight flex items-center gap-3">
             <div className="w-2 h-6 bg-uninunez-turquoise rounded-full"></div>
             Estado Gestión
          </h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={BRAND_COLORS[index % BRAND_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4 pt-4 border-t border-slate-50">
            {statusData.map((entry, index) => (
              <div key={entry.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-md shadow-sm" style={{ backgroundColor: BRAND_COLORS[index % BRAND_COLORS.length] }}></span>
                    <span className="font-bold text-uninunez-ceniza uppercase tracking-wider">{entry.name}</span>
                </div>
                <span className="font-black text-uninunez-onix bg-slate-50 px-2 py-1 rounded-md">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;