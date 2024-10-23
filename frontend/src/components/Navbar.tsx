import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Bell, Settings, LogOut } from 'lucide-react';

export default function Navbar() {
  const { logout, user } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-800">JobAlert</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
            <Link to="/settings" className="p-2 rounded-full hover:bg-gray-100">
              <Settings className="h-5 w-5 text-gray-600" />
            </Link>
            <button 
              onClick={logout}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <LogOut className="h-5 w-5 text-gray-600" />
            </button>
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700">
                {user?.email}
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}