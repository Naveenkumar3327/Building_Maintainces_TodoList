import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Plus, Search, Filter, Calendar, MapPin, User } from 'lucide-react';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';

export default function TasksPage() {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  const mockTasks = [
    {
      id: '1',
      title: 'Clean Lobby Area',
      description: 'Deep cleaning of main lobby including floors and windows',
      zone: 'Lobby',
      assignedTo: 'John Staff',
      priority: 'High' as const,
      status: 'pending' as const,
      dueDate: '2024-01-20',
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      title: 'HVAC Maintenance',
      description: 'Monthly HVAC system check and filter replacement',
      zone: 'Floor 2',
      assignedTo: 'John Staff',
      priority: 'Medium' as const,
      status: 'completed' as const,
      dueDate: '2024-01-18',
      createdAt: '2024-01-10',
    },
    {
      id: '3',
      title: 'Fire Safety Inspection',
      description: 'Check all fire exits and emergency equipment',
      zone: 'All Floors',
      assignedTo: 'Jane Worker',
      priority: 'High' as const,
      status: 'in-progress' as const,
      dueDate: '2024-01-22',
      createdAt: '2024-01-16',
    },
    {
      id: '4',
      title: 'Parking Lot Lighting',
      description: 'Replace burnt out light bulbs in parking area',
      zone: 'Parking',
      assignedTo: 'Mike Technician',
      priority: 'Low' as const,
      status: 'pending' as const,
      dueDate: '2024-01-25',
      createdAt: '2024-01-17',
    },
  ];

  const filteredTasks = mockTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.zone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesUser = user?.role === 'admin' || task.assignedTo === user?.name;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesUser;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900">
          {user?.role === 'admin' ? 'All Tasks' : 'My Tasks'}
        </h1>
        {user?.role === 'admin' && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Task</span>
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tasks or zones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <CheckSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No tasks found matching your criteria</p>
          </div>
        )}
      </div>

      {showModal && (
        <TaskModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}