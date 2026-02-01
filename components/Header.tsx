
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  isLoggedIn: boolean;
  user: any;
  onAuthClick: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, user, onAuthClick, onLogout }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  // Extract initial from email or default to 'A'
  const initial = user?.email ? user.email.charAt(0).toUpperCase() : 'A';

  return (
    <header className="sticky top-0 z-50 h-[56px] w-full bg-black/80 backdrop-blur-xl flex items-center px-4 justify-between border-b border-white/5">
      {/* Left: Rarefindshq text logo */}
      <Link to="/" className="text-white font-bold text-sm tracking-tighter shrink-0">
        Rarefindshq
      </Link>

      {/* Center: Movies | Series */}
      <nav className="flex items-center space-x-5 text-[11px] font-black uppercase tracking-widest absolute left-1/2 -translate-x-1/2">
        <Link 
          to="/movies" 
          className={`${isActive('/movies') ? 'text-white' : 'text-gray-500'} hover:text-white transition-colors duration-200`}
        >
          Movies
        </Link>
        <span className="text-gray-800">|</span>
        <Link 
          to="/series" 
          className={`${isActive('/series') ? 'text-white' : 'text-gray-500'} hover:text-white transition-colors duration-200`}
        >
          Series
        </Link>
      </nav>

      {/* Right: Profile Initial Circle or Login Button */}
      <div className="flex items-center justify-end shrink-0">
        {isLoggedIn ? (
          <button 
            onClick={onLogout}
            title="Logout"
            className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-[10px] font-bold border border-white/10 transition-all active:scale-90 shadow-inner"
          >
            {initial}
          </button>
        ) : (
          <button 
            onClick={onAuthClick}
            className="bg-white text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all active:scale-95 shadow-lg"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
