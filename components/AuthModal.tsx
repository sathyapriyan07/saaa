
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
  setMode: (mode: 'login' | 'signup') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode, setMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'signup') {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) throw signUpError;
        alert('Verification email sent!');
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90" onClick={onClose} />
      
      <div className="relative w-[90%] max-w-sm bg-gray-900 rounded-[28px] p-8 shadow-2xl border border-white/5 animate-in fade-in zoom-in-95 duration-200">
        <h2 className="text-center text-sm font-bold text-white mb-8">
          {mode === 'login' ? 'Login to Rarefindshq' : 'Signup to Rarefindshq'}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-[10px] font-bold text-center">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-[10px] text-gray-400 font-bold ml-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[44px] bg-black rounded-full px-6 text-sm text-white focus:outline-none border border-transparent focus:border-white/20 transition-all"
              placeholder="email@example.com"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-gray-400 font-bold ml-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[44px] bg-black rounded-full px-6 text-sm text-white focus:outline-none border border-transparent focus:border-white/20 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full h-[44px] bg-white text-black font-black rounded-full text-[11px] uppercase tracking-widest mt-4 hover:bg-gray-200 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? 'PROCESSING...' : (mode === 'login' ? 'LOGIN' : 'SIGNUP')}
          </button>
        </form>

        <div className="mt-8 text-center space-y-2">
          <button 
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="text-white text-sm font-bold uppercase tracking-widest hover:text-gray-300 transition-colors"
          >
            {mode === 'login' ? 'Signup' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;