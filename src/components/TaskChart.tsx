import React from 'react';
import { BarChart3 } from 'lucide-react';

export default function TaskChart() {
  const data = [
    { label: 'Mon', completed: 8, pending: 3 },
    { label: 'Tue', completed: 12, pending: 5 },
    { label: 'Wed', completed: 6, pending: 2 },
    { label: 'Thu', completed: 15, pending: 4 },
    { label: 'Fri', completed: 10, pending: 6 },
    { label: 'Sat', completed: 4, pending: 1 },
    { label: 'Sun', completed: 2, pending: 0 },
  ];

  const maxValue = Math.max(...data.map(d => d.completed + d.pending));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Weekly Task Progress</h3>
        <BarChart3 className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-8 text-sm font-medium text-gray-600">{item.label}</div>
            <div className="flex-1 flex items-center space-x-1">
              <div
                className="bg-green-500 h-6 rounded-l-md flex items-center justify-center text-white text-xs font-medium"
                style={{ width: `${(item.completed / maxValue) * 100}%`, minWidth: item.completed > 0 ? '20px' : '0px' }}
              >
                {item.completed > 0 && item.completed}
              </div>
              <div
                className="bg-yellow-500 h-6 rounded-r-md flex items-center justify-center text-white text-xs font-medium"
                style={{ width: `${(item.pending / maxValue) * 100}%`, minWidth: item.pending > 0 ? '20px' : '0px' }}
              >
                {item.pending > 0 && item.pending}
              </div>
            </div>
            <div className="text-sm text-gray-600 w-12 text-right">
              {item.completed + item.pending}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Completed</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Pending</span>
        </div>
      </div>
    </div>
  );
}