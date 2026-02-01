
import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import GenresModule from './GenresModule';
import HomeSectionsModule from './HomeSectionsModule';
import TitlesModule from './TitlesModule';
import PeopleModule from './PeopleModule';

const Layout: React.FC<{ title: string; children: React.ReactNode; user: any }> = ({ title, children, user }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black text-white px-4 pt-6 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col space-y-4 mb-4">
        <button 
          onClick={() => navigate(-1)} 
          className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-all flex items-center group self-start"
        >
          <span className="mr-2 text-lg font-light group-hover:-translate-x-1 transition-transform" aria-hidden="true">&lt;</span> Back
        </button>

        <div className="flex flex-col space-y-1">
          <h1 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">Admin Management</h1>
          <div className="bg-gray-900 border border-white/5 rounded-2xl p-4 flex items-center justify-between shadow-2xl">
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Operator</p>
              <p className="text-sm font-black tracking-tight">{user?.email?.split('@')[0] || 'Administrator'}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
        
        <div className="w-full bg-white rounded-2xl py-3.5 text-center text-black font-black text-[11px] uppercase tracking-[0.3em] shadow-xl">
          {title}
        </div>
      </div>
      <div className="bg-gray-900/50 border border-white/5 rounded-[32px] p-5 min-h-[500px] backdrop-blur-sm relative">
        {children}
      </div>
    </div>
  );
};

const AdminHome: React.FC<{ user: any }> = ({ user }) => {
  const modules = [
    { name: 'Titles', path: 'titles', icon: '🎬' },
    { name: 'Genres', path: 'genres', icon: '🏷️' },
    { name: 'Home Sections', path: 'home-sections', icon: '🏠' },
    { name: 'People', path: 'people', icon: '👤' },
    { name: 'Import', path: 'import', icon: '📥' }
  ];

  return (
    <div className="min-h-screen bg-black text-white px-4 pt-8 animate-in fade-in duration-500">
      <div className="flex flex-col space-y-1 mb-10">
        <h1 className="text-2xl font-black tracking-tighter uppercase">Rarefinds Control</h1>
        <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.3em]">System Administration Portal</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {modules.map(mod => (
          <Link 
            key={mod.name}
            to={`/admin/${mod.path}`}
            className="w-full bg-gray-900 border border-white/5 p-5 rounded-3xl flex items-center justify-between hover:bg-gray-800 transition-all active:scale-[0.98] group"
          >
            <div className="flex items-center space-x-4">
              <span className="text-xl opacity-50 group-hover:opacity-100 transition-opacity">{mod.icon}</span>
              <span className="text-[12px] font-black uppercase tracking-widest">{mod.name}</span>
            </div>
            <span className="text-gray-700 group-hover:text-white transition-colors">&gt;</span>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-6 bg-white/5 rounded-3xl border border-white/5 text-center">
        <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">System Status</p>
        <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse"></span>
          Operational
        </p>
      </div>
    </div>
  );
};

// --- IMPORT MODULE COMPONENTS ---

const SkeletonCard = () => (
  <div className="bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden animate-pulse">
    <div className="aspect-[2/3] bg-gray-800" />
    <div className="p-3 space-y-2">
      <div className="h-3 bg-gray-800 rounded w-3/4" />
      <div className="h-2 bg-gray-800 rounded w-1/2" />
      <div className="h-8 bg-gray-800 rounded-xl w-full mt-2" />
    </div>
  </div>
);

const ImportModal: React.FC<{ item: any; onClose: () => void; onConfirm: () => void }> = ({ item, onClose, onConfirm }) => {
  if (!item) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-gray-900 rounded-[32px] p-6 border border-white/10 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-32 md:w-40 aspect-[2/3] rounded-2xl overflow-hidden bg-black shrink-0 shadow-lg">
            <img src={item.poster || item.avatar || 'https://picsum.photos/400/600'} className="w-full h-full object-cover" alt="" />
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight">{item.title || item.name}</h2>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mt-1">
                {item.year || item.department || 'N/A'} • TMDB ID: {item.id}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-[8px] font-black uppercase tracking-widest text-gray-600">Overview / Bio</span>
              <p className="text-[11px] text-gray-300 font-medium leading-relaxed line-clamp-4 italic">
                {item.overview || item.biography || "Preview of the content from TMDB will be imported into the local database archive."}
              </p>
            </div>
            <div className="flex items-center space-x-3 text-[9px] font-black uppercase tracking-widest text-gray-500">
              <span className="bg-white/5 px-2 py-1 rounded border border-white/5">Genres: 3</span>
              <span className="bg-white/5 px-2 py-1 rounded border border-white/5">Cast: 12</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-2 gap-3">
          <button 
            onClick={onClose}
            className="py-3.5 rounded-2xl bg-gray-800 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-gray-700 transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="py-3.5 rounded-2xl bg-white text-[10px] font-black uppercase tracking-[0.2em] text-black hover:bg-gray-200 shadow-xl transition-all"
          >
            Confirm Import
          </button>
        </div>
      </div>
    </div>
  );
};

const ImportModule: React.FC<{ user: any }> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'movie' | 'series' | 'person'>('movie');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Define mockData with explicit typing to avoid property access errors on union types
  const mockData: Record<'movie' | 'series' | 'person', any[]> = {
    movie: [
      { id: 101, title: 'Inception', year: 2010, rating: 8.8, poster: 'https://image.tmdb.org/t/p/w500/o0qauIPKAg6ffS3329v7T0pCc3Z.jpg', overview: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.' },
      { id: 102, title: 'Interstellar', year: 2014, rating: 8.7, poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6EwfVnz6z2YwSTj6GZ8.jpg', overview: 'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.' },
      { id: 103, title: 'The Dark Knight', year: 2008, rating: 9.0, poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDp9sZKsjrswHn64GvW.jpg', overview: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.' },
    ],
    series: [
      { id: 201, title: 'Breaking Bad', year: 2008, rating: 9.5, poster: 'https://image.tmdb.org/t/p/w500/ggws0u6fK9G30vSre1fK2920r3L.jpg' },
      { id: 202, title: 'Stranger Things', year: 2016, rating: 8.7, poster: 'https://image.tmdb.org/t/p/w500/49WJfev0moxmBEEpA7R696P3Y26.jpg' },
    ],
    person: [
      { id: 301, name: 'Christopher Nolan', department: 'Directing', avatar: 'https://image.tmdb.org/t/p/w500/969U9S99uUqYqO6T00nS65A15hO.jpg' },
      { id: 302, name: 'Cillian Murphy', department: 'Acting', avatar: 'https://image.tmdb.org/t/p/w500/ll9O0DAsU7N4K4YlOof8Ie388fJ.jpg' },
    ]
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setResults([]);

    /* TODO: Connect TMDB search API */
    setTimeout(() => {
      const data = mockData[activeTab];
      const filtered = data.filter(item => 
        (item.title || item.name).toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
    }, 800);
  };

  const handleImport = () => {
    /* TODO: Insert into Supabase */
    /* TODO: Duplicate check */
    console.log('Importing into database:', selectedItem);
    alert(`Successfully imported: ${selectedItem.title || selectedItem.name}`);
    setSelectedItem(null);
  };

  return (
    <Layout title="Import Terminal" user={user}>
      <div className="space-y-8">
        <div className="space-y-1">
          <h2 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">Source: TMDB API</h2>
          <p className="text-[12px] font-bold text-gray-400">Search and synchronize the global cinema archive with our local database.</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-black/40 p-1 rounded-full border border-white/5 backdrop-blur-md max-w-[300px]">
          {(['movie', 'series', 'person'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setResults([]); setSearchQuery(''); }}
              className={`flex-1 py-2 text-[9px] font-black uppercase tracking-widest rounded-full transition-all ${
                activeTab === tab ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab === 'movie' ? 'Movies' : tab === 'series' ? 'Series' : 'People'}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative group">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeTab === 'movie' ? 'movies' : activeTab === 'series' ? 'series' : 'people'}...`}
            className="w-full h-14 bg-black border border-white/5 rounded-2xl px-5 text-[12px] font-bold placeholder:text-gray-700 focus:outline-none focus:border-white/20 transition-all shadow-inner"
          />
          <button 
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 h-10 px-6 bg-white text-black text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-200 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? '...' : 'Search'}
          </button>
        </form>

        {/* Results Grid */}
        <div className="space-y-6">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in duration-300">
              {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
              {results.map(item => (
                <div key={item.id} className="bg-gray-900/40 border border-white/5 rounded-2xl overflow-hidden group hover:border-white/10 transition-all flex flex-col">
                  <div className="aspect-[2/3] relative overflow-hidden bg-black">
                    <img 
                      src={item.poster || item.avatar || 'https://picsum.photos/400/600'} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" 
                      alt="" 
                    />
                    {item.rating && (
                      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                        <span className="text-[8px] font-black text-white">{item.rating}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3 flex-grow flex flex-col">
                    <h3 className="text-[11px] font-black uppercase tracking-tight line-clamp-1 group-hover:text-white transition-colors">
                      {item.title || item.name}
                    </h3>
                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-600 mt-0.5">
                      {item.year || item.department}
                    </p>
                    <button 
                      onClick={() => setSelectedItem(item)}
                      className="w-full mt-3 py-2 bg-white/5 border border-white/5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all"
                    >
                      Import
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : searchQuery && !loading ? (
            <div className="py-24 text-center space-y-4 animate-in fade-in duration-700">
              <div className="text-4xl opacity-10">🔍</div>
              <div className="space-y-1">
                <p className="text-[12px] font-black uppercase tracking-widest text-gray-400">No results found</p>
                <p className="text-[10px] font-bold text-gray-700 uppercase">Try another keyword or category</p>
              </div>
            </div>
          ) : (
             <div className="py-24 text-center opacity-20 select-none">
                <p className="text-[9px] font-black uppercase tracking-[0.5em]">Terminal Ready</p>
             </div>
          )}
        </div>
      </div>

      <ImportModal 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
        onConfirm={handleImport} 
      />
    </Layout>
  );
};

// --- END IMPORT MODULE ---


const AdminDashboard: React.FC<{ user: any }> = ({ user }) => {
  // Simple check - in production you'd use roles from profiles table
  const isAdmin = user?.email?.includes('admin') || user?.email?.includes('sathyapriyan');

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-10 text-center animate-in fade-in duration-1000">
        <div className="w-20 h-20 rounded-full border border-white/5 flex items-center justify-center mb-8 opacity-20">
          <span className="text-4xl">🔐</span>
        </div>
        <h1 className="text-xl font-black uppercase tracking-tighter mb-2">Access Denied</h1>
        <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em] max-w-[240px] leading-relaxed">
          The requested operational portal is restricted to authorized personnel only.
        </p>
        <Link to="/" className="mt-10 text-white text-[10px] font-black uppercase tracking-widest border-b border-white/20 pb-1">Return to terminal</Link>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<AdminHome user={user} />} />
      <Route path="/titles" element={<TitlesModule user={user} />} />
      <Route path="/import" element={<ImportModule user={user} />} />
      <Route path="/genres" element={<GenresModule user={user} />} />
      <Route path="/home-sections" element={<HomeSectionsModule user={user} />} />
      <Route path="/people" element={<PeopleModule user={user} />} />
    </Routes>
  );
};

const EmptyModule: React.FC<{ title: string; user: any }> = ({ title, user }) => (
  <Layout title={title} user={user}>
    <div className="bg-white/5 rounded-[32px] p-10 text-white min-h-[400px] flex flex-col items-center justify-center text-center space-y-4">
      <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center opacity-30 mb-2">
        <span className="text-2xl">⏳</span>
      </div>
      <p className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-500">
        Feature Under Development
      </p>
      <p className="text-[12px] font-bold text-gray-600 max-w-[240px] leading-relaxed italic">
        The {title} management system is currently being synthesized for this terminal.
      </p>
    </div>
  </Layout>
);

export default AdminDashboard;
