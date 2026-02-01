
import React from 'react';
import { Link } from 'react-router-dom';
import { Title } from '../types';

interface PosterCardProps {
  title: Title;
}

const PosterCard: React.FC<PosterCardProps> = ({ title }) => {
  return (
    <Link 
      to={`/title/${title.id}`}
      className="flex-shrink-0 snap-start"
    >
      <div className="w-[110px] md:w-[130px] aspect-[2/3] rounded-lg overflow-hidden bg-gray-900 transition-transform hover:scale-105 active:scale-95 duration-300">
        <img 
          src={title.poster || 'https://picsum.photos/400/600'} 
          alt={title.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </Link>
  );
};

export default PosterCard;
