import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Politician } from '../types';

interface HomeProps {
  onSearch: (query: string) => void;
  suggestions: Politician[];
  isSearching: boolean;
}

export const Home: React.FC<HomeProps> = ({ onSearch, suggestions, isSearching }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
        {/* Background Image - Zocalo representation via seed for consistency */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 scale-105"
          style={{ backgroundImage: `url('https://picsum.photos/seed/mexicocity/1920/1080')` }}
        ></div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-50 z-10"></div>
        
        <div className="relative z-20 w-full max-w-2xl px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">
            México tiene memoria
          </h1>
          <p className="text-slate-200 text-lg md:text-xl mb-8 font-light drop-shadow-md">
            Conoce la historia, los votos y las iniciativas de quienes nos representan.
          </p>

          <form onSubmit={handleSubmit} className="relative w-full shadow-2xl rounded-full">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar político (Ej. Claudia Sheinbaum, Xóchitl Gálvez...)"
              className="w-full py-4 pl-6 pr-14 rounded-full text-slate-800 focus:outline-none focus:ring-4 focus:ring-green-500/50 text-lg transition-all"
              disabled={isSearching}
            />
            <button 
              type="submit"
              disabled={isSearching}
              className="absolute right-2 top-2 p-2 bg-slate-900 text-white rounded-full hover:bg-slate-700 transition-colors disabled:opacity-50"
            >
              <Search className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>

      {/* Trending Suggestions */}
      <div className="container mx-auto px-6 -mt-16 relative z-30 pb-12">
        <h3 className="text-white font-semibold text-lg mb-4 ml-2 shadow-black drop-shadow-sm">
          Tendencias
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {suggestions.map((p) => (
            <div 
              key={p.id}
              onClick={() => onSearch(p.name)}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1 group flex border border-slate-100"
            >
              <div className="w-1/3 md:w-32 h-32 md:h-auto relative">
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex flex-col justify-center flex-1">
                <span className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                  p.party === 'MORENA' ? 'text-red-700' : 
                  p.party === 'PAN' ? 'text-blue-700' : 'text-orange-600'
                }`}>
                  {p.party}
                </span>
                <h4 className="font-serif text-xl font-bold text-slate-800 mb-1">
                  {p.name}
                </h4>
                <p className="text-slate-500 text-sm line-clamp-2">
                  {p.roles[0]?.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};