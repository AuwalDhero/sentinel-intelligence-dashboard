
import React from 'react';
import { MonitoringConfig } from '../types';
import { Plus, X, Shield, Target, Smartphone } from 'lucide-react';

interface KeywordManagerProps {
  config: MonitoringConfig;
  setConfig: (config: MonitoringConfig) => void;
}

const KeywordManager: React.FC<KeywordManagerProps> = ({ config, setConfig }) => {
  const [newKeyword, setNewKeyword] = React.useState('');

  const addKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newKeyword.trim() && !config.keywords.includes(newKeyword.trim())) {
      setConfig({ ...config, keywords: [...config.keywords, newKeyword.trim()] });
      setNewKeyword('');
    }
  };

  const removeKeyword = (kw: string) => {
    setConfig({ ...config, keywords: config.keywords.filter(k => k !== kw) });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-8">
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Target className="text-blue-500" size={20} />
            Monitoring Target Keywords
          </h3>
          <p className="text-sm text-slate-500 mb-6">
            Add or remove phrases the autonomous agent tracks across all ingested platforms.
          </p>
          
          <form onSubmit={addKeyword} className="flex gap-2 mb-6">
            <input 
              type="text" 
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              placeholder="e.g. #EndSARS, Police Reform"
              className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="bg-slate-900 text-white p-2 rounded-lg hover:bg-slate-800 transition-colors">
              <Plus size={20} />
            </button>
          </form>

          <div className="flex flex-wrap gap-2 max-h-[300px] overflow-auto pr-2 custom-scrollbar">
            {config.keywords.map((kw) => (
              <span key={kw} className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border border-blue-100 group">
                {kw}
                <button onClick={() => removeKeyword(kw)} className="text-blue-300 hover:text-blue-600 transition-colors">
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Shield className="text-emerald-500" size={20} />
            Monitoring Scope
          </h3>
          <div className="space-y-3">
            {config.scope.map((s, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg text-sm font-medium text-slate-700">
                {s}
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="space-y-8">
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Smartphone className="text-slate-500" size={20} />
            Ingested Platforms
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {config.platforms.map((platform, idx) => (
              <div key={idx} className="flex flex-col p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-sm font-bold text-slate-900">{platform}</span>
                <span className="text-[10px] text-slate-400 uppercase font-mono mt-1">Status: LIVE_FEED</span>
                <div className="mt-3 w-full bg-slate-200 rounded-full h-1">
                  <div className="bg-blue-500 h-1 rounded-full w-[85%] animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 text-slate-300 p-8 rounded-xl border border-slate-800 shadow-xl overflow-hidden relative">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
          <h3 className="text-xl font-bold text-white mb-4 relative z-10">Agent Configuration</h3>
          <p className="text-sm leading-relaxed mb-6 relative z-10 opacity-70">
            The autonomous monitoring engine uses a dynamic tokenization strategy to ingest real-time content based on these keywords. High-density keyword appearance triggers immediate sentiment escalation and potential report drafting.
          </p>
          <div className="space-y-2 relative z-10">
            <div className="flex justify-between text-[10px] uppercase font-mono">
              <span>Token Buffer</span>
              <span className="text-blue-400">92% Available</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full w-[92%]" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default KeywordManager;
