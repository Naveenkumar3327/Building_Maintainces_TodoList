import React, { useState } from 'react';
import { Plus, FileText, Edit, Trash2, CheckSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function ChecklistsPage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [checklists, setChecklists] = useState([
    {
      id: '1',
      title: 'Daily Cleaning Routine',
      description: 'Standard daily cleaning procedures for all areas',
      items: [
        { id: '1', text: 'Vacuum all carpeted areas', completed: true },
        { id: '2', text: 'Empty all trash bins', completed: true },
        { id: '3', text: 'Clean and sanitize restrooms', completed: false },
        { id: '4', text: 'Wipe down all surfaces', completed: false },
      ],
      zone: 'All Areas',
      createdAt: '2024-01-10',
    },
    {
      id: '2',
      title: 'Weekly Safety Inspection',
      description: 'Comprehensive safety check for the building',
      items: [
        { id: '1', text: 'Test fire alarm system', completed: true },
        { id: '2', text: 'Check emergency exits', completed: true },
        { id: '3', text: 'Inspect fire extinguishers', completed: false },
        { id: '4', text: 'Test emergency lighting', completed: false },
        { id: '5', text: 'Check security cameras', completed: false },
      ],
      zone: 'Building-wide',
      createdAt: '2024-01-08',
    },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newChecklist, setNewChecklist] = useState({
    title: '',
    description: '',
    zone: '',
    items: ['']
  });

  const toggleItemCompletion = (checklistId: string, itemId: string) => {
    setChecklists(prev => prev.map(checklist => 
      checklist.id === checklistId 
        ? {
            ...checklist,
            items: checklist.items.map(item => 
              item.id === itemId ? { ...item, completed: !item.completed } : item
            )
          }
        : checklist
    ));
  };

  const addNewItem = () => {
    setNewChecklist(prev => ({
      ...prev,
      items: [...prev.items, '']
    }));
  };

  const updateItem = (index: number, value: string) => {
    setNewChecklist(prev => ({
      ...prev,
      items: prev.items.map((item, i) => i === index ? value : item)
    }));
  };

  const removeItem = (index: number) => {
    setNewChecklist(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleCreateChecklist = (e: React.FormEvent) => {
    e.preventDefault();
    const checklist = {
      id: Date.now().toString(),
      ...newChecklist,
      items: newChecklist.items.filter(item => item.trim()).map((text, index) => ({
        id: index.toString(),
        text,
        completed: false
      })),
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setChecklists(prev => [checklist, ...prev]);
    setNewChecklist({ title: '', description: '', zone: '', items: [''] });
    setShowCreateForm(false);
    showToast('Checklist created successfully!', 'success');
  };

  const getCompletionPercentage = (items: any[]) => {
    const completed = items.filter(item => item.completed).length;
    return Math.round((completed / items.length) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Checklists</h1>
        {user?.role === 'admin' && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Checklist</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {checklists.map((checklist) => {
          const completionPercentage = getCompletionPercentage(checklist.items);
          
          return (
            <div key={checklist.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{checklist.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{checklist.description}</p>
                  <p className="text-sm text-gray-500 mt-1">Zone: {checklist.zone}</p>
                </div>
                {user?.role === 'admin' && (
                  <div className="flex space-x-2">
                    <button className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-medium text-gray-900">{completionPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                {checklist.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleItemCompletion(checklist.id, item.id)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        item.completed
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 hover:border-green-500'
                      }`}
                    >
                      {item.completed && <CheckSquare className="w-3 h-3" />}
                    </button>
                    <span className={`flex-1 ${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t text-sm text-gray-500">
                Created: {new Date(checklist.createdAt).toLocaleDateString()}
              </div>
            </div>
          );
        })}
      </div>

      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Create New Checklist</h2>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreateChecklist} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={newChecklist.title}
                  onChange={(e) => setNewChecklist({ ...newChecklist, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter checklist title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  required
                  value={newChecklist.description}
                  onChange={(e) => setNewChecklist({ ...newChecklist, description: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter checklist description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Zone</label>
                <input
                  type="text"
                  required
                  value={newChecklist.zone}
                  onChange={(e) => setNewChecklist({ ...newChecklist, zone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter zone (e.g., Lobby, Floor 1)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Checklist Items</label>
                <div className="space-y-2">
                  {newChecklist.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateItem(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder={`Item ${index + 1}`}
                      />
                      {newChecklist.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addNewItem}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    + Add Item
                  </button>
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
                  <FileText className="w-4 h-4" />
                  <span>Create Checklist</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}