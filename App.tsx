import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import ReportView from './components/ReportView';
import KeywordManager from './components/KeywordManager';
import TrendAnalytics from './components/TrendAnalytics';
import LiveFeed from './components/LiveFeed';
import { DashboardTab, TeamBReport, MonitoringConfig } from './types';
import { INITIAL_CONFIG } from './constants';
import { generateTeamBReport } from './services/geminiService';
import { RefreshCw, FilePlus, AlertCircle, Shield } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>(DashboardTab.REPORTS);
  const [config, setConfig] = useState<MonitoringConfig>(INITIAL_CONFIG);
  const [reports, setReports] = useState<TeamBReport[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateReport = useCallback(async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const newReport = await generateTeamBReport(config);
      setReports(prev => [newReport, ...prev]);
      setSelectedReportId(newReport.id);
      setActiveTab(DashboardTab.REPORTS);
    } catch (err: any) {
      console.error("Report generation failed:", err);
      setError(err.message || "Failed to generate intelligence report.");
    } finally {
      setIsGenerating(false);
    }
  }, [config]);

  // Initial load
  useEffect(() => {
    handleGenerateReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentReport = reports.find(r => r.id === selectedReportId) || reports[0];

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} isGenerating={isGenerating}>
      {activeTab === DashboardTab.REPORTS && (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 no-print">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Intelligence Archive</h2>
              <p className="text-slate-500">View and manage historical Team 'B' security reports.</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <button 
                onClick={handleGenerateReport}
                disabled={isGenerating}
                className={`flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isGenerating ? <RefreshCw className="animate-spin" size={20} /> : <FilePlus size={20} />}
                {isGenerating ? 'Generating...' : 'Generate New Report'}
              </button>
              {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 text-xs animate-in fade-in slide-in-from-top-2">
                  <AlertCircle size={14} />
                  <span className="font-semibold">{error}</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Report Sidebar */}
            <div className="xl:col-span-1 space-y-4 no-print max-h-[calc(100vh-250px)] overflow-auto pr-2 custom-scrollbar">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">Recently Produced</h3>
              {reports.map((report) => (
                <button
                  key={report.id}
                  onClick={() => {
                    setSelectedReportId(report.id);
                    setError(null);
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedReportId === report.id || (!selectedReportId && report === reports[0])
                      ? 'bg-white border-blue-500 shadow-md ring-1 ring-blue-500'
                      : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase font-bold">
                      Team B / {report.id.split('-')[0]}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">{report.time}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 line-clamp-2 leading-tight">
                    {report.new_developments[0]?.title || "Report Entry"}
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-2 font-medium">
                    {new Date(report.report_date).toLocaleDateString()}
                  </p>
                </button>
              ))}
              {reports.length === 0 && !isGenerating && (
                <div className="text-center py-12 text-slate-400">
                  <p className="text-sm italic">No reports generated yet.</p>
                </div>
              )}
            </div>

            {/* Main Report View */}
            <div className="xl:col-span-3">
              {isGenerating && reports.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-2xl p-20 flex flex-col items-center justify-center text-center">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 border-4 border-slate-100 rounded-full animate-spin border-t-blue-600" />
                    <Shield className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-300 w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Autonomous Agent Processing</h3>
                  <p className="text-slate-500 max-w-sm">
                    Ingesting social media streams and applying sentiment classification logic. 
                    Formatting structured TEAM 'B' report for command review...
                  </p>
                </div>
              ) : currentReport ? (
                <ReportView report={currentReport} />
              ) : (
                <div className="bg-slate-100 rounded-2xl p-20 text-center border-2 border-dashed border-slate-300">
                  <p className="text-slate-500 font-medium italic">
                    {error ? "Correction required: Use button above to retry." : "Select a report from the archive to view details."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === DashboardTab.ANALYTICS && (
        <TrendAnalytics reports={reports} />
      )}

      {activeTab === DashboardTab.KEYWORDS && (
        <KeywordManager config={config} setConfig={setConfig} />
      )}

      {activeTab === DashboardTab.LIVE_FEED && (
        <LiveFeed />
      )}
    </Layout>
  );
};

export default App;