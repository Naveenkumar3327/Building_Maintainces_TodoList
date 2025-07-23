import React, { useState } from 'react';
import { Calendar, Download, BarChart3, PieChart, TrendingUp } from 'lucide-react';

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('week');
  const [reportType, setReportType] = useState('summary');

  const summaryData = {
    totalTasks: 127,
    completedTasks: 89,
    pendingTasks: 31,
    overdueTasks: 7,
    completionRate: 70,
    averageCompletionTime: '2.5 hours',
  };

  const zoneData = [
    { zone: 'Lobby', completed: 15, pending: 3, overdue: 1 },
    { zone: 'Floor 1', completed: 20, pending: 8, overdue: 2 },
    { zone: 'Floor 2', completed: 18, pending: 6, overdue: 1 },
    { zone: 'Parking', completed: 12, pending: 4, overdue: 2 },
    { zone: 'Roof', completed: 8, pending: 2, overdue: 1 },
    { zone: 'Garden', completed: 16, pending: 8, overdue: 0 },
  ];

  const staffPerformance = [
    { name: 'John Staff', completed: 25, pending: 5, rating: 4.8 },
    { name: 'Jane Worker', completed: 22, pending: 3, rating: 4.9 },
    { name: 'Mike Technician', completed: 20, pending: 7, rating: 4.6 },
    { name: 'Sarah Cleaner', completed: 22, pending: 6, rating: 4.7 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <div className="flex space-x-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{summaryData.totalTasks}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-500" />
          </div>
          <div className="mt-4 text-sm text-gray-600">
            +12% from last period
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{summaryData.completionRate}%</p>
            </div>
            <PieChart className="w-8 h-8 text-green-500" />
          </div>
          <div className="mt-4 text-sm text-gray-600">
            +5% from last period
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Completion Time</p>
              <p className="text-2xl font-bold text-gray-900">{summaryData.averageCompletionTime}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
          <div className="mt-4 text-sm text-gray-600">
            -15min from last period
          </div>
        </div>
      </div>

      {/* Zone Performance */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Zone Performance</h3>
        <div className="space-y-4">
          {zoneData.map((zone, index) => {
            const total = zone.completed + zone.pending + zone.overdue;
            const completionRate = (zone.completed / total) * 100;
            
            return (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-20 text-sm font-medium text-gray-700">{zone.zone}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">{completionRate.toFixed(0)}% completion</span>
                    <span className="text-sm text-gray-600">{total} total</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="flex h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-green-500" 
                        style={{ width: `${(zone.completed / total) * 100}%` }}
                      ></div>
                      <div 
                        className="bg-yellow-500" 
                        style={{ width: `${(zone.pending / total) * 100}%` }}
                      ></div>
                      <div 
                        className="bg-red-500" 
                        style={{ width: `${(zone.overdue / total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 w-24 text-right">
                  {zone.completed}/{total}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Staff Performance */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Staff Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Staff Member</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Completed</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Pending</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Rating</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Performance</th>
              </tr>
            </thead>
            <tbody>
              {staffPerformance.map((staff, index) => {
                const total = staff.completed + staff.pending;
                const completionRate = (staff.completed / total) * 100;
                
                return (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{staff.name}</div>
                    </td>
                    <td className="py-3 px-4 text-green-600 font-medium">{staff.completed}</td>
                    <td className="py-3 px-4 text-yellow-600 font-medium">{staff.pending}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="font-medium">{staff.rating}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${completionRate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{completionRate.toFixed(0)}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}