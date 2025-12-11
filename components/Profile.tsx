import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Calendar, FileText, CheckCircle, XCircle, MinusCircle, User } from 'lucide-react';
import { Politician, Vote } from '../types';

interface ProfileProps {
  data: Politician;
}

export const Profile: React.FC<ProfileProps> = ({ data }) => {
  
  // Calculate Vote Statistics for the Chart
  const voteStats = data.votes.reduce((acc, vote) => {
    acc[vote.result] = (acc[vote.result] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.keys(voteStats).map(key => ({
    name: key,
    value: voteStats[key]
  }));

  const COLORS = {
    'A favor': '#22c55e', // green-500
    'En contra': '#ef4444', // red-500
    'Abstención': '#94a3b8', // slate-400
    'Ausente': '#cbd5e1' // slate-300
  };

  const getVoteIcon = (result: string) => {
    switch (result) {
      case 'A favor': return <CheckCircle className="text-green-500 w-5 h-5" />;
      case 'En contra': return <XCircle className="text-red-500 w-5 h-5" />;
      default: return <MinusCircle className="text-slate-400 w-5 h-5" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in-up">
      
      {/* Header Profile */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:w-1/3 lg:w-1/4 h-64 md:h-auto relative">
            <img 
              src={data.image} 
              alt={data.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:hidden">
              <h1 className="text-white text-2xl font-serif font-bold">{data.name}</h1>
              <p className="text-slate-200">{data.party}</p>
            </div>
          </div>
          <div className="p-6 md:p-8 md:w-2/3 lg:w-3/4 flex flex-col justify-center">
            <div className="hidden md:block mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-2 ${
                  data.party.includes('MORENA') ? 'bg-red-100 text-red-800' : 
                  data.party.includes('PAN') ? 'bg-blue-100 text-blue-800' : 
                  data.party.includes('PRI') ? 'bg-green-100 text-green-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                {data.party}
              </span>
              <h1 className="text-4xl font-serif font-bold text-slate-900 mb-2">{data.name}</h1>
            </div>
            
            <p className="text-slate-600 leading-relaxed text-lg">
              {data.bio}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Track Record & Votes */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Track Record */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-serif font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              Trayectoria Política
            </h2>
            <div className="relative border-l-2 border-slate-200 ml-3 space-y-8">
              {data.roles.map((role, idx) => (
                <div key={idx} className="mb-8 ml-6 relative">
                  <span className="absolute -left-[31px] bg-white border-2 border-indigo-500 w-4 h-4 rounded-full mt-1.5"></span>
                  <h3 className="text-lg font-semibold text-slate-900">{role.title}</h3>
                  <time className="block mb-2 text-sm font-normal leading-none text-slate-400">{role.period}</time>
                  {role.description && <p className="text-base text-slate-500">{role.description}</p>}
                </div>
              ))}
            </div>
          </section>

           {/* Votes */}
           <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-serif font-bold text-slate-800 mb-6 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Historial de Votación
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">Asunto</th>
                    <th className="px-4 py-3">Fecha</th>
                    <th className="px-4 py-3 rounded-r-lg text-right">Voto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.votes.map((vote, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-slate-900">{vote.subject}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{vote.date}</td>
                      <td className="px-4 py-3 text-right">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          vote.result === 'A favor' ? 'bg-green-100 text-green-800' :
                          vote.result === 'En contra' ? 'bg-red-100 text-red-800' :
                          'bg-slate-100 text-slate-800'
                        }`}>
                          {getVoteIcon(vote.result)}
                          {vote.result}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right Column: Initiatives & Stats */}
        <div className="space-y-8">
          
          {/* Voting Chart */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
             <h2 className="text-lg font-serif font-bold text-slate-800 mb-4">Resumen de Votos</h2>
             <div className="h-64 w-full">
              {chartData.length > 0 ? (
                 <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={chartData}
                     cx="50%"
                     cy="50%"
                     innerRadius={60}
                     outerRadius={80}
                     paddingAngle={5}
                     dataKey="value"
                   >
                     {chartData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || '#94a3b8'} />
                     ))}
                   </Pie>
                   <RechartsTooltip />
                   <Legend verticalAlign="bottom" height={36}/>
                 </PieChart>
               </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400">Sin datos</div>
              )}
             </div>
          </section>

          {/* Initiatives */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-serif font-bold text-slate-800 mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-500" />
              Iniciativas Clave
            </h2>
            <div className="space-y-4">
              {data.initiatives.map((init, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-slate-900 text-sm">{init.title}</h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold border ${
                       init.status === 'Aprobada' ? 'bg-green-50 text-green-600 border-green-200' :
                       init.status === 'Rechazada' ? 'bg-red-50 text-red-600 border-red-200' :
                       'bg-yellow-50 text-yellow-600 border-yellow-200'
                    }`}>
                      {init.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">{init.date}</p>
                  <p className="text-sm text-slate-600">{init.description}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};