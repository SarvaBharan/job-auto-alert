import { Link, useLocation } from 'react-router-dom';
import { Home, BriefcaseSearch, Settings } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/job-alerts', icon: BriefcaseSearch, label: 'Job Alerts' },
    { to: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="w-64 bg-white shadow-sm h-[calc(100vh-4rem)]">
      <nav className="mt-5 px-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.to;
          
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`
                group flex items-center px-2 py-2 text-base font-medium rounded-md
                ${isActive 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              <Icon 
                className={`
                  mr-4 h-5 w-5
                  ${isActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-500'}
                `}
              />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}