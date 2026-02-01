
import React from 'react';
import PosterCard from './PosterCard';
import { Title } from '../types';

interface SectionRowProps {
  title: string;
  items: Title[];
}

const SectionRow: React.FC<SectionRowProps> = ({ title, items }) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between px-4">
        <h2 className="text-[13px] font-black text-white uppercase tracking-wider">{title}</h2>
        <span className="text-gray-600 text-[10px] font-bold">&gt;</span>
      </div>
      
      <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x px-4 pb-1">
        {items.map((item) => (
          <PosterCard key={item.id} title={item} />
        ))}
        {/* Spacer for end padding to ensure horizontal scroll end doesn't clip */}
        <div className="w-4 flex-shrink-0" />
      </div>
    </section>
  );
};

export default SectionRow;
