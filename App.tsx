import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Profile } from './components/Profile';
import { Loader } from './components/Loader';
import { Politician, ViewState } from './types';
import { searchPolitician } from './services/geminiService';
import { MOCK_POLITICIANS } from './services/data';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [currentPolitician, setCurrentPolitician] = useState<Politician | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get 2 suggestions for the home page (e.g., Claudia and Xochitl)
  const suggestions = MOCK_POLITICIANS.slice(0, 2);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await searchPolitician(query);
      if (result) {
        setCurrentPolitician(result);
        setView('PROFILE');
      } else {
        setError(`No se encontraron resultados para "${query}". Intenta con otro nombre.`);
      }
    } catch (err) {
      setError("Ocurrió un error al buscar la información. Por favor intenta de nuevo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setView('HOME');
    setCurrentPolitician(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar showBack={view === 'PROFILE'} onBack={handleBack} />

      <main>
        {view === 'HOME' && (
          <div className="animate-fade-in">
            <Home 
              onSearch={handleSearch} 
              suggestions={suggestions} 
              isSearching={loading}
            />
            {loading && (
              <div className="fixed inset-0 bg-white/80 z-50 flex items-center justify-center backdrop-blur-sm">
                <Loader />
              </div>
            )}
            {error && (
               <div className="container mx-auto px-6 mt-4">
                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                  </div>
               </div>
            )}
          </div>
        )}

        {view === 'PROFILE' && currentPolitician && (
          <Profile data={currentPolitician} />
        )}
      </main>
      
      <footer className="bg-slate-900 text-slate-500 py-6 text-center text-sm mt-auto">
        <p>© {new Date().getFullYear()} Mexico tiene memoria. Datos proporcionados con fines informativos.</p>
      </footer>
    </div>
  );
};

export default App;