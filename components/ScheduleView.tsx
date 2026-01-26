
import React, { useState } from 'react';
import { SCHEDULE } from '../constants';
import { Week } from '../types';
import { 
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, Label, LabelList
} from 'recharts';
import { 
  ChevronRight, ArrowLeft, Microscope, Scale, 
  Variable, Globe, BookOpen, AlertTriangle, 
  CheckCircle2, FlaskConical, Calculator
} from 'lucide-react';

const ScheduleView: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState<Week | null>(null);

  if (selectedWeek) {
    return (
      <WeekDetailView 
        week={selectedWeek} 
        onBack={() => setSelectedWeek(null)} 
      />
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-xl shadow-sm border-b-4 border-uwm-black">
        <h2 className="text-2xl font-serif font-bold text-gray-900">Course Schedule</h2>
        <p className="text-gray-600">Spring 2026 • 15 Weeks • Click a week for details</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        {SCHEDULE.map((week) => (
          <div 
            key={week.id} 
            onClick={() => setSelectedWeek(week)}
            className="group p-6 border-b border-gray-100 hover:bg-blue-50 transition-colors last:border-0 cursor-pointer relative"
          >
            <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
               <ChevronRight className="text-uwm-gold w-6 h-6" />
            </div>

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pr-8">
              <div className="md:w-1/4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${
                   week.id === 1 ? 'bg-uwm-gold text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  Week {week.id}
                </span>
                <p className="font-bold text-uwm-black">{week.dates}</p>
              </div>
              
              <div className="md:w-1/2">
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-uwm-black transition-colors">{week.title}</h3>
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold text-gray-400 uppercase text-xs">Topics:</span>
                  <ul className="ml-4 list-disc">
                    {week.topics.slice(0, 2).map((t, i) => <li key={i}>{t}</li>)}
                    {week.topics.length > 2 && <li className="text-gray-400 italic">...and more</li>}
                  </ul>
                </div>
              </div>

              <div className="md:w-1/4 flex flex-col items-start md:items-end">
                {week.due && week.due.map((item, i) => (
                  <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 mb-1">
                    Due: {item.split('(')[0]}
                  </span>
                ))}
                <span className="text-xs text-blue-500 font-semibold mt-2 underline md:no-underline group-hover:underline">
                  View Resources & Visuals
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const WeekDetailView: React.FC<{ week: Week, onBack: () => void }> = ({ week, onBack }) => {
  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-uwm-black transition-colors"
      >
        <ArrowLeft size={16} /> Back to Schedule
      </button>

      <div className="bg-uwm-black text-white p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-uwm-gold font-bold uppercase tracking-widest text-xs">Week {week.id}</span>
            <h2 className="text-3xl font-serif font-bold mt-2">{week.title}</h2>
            <p className="text-gray-300 mt-2">{week.dates}</p>
          </div>
          <div className="hidden md:block">
            <BookOpen className="w-12 h-12 text-white/10" />
          </div>
        </div>
      </div>

      {/* Week 1 Specific Content */}
      {week.id === 1 ? (
        <Week1Visuals />
      ) : (
        <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 text-center">
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Visuals Coming Soon</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            The interactive diagrams and charts for <strong>{week.title}</strong> are currently being prepared. 
            Check back closer to the module start date.
          </p>
        </div>
      )}

      {/* Common Metadata Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-uwm-gold" /> Assigned Readings
          </h3>
          <ul className="space-y-3">
            {week.readings.map((r, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="w-5 h-5 bg-blue-50 text-blue-600 rounded flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {i + 1}
                </span>
                {r}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Variable className="w-4 h-4 text-uwm-gold" /> Key Topics
          </h3>
          <div className="flex flex-wrap gap-2">
            {week.topics.map((t, i) => (
              <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- VISUALS FOR WEEK 1 ---

const Week1Visuals: React.FC = () => {
  // Data for the Methods Scatter Plot
  const methodsData = [
    { name: 'Case Study', x: 10, y: 10, type: 'Qualitative' },
    { name: 'Comparative', x: 40, y: 50, type: 'Mixed' },
    { name: 'Statistical', x: 80, y: 70, type: 'Quantitative' },
    { name: 'Experimental', x: 90, y: 95, type: 'Ideal' },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded text-xs">
          <p className="font-bold text-gray-900">{payload[0].payload.name}</p>
          <p className="text-gray-500">N (Cases): {payload[0].value}</p>
          <p className="text-gray-500">Control: {payload[1].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      
      {/* 1. The Scientific Method Flow */}
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Microscope className="text-uwm-gold" /> The Scientific Method in Politics
        </h3>
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[600px] text-center">
            
            <div className="flex flex-col items-center gap-2">
              <div className="w-32 h-32 bg-blue-50 rounded-full border-4 border-blue-100 flex items-center justify-center p-4">
                <span className="font-bold text-blue-900">Theory</span>
              </div>
              <p className="text-xs text-gray-500 max-w-[140px]">A general explanation of how the world works</p>
            </div>

            <div className="h-1 flex-1 bg-gray-200 mx-4 relative">
              <div className="absolute right-0 -top-1.5 w-3 h-3 bg-gray-400 rounded-full"></div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-32 h-32 bg-indigo-50 rounded-full border-4 border-indigo-100 flex items-center justify-center p-4">
                <span className="font-bold text-indigo-900">Hypothesis</span>
              </div>
              <p className="text-xs text-gray-500 max-w-[140px]">A specific, testable prediction derived from theory</p>
            </div>

            <div className="h-1 flex-1 bg-gray-200 mx-4 relative">
              <div className="absolute right-0 -top-1.5 w-3 h-3 bg-gray-400 rounded-full"></div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-32 h-32 bg-emerald-50 rounded-full border-4 border-emerald-100 flex items-center justify-center p-4">
                <span className="font-bold text-emerald-900">Testing</span>
              </div>
              <p className="text-xs text-gray-500 max-w-[140px]">Using cases/data to verify or falsify the hypothesis</p>
            </div>
          
          </div>
        </div>
      </section>

      {/* 2. The Methods Hierarchy Chart */}
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Scale className="text-uwm-gold" /> Lijphart's Hierarchy of Methods
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-4 rounded-xl shadow-sm border border-gray-100 h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="Number of Cases (N)" 
                  unit="%" 
                  tick={false}
                  label={{ value: 'Number of Cases (N) →', position: 'bottom', offset: 0 }} 
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Level of Control" 
                  unit="%" 
                  tick={false}
                  label={{ value: 'Level of Control (Internal Validity) →', angle: -90, position: 'insideLeft' }} 
                />
                <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                <ReferenceLine x={50} stroke="#cbd5e1" strokeDasharray="3 3" />
                <ReferenceLine y={50} stroke="#cbd5e1" strokeDasharray="3 3" />
                <Scatter name="Methods" data={methodsData} fill="#8884d8">
                  {methodsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#ef4444', '#f59e0b', '#3b82f6', '#10b981'][index]} />
                  ))}
                  <LabelList dataKey="name" position="top" style={{ fontWeight: 'bold', fill: '#1e293b' }} />
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-3">
             <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg">
               <h4 className="font-bold text-emerald-800 flex items-center gap-2"><FlaskConical className="w-4 h-4" /> Experimental</h4>
               <p className="text-xs text-emerald-700 mt-1">The Gold Standard. High control over variables. Rarely possible in Pol Sci.</p>
             </div>
             <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
               <h4 className="font-bold text-blue-800 flex items-center gap-2"><Calculator className="w-4 h-4" /> Statistical</h4>
               <p className="text-xs text-blue-700 mt-1">Conceptual control through math (partial correlations). Requires large N.</p>
             </div>
             <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg shadow-sm border-l-4 border-l-amber-500">
               <h4 className="font-bold text-amber-800 flex items-center gap-2"><Scale className="w-4 h-4" /> Comparative</h4>
               <p className="text-xs text-amber-700 mt-1"><strong>The Focus of this Course.</strong> Small N (e.g., 2-20 countries). Control achieved by careful case selection.</p>
             </div>
             <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
               <h4 className="font-bold text-red-800 flex items-center gap-2"><Microscope className="w-4 h-4" /> Case Study</h4>
               <p className="text-xs text-red-700 mt-1">N=1. Deep context, but zero control. Good for generating hypotheses.</p>
             </div>
          </div>
        </div>
      </section>

      {/* 3. The Fundamental Problem */}
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <AlertTriangle className="text-uwm-gold" /> The Fundamental Problem
        </h3>
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2">
             <h4 className="text-2xl font-serif font-bold text-white mb-2">"Many Variables, Small N"</h4>
             <p className="text-slate-300 leading-relaxed">
               In comparative politics, we often have too many possible explanations (variables) and too few countries (cases) to test them on. 
               It's like trying to solve an algebra equation with 5 unknowns but only 2 equations.
             </p>
          </div>
          
          <div className="md:w-1/2 bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/20">
            <h5 className="font-bold text-uwm-gold mb-3 border-b border-white/10 pb-2">Lijphart's Solutions</h5>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />
                <span>Increase N (Add more countries or historical cases)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />
                <span>Reduce the property space (Combine variables)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />
                <span><strong>Most Similar Systems Design (MSSD)</strong>: Compare countries that are similar in all respects except the variable of interest.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ScheduleView;
