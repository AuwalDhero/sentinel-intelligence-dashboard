
import React from 'react';
import { Shield, FileText, BarChart2, Hash, Radio, Menu, X, Bell } from 'lucide-react';
import { DashboardTab } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  isGenerating: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, isGenerating }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const navItems = [
    { id: DashboardTab.REPORTS, label: 'Intelligence Reports', icon: FileText },
    { id: DashboardTab.ANALYTICS, label: 'Trend Analytics', icon: BarChart2 },
    { id: DashboardTab.KEYWORDS, label: 'Keyword Manager', icon: Hash },
    { id: DashboardTab.LIVE_FEED, label: 'Live Monitoring', icon: Radio },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Shield className="text-blue-500 w-6 h-6" />
          <span className="font-bold text-lg">SENTINEL AI</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static inset-y-0 left-0 w-64 bg-slate-900 text-slate-300 transition-transform duration-200 ease-in-out z-40 flex flex-col`}>
        <div className="p-6 hidden md:flex items-center gap-3">
          <Shield className="text-blue-500 w-8 h-8" />
          <div className="flex flex-col">
            <span className="font-bold text-white text-xl tracking-tight">SENTINEL AI</span>
            <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Autonomous Monitoring</span>
          </div>
        </div>

        <nav className="mt-4 flex-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (window.innerWidth < 768) setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-6 py-4 transition-colors ${
                activeTab === item.id 
                  ? 'bg-blue-600/10 text-blue-400 border-r-4 border-blue-500 font-medium' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
              <span className="text-xs font-semibold text-slate-200">
                {isGenerating ? 'Agent: Processing Content' : 'Agent: Monitoring Active'}
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono leading-relaxed">
              NPF-NCCC Autonomous Node v2.4.0<br/>
              Node Status: SECURE_AUTH_OP
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 sticky top-0 z-30 no-print">
          <h1 className="text-lg font-semibold text-slate-800 capitalize">
            {activeTab.replace('_', ' ')}
          </h1>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-xs text-slate-500">Security Clearance</span>
              <span className="text-sm font-bold text-slate-900">Level 4: High Command</span>
            </div>
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold border border-slate-300">
              CO
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
