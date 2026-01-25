
import React, { useState, useEffect } from 'react';
import { SCHEDULE, ASSIGNMENTS } from '../constants';
import { Week } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { BookOpen, Calendar, AlertCircle } from 'lucide-react';

const COLORS = ['#1e3a8a', '#3b82f6', '#60a5fa', '#94a3b8', '#cbd5e1', '#f1f5f9'];

const Dashboard: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState<Week | null>(null);

  useEffect(() => {
    const calculateCurrentWeek = () => {
      const now = new Date();
      // Use YYYY, MM-1, DD format to avoid timezone parsing issues
      // Semester starts Tue Jan 27, 2026
      const semesterStart = new Date(2026, 0, 27); // Jan 27, 2026
      const semesterEnd = new Date(2026, 4, 15);   // May 15, 2026

      // If before semester starts, show Week 1
      if (now < semesterStart) {
        return SCHEDULE[0];
      }

      // If after semester ends, show Finals Week
      if (now > semesterEnd) {
        return SCHEDULE[SCHEDULE.length - 1];
      }

      // Calculate week difference
      const oneWeek = 1000 * 60 * 60 * 24 * 7;
      const diffInTime = now.getTime() - semesterStart.getTime();
      const weekIndex = Math.floor(diffInTime / oneWeek);

      // Return current week or last week if index out of bounds
      return SCHEDULE[weekIndex] || SCHEDULE[SCHEDULE.length - 1];
    };

    setCurrentWeek(calculateCurrentWeek());
  }, []);

  const gradeData = ASSIGNMENTS.map(a => ({ name: a.name, value: a.weight }));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-uwm-black text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-serif font-bold mb-2">POL SCI 335</h1>
          <p className="text-blue-200 text-lg">Comparative Political Systems</p>
          <div className="mt-4 flex items-center gap-2 text-sm text-blue-100">
            <span className="bg-white/10 px-3 py-1 rounded-full">Spring 2026</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">Ahmet Ergurum</span>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-uwm-gold/20 to-transparent"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Current Week Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 col-span-1 lg:col-span-2">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-uwm-gold" />
                Current Week
              </h2>
              <span className="text-sm text-gray-500">{currentWeek?.dates} • {currentWeek?.title}</span>
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Week {currentWeek?.id}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-uwm-black" /> Readings
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {currentWeek?.readings.map((r, i) => <li key={i}>{r}</li>) || <li>No readings</li>}
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Due This Week
              </h3>
              <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                {currentWeek?.due && currentWeek.due.length > 0 ? (
                   currentWeek.due.map((d, i) => <li key={i} className="font-medium">{d}</li>)
                ) : (
                  <li className="italic opacity-70">Nothing due</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Grade Distribution Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Grade Weight</h2>
          <div className="flex-grow min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gradeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {gradeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconSize={8} wrapperStyle={{fontSize: '12px'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Links / Policies */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Key Course Policies</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="p-3 bg-slate-50 rounded border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-1">AI Policy</h4>
            <p className="text-slate-700">Brainstorming/Outlining: OK. <br/>Generating Content: <strong>PROHIBITED</strong>. <br/>Must cite AI usage.</p>
          </div>
          <div className="p-3 bg-blue-50 rounded border border-blue-100">
            <h4 className="font-bold text-blue-800 mb-1">Attendance</h4>
            <p className="text-blue-700">Mandatory. Notify instructor in advance for absences. No make-ups for quizzes unless excused.</p>
          </div>
          <div className="p-3 bg-indigo-50 rounded border border-indigo-100">
            <h4 className="font-bold text-indigo-800 mb-1">Late Work</h4>
            <p className="text-indigo-700">Not accepted. Exceptions only for extraordinary circumstances.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;