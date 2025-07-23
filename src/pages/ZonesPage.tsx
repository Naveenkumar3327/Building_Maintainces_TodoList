import React, { useState } from 'react';
import { Plus, MapPin, Edit, Trash2, Building } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function ZonesPage() {
  const { showToast } = useToast();
  const [zones, setZones] = useState([
    { id: '1', name: 'Lobby', description: 'Main entrance and reception area', taskCount: 8, color: 'blue' },
    { id: '2', name: 'Floor 1', description: 'First floor offices and meeting rooms', taskCount: 12, color: 'green' },
    { id: '3', name: 'Floor 2', description: 'Second floor workspaces', taskCount: 10, color: 'purple' },
    { id: '4', name: 'Parking', description: 'Underground parking garage', taskCount: 5, color: 'orange' },
    { id: '5', name: 'Roof', description: 'Rooftop and HVAC equipment area', taskCount: 3, color: 'red' },
    { id: '6', name: 'Garden', description: 'Outdoor landscaping and garden area', taskCount: 4, color: 'emerald' },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newZone, setNewZone] = useState({
    name: '',
    description: '',
    color: 'blue'
  });

  const colors = [
    { name: 'blue', class: 'bg-blue-500' },
    { name: 'green', class: 'bg-green-500' },
    { name: 'purple', class: 'bg-purple-500' },
    { name: 'orange', class: 'bg-orange-500' },
    { name: 'red', class: 'bg-red-500' },
    { name: 'emerald', class: 'bg-emerald-500' },
    { name: 'pink', class: 'bg-pink-500' },
    { name: 'indigo', class: 'bg-indigo-500' },
  ];

  const handleCreateZone = (e: React.FormEvent) => {
    e.preventDefault();
    const zone = {
      id: Date.now().toString(),
      ...newZone,
      taskCount: 0
    };
    
    setZones(prev => [...prev, zone]);
    setNewZone({ name: '', description: '', color: 'blue' });
    setShowCreateForm(false);
    showToast('Zone created successfully!', 'success');
  };

  const deleteZone = (zoneId: string) => {
    setZones(prev => prev.filter(zone => zone.id !== zoneId));
    showToast('Zone deleted successfully!', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Zone Management</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Zone</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {zones.map((zone) => (
          <div key={zone.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg ${colors.find(c => c.name === zone.color)?.class} flex items-center justify-center`}>
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{zone.name}</h3>
                  <p className="text-sm text-gray-600">{zone.description}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="text-gray-400 hover:text-blue-600 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => deleteZone(zone.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{zone.taskCount}</span> active tasks
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Tasks →
              </button>
            </div>
          </div>
        ))}
      </div>

      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Create New Zone</h2>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreateZone} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Zone Name</label>
                <input
                  type="text"
                  required
                  value={newZone.name}
                  onChange={(e) => setNewZone({ ...newZone, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter zone name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  required
                  value={newZone.description}
                  onChange={(e) => setNewZone({ ...newZone, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter zone description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                <div className="grid grid-cols-4 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setNewZone({ ...newZone, color: color.name })}
                      className={`w-12 h-12 rounded-lg ${color.class} flex items-center justify-center border-2 ${
                        newZone.color === color.name ? 'border-gray-900' : 'border-transparent'
                      } hover:border-gray-600 transition-colors`}
                    >
                      {newZone.color === color.name && <Building className="w-6 h-6 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Create Zone</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}