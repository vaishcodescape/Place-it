'use client';

import { FaSearch } from 'react-icons/fa';

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="w-full max-w-md mb-8 animate-fade-in-up relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none">
        <FaSearch />
      </span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-12 pr-5 py-3 rounded-xl bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-200 shadow-md"
      />
    </div>
  );
}
