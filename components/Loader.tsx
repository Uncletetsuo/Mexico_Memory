import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-12 h-12 border-4 border-slate-200 border-t-green-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-600 font-medium">Buscando en los archivos...</p>
    </div>
  );
};