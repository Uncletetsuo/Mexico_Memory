import React from 'react';
import { ArrowLeft, BookOpen } from 'lucide-react';

interface NavbarProps {
  showBack: boolean;
  onBack: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ showBack, onBack }) => {
  return (
    <nav className="bg-slate-900 text-white p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBack && (
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-700 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400"
              aria-label="Volver a buscar"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
          <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
            <BookOpen className="w-6 h-6 text-green-500" />
            <span className="font-serif font-bold text-xl tracking-wide">
              Mexico <span className="text-green-500">tiene</span> <span className="text-red-500">memoria</span>
            </span>
          </div>
        </div>
        
        <div className="hidden md:block text-slate-400 text-sm">
          Transparencia y Democracia
        </div>
      </div>
    </nav>
  );
};