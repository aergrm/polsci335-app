
import React, { useState } from 'react';
import { SCHEDULE } from '../constants';
import { Week } from '../types';
import { 
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, Label, LabelList,
  BarChart, Bar, Legend
} from 'recharts';
import { 
  ChevronRight, ArrowLeft, Microscope, Scale, 
  Variable, Globe, BookOpen, AlertTriangle, 
  CheckCircle2, Users, Split, ShieldCheck, Swords, Handshake,
  Crown, Vote, Gavel, Building2
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

// --- VISUALS FOR WEEK 1 ---

const Week1Visuals: React.FC = () => {
  // Data for Conceptual Map (Approximate coordinates from Lijphart Ch 14, Fig 14.1)
  const mapData = [
    { name: 'UK', x: 1.2, y: 1.1, type: 'Majoritarian (Unitary)' },
    { name: 'New Zealand', x: 0.5, y: 1.9, type: 'Majoritarian (Unitary)' },
    { name: 'Barbados', x: 1.4, y: 0.4, type: 'Majoritarian (Unitary)' },
    { name: 'USA', x: 0.7, y: -1.9, type: 'Majoritarian (Federal)' },
    { name: 'Canada', x: 1.0, y: -1.5, type: 'Majoritarian (Federal)' },
    { name: 'Switzerland', x: -1.6, y: -1.3, type: 'Consensus (Federal)' },
    { name: 'Belgium', x: -0.9, y: -0.2, type: 'Consensus (Federal)' },
    { name: 'Germany', x: -0.7, y: -2.1, type: 'Consensus (Federal)' },
    { name: 'Israel', x: -1.3, y: 0.9, type: 'Consensus (Unitary)' },
    { name: 'India', x: -0.6, y: -1.0, type: 'Consensus (Federal)' },
    { name: 'Japan', x: -0.3, y: -0.1, type: 'Mixed' },
    { name: 'France', x: 0.7, y: 0.1, type: 'Majoritarian (Unitary)' },
    { name: 'Sweden', x: -0.8, y: 1.1, type: 'Consensus (Unitary)' },
  ];

  return (
    <div className="space-y-12">
      
      {/* 1. The Core Definition: Majoritarian vs Consensus */}
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

      {/* 2. Conceptual Map of Democracy */}
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Globe className="text-uwm-gold" /> Lijphart's Conceptual Map of Democracy
        </h3>
        <p className="text-gray-600 mb-6 max-w-3xl">
          Based on Figure 14.1 in the textbook. This map plots the 36 democracies based on the two dimensions. 
          Note how <strong>United Kingdom</strong> and <strong>New Zealand</strong> are in the "Unitary & Majoritarian" quadrant (top-right), 
          while <strong>Switzerland</strong> is deep in the "Federal & Consensus" quadrant (bottom-left).
        </p>

        <div className="bg-white p-4 md:p-8 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-[500px] w-full relative">
            
            {/* Quadrant Labels */}
            <div className="absolute top-4 right-4 text-xs font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded">Unitary-Majoritarian</div>
            <div className="absolute top-4 left-4 text-xs font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded">Unitary-Consensus</div>
            <div className="absolute bottom-4 left-4 text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded">Federal-Consensus</div>
            <div className="absolute bottom-4 right-4 text-xs font-bold text-purple-500 bg-purple-50 px-2 py-1 rounded">Federal-Majoritarian</div>

            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
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
                  label={{ value: 'Federal ⟵ Dimension II ⟶ Unitary', angle: -90, position: 'insideLeft' }}
                  domain={[-2.5, 2.5]}
                  ticks={[-2, -1, 0, 1, 2]}
                />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <ReferenceLine x={0} stroke="#94a3b8" />
                <ReferenceLine y={0} stroke="#94a3b8" />
                <Scatter name="Democracies" data={mapData} fill="#1e3a8a">
                  {mapData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.x > 0 ? '#3b82f6' : '#6366f1'} />
                  ))}
                  <LabelList dataKey="name" position="top" style={{ fontSize: '10px', fontWeight: 'bold' }} />
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* 3. The Two Dimensions Breakdown */}
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

      {/* 4. The Scientific Method Flow (Methodology) */}
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

      {/* 5. The Fundamental Problem (Methodology) */}
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <AlertTriangle className="text-uwm-gold" /> The Comparative Method Challenge
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

// --- VISUALS FOR WEEK 2 ---

