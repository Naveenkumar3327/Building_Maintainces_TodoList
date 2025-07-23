import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import StaffDashboard from './pages/StaffDashboard';
import TasksPage from './pages/TasksPage';
import ChecklistsPage from './pages/ChecklistsPage';
import ZonesPage from './pages/ZonesPage';
import ReportsPage from './pages/ReportsPage';
import FeedbackPage from './pages/FeedbackPage';
import LogsPage from './pages/LogsPage';
import Navbar from './components/Navbar';
import { ToastProvider } from './context/ToastContext';

function AppContent() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (!user) {
    return <LoginPage />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return user.role === 'admin' ? <AdminDashboard /> : <StaffDashboard />;
      case 'tasks':
        return <TasksPage />;
      case 'checklists':
        return <ChecklistsPage />;
      case 'zones':
        return user.role === 'admin' ? <ZonesPage /> : <StaffDashboard />;
      case 'reports':
        return user.role === 'admin' ? <ReportsPage /> : <StaffDashboard />;
      case 'feedback':
        return <FeedbackPage />;
      case 'logs':
        return <LogsPage />;
      default:
        return user.role === 'admin' ? <AdminDashboard /> : <StaffDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="container mx-auto px-4 py-8">
        {renderPage()}
      </main>
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;