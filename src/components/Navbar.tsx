import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Building, Users, CheckSquare, MapPin, BarChart3, MessageSquare, FileText } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const { user, logout } = useAuth();

  const adminMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'checklists', label: 'Checklists', icon: FileText },
    { id: 'zones', label: 'Zones', icon: MapPin },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'logs', label: 'Logs', icon: FileText },
  ];

  const staffMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'tasks', label: 'My Tasks', icon: CheckSquare },
    { id: 'feedback', label: 'Report Issue', icon: MessageSquare },
    { id: 'logs', label: 'History', icon: FileText },
  ];

  const menuItems = user?.role === 'admin' ? adminMenuItems : staffMenuItems;
  const themeColor = user?.role === 'admin' ? 'blue' : 'green';

  return (
    <nav className={`bg-${themeColor}-600 shadow-lg`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <Building className="w-8 h-8 text-white" />
            <h1 className="text-xl font-bold text-white">BuildingCare</h1>
          </div>

          <div className="hidden md:flex space-x-1">
            {menuItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    currentPage === item.id
                      ? `bg-${themeColor}-700 text-white`
                      : `text-${themeColor}-100 hover:bg-${themeColor}-500 hover:text-white`
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-white">
              <div className="text-sm">{user?.name}</div>
              <div className={`text-xs text-${themeColor}-200 capitalize`}>{user?.role}</div>
            </div>
            <button
              onClick={logout}
              className={`flex items-center space-x-2 px-3 py-2 bg-${themeColor}-700 text-white rounded-lg hover:bg-${themeColor}-800 transition-colors`}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden pb-4">
          <div className="flex flex-wrap gap-2">
            {menuItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    currentPage === item.id
                      ? `bg-${themeColor}-700 text-white`
                      : `text-${themeColor}-100 hover:bg-${themeColor}-500 hover:text-white`
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}