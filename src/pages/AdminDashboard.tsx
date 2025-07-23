import React from 'react';
import { CheckSquare, Clock, AlertCircle, TrendingUp, Users, MapPin } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import TaskChart from '../components/TaskChart';
import RecentTasks from '../components/RecentTasks';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Tasks', value: '127', icon: CheckSquare, color: 'blue', trend: '+12%' },
    { title: 'Completed', value: '89', icon: TrendingUp, color: 'green', trend: '+8%' },
    { title: 'Pending', value: '31', icon: Clock, color: 'yellow', trend: '-5%' },
    { title: 'Overdue', value: '7', icon: AlertCircle, color: 'red', trend: '+2%' },
    { title: 'Active Staff', value: '15', icon: Users, color: 'purple', trend: '+1' },
    { title: 'Zones', value: '8', icon: MapPin, color: 'indigo', trend: '0' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TaskChart />
        <RecentTasks />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left">
            <CheckSquare className="w-6 h-6 text-blue-600 mb-2" />
            <div className="font-medium text-gray-900">Create Task</div>
            <div className="text-sm text-gray-600">Assign new maintenance task</div>
          </button>
          <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left">
            <Users className="w-6 h-6 text-green-600 mb-2" />
            <div className="font-medium text-gray-900">Manage Staff</div>
            <div className="text-sm text-gray-600">View and manage staff members</div>
          </button>
          <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left">
            <MapPin className="w-6 h-6 text-purple-600 mb-2" />
            <div className="font-medium text-gray-900">Add Zone</div>
            <div className="text-sm text-gray-600">Create new maintenance zone</div>
          </button>
          <button className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-left">
            <TrendingUp className="w-6 h-6 text-orange-600 mb-2" />
            <div className="font-medium text-gray-900">View Reports</div>
            <div className="text-sm text-gray-600">Generate analytics reports</div>
          </button>
        </div>
      </div>
    </div>
  );
}