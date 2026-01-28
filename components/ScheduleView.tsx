
import React, { useState, useEffect, useMemo } from 'react';
import { SCHEDULE } from '../constants';
import { Week } from '../types';
import { 
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, LabelList, Legend
} from 'recharts';
import { 
  ChevronRight, ArrowLeft, Microscope, Scale, 
  Variable, Globe, BookOpen, AlertTriangle, 
  CheckCircle2, Users, Split, Swords, Handshake,
  Crown, Beaker, PlayCircle, RefreshCw, BarChart3,
  Search, FileText, X
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
                   week.id === 1 || week.id === 2 ? 'bg-uwm-gold text-white' : 'bg-gray-100 text-gray-600'
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

      {/* Conditional Content Rendering */}
      {week.id === 1 ? (
        <Week1Visuals />
      ) : week.id === 2 ? (
        <Week2Visuals />
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

// --- VISUALIZATION COMPONENTS ---

const MethodsMatrix: React.FC = () => {
  const [hoveredMethod, setHoveredMethod] = useState<'single' | 'few' | 'many' | null>(null);

  const methods = {
    single: {
      title: "Single-Country Studies",
      desc: "Intensive analysis of one country.",
      strengths: ["Contextual description", "Generating hypotheses", "Process tracing", "Understanding 'deviant' cases"],
      weaknesses: ["Cannot generalize (N=1)", "Selection bias", "No control"],
      example: "Tocqueville's Democracy in America, Putnam's Making Democracy Work (Italy)"
    },
    few: {
      title: "Comparing Few Countries (Small-N)",
      desc: "Intentional selection of 2-20 countries.",
      strengths: ["Control through selection (MSSD/MDSD)", "Cultural sensitivity", "Theory building"],
      weaknesses: ["Limited generalization", "Many variables, small N"],
      example: "Skocpol's States and Social Revolutions, Moore's Social Origins"
    },
    many: {
      title: "Comparing Many Countries (Large-N)",
      desc: "Statistical analysis of 50+ countries.",
      strengths: ["Statistical control", "Strong inferences", "Global generalizations"],
      weaknesses: ["Conceptual stretching", "Thin data", "Ignores context"],
      example: "Lipset (1959) Economic Development & Democracy, Gurr (1968) Civil Strife"
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
        <Scale className="text-uwm-gold" /> The Trade-off: Scope vs. Abstraction
      </h3>
      <p className="text-gray-500 text-sm mb-6">
        Landman (Ch 2) argues there is a necessary trade-off between the level of abstraction (generality) and the scope of countries.
      </p>

      {/* Adjusted margins and label position to prevent overlap */}
      <div className="relative h-64 border-l-2 border-b-2 border-gray-300 ml-16 my-6 mr-4">
        {/* Y-Axis Label */}
        <div className="absolute -left-14 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
          Level of Abstraction
        </div>
        {/* X-Axis Label */}
        <div className="absolute bottom-[-2rem] left-1/2 -translate-x-1/2 text-xs font-bold text-gray-400 uppercase tracking-widest">
          Scope of Countries (N)
        </div>

        {/* Matrix Points */}
        <div 
          className="absolute top-4 right-4 cursor-pointer group"
          onMouseEnter={() => setHoveredMethod('many')}
          onMouseLeave={() => setHoveredMethod(null)}
        >
          <div className={`w-32 h-20 rounded-lg flex items-center justify-center text-center p-2 text-xs font-bold transition-all ${hoveredMethod === 'many' ? 'bg-blue-600 text-white scale-110 z-10 shadow-lg' : 'bg-blue-100 text-blue-800'}`}>
            Many Countries<br/>(Statistical)
          </div>
        </div>

        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
          onMouseEnter={() => setHoveredMethod('few')}
          onMouseLeave={() => setHoveredMethod(null)}
        >
          <div className={`w-32 h-20 rounded-lg flex items-center justify-center text-center p-2 text-xs font-bold transition-all ${hoveredMethod === 'few' ? 'bg-indigo-600 text-white scale-110 z-10 shadow-lg' : 'bg-indigo-100 text-indigo-800'}`}>
            Few Countries<br/>(Comparative)
          </div>
        </div>

        <div 
          className="absolute bottom-4 left-4 cursor-pointer group"
          onMouseEnter={() => setHoveredMethod('single')}
          onMouseLeave={() => setHoveredMethod(null)}
        >
          <div className={`w-32 h-20 rounded-lg flex items-center justify-center text-center p-2 text-xs font-bold transition-all ${hoveredMethod === 'single' ? 'bg-slate-800 text-white scale-110 z-10 shadow-lg' : 'bg-slate-200 text-slate-700'}`}>
            Single Country<br/>(Case Study)
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      <div className="mt-8 bg-gray-50 rounded-xl p-6 min-h-[160px] border border-gray-100 transition-all">
        {hoveredMethod ? (
          <div className="animate-fade-in">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-lg font-bold text-gray-900">{methods[hoveredMethod].title}</h4>
              <span className="text-xs bg-white border px-2 py-1 rounded text-gray-500 font-mono">
                {hoveredMethod === 'single' ? 'N=1' : hoveredMethod === 'few' ? 'N=2-20' : 'N=50+'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">{methods[hoveredMethod].desc}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-bold text-green-600 block mb-1">Strengths</span>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {methods[hoveredMethod].strengths.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              <div>
                <span className="font-bold text-red-600 block mb-1">Weaknesses</span>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {methods[hoveredMethod].weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-200 text-xs text-gray-500 italic">
              <strong>Example:</strong> {methods[hoveredMethod].example}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            <p>Hover over the boxes in the chart to explore different methods.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ResearchDesignComparator: React.FC = () => {
  const [mode, setMode] = useState<'mssd' | 'mdsd'>('mssd');

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Microscope className="text-uwm-gold" /> Research Design Systems
          </h3>
          <p className="text-sm text-gray-500">Comparing Mill's Methods (Landman Ch 4)</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button 
            onClick={() => setMode('mssd')}
            className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${mode === 'mssd' ? 'bg-white shadow-sm text-uwm-black' : 'text-gray-500 hover:text-gray-700'}`}
          >
            MSSD (Similar)
          </button>
          <button 
            onClick={() => setMode('mdsd')}
            className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${mode === 'mdsd' ? 'bg-white shadow-sm text-uwm-black' : 'text-gray-500 hover:text-gray-700'}`}
          >
            MDSD (Different)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Definition Side */}
        <div className={`p-6 rounded-xl border-l-4 ${mode === 'mssd' ? 'bg-blue-50 border-blue-500' : 'bg-purple-50 border-purple-500'}`}>
          <h4 className={`text-lg font-bold mb-2 ${mode === 'mssd' ? 'text-blue-900' : 'text-purple-900'}`}>
            {mode === 'mssd' ? 'Most Similar Systems Design' : 'Most Different Systems Design'}
          </h4>
          <p className="text-sm text-gray-700 mb-4 leading-relaxed">
            {mode === 'mssd' 
              ? "Compares countries that are very similar (controlling for culture, history, region) but differ in the specific outcome. Based on J.S. Mill's 'Method of Difference'."
              : "Compares countries that are very different but share the same outcome. The goal is to find the one common factor amidst the diversity. Based on J.S. Mill's 'Method of Agreement'."
            }
          </p>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h5 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Classic Example</h5>
            {mode === 'mssd' ? (
              <div>
                <p className="font-bold text-gray-800">Regional Studies (e.g. Latin America)</p>
                <p className="text-xs text-gray-600 mt-1">Why did Costa Rica democratize while El Salvador plunged into civil war?</p>
                <div className="mt-2 text-xs flex gap-2">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded">Similar: Language, Religion</span>
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded">Different: Land Tenure</span>
                </div>
              </div>
            ) : (
              <div>
                <p className="font-bold text-gray-800">Skocpol (1979): Social Revolutions</p>
                <p className="text-xs text-gray-600 mt-1">Why did France (1789), Russia (1917), and China (1911) all have social revolutions despite being totally different?</p>
                <div className="mt-2 text-xs flex gap-2">
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded">Different: Time, Culture</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded">Same: State Breakdown</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Visual Logic Side */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col justify-center">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center text-gray-400 text-xs font-bold uppercase tracking-widest pb-2 border-b">
              <span>Variable</span>
              <span>Case A</span>
              <span>Case B</span>
            </div>
            
            {/* Variable Rows */}
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Culture/History</span>
              {mode === 'mssd' ? (
                 <>
                   <span className="text-blue-600 font-bold bg-blue-50 px-2 rounded">Similar</span>
                   <span className="text-blue-600 font-bold bg-blue-50 px-2 rounded">Similar</span>
                 </>
              ) : (
                 <>
                   <span className="text-red-500 font-bold bg-red-50 px-2 rounded">Different</span>
                   <span className="text-red-500 font-bold bg-red-50 px-2 rounded">Different</span>
                 </>
              )}
            </div>

            <div className="flex justify-between items-center">
               <span className="text-gray-600">Economy</span>
               {mode === 'mssd' ? (
                 <>
                   <span className="text-blue-600 font-bold bg-blue-50 px-2 rounded">Similar</span>
                   <span className="text-blue-600 font-bold bg-blue-50 px-2 rounded">Similar</span>
                 </>
              ) : (
                 <>
                   <span className="text-red-500 font-bold bg-red-50 px-2 rounded">Different</span>
                   <span className="text-red-500 font-bold bg-red-50 px-2 rounded">Different</span>
                 </>
              )}
            </div>

            <div className="flex justify-between items-center py-2 border-t border-b border-gray-100 bg-gray-50 -mx-6 px-6">
               <span className="font-bold text-gray-800">Key Factor (X)</span>
               {mode === 'mssd' ? (
                 <>
                   <span className="text-red-500 font-bold">Present</span>
                   <span className="text-red-500 font-bold">Absent</span>
                 </>
              ) : (
                 <>
                   <span className="text-green-600 font-bold">Present</span>
                   <span className="text-green-600 font-bold">Present</span>
                 </>
              )}
            </div>

            <div className="flex justify-between items-center pt-2">
               <span className="font-black text-uwm-black">Outcome (Y)</span>
               {mode === 'mssd' ? (
                 <>
                   <span className="text-uwm-black font-bold">Outcome 1</span>
                   <span className="text-gray-400 font-bold">Outcome 2</span>
                 </>
              ) : (
                 <>
                   <span className="text-uwm-black font-bold">Same Outcome</span>
                   <span className="text-uwm-black font-bold">Same Outcome</span>
                 </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- VISUALS FOR WEEK 1 ---

const ScientificMethodDiagram: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Microscope className="text-uwm-gold" /> The Scientific Method in Politics
      </h3>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-0"></div>

        {/* Step 1 */}
        <div className="relative z-10 bg-white p-4 rounded-lg border border-gray-200 w-full md:w-1/4 flex flex-col items-center text-center shadow-sm hover:border-uwm-gold transition-colors">
          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mb-3">1</div>
          <h4 className="font-bold text-gray-800 text-sm mb-1">Puzzle</h4>
          <p className="text-xs text-gray-500">"Why are some countries rich and others poor?"</p>
        </div>

        {/* Arrow Mobile */}
        <div className="md:hidden text-gray-300">▼</div>

        {/* Step 2 */}
        <div className="relative z-10 bg-white p-4 rounded-lg border border-gray-200 w-full md:w-1/4 flex flex-col items-center text-center shadow-sm hover:border-uwm-gold transition-colors">
          <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold mb-3">2</div>
          <h4 className="font-bold text-gray-800 text-sm mb-1">Theory</h4>
          <p className="text-xs text-gray-500">"Democracy encourages economic growth."</p>
        </div>

        {/* Arrow Mobile */}
        <div className="md:hidden text-gray-300">▼</div>

        {/* Step 3 */}
        <div className="relative z-10 bg-white p-4 rounded-lg border border-gray-200 w-full md:w-1/4 flex flex-col items-center text-center shadow-sm hover:border-uwm-gold transition-colors">
          <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold mb-3">3</div>
          <h4 className="font-bold text-gray-800 text-sm mb-1">Hypothesis</h4>
          <p className="text-xs text-gray-500">"If X (Democracy) increases, then Y (GDP) increases."</p>
        </div>

        {/* Arrow Mobile */}
        <div className="md:hidden text-gray-300">▼</div>

        {/* Step 4 */}
        <div className="relative z-10 bg-white p-4 rounded-lg border border-gray-200 w-full md:w-1/4 flex flex-col items-center text-center shadow-sm hover:border-uwm-gold transition-colors">
          <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold mb-3">4</div>
          <h4 className="font-bold text-gray-800 text-sm mb-1">Test (Data)</h4>
          <p className="text-xs text-gray-500">Compare GDP data across 50 countries (Large-N) or 2 cases (Small-N).</p>
        </div>
      </div>
      
      <div className="mt-6 bg-gray-50 p-4 rounded-lg text-xs text-gray-600 border border-gray-100 flex gap-2">
         <div className="font-bold text-uwm-black">Note:</div>
         <div>Political science moves from specific puzzles to general theories (Inductive) or from general theories to specific tests (Deductive).</div>
      </div>
    </div>
  );
};

const Week1Visuals: React.FC = () => {
  // --- STATE FOR INTERACTIVITY ---
  const [reformSimulated, setReformSimulated] = useState(false);

  // Data for Conceptual Map (Approximate coordinates from Lijphart Ch 14, Fig 14.1)
  // Memoized to prevent re-renders of the chart
  const mapData = useMemo(() => [
    { name: 'UK', x: 1.2, y: 1.1, type: 'Majoritarian (Unitary)' },
    { 
      name: 'New Zealand', 
      x: reformSimulated ? -0.8 : 1.8,  // Moves left on reform
      y: 1.9, 
      type: reformSimulated ? 'Mixed (Post-1996)' : 'Majoritarian (Unitary)',
      isTarget: true
    },
    { name: 'Barbados', x: 1.4, y: 0.4, type: 'Majoritarian (Unitary)' },
    { name: 'USA', x: 0.7, y: -1.9, type: 'Majoritarian (Federal)' },
    { name: 'Canada', x: 1.0, y: -1.5, type: 'Majoritarian (Federal)' },
    { name: 'Switzerland', x: -1.6, y: -1.3, type: 'Consensus (Federal)' },
    { name: 'Belgium', x: -0.9, y: -0.2, type: 'Consensus (Federal)' },
    { name: 'Germany', x: -0.7, y: -2.1, type: 'Consensus (Federal)' },
    { name: 'Israel', x: -1.3, y: 0.9, type: 'Consensus (Unitary)' },
    { name: 'India', x: -0.6, y: -1.0, type: 'Consensus (Federal)' },
    // Corrected Japan: Unitary (Positive Y) & Slightly Majoritarian (Positive X) per Lijphart 2nd Ed
    { name: 'Japan', x: 0.2, y: 0.9, type: 'Majoritarian (Unitary)' }, 
    { name: 'France', x: 0.7, y: 0.1, type: 'Majoritarian (Unitary)' },
    { name: 'Sweden', x: -0.8, y: 1.1, type: 'Consensus (Unitary)' },
  ], [reformSimulated]);

  return (
    <div className="space-y-12">

      {/* 1. The Scientific Method Flow (Methodology) - ISOLATED COMPONENT */}
      <ScientificMethodDiagram />

      {/* 2. The Fundamental Problem (Methodology) */}
      <section>
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8 rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2">
             <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-uwm-gold w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">The Problem</span>
             </div>
             <h4 className="text-2xl font-serif font-bold text-white mb-2">"Many Variables, Small N"</h4>
             <p className="text-slate-300 leading-relaxed">
               Lijphart (1971) identifies the core problem of comparative politics: we often have too many possible explanations (variables) and too few countries (cases) to test them on. 
               We cannot use experimental methods like chemists, so we must use logic and statistics to control our variables.
             </p>
          </div>
          
          <div className="md:w-1/2 bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/20">
            <h5 className="font-bold text-uwm-gold mb-3 border-b border-white/10 pb-2">Lijphart's Solutions</h5>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />
                <span>Increase N (Add more countries)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />
                <span>Reduce the property space (Combine variables)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />
                <span><strong>Comparative Method</strong>: Focus on comparable cases.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. METHODS EXPLORER */}
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Beaker className="text-uwm-gold" /> Methods of Political Inquiry
        </h3>
        
        {/* The Trade-off Matrix */}
        <MethodsMatrix />
        
        <div className="mt-8"></div>
        
        {/* Research Design Comparator */}
        <ResearchDesignComparator />

      </section>
      
      {/* 4. The Core Definition: Majoritarian vs Consensus */}
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Scale className="text-uwm-gold" /> The Core Definition: Who Governs?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Majoritarian Card */}
          <div className="bg-white rounded-2xl shadow-lg border-t-8 border-blue-600 overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                   <h4 className="text-2xl font-serif font-bold text-gray-900">Majoritarian</h4>
                   <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">The Westminster Model</span>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Swords className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-sm font-bold text-gray-500 uppercase mb-1">Core Principle</h5>
                  <p className="text-gray-800 font-medium">"Government by the majority of the people."</p>
                </div>
                <div>
                  <h5 className="text-sm font-bold text-gray-500 uppercase mb-1">Key Traits</h5>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>Exclusive & Competitive</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>Adversarial (Govt vs Opposition)</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>Winner-takes-all</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-8 py-4 text-xs text-gray-500 border-t border-gray-100">
              Typical Example: United Kingdom
            </div>
          </div>

          {/* Consensus Card */}
          <div className="bg-white rounded-2xl shadow-lg border-t-8 border-indigo-600 overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                   <h4 className="text-2xl font-serif font-bold text-gray-900">Consensus</h4>
                   <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">The Consensus Model</span>
                </div>
                <div className="bg-indigo-100 p-3 rounded-full">
                  <Handshake className="w-8 h-8 text-indigo-600" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-sm font-bold text-gray-500 uppercase mb-1">Core Principle</h5>
                  <p className="text-gray-800 font-medium">"Government by as many people as possible."</p>
                </div>
                <div>
                  <h5 className="text-sm font-bold text-gray-500 uppercase mb-1">Key Traits</h5>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>Inclusive & Bargaining</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>Compromise-oriented</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>Power-sharing</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-8 py-4 text-xs text-gray-500 border-t border-gray-100">
              Typical Example: Switzerland, Belgium
            </div>
          </div>
        </div>
      </section>

      {/* 5. Conceptual Map of Democracy - MOVING GRAPH */}
      <section>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Globe className="text-uwm-gold" /> Lijphart's Conceptual Map
            </h3>
            <p className="text-gray-600 text-sm mt-1">Based on Figure 14.1 (1945–1996 Data)</p>
          </div>
          <button 
            onClick={() => setReformSimulated(!reformSimulated)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
              reformSimulated 
                ? 'bg-red-500 text-white shadow-md' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {reformSimulated ? <RefreshCw size={16} /> : <PlayCircle size={16} />}
            {reformSimulated ? 'Reset Map' : 'Simulate 1996 Reform'}
          </button>
        </div>

        <div className="bg-white p-4 md:p-8 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-[600px] w-full relative">
            
            {/* Quadrant Labels */}
            <div className="absolute top-4 right-4 text-xs font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded">Unitary-Majoritarian</div>
            <div className="absolute top-4 left-4 text-xs font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded">Unitary-Consensus</div>
            <div className="absolute bottom-20 left-4 text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded">Federal-Consensus</div>
            <div className="absolute bottom-20 right-4 text-xs font-bold text-purple-500 bg-purple-50 px-2 py-1 rounded">Federal-Majoritarian</div>

            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 50, right: 30, bottom: 60, left: 50 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="Executives-Parties" 
                  label={{ value: 'Consensus ⟵ Dimension I ⟶ Majoritarian', position: 'bottom', offset: 0 }}
                  domain={[-2.5, 2.5]}
                  ticks={[-2, -1, 0, 1, 2]}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Federal-Unitary" 
                  label={{ 
                    value: 'Federal ⟵ Dimension II ⟶ Unitary', 
                    angle: -90, 
                    position: 'left', // Moved to 'left' outside axis
                    offset: 10,
                    style: { textAnchor: 'middle' } 
                  }}
                  domain={[-2.5, 2.5]}
                  ticks={[-2, -1, 0, 1, 2]}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }} 
                  content={({ payload }) => {
                    if (payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 border shadow-lg rounded text-sm">
                          <p className="font-bold">{data.name}</p>
                          <p className="text-gray-500">{data.type}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <ReferenceLine x={0} stroke="#94a3b8" />
                <ReferenceLine y={0} stroke="#94a3b8" />
                <Scatter name="Democracies" data={mapData} fill="#1e3a8a" animationDuration={1000}>
                  {mapData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.isTarget && reformSimulated ? '#ef4444' : (entry.x > 0 ? '#3b82f6' : '#6366f1')} 
                    />
                  ))}
                  <LabelList dataKey="name" position="top" style={{ fontSize: '10px', fontWeight: 'bold' }} />
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          <div className={`mt-4 p-4 rounded-lg border-l-4 text-sm space-y-2 transition-colors ${reformSimulated ? 'bg-red-50 border-red-500 text-red-900' : 'bg-amber-50 border-amber-500 text-amber-900'}`}>
            <p className="font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> 
              {reformSimulated ? 'Institutional Change Visualized' : 'Important: Data Context (1945–1996)'}
            </p>
            <p>
              {reformSimulated 
                ? "Notice how New Zealand shifts dramatically to the left? In 1996, they abandoned the First-Past-The-Post system (Majoritarian) for Mixed Member Proportional (Consensus). Institutions are not static; they can change."
                : "This map reflects the data analyzed in Patterns of Democracy (1945–1996). New Zealand appears as a Majoritarian prototype here, but look what happens when we simulate its later reforms..."}
            </p>
          </div>
        </div>
      </section>

      {/* 6. The Two Dimensions Breakdown */}
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Variable className="text-uwm-gold" /> The 10 Variables (Divided by Dimension)
        </h3>
        <p className="text-gray-600 mb-8 max-w-3xl">
          Lijphart argues that democratic institutions cluster into two distinct dimensions. 
          A country can be majoritarian on one dimension but consensual on the other (e.g., Canada, USA).
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Dimension I: Executives-Parties */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 z-0"></div>
             <div className="relative z-10">
               <div className="flex items-center gap-3 mb-4">
                 <Users className="text-blue-600 w-6 h-6" />
                 <h4 className="text-lg font-bold text-gray-900">Dimension I: Executives-Parties</h4>
               </div>
               <p className="text-xs text-gray-500 mb-6 font-medium uppercase tracking-wide">
                 Joint Power vs. Concentrated Power
               </p>
               
               <div className="space-y-3">
                 {[
                   "Cabinets: Single-party vs. Coalition",
                   "Executive-Legislative: Dominance vs. Balance",
                   "Party System: Two-party vs. Multiparty",
                   "Electoral System: Majoritarian vs. PR",
                   "Interest Groups: Pluralist vs. Corporatist"
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-3 text-sm text-gray-700 bg-gray-50 p-2 rounded border border-gray-100">
                     <span className="font-bold text-blue-400">{i+1}.</span> {item}
                   </div>
                 ))}
               </div>
             </div>
          </div>

          {/* Dimension II: Federal-Unitary */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -mr-4 -mt-4 z-0"></div>
             <div className="relative z-10">
               <div className="flex items-center gap-3 mb-4">
                 <Split className="text-indigo-600 w-6 h-6" />
                 <h4 className="text-lg font-bold text-gray-900">Dimension II: Federal-Unitary</h4>
               </div>
               <p className="text-xs text-gray-500 mb-6 font-medium uppercase tracking-wide">
                 Divided Power vs. Unified Power
               </p>
               
               <div className="space-y-3">
                 {[
                   "Federalism: Unitary vs. Federal",
                   "Legislature: Unicameral vs. Bicameral",
                   "Constitution: Flexible vs. Rigid",
                   "Judicial Review: Legislature final vs. Court review",
                   "Central Bank: Dependent vs. Independent"
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-3 text-sm text-gray-700 bg-gray-50 p-2 rounded border border-gray-100">
                     <span className="font-bold text-indigo-400">{i+1}.</span> {item}
                   </div>
                 ))}
               </div>
             </div>
          </div>

        </div>
      </section>

    </div>
  );
};

// --- VISUALS FOR WEEK 2 ---

const Week2Visuals: React.FC = () => {
  return (
    <div className="space-y-12">
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Crown className="text-uwm-gold" /> The Westminster Model
        </h3>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
          <p className="text-gray-700 leading-relaxed">
            Named after the British Parliament, the Westminster model represents the "Majoritarian" ideal. 
            Its core principle is that the majority should govern and the minority should oppose.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-blue-900 text-white p-8 rounded-xl shadow-lg">
             <div className="flex items-center gap-3 mb-6">
               <Swords className="text-blue-300 w-8 h-8" />
               <h4 className="text-2xl font-serif font-bold">Exclusivity</h4>
             </div>
             <p className="text-blue-100 mb-6">
               Political power is concentrated in the hands of the majority. The winner takes all, and the loser gets nothing (until the next election).
             </p>
             <ul className="space-y-3 text-sm">
               <li className="flex items-center gap-2">
                 <CheckCircle2 className="w-4 h-4 text-blue-400" />
                 <span>Single-party majority cabinets</span>
               </li>
               <li className="flex items-center gap-2">
                 <CheckCircle2 className="w-4 h-4 text-blue-400" />
                 <span>Executive dominance over legislature</span>
               </li>
               <li className="flex items-center gap-2">
                 <CheckCircle2 className="w-4 h-4 text-blue-400" />
                 <span>Two-party system</span>
               </li>
               <li className="flex items-center gap-2">
                 <CheckCircle2 className="w-4 h-4 text-blue-400" />
                 <span>Majoritarian / Plurality elections</span>
               </li>
             </ul>
           </div>

           <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
             <h4 className="text-xl font-bold text-gray-900 mb-4">Case Study: United Kingdom</h4>
             <div className="space-y-4">
               <div className="bg-gray-50 p-4 rounded-lg">
                 <span className="text-xs font-bold text-gray-500 uppercase">Government</span>
                 <p className="font-medium">Single-party majority (usually)</p>
               </div>
               <div className="bg-gray-50 p-4 rounded-lg">
                 <span className="text-xs font-bold text-gray-500 uppercase">Constitution</span>
                 <p className="font-medium">Unwritten / Flexible (Parliamentary Sovereignty)</p>
               </div>
               <div className="bg-gray-50 p-4 rounded-lg">
                 <span className="text-xs font-bold text-gray-500 uppercase">Legislature</span>
                 <p className="font-medium">Asymmetric Bicameralism (Commons dominates Lords)</p>
               </div>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default ScheduleView;
