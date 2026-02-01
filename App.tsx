
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import TitleDetail from './pages/TitleDetail';
import PeopleDetail from './pages/PeopleDetail';
import AdminDashboard from './pages/AdminDashboard';
import Watchlist from './pages/Watchlist';
import AuthModal from './components/AuthModal';
import { supabase } from './lib/supabase';

const App: React.FC = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-black flex flex-col relative overflow-x-hidden selection:bg-white selection:text-black">
        <Header 
          isLoggedIn={!!user} 
          user={user}
          onAuthClick={() => openAuth('login')} 
          onLogout={handleLogout}
        />
        
        <main className="flex-grow pb-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/title/:id" element={<TitleDetail />} />
            <Route path="/person/:id" element={<PeopleDetail />} />
            <Route path="/admin/*" element={<AdminDashboard user={user} />} />
            <Route path="/movies" element={<Home filter="movie" />} />
            <Route path="/series" element={<Home filter="series" />} />
            <Route path="/watchlist" element={<Watchlist user={user} />} />
          </Routes>
        </main>

        <Footer 
          isLoggedIn={!!user}
          user={user}
          onLoginClick={() => openAuth('login')} 
          onLogout={handleLogout}
        />

        <AuthModal 
          isOpen={isAuthOpen} 
          onClose={() => setIsAuthOpen(false)} 
          mode={authMode}
          setMode={setAuthMode}
        />
      </div>
    </HashRouter>
  );
};

export default App;
