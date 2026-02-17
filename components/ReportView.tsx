
import React from 'react';
import { TeamBReport, Sentiment } from '../types';
// Fixed: Added missing FileText import from lucide-react
import { Download, Printer, Share2, TrendingUp, AlertTriangle, ShieldCheck, FileText } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ReportViewProps {
  report: TeamBReport;
}

const SentimentWheel: React.FC<{ sentiment: Sentiment }> = ({ sentiment }) => {
  const data = [
    { name: 'Positive', value: sentiment.positive, color: '#10b981' },
    { name: 'Neutral', value: sentiment.neutral, color: '#64748b' },
    { name: 'Negative', value: sentiment.negative, color: '#ef4444' },
  ];

  return (
    <div className="w-24 h-24">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={25}
            outerRadius={40}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ fontSize: '10px', borderRadius: '8px' }}
            itemStyle={{ padding: '2px 0' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const ReportView: React.FC<ReportViewProps> = ({ report }) => {
  const handlePrint = () => window.print();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6 no-print">
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <FileText size={16} />
          <span>Report ID: {report.id.split('-')[0].toUpperCase()}</span>
        </div>
        <div className="flex gap-2">
          <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium">
            <Printer size={16} /> Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
            <Download size={16} /> Export PDF
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 shadow-xl rounded-none p-12 print:shadow-none print:border-none">
        {/* Header Section */}
        <div className="text-center border-b-2 border-slate-900 pb-8 mb-8">
          <div className="flex justify-center mb-6 no-print">
            <div className="bg-slate-900 p-3 rounded-full">
              <ShieldCheck className="text-white w-10 h-10" />
            </div>
          </div>
          <h2 className="text-xl font-bold tracking-widest uppercase mb-2">NIGERIA POLICE FORCE</h2>
          <h3 className="text-lg font-semibold tracking-wide uppercase mb-4">NATIONAL CYBERCRIME CENTER (NPF-NCCC)</h3>
          <div className="bg-slate-100 py-3 border-y border-slate-200 font-bold text-lg tracking-tighter uppercase">
            {report.report_date.split('T')[0]} - {report.time}
          </div>
          <h1 className="mt-6 text-2xl font-black uppercase text-slate-900 leading-tight">
            TEAM ‘B’ REPORT WRITTEN TODAY BEING ON <br/>
            {new Date(report.report_date).toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase()}
          </h1>
        </div>

        {/* Executive Summary */}
        <section className="mb-10">
          <h4 className="flex items-center gap-2 text-lg font-bold uppercase text-slate-900 mb-4 border-l-4 border-blue-600 pl-4">
            1. Executive Summary
          </h4>
          <div className="space-y-4 text-slate-800 leading-relaxed font-medium">
            {report.executive_summary.map((point, idx) => (
              <div key={idx} className="flex gap-4">
                <span className="font-bold shrink-0">{idx + 1}.</span>
                <p>{point}</p>
              </div>
            ))}
          </div>
        </section>

        {/* General Outlook */}
        <section className="mb-10">
          <h4 className="flex items-center gap-2 text-lg font-bold uppercase text-slate-900 mb-4 border-l-4 border-blue-600 pl-4">
            2. General Outlook
          </h4>
          <p className="text-slate-800 leading-relaxed indent-8 text-justify">
            {report.general_outlook}
          </p>
        </section>

        {/* New Developments */}
        <section className="mb-10">
          <h4 className="flex items-center gap-2 text-lg font-bold uppercase text-slate-900 mb-4 border-l-4 border-blue-600 pl-4">
            3. New Development
          </h4>
          <p className="font-semibold italic mb-6 text-slate-700">
            Monitoring of Nigeria’s social media space revealed the following trending issues:
          </p>
          
          <div className="space-y-8">
            {report.new_developments.map((trend, idx) => (
              <div key={idx} className="bg-slate-50/50 p-6 border border-slate-100 rounded-lg">
                <div className="flex flex-col md:flex-row justify-between gap-6 mb-4">
                  <div className="flex-1">
                    <h5 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-3">
                      <span className="bg-slate-900 text-white w-6 h-6 rounded flex items-center justify-center text-xs">
                        {String.fromCharCode(97 + idx)}
                      </span>
                      {trend.title}
                    </h5>
                    <p className="text-slate-700 leading-relaxed text-sm mb-4">
                      {trend.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {trend.matched_keywords.map((kw, i) => (
                        <span key={i} className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-mono font-bold uppercase">
                          #{kw.replace(/\s+/g, '')}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="md:w-48 flex flex-col items-center gap-2 pt-2">
                    <SentimentWheel sentiment={trend.sentiment} />
                    <div className="flex flex-col items-center text-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sentiment Profile</span>
                      <div className="flex gap-2 mt-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" title="Positive" />
                        <div className="w-2 h-2 rounded-full bg-slate-400" title="Neutral" />
                        <div className="w-2 h-2 rounded-full bg-red-500" title="Negative" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs font-bold text-slate-500 border-t border-slate-200 pt-3">
                  <span className="flex items-center gap-1"><TrendingUp size={14}/> Volume: {trend.engagement.volume.toLocaleString()}</span>
                  <span className="flex items-center gap-1 uppercase">Platforms: {trend.platforms.join(', ')}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Assessment */}
        <section className="mb-10">
          <h4 className="flex items-center gap-2 text-lg font-bold uppercase text-slate-900 mb-4 border-l-4 border-blue-600 pl-4">
            4. Assessment
          </h4>
          <div className="space-y-4 text-slate-800 leading-relaxed">
            {report.assessment.map((point, idx) => (
              <div key={idx} className="flex gap-4">
                <span className="font-bold shrink-0">{idx + 1}.</span>
                <p className="text-justify">{point}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recommendations */}
        <section className="mb-10">
          <h4 className="flex items-center gap-2 text-lg font-bold uppercase text-slate-900 mb-4 border-l-4 border-blue-600 pl-4">
            5. Recommendation
          </h4>
          <div className="space-y-4 text-slate-800">
            {report.recommendations.map((rec, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0" />
                <p className="font-medium">{rec}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sign-off */}
        <section className="mt-16 pt-8 border-t border-slate-200 text-center md:text-right">
          <p className="text-slate-900 font-bold uppercase mb-2">Authenticated By:</p>
          <div className="inline-block border-b border-slate-900 w-48 mb-4"></div>
          <p className="text-slate-900 font-black uppercase text-lg tracking-tight">
            {report.sign_off}
          </p>
          <p className="text-slate-500 font-bold uppercase text-sm">
            Autonomous Social Media Intelligence Agent<br/>
            Ref: SENTINEL/OPS/TEAM-B/{report.id.split('-')[0].toUpperCase()}
          </p>
        </section>
      </div>

      <div className="mt-8 text-center text-slate-400 text-xs uppercase tracking-widest font-bold no-print">
        *** End of Restricted Intelligence Report ***
      </div>
    </div>
  );
};

export default ReportView;