const Week2Visuals: React.FC = () => {
  // Data for Manufactured Majority Chart (Based on UK 2005 Election logic)
  const ukElectionData = [
    { name: 'Labour', votes: 35.2, seats: 55.0 },
    { name: 'Conservatives', votes: 32.4, seats: 30.7 },
    { name: 'Lib Dems', votes: 22.0, seats: 9.6 },
    { name: 'Others', votes: 10.4, seats: 4.7 },
  ];

  return (
    <div className="space-y-12">
      
      {/* 1. The Westminster Model Overview */}
      <section>
        <div className="bg-uwm-black text-white p-8 rounded-2xl shadow-xl border-l-8 border-uwm-gold">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <h3 className="text-2xl font-serif font-bold text-white mb-2">The Westminster Model</h3>
              <p className="text-blue-100 text-lg mb-4">
                The prototype of majoritarian democracy. Power is concentrated in the hands of the majority party to ensure decisive governance.
              </p>
              <div className="flex gap-4 text-xs font-bold uppercase tracking-widest text-uwm-gold">
                <span>Prototype: United Kingdom</span>
                <span>•</span>
                <span>Principle: Exclusivity</span>
              </div>
            </div>
            <div className="bg-white/10 p-4 rounded-full">
              <Crown className="w-12 h-12 text-uwm-gold" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. The Manufactured Majority Chart */}
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Vote className="text-uwm-gold" /> 1. The Manufactured Majority
        </h3>
        <p className="text-gray-600 mb-6 max-w-3xl">
          The most distinct feature of Westminster systems is the electoral system's tendency to exaggerate the winner's victory. 
          A party can win a majority of seats (100% of power) with a minority of votes.
        </p>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h4 className="text-center font-bold text-gray-700 mb-4">UK Election 2005: Votes vs. Seats</h4>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={ukElectionData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
                <Bar dataKey="votes" name="% of Votes" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="seats" name="% of Seats" fill="#1e3a8a" radius={[4, 4, 0, 0]}>
                  {ukElectionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#1e3a8a' : '#64748b'} />
                  ))}
                  <LabelList dataKey="seats" position="top" formatter={(val: number) => `${val}%`} />
                </Bar>
                <ReferenceLine y={50} stroke="red" strokeDasharray="3 3" label={{ value: 'Majority (50%)', position: 'right', fill: 'red', fontSize: 12 }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 bg-blue-50 p-4 rounded-lg text-sm text-blue-800 border-l-4 border-blue-500">
            <strong>Key Insight:</strong> Labour won 100% of the power (a parliamentary majority) with only 35.2% of the vote. 
            This is a "Manufactured Majority" — the hallmark of majoritarianism.
          </div>
        </div>
      </section>

      {/* 3. The Fusion of Powers Diagram */}
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Gavel className="text-uwm-gold" /> 2. Fusion of Power (Cabinet Dominance)
        </h3>
        
        <div className="relative bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
          {/* Diagram Flow */}
          <div className="flex flex-col items-center gap-6 w-full max-w-lg">
            
            {/* Step 1: Voters */}
            <div className="w-full text-center">
              <div className="bg-gray-100 py-3 rounded-lg border border-gray-200 font-bold text-gray-600">
                Voters
              </div>
              <div className="h-6 w-0.5 bg-gray-300 mx-auto"></div>
              <div className="text-xs text-gray-400 font-medium bg-white px-2 -mt-3 z-10 relative inline-block">Elect</div>
            </div>

            {/* Step 2: Majority Party */}
            <div className="w-full text-center">
              <div className="bg-blue-600 text-white py-4 rounded-lg shadow-md font-bold text-lg">
                Majority Party (House of Commons)
              </div>
              <div className="h-8 w-0.5 bg-blue-600 mx-auto"></div>
            </div>

            {/* Step 3: Cabinet */}
            <div className="w-full bg-uwm-black text-white p-6 rounded-xl shadow-xl relative text-center">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-uwm-gold text-uwm-black px-4 py-1 rounded-full text-xs font-bold uppercase">
                Dominant Power
              </div>
              <h4 className="text-2xl font-serif font-bold mb-2">The Cabinet</h4>
              <p className="text-blue-200 text-sm">
                Selected from the Majority Party. Fuses Executive and Legislative power.
              </p>
            </div>
            
            {/* Step 4: Policy */}
             <div className="h-6 w-0.5 bg-gray-300 mx-auto"></div>
             <div className="w-full text-center bg-green-50 py-3 rounded-lg border border-green-200 text-green-800 font-bold">
               Unchecked Policy Implementation
             </div>

          </div>
          
          <div className="mt-8 text-sm text-gray-500 italic text-center max-w-md">
            Unlike the US "Separation of Powers," the Westminster model fuses power. 
            The Cabinet leads Parliament because they are the leaders of the majority party.
          </div>
        </div>
      </section>

      {/* 4. The 5 Majoritarian Traits (Executive-Parties Dimension) */}
      <section>
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Building2 className="text-uwm-gold" /> The 5 Pillars of Majoritarianism
        </h3>
        <p className="text-gray-600 mb-6">
          Lijphart identifies these 5 characteristics on the Executives-Parties dimension (Chapter 2).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "One-Party Cabinets", desc: "Power is concentrated in a single party. Coalitions are rare and seen as undemocratic or weak." },
            { title: "Cabinet Dominance", desc: "The cabinet leads the legislature. It is not a co-equal branch; it is the superior organ." },
            { title: "Two-Party System", desc: "Politics is dominated by two large parties (e.g., Conservative vs. Labour). Third parties exist but have no power." },
            { title: "Majoritarian Elections", desc: "Plurality (First Past The Post) rules. Winner-take-all districts exaggerate the winner's victory." },
            { title: "Pluralist Interest Groups", desc: "Free-for-all competition between pressure groups. No formal tripartite concertation." }
          ].map((trait, i) => (
            <div key={i} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow hover:border-blue-300 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {i+1}
                </div>
                <h4 className="font-bold text-gray-900 leading-tight">{trait.title}</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {trait.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default ScheduleView;
