import React, { useState } from 'react';
import { Calendar, MapPin, User, Clock, CheckCircle, Circle, Play } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

interface Task {
  id: string;
  title: string;
  description: string;
  zone: string;
  assignedTo: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  createdAt: string;
}

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const [currentStatus, setCurrentStatus] = useState(task.status);
  const { showToast } = useToast();
  const { user } = useAuth();

  const updateStatus = (newStatus: 'pending' | 'in-progress' | 'completed') => {
    setCurrentStatus(newStatus);
    showToast(`Task marked as ${newStatus.replace('-', ' ')}`, 'success');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Play className="w-4 h-4" />;
      case 'pending': return <Circle className="w-4 h-4" />;
      default: return <Circle className="w-4 h-4" />;
    }
  };

  const isOverdue = new Date(task.dueDate) < new Date() && currentStatus !== 'completed';

  return (
    <div className={`bg-white rounded-lg border-l-4 shadow-sm hover:shadow-md transition-shadow p-4 ${
      isOverdue ? 'border-l-red-500' : 'border-l-blue-500'
    }`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-900 text-lg">{task.title}</h3>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
          <span className={`px-2 py-1 text-xs rounded-full border flex items-center space-x-1 ${getStatusColor(currentStatus)}`}>
            {getStatusIcon(currentStatus)}
            <span className="capitalize">{currentStatus.replace('-', ' ')}</span>
          </span>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4">{task.description}</p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          {task.zone}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <User className="w-4 h-4 mr-2" />
          {task.assignedTo}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          Due: {new Date(task.dueDate).toLocaleDateString()}
          {isOverdue && <span className="text-red-600 ml-2 font-medium">Overdue!</span>}
        </div>
      </div>

      {user?.role === 'staff' && task.assignedTo === user.name && currentStatus !== 'completed' && (
        <div className="flex gap-2">
          {currentStatus === 'pending' && (
            <button
              onClick={() => updateStatus('in-progress')}
              className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Start Task
            </button>
          )}
          {currentStatus === 'in-progress' && (
            <button
              onClick={() => updateStatus('completed')}
              className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              Complete
            </button>
          )}
        </div>
      )}
    </div>
  );
}