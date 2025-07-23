import React, { useState } from 'react';
import { CheckSquare, Clock, Play, Check } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function MyTasks() {
  const { showToast } = useToast();
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Clean Main Lobby',
      description: 'Deep cleaning including floors, windows, and furniture',
      zone: 'Lobby',
      priority: 'High' as const,
      status: 'pending' as const,
      dueDate: '2024-01-20',
    },
    {
      id: '2',
      title: 'Check Fire Extinguishers',
      description: 'Monthly inspection of all fire safety equipment',
      zone: 'All Floors',
      priority: 'High' as const,
      status: 'in-progress' as const,
      dueDate: '2024-01-18',
    },
    {
      id: '3',
      title: 'Replace Light Bulbs',
      description: 'Replace burnt out bulbs in parking area',
      zone: 'Parking',
      priority: 'Low' as const,
      status: 'pending' as const,
      dueDate: '2024-01-25',
    },
  ]);

  const updateTaskStatus = (taskId: string, newStatus: 'pending' | 'in-progress' | 'completed') => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    showToast(`Task marked as ${newStatus.replace('-', ' ')}`, 'success');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'border-red-500 bg-red-50';
      case 'Medium': return 'border-yellow-500 bg-yellow-50';
      case 'Low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <Check className="w-5 h-5 text-green-600" />;
      case 'in-progress': return <Play className="w-5 h-5 text-blue-600" />;
      default: return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">My Assigned Tasks</h3>
        <CheckSquare className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className={`border-l-4 p-4 rounded-lg ${getPriorityColor(task.priority)}`}>
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-gray-900">{task.title}</h4>
              <div className="flex items-center space-x-2">
                {getStatusIcon(task.status)}
                <span className={`px-2 py-1 text-xs rounded-full ${
                  task.priority === 'High' ? 'bg-red-100 text-red-800' :
                  task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {task.priority}
                </span>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-3">{task.description}</p>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{task.zone}</span> • Due: {new Date(task.dueDate).toLocaleDateString()}
              </div>
              
              <div className="flex space-x-2">
                {task.status === 'pending' && (
                  <button
                    onClick={() => updateTaskStatus(task.id, 'in-progress')}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    Start
                  </button>
                )}
                {task.status === 'in-progress' && (
                  <button
                    onClick={() => updateTaskStatus(task.id, 'completed')}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                  >
                    Complete
                  </button>
                )}
                {task.status === 'completed' && (
                  <span className="text-green-600 text-sm font-medium">✓ Completed</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}