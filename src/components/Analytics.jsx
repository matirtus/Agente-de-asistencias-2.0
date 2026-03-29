import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, TrendingUp, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const data = [
  { time: '0h', count: 100 },
  { time: '2h', count: 200 },
  { time: '4h', count: 450 },
  { time: '6h', count: 800 },
  { time: '8h', count: 1800 },
  { time: '10h', count: 2200 },
  { time: '12h', count: 2400 },
  { time: '14h', count: 2500 },
];

const Analytics = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-4">
        <div>
           <h4 className="journal-title text-2xl">{t('analytics.title')}</h4>
           <div className="flex items-center gap-2 mt-2">
             <Activity size={14} className="text-emerald animate-pulse" />
             <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-graphite-400">{t('analytics.status_active')}</span>
           </div>
        </div>
        <div className="bg-emerald-light/10 p-3 rounded-full border border-emerald/5">
           <TrendingUp className="text-emerald" size={24} />
        </div>
      </div>

      <div className="journal-paper p-8 rounded-3xl overflow-hidden border-emerald/10 bg-white">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00FF95" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#00FF95" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#666'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#666'}} />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  fontFamily: 'Outfit'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="count" 
                stroke="#0D4435" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorCount)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-50">
           <div className="text-center">
             <p className="text-[10px] text-graphite-400 uppercase font-bold mb-1">{t('analytics.stats.od')}</p>
             <p className="text-2xl font-serif text-emerald">1.42</p>
           </div>
           <div className="text-center border-x border-gray-100">
             <p className="text-[10px] text-graphite-400 uppercase font-bold mb-1">{t('analytics.stats.doubling')}</p>
             <p className="text-2xl font-serif text-emerald">22m</p>
           </div>
           <div className="text-center">
             <p className="text-[10px] text-graphite-400 uppercase font-bold mb-1">{t('analytics.stats.status')}</p>
             <p className="text-2xl font-serif text-emerald flex items-center justify-center gap-1">{t('analytics.stats.optimal')} <div className="w-1.5 h-1.5 bg-gfp rounded-full" /></p>
           </div>
        </div>
      </div>
      
      <div className="bg-emerald p-6 rounded-2xl flex items-start gap-4 text-white shadow-xl">
         <div className="bg-emerald-dark p-2 rounded-lg">
             <Info className="text-gfp shrink-0" size={20} />
         </div>
         <div>
            <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">{t('analytics.note_title')}</p>
            <p className="text-sm font-sans leading-relaxed">
              {t('analytics.note_content')}
            </p>
         </div>
      </div>
    </div>
  );
};

export default Analytics;
