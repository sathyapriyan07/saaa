
import React, { useState, useEffect, useMemo } from 'react';
import SectionRow from '../components/SectionRow';
import SearchField from '../components/SearchField';
import PosterCard from '../components/PosterCard';
import { Title } from '../types';
import { supabase } from '../lib/supabase';

interface HomeProps {
  filter?: 'movie' | 'series';
}

const Home: React.FC<HomeProps> = ({ filter }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sections, setSections] = useState<any[]>([]);
  const [allTitles, setAllTitles] = useState<Title[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch Home Sections
        const { data: sectionsData } = await supabase
          .from('home_sections')
          .select('*, home_section_items(title_id)')
          .order('order');

        // Fetch all unique title IDs from sections
        const titleIds = sectionsData?.flatMap(s => s.home_section_items.map((item: any) => item.title_id)) || [];
        
        // Fetch Title details
        const { data: titlesData } = await supabase
          .from('titles')
          .select('*');

        setAllTitles(titlesData || []);
        
        // Map sections with titles
        const mappedSections = (sectionsData || []).map(section => ({
          ...section,
          items: (section.home_section_items || [])
            .map((item: any) => titlesData?.find(t => t.id === item.title_id))
            .filter(Boolean)
        }));

        setSections(mappedSections);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];
    return allTitles.filter(t => 
      t.title.toLowerCase().includes(query) || 
      t.year?.toString().includes(query)
    );
  }, [searchQuery, allTitles]);

  const isSearching = searchQuery.trim().length > 0;

  if (loading) {
    return (
      <div className="space-y-10 pt-10 px-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="space-y-4 animate-pulse">
            <div className="h-4 w-32 bg-gray-800 rounded"></div>
            <div className="flex gap-4 overflow-hidden">
              {[1, 2, 3, 4].map(j => (
                <div key={j} className="w-[110px] aspect-[2/3] bg-gray-800 rounded-lg shrink-0"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-4 animate-in fade-in duration-700">
      <SearchField value={searchQuery} onChange={setSearchQuery} />
      
      {isSearching ? (
        <div className="px-4 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between mb-5 border-b border-white/5 pb-2">
            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              Results for "{searchQuery}"
            </h2>
            <span className="text-[10px] text-gray-700 font-black">{searchResults.length} items</span>
          </div>
          
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {searchResults.map((title) => (
                <PosterCard key={title.id} title={title} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-gray-600 text-xs font-bold tracking-tight">No results matched your query.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-5 text-white text-[10px] font-black uppercase tracking-widest border border-white/20 px-6 py-2 rounded-full active:scale-95 transition-all"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-10 pb-12">
          {sections.map(section => {
            const items = filter ? section.items.filter((t: any) => t.type === filter) : section.items;
            if (items.length === 0) return null;
            return <SectionRow key={section.id} title={section.title} items={items} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Home;