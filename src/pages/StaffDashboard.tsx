import React from 'react';
import { CheckSquare, Clock, AlertCircle, Star } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import MyTasks from '../components/MyTasks';

export default function StaffDashboard() {
  const stats = [
    { title: 'Assigned Tasks', value: '12', icon: CheckSquare, color: 'green', trend: '+2' },
    { title: 'Completed Today', value: '5', icon: Star, color: 'blue', trend: '+1' },
    { title: 'Pending', value: '7', icon: Clock, color: 'yellow', trend: '-1' },
    { title: 'Overdue', value: '2', icon: AlertCircle, color: 'red', trend: '0' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <MyTasks />

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
        <div className="space-y-3">
          {[
            { time: '09:00', task: 'Clean Lobby Area', zone: 'Lobby', priority: 'High' },
            { time: '11:00', task: 'Check HVAC System', zone: 'Floor 2', priority: 'Medium' },
            { time: '14:00', task: 'Inspect Fire Exits', zone: 'All Floors', priority: 'High' },
            { time: '16:00', task: 'Replace Light Bulbs', zone: 'Parking', priority: 'Low' },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-sm font-medium text-gray-900">{item.time}</div>
                <div>
                  <div className="font-medium text-gray-900">{item.task}</div>
                  <div className="text-sm text-gray-600">{item.zone}</div>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                item.priority === 'High' ? 'bg-red-100 text-red-800' :
                item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {item.priority}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}