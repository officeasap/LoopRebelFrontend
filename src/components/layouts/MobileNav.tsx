import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, CreditCard, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const MobileNav: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Home' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/withdraw', icon: CreditCard, label: 'Withdraw' },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t-2 border-primary shadow-loop-frame">
      <div className="mobile-container">
        <div className="flex justify-around items-center py-3 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center p-2 rounded-lg transition-colors min-w-0",
                  isActive 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon size={20} />
                <span className="text-xs mt-1 truncate">{item.label}</span>
              </Link>
            );
          })}
          
          <button
            onClick={handleLogout}
            className="flex flex-col items-center p-2 rounded-lg transition-colors text-muted-foreground hover:text-destructive min-w-0"
          >
            <LogOut size={20} />
            <span className="text-xs mt-1">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default MobileNav;