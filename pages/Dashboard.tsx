import React from 'react';
import { useData } from '../context/DataContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Dashboard: React.FC = () => {
  const { assignments, teachers, activities, projects } = useData();

  // Stats calculation
  const totalHours = assignments.reduce((acc, curr) => acc + curr.allocatedHours, 0);
  const activeTeachers = new Set(assignments.map(a => a.teacherId)).size;
  
  // Data for bar chart (Hours per Project)
  const projectHours = projects.map(p => {
    const hours = assignments
      .filter(a => a.projectId === p.id)
      .reduce((sum, a) => sum + a.allocatedHours, 0);
    return { name: p.code, hours };
  });

  // Data for pie chart (Assignments by Status)
  const statusData = [
    { name: 'Planificado', value: assignments.filter(a => a.status === 'Planificado').length },
    { name: 'En Progreso', value: assignments.filter(a => a.status === 'En Progreso').length },
    { name: 'Completado', value: assignments.filter(a => a.status === 'Completado').length },
  ].filter(d => d.value > 0);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Tablero de Control</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
          <p className="text-sm text-slate-500 font-medium">Total Horas Asignadas</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{totalHours}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
          <p className="text-sm text-slate-500 font-medium">Docentes Activos</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{activeTeachers} <span className="text-sm text-slate-400 font-normal">/ {teachers.length}</span></p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
          <p className="text-sm text-slate-500 font-medium">Actividades en Catálogo</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">{activities.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100">
          <p className="text-sm text-slate-500 font-medium">Total Asignaciones</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">{assignments.length}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100 h-96">
          <h3 className="text-lg font-semibold text-slate-700 mb-4">Horas por Proyecto</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={projectHours}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip cursor={{fill: '#f1f5f9'}} />
              <Bar dataKey="hours" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100 h-96">
          <h3 className="text-lg font-semibold text-slate-700 mb-4">Estado de Actividades</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {statusData.map((entry, index) => (
              <div key={entry.name} className="flex items-center text-sm text-slate-600">
                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                {entry.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;