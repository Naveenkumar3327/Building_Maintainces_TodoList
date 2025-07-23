import React, { useState } from 'react';
import { MessageSquare, Camera, Send, AlertTriangle, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function FeedbackPage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [feedbackForm, setFeedbackForm] = useState({
    title: '',
    description: '',
    priority: 'Medium' as 'Low' | 'Medium' | 'High',
    zone: '',
    image: null as File | null
  });

  const [feedbackList, setFeedbackList] = useState([
    {
      id: '1',
      title: 'Broken Light in Parking',
      description: 'The LED light near entrance B is flickering and needs replacement',
      priority: 'Medium' as const,
      zone: 'Parking',
      submittedBy: 'John Staff',
      status: 'pending' as const,
      submittedAt: '2024-01-15T10:30:00',
      response: null
    },
    {
      id: '2',
      title: 'Water Leak in Restroom',
      description: 'Small water leak under the sink in the first floor restroom',
      priority: 'High' as const,
      zone: 'Floor 1',
      submittedBy: 'Jane Worker',
      status: 'resolved' as const,
      submittedAt: '2024-01-14T14:20:00',
      response: 'Fixed by maintenance team. Plumber replaced the pipe fitting.'
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newFeedback = {
      id: Date.now().toString(),
      ...feedbackForm,
      submittedBy: user?.name || 'Unknown',
      status: 'pending' as const,
      submittedAt: new Date().toISOString(),
      response: null
    };

    setFeedbackList(prev => [newFeedback, ...prev]);
    setFeedbackForm({
      title: '',
      description: '',
      priority: 'Medium',
      zone: '',
      image: null
    });
    
    showToast('Issue reported successfully!', 'success');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFeedbackForm({ ...feedbackForm, image: file });
    }
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
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">
        {user?.role === 'admin' ? 'Feedback & Issues' : 'Report Issue'}
      </h1>

      {/* Report Form */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Report New Issue</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                required
                value={feedbackForm.title}
                onChange={(e) => setFeedbackForm({ ...feedbackForm, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Brief description of the issue"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Zone</label>
              <select
                required
                value={feedbackForm.zone}
                onChange={(e) => setFeedbackForm({ ...feedbackForm, zone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select zone</option>
                <option value="Lobby">Lobby</option>
                <option value="Floor 1">Floor 1</option>
                <option value="Floor 2">Floor 2</option>
                <option value="Parking">Parking</option>
                <option value="Roof">Roof</option>
                <option value="Garden">Garden</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              value={feedbackForm.priority}
              onChange={(e) => setFeedbackForm({ ...feedbackForm, priority: e.target.value as 'Low' | 'Medium' | 'High' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              required
              value={feedbackForm.description}
              onChange={(e) => setFeedbackForm({ ...feedbackForm, description: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Detailed description of the issue..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Attach Image (Optional)</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg cursor-pointer transition-colors">
                <Camera className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">Choose Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              {feedbackForm.image && (
                <span className="text-sm text-gray-600">{feedbackForm.image.name}</span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Submit Report</span>
          </button>
        </form>
      </div>

      {/* Feedback List */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {user?.role === 'admin' ? 'All Reports' : 'My Reports'}
        </h2>
        
        <div className="space-y-4">
          {feedbackList
            .filter(feedback => user?.role === 'admin' || feedback.submittedBy === user?.name)
            .map((feedback) => (
            <div key={feedback.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                  <h3 className="font-semibold text-gray-900">{feedback.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(feedback.priority)}`}>
                    {feedback.priority}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(feedback.status)}`}>
                    {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(feedback.submittedAt).toLocaleString()}
                </div>
              </div>

              <p className="text-gray-600 mb-3">{feedback.description}</p>

              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                <span>Zone: {feedback.zone}</span>
                <span>•</span>
                <span>By: {feedback.submittedBy}</span>
              </div>

              {feedback.response && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <MessageSquare className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Admin Response</span>
                  </div>
                  <p className="text-sm text-green-700">{feedback.response}</p>
                </div>
              )}

              {user?.role === 'admin' && feedback.status === 'pending' && (
                <div className="mt-3 pt-3 border-t">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Add Response
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {feedbackList.filter(feedback => user?.role === 'admin' || feedback.submittedBy === user?.name).length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No issues reported yet</p>
          </div>
        )}
      </div>
    </div>
  );
}