
import React from 'react';

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({ value, onChange }) => {
  return (
    <div className="w-full px-4 mb-2">
      <input 
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search"
        className="w-full h-[44px] bg-gray-800 rounded-[8px] px-4 text-sm text-white focus:outline-none placeholder:text-gray-500"
      />
    </div>
  );
};

export default SearchField;
