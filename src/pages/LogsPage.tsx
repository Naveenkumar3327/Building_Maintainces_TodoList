import React, { useState } from 'react';
import { FileText, Search, Calendar, User, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LogsPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const logs = [
    {
      id: '1',
      taskTitle: 'Clean Main Lobby',
      zone: 'Lobby',
      completedBy: 'John Staff',
      completedAt: '2024-01-15T14:30:00',
      duration: '45 minutes',
      comment: 'Completed thorough cleaning including floor mopping and window cleaning',
      beforeImage: null,
      afterImage: null,
    },
    {
      id: '2',
      taskTitle: 'HVAC Filter Replacement',
      zone: 'Floor 2',
      completedBy: 'Mike Technician',
      completedAt: '2024-01-15T11:15:00',
      duration: '30 minutes',
      comment: 'Replaced all filters in the HVAC unit. Old filters were moderately dirty.',
      beforeImage: 'https://images.pexels.com/photos/5691636/pexels-photo-5691636.jpeg?auto=compress&cs=tinysrgb&w=200',
      afterImage: 'https://images.pexels.com/photos/5691639/pexels-photo-5691639.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    {
      id: '3',
      taskTitle: 'Fire Safety Equipment Check',
      zone: 'All Floors',
      completedBy: 'Jane Worker',
      completedAt: '2024-01-14T16:45:00',
      duration: '90 minutes',
      comment: 'Inspected all fire extinguishers and emergency exits. All equipment is in good condition.',
      beforeImage: null,
      afterImage: null,
    },
    {
      id: '4',
      taskTitle: 'Parking Lot Lighting Repair',
      zone: 'Parking',
      completedBy: 'Sarah Cleaner',
      completedAt: '2024-01-14T09:20:00',
      duration: '25 minutes',
      comment: 'Replaced 3 burnt out LED bulbs in the parking area',
      beforeImage: null,
      afterImage: null,
    },
    {
      id: '5',
      taskTitle: 'Garden Maintenance',
      zone: 'Garden',
      completedBy: 'John Staff',
      completedAt: '2024-01-13T13:10:00',
      duration: '120 minutes',
      comment: 'Trimmed bushes, watered plants, and cleaned up fallen leaves',
      beforeImage: 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=200',
      afterImage: 'https://images.pexels.com/photos/1301857/pexels-photo-1301857.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
  ];

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.taskTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.zone.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.completedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = !filterDate || log.completedAt.startsWith(filterDate);
    
    const matchesUser = user?.role === 'admin' || log.completedBy === user?.name;
    
    return matchesSearch && matchesDate && matchesUser;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">
          {user?.role === 'admin' ? 'Maintenance Logs' : 'My Activity History'}
        </h1>
        <div className="text-sm text-gray-500">
          {filteredLogs.length} {filteredLogs.length === 1 ? 'record' : 'records'}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by task, zone, or staff member..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Logs List */}
      <div className="space-y-4">
        {filteredLogs.map((log) => (
          <div key={log.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{log.taskTitle}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <span className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{log.completedBy}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{log.duration}</span>
                    </span>
                    <span>{log.zone}</span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(log.completedAt).toLocaleString()}
              </div>
            </div>

            <p className="text-gray-600 mb-4">{log.comment}</p>

            {(log.beforeImage || log.afterImage) && (
              <div className="flex space-x-4">
                {log.beforeImage && (
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700 mb-2">Before</p>
                    <img
                      src={log.beforeImage}
                      alt="Before"
                      className="w-full h-32 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
                {log.afterImage && (
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700 mb-2">After</p>
                    <img
                      src={log.afterImage}
                      alt="After"
                      className="w-full h-32 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredLogs.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No maintenance logs found matching your criteria</p>
        </div>
      )}
    </div>
  );
}