
import React, { useState, useEffect, useMemo } from 'react';
import { SCHEDULE } from '../constants';
import { Week } from '../types';
import { 
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, LabelList, Legend,
  BarChart, Bar
} from 'recharts';
import { 
  ChevronRight, ArrowLeft, Microscope, Scale, 
  Variable, Globe, BookOpen, AlertTriangle, 
  CheckCircle2, Users, Split, Swords, Handshake,
  Crown, Beaker, PlayCircle, RefreshCw, BarChart3,
  Search, FileText, X, ArrowDown
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

      {/* Increased left margin significantly (ml-48) to prevent axis label overlap with Single Country box */}
      <div className="relative h-64 border-l-2 border-b-2 border-gray-300 ml-48 my-6 mr-4">
        {/* Y-Axis Label: Moved further left (-left-32) to ensure clearance */}
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
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

      {/* Detail Panel: Reduced height and padding when empty */}
      <div className={`mt-8 bg-gray-50 rounded-xl border border-gray-100 transition-all duration-300 ${hoveredMethod ? 'p-6 min-h-[160px]' : 'p-3 min-h-[50px] flex items-center justify-center'}`}>
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
          <div className="text-gray-400 text-xs italic">
            Hover over the boxes in the chart to explore different methods.
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
    </div>
  );
};

const ManufacturedMajorityChart: React.FC = () => {
  // Approximate data from a typical UK election (e.g., 2005) showing disproportionality
  const data = [
    { name: 'Labour', votes: 35.2, seats: 55.2, fill: '#ef4444' }, // 35% vote -> 55% seats
    { name: 'Conservative', votes: 32.4, seats: 30.7, fill: '#3b82f6' },
    { name: 'Lib Dem', votes: 22.0, seats: 9.6, fill: '#eab308' }, // 22% vote -> 9% seats (punished)
    { name: 'Others', votes: 10.4, seats: 4.5, fill: '#94a3b8' }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
      <div className="mb-6">
        <h4 className="text-lg font-bold text-gray-900">The "Manufactured Majority"</h4>
        <p className="text-sm text-gray-600">
          How First-Past-The-Post (FPTP) creates parliamentary majorities from minority votes. 
          Notice how the winner (Labour) gets a "seat bonus" while smaller parties (Lib Dem) are punished.
        </p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 40 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" unit="%" domain={[0, 60]} />
            <YAxis dataKey="name" type="category" width={80} style={{ fontSize: '12px', fontWeight: 'bold' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="votes" name="Percent of Votes" fill="#9ca3af" barSize={15} radius={[0, 4, 4, 0]} />
            <Bar dataKey="seats" name="Percent of Seats" fill="#1e3a8a" barSize={15} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const FusionOfPowerDiagram: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="mb-6">
        <h4 className="text-lg font-bold text-gray-900">Fusion of Power (UK)</h4>
        <p className="text-sm text-gray-600">
          Unlike the US Separation of Powers, the UK Executive is <strong>inside</strong> the Legislature.
        </p>
      </div>

      <div className="flex-grow flex items-center justify-center py-4">
        <div className="relative w-64 h-64">
           {/* Voters */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full text-center">
             <div className="flex justify-center gap-1 mb-1">
               <Users className="w-5 h-5 text-gray-400" />
               <Users className="w-5 h-5 text-gray-400" />
               <Users className="w-5 h-5 text-gray-400" />
             </div>
             <span className="text-xs font-bold uppercase text-gray-500 tracking-widest">Voters</span>
             <ArrowDown className="w-6 h-6 text-gray-300 mx-auto mt-1" />
           </div>

           {/* Parliament Box */}
           <div className="absolute top-20 left-0 w-full h-40 border-4 border-slate-800 rounded-xl bg-slate-50 flex flex-col items-center pt-2">
              <span className="text-sm font-black text-slate-800 uppercase">Parliament</span>
              <span className="text-xs text-slate-500">(Legislature)</span>

              {/* Cabinet Box (Inside) */}
              <div className="mt-4 w-3/4 h-20 bg-uwm-gold rounded-lg shadow-lg flex flex-col items-center justify-center text-white relative">
                 <span className="font-bold">Cabinet</span>
                 <span className="text-xs opacity-80">(Executive)</span>
                 
                 {/* Connection Lines */}
                 <div className="absolute -top-4 w-0.5 h-4 bg-gray-400"></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const Week2Visuals: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Intro Section */}
      <section>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Crown className="text-uwm-gold" /> The Westminster Model
          </h3>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
               <p className="text-gray-700 leading-relaxed mb-4">
                 The Westminster model is the "majoritarian" prototype of democracy. It is named after the Palace of Westminster in London. Its core principle is that the winner of an election should have the power to govern and enact their policy agenda without significant checks and balances, so voters can hold them accountable at the next election.
               </p>
               <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-bold text-blue-900 mb-2 text-sm uppercase">Key Philosophy</h4>
                  <p className="text-blue-800 text-sm italic">
                    "The majority of the people (50% + 1) should rule."
                  </p>
               </div>
            </div>

            <div className="md:w-1/2 bg-slate-50 p-6 rounded-lg border border-slate-100">
               <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase border-b border-slate-200 pb-2">10 Key Variables (Majoritarian)</h4>
               <ul className="space-y-2 text-sm text-slate-700">
                 <li className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-400 rounded-full"></div>One-party bare majority cabinets</li>
                 <li className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-400 rounded-full"></div>Cabinet dominance</li>
                 <li className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-400 rounded-full"></div>Two-party system</li>
                 <li className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-400 rounded-full"></div>Majoritarian/Plurality elections</li>
                 <li className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-400 rounded-full"></div>Pluralist interest groups</li>
                 <li className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-400 rounded-full"></div>Unitary & centralized</li>
                 <li className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-400 rounded-full"></div>Unicameralism (or asymmetric)</li>
                 <li className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-400 rounded-full"></div>Flexible constitutions</li>
                 <li className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-400 rounded-full"></div>No judicial review</li>
                 <li className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-400 rounded-full"></div>Dependent central bank</li>
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Visuals Section (New Charts) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <ManufacturedMajorityChart />
         <FusionOfPowerDiagram />
      </section>

      {/* Case Study Section */}
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
           <Globe className="text-uwm-gold" /> Case Study: United Kingdom
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 col-span-2">
              <h4 className="font-bold text-gray-900 mb-2">Why is it the prototype?</h4>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                The UK combines nearly all the majoritarian features. The cabinet is usually composed of a single party that has a majority in the House of Commons. The executive (PM & Cabinet) dominates the legislature. The "First-Past-The-Post" electoral system manufactures majorities even when the winning party gets less than 50% of the vote.
              </p>
              <div className="bg-yellow-50 p-3 rounded border border-yellow-100 text-xs text-yellow-800">
                 <strong>Note:</strong> The UK has deviated recently with the creation of the Supreme Court (2009) and devolution to Scotland/Wales, moving slightly away from the pure model.
              </div>
           </div>
           
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
              <div className="text-6xl font-black text-gray-100 mb-2">UK</div>
              <p className="text-sm font-bold text-gray-400">The Westminster Prototype</p>
           </div>
        </div>
      </section>
    </div>
  );
};

export default ScheduleView;
