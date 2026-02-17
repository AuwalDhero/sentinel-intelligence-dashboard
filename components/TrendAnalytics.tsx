
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { TeamBReport } from '../types';

interface TrendAnalyticsProps {
  reports: TeamBReport[];
}

const TrendAnalytics: React.FC<TrendAnalyticsProps> = ({ reports }) => {
  // Aggregate data for visualization
  const volumeData = reports.map(r => ({
    date: r.time,
    trend1: r.new_developments[0]?.engagement.volume || 0,
    trend2: r.new_developments[1]?.engagement.volume || 0,
    label1: r.new_developments[0]?.title.substring(0, 15) + '...',
    label2: r.new_developments[1]?.title.substring(0, 15) + '...'
  })).reverse();

  const sentimentData = [
    { name: 'Positive', value: 34 },
    { name: 'Neutral', value: 45 },
    { name: 'Negative', value: 21 },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Aggregate Sentiment</span>
          <div className="mt-2 text-3xl font-bold text-slate-900">45% Neutral</div>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-xs text-emerald-500 font-bold">↑ 4% Positive shift</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Monitored Engagement</span>
          <div className="mt-2 text-3xl font-bold text-slate-900">1.2M+</div>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-xs text-red-500 font-bold">↑ 12% Volatility surge</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Agent Efficiency</span>
          <div className="mt-2 text-3xl font-bold text-slate-900">99.8%</div>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-xs text-slate-400 font-bold">Normal Latency (&lt;2s)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Engagement Volume History</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={volumeData}>
                <defs>
                  <linearGradient id="colorTrend1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="trend1" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTrend1)" strokeWidth={2} />
                <Area type="monotone" dataKey="trend2" stroke="#6366f1" fillOpacity={1} fill="url(#colorTrend1)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Top Platform Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { platform: 'Twitter/X', mentions: 45000 },
                { platform: 'Facebook', mentions: 32000 },
                { platform: 'TikTok', mentions: 28000 },
                { platform: 'Instagram', mentions: 15000 },
                { platform: 'WhatsApp', mentions: 8000 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="platform" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="mentions" fill="#1e293b" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendAnalytics;
