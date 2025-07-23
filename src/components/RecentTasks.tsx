import React from 'react';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function RecentTasks() {
  const recentTasks = [
    {
      id: '1',
      title: 'HVAC Filter Replacement',
      zone: 'Floor 2',
      assignedTo: 'John Staff',
      status: 'completed',
      completedAt: '2024-01-15 14:30',
    },
    {
      id: '2',
      title: 'Elevator Maintenance',
      zone: 'All Floors',
      assignedTo: 'Mike Technician',
      status: 'in-progress',
      startedAt: '2024-01-15 10:00',
    },
    {
      id: '3',
      title: 'Window Cleaning',
      zone: 'Lobby',
      assignedTo: 'Sarah Cleaner',
      status: 'pending',
      dueDate: '2024-01-16',
    },
    {
      id: '4',
      title: 'Security Camera Check',
      zone: 'Parking',
      assignedTo: 'Jane Worker',
      status: 'overdue',
      dueDate: '2024-01-14',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'overdue': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'in-progress': return 'text-blue-600 bg-blue-50';
      case 'overdue': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
      
      <div className="space-y-4">
        {recentTasks.map((task) => (
          <div key={task.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            {getStatusIcon(task.status)}
            <div className="flex-1">
              <div className="font-medium text-gray-900">{task.title}</div>
              <div className="text-sm text-gray-600">{task.zone} • {task.assignedTo}</div>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
              {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t">
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View all tasks →
        </button>
      </div>
    </div>
  );
}