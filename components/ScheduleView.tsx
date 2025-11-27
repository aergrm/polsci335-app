import React from 'react';
import { SCHEDULE } from '../constants';

const ScheduleView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border-b-4 border-uwm-black">
        <h2 className="text-2xl font-serif font-bold text-gray-900">Course Schedule</h2>
        <p className="text-gray-600">Spring 2026 • 15 Weeks</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        {SCHEDULE.map((week) => (
          <div key={week.id} className="p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors last:border-0">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="md:w-1/4">
                <span className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                  Week {week.id}
                </span>
                <p className="font-bold text-uwm-black">{week.dates}</p>
              </div>
              
              <div className="md:w-1/2">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{week.title}</h3>
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold text-gray-400 uppercase text-xs">Topics:</span>
                  <ul className="ml-4 list-disc">
                    {week.topics.map((t, i) => <li key={i}>{t}</li>)}
                  </ul>
                </div>
                {week.readings.length > 0 && (
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-400 uppercase text-xs">Readings:</span>
                    <p className="italic">{week.readings.join(', ')}</p>
                  </div>
                )}
              </div>

              <div className="md:w-1/4 flex flex-col items-start md:items-end">
                {week.due && week.due.map((item, i) => (
                  <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 mb-1">
                    Due: {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleView;