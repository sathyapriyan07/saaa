
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Season, Title } from '../types';
import { supabase } from '../lib/supabase';

const TitleDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'episodes' | 'production' | 'links'>('overview');
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [titleData, setTitleData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      try {
        const { data: title, error } = await supabase
          .from('titles')
          .select(`
            *,
            seasons(*, episodes(*)),
            crew(*, person:people(*))
          `)
          .eq('id', id)
          .single();

        if (error) throw error;
        setTitleData(title);

        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const { data: watchlistEntry } = await supabase
            .from('watchlist')
            .select('*')
            .eq('user_id', session.user.id)
            .eq('title_id', id)
            .maybeSingle();
          setIsInWatchlist(!!watchlistEntry);
        }
      } catch (err) {
        console.error('Error fetching title details:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [id]);

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(-1);
  };

  const toggleWatchlist = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      alert('Login to add to watchlist');
      return;
    };

    if (isInWatchlist) {
      await supabase.from('watchlist').delete().eq('user_id', session.user.id).eq('title_id', id);
    } else {
      await supabase.from('watchlist').insert({ user_id: session.user.id, title_id: id });
    }
    setIsInWatchlist(!isInWatchlist);
  };

  const tabs = useMemo(() => {
    if (!titleData) return ['overview'];
    const base = ['overview', 'production'];
    if (titleData.type === 'series') base.push('episodes');
    base.push('links');
    return base as any;
  }, [titleData]);

  const productionCrew = useMemo(() => {
    if (!titleData?.crew) return [];
    return titleData.crew.filter((item: any) => {
      const role = item.role?.toLowerCase() || '';
      return role === 'director' || role === 'composer';
    });
  }, [titleData]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-700 animate-pulse">Loading Cinema Details...</div>
    </div>
  );
  
  if (!titleData) return (
    <div className="p-20 text-center">
      <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Title not found</p>
      <button onClick={() => navigate('/')} className="mt-4 text-[10px] font-black uppercase tracking-widest text-white border-b border-white/20 pb-1">Browse Home</button>
    </div>
  );

  const currentSeason = titleData.seasons?.[selectedSeasonIndex];

  return (
    <div className="min-h-screen bg-black text-white px-4 pt-4 pb-24 animate-in fade-in duration-500 overflow-x-hidden scrollbar-hide">
      <div className="mb-6">
        <button 
          onClick={handleBack} 
          className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-all flex items-center group"
        >
          <span className="mr-2 text-lg font-light translate-y-[-1px] group-hover:-translate-x-1 transition-transform">&lt;</span> Back
        </button>
      </div>

      <div className="flex flex-col items-center space-y-6 mb-12">
        <div className="w-[180px] aspect-[2/3] rounded-2xl overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.9)] border border-white/5 bg-gray-900">
          <img src={titleData.poster} className="w-full h-full object-cover" alt={titleData.title} />
        </div>
        <div className="text-center px-2 flex flex-col items-center">
          <h1 className="text-xl font-black leading-tight tracking-tight uppercase">{titleData.title}</h1>
          <div className="flex items-center justify-center space-x-2 mt-1">
            <span className="text-[11px] text-gray-500 font-black tracking-widest">{titleData.year}</span>
            {titleData.type === 'series' && (
               <>
                 <span className="text-gray-800 text-[8px]">•</span>
                 <span className="text-[11px] text-gray-500 font-black tracking-widest uppercase">{titleData.seasons?.length} Seasons</span>
               </>
            )}
          </div>
          
          <button
            onClick={toggleWatchlist}
            className={`mt-6 px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 flex items-center space-x-2 shadow-xl ${
              isInWatchlist
                ? 'bg-white text-black'
                : 'bg-gray-900/40 text-white border border-white/10 hover:bg-gray-800 active:scale-95'
            }`}
          >
            <span className="text-sm leading-none">{isInWatchlist ? '✓' : '+'}</span>
            <span>{isInWatchlist ? 'In Watchlist' : 'Watchlist'}</span>
          </button>
        </div>
      </div>

      <div className="flex bg-gray-900/60 rounded-full p-1 mb-10 max-w-md mx-auto border border-white/5 backdrop-blur-md overflow-x-auto scrollbar-hide">
        {tabs.map((tab: any) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 min-w-[80px] py-2 text-[9px] font-black uppercase tracking-widest rounded-full transition-all duration-500 whitespace-nowrap ${
              activeTab === tab ? 'bg-white text-black shadow-xl' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {tab === 'production' ? 'Cast & Crew' : tab === 'links' ? 'Links' : tab === 'episodes' ? 'Episodes' : 'Overview'}
          </button>
        ))}
      </div>

      <div className="px-1 max-w-2xl mx-auto min-h-[220px]">
        {activeTab === 'overview' && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <p className="text-[13px] text-gray-200 font-bold leading-relaxed">{titleData.overview}</p>
          </div>
        )}

        {activeTab === 'episodes' && titleData.type === 'series' && titleData.seasons && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-8">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 border-b border-white/5">
              {titleData.seasons.sort((a: any, b: any) => a.number - b.number).map((season: any, idx: number) => (
                <button
                  key={season.id}
                  onClick={() => setSelectedSeasonIndex(idx)}
                  className={`text-[11px] font-black uppercase tracking-widest ${
                    selectedSeasonIndex === idx ? 'text-white' : 'text-gray-600 hover:text-gray-400'
                  }`}
                >
                  Season {season.number}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {currentSeason?.episodes.sort((a: any, b: any) => a.number - b.number).map((episode: any) => (
                <div key={episode.id} className="flex gap-4 group">
                  <div className="w-[120px] aspect-video rounded-lg overflow-hidden flex-shrink-0 bg-gray-900 border border-white/5 shadow-lg group-active:scale-95 transition-transform">
                    <img src={episode.thumbnail || 'https://picsum.photos/320/180'} className="w-full h-full object-cover" alt={episode.title} />
                  </div>
                  <div className="flex flex-col justify-center space-y-1">
                    <div className="flex items-center space-x-2">
                       <span className="text-[11px] font-black text-gray-500">{episode.number}</span>
                       <h4 className="text-[12px] font-black uppercase tracking-tight text-white group-hover:text-gray-300 transition-colors">{episode.title}</h4>
                    </div>
                    <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest">{episode.runtime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'production' && (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 space-y-10 pb-10">
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-px bg-white/10 flex-grow" />
              <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-500">Key Production</h3>
              <div className="h-px bg-white/10 flex-grow" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-2">
              {productionCrew.length > 0 ? productionCrew.map((item: any) => (
                <Link 
                  key={item.id} 
                  to={item.person?.id ? `/person/${item.person.id}` : '#'} 
                  className={`flex items-center space-x-4 p-4 rounded-2xl bg-gray-900/40 border border-white/5 hover:border-white/20 transition-all group ${!item.person?.id ? 'pointer-events-none opacity-60' : 'active:scale-95'}`}
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10 bg-gray-900 shrink-0">
                    <img 
                      src={item.person?.avatar || `https://picsum.photos/120/120?random=${item.id}`} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                      alt={item.person?.name || item.name} 
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-600 mb-0.5">{item.role}</span>
                    <span className="text-[14px] font-black uppercase tracking-tight text-gray-100 group-hover:text-white">{item.person?.name || item.name}</span>
                    <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest mt-1">View Professional Detail &gt;</span>
                  </div>
                </Link>
              )) : (
                <div className="col-span-full py-12 text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-700 italic">No production details documented for this title.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'links' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 text-center">
             <p className="text-[11px] text-gray-500 font-bold tracking-widest uppercase">External links and trailers.</p>
             <button className="w-full py-4 bg-gray-900 border border-white/5 text-white text-[10px] font-black rounded-2xl uppercase tracking-[0.3em] hover:bg-gray-800 transition-colors">Watch Trailer</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TitleDetail;
