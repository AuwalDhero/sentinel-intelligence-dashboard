
import React from 'react';
import { MOCK_LIVE_LOGS } from '../constants';
import { Activity, Clock, Layers } from 'lucide-react';

const LiveFeed: React.FC = () => {
  const [logs, setLogs] = React.useState(MOCK_LIVE_LOGS);

  // Simulate new logs
  React.useEffect(() => {
    const interval = setInterval(() => {
      const platforms = ['Twitter/X', 'Facebook', 'Instagram', 'TikTok'];
      const actions = [
        'Detected new keyword trigger in viral post comment section.',
        'High amplification of trend #CyberCrimeUpdate.',
        'Analyzing cross-platform narrative shift on police reform.',
        'Engagement threshold met for report candidate generation.',
        'Negative sentiment surge detected in southwestern cluster.'
      ];
      
      const newLog = {
        timestamp: new Date().toISOString(),
        platform: platforms[Math.floor(Math.random() * platforms.length)],
        event: actions[Math.floor(Math.random() * actions.length)]
      };
      
      setLogs(prev => [newLog, ...prev.slice(0, 19)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-250px)]">
      <div className="bg-slate-900 p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
          <h3 className="text-white font-bold text-sm uppercase tracking-widest">Real-time Ingestion Pipeline</h3>
        </div>
        <div className="flex items-center gap-4 text-slate-400 text-[10px] font-mono">
          <span className="flex items-center gap-1"><Layers size={12}/> Buffer: 2.4GB/s</span>
          <span className="flex items-center gap-1"><Activity size={12}/> CPU: 14%</span>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 custom-scrollbar bg-slate-50">
        <div className="space-y-3">
          {logs.map((log, idx) => (
            <div key={idx} className="flex gap-4 p-3 bg-white border border-slate-100 rounded-lg shadow-sm animate-in slide-in-from-left duration-300">
              <div className="shrink-0 flex flex-col items-center">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                  <Clock size={18} />
                </div>
                <div className="w-0.5 flex-1 bg-slate-100 my-1" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-bold text-slate-900 uppercase">{log.platform}</span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm text-slate-600 font-medium">
                  {log.event}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4 bg-slate-100 border-t border-slate-200 text-center">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          Continuous stream active &bull; System filtering for PII & Content Moderation
        </p>
      </div>
    </div>
  );
};

export default LiveFeed;
