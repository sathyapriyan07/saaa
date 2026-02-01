
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface FooterProps {
  isLoggedIn: boolean;
  user: any;
  onLoginClick: () => void;
  onLogout: () => void;
}

const Footer: React.FC<FooterProps> = ({ isLoggedIn, user, onLoginClick, onLogout }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  // Simple admin check consistent with AdminDashboard.tsx
  const isAdmin = user?.email?.includes('admin') || user?.email?.includes('sathyapriyan');

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-[60px] bg-gray-900 border-t border-white/5 px-4 flex items-center justify-between z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      <div className="flex flex-col space-y-0.5">
        <span className="text-white text-[11px] font-black uppercase tracking-tighter">© Rarefindshq</span>
        <span className="text-gray-500 text-[8px] max-w-[140px] leading-tight font-medium">
          Premium cinema destination.
        </span>
      </div>

      <div className="flex items-center space-x-5 text-[10px] font-black uppercase tracking-[0.1em] text-gray-400">
        <Link 
          to="/watchlist" 
          className={`transition-colors ${isActive('/watchlist') ? 'text-white' : 'hover:text-white'}`}
        >
          Watchlist
        </Link>
        <Link 
          to="/" 
          className={`transition-colors ${isActive('/') ? 'text-white' : 'hover:text-white'}`}
        >
          Browse
        </Link>
        
        {isAdmin && (
          <Link 
            to="/admin" 
            className={`transition-colors ${location.pathname.startsWith('/admin') ? 'text-white' : 'hover:text-white'} text-gray-500 border-x border-white/5 px-2`}
          >
            Admin
          </Link>
        )}

        {isLoggedIn ? (
          <button 
            onClick={onLogout} 
            className="hover:text-white transition-colors active:scale-95"
          >
            Logout
          </button>
        ) : (
          <button 
            onClick={onLoginClick} 
            className="hover:text-white transition-colors active:scale-95"
          >
            Login
          </button>
        )}
      </div>
    </footer>
  );
};

export default Footer;
