import { Upload, FileText, FileSpreadsheet, MoreVertical, CheckCircle2, Loader2 } from 'lucide-react';
import { MOCK_REPORTS } from '../constants';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export default function UploadCenter() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-slam-in">
      <section>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Upload Center</h1>
        <p className="text-slate-500">Ingest institutional-grade financial datasets for core analysis and risk modeling.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Drop Zone */}
        <div className="md:col-span-2 bg-white border border-slate-200 p-8 rounded-xl shadow-sm">
          <div className="h-80 border-2 border-dashed border-slate-300 bg-slate-50 rounded-lg flex flex-col items-center justify-center text-center p-8 transition-colors hover:bg-slate-100 group cursor-pointer">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Drag and drop documents</h3>
            <p className="text-slate-500 mb-6 max-w-xs text-sm">Upload your Excel spreadsheets or PDF financial statements for instant processing.</p>
            <button className="px-8 py-3 bg-primary text-white font-bold uppercase text-xs tracking-widest rounded hover:opacity-90 transition-opacity shadow-sm">
              Browse Files
            </button>
          </div>
        </div>

        {/* Specs Card */}
        <div className="bg-primary text-white p-8 rounded-xl flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-6">System Specs</h3>
            <ul className="space-y-4 text-sm opacity-90">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-tertiary-fixed" />
                PDF, XLSX, CSV, JSON
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-tertiary-fixed" />
                Max file size: 250MB
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-tertiary-fixed" />
                AES-256 Encryption
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-tertiary-fixed" />
                OCR Enabled
              </li>
            </ul>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-transparent opacity-40" />
        </div>
      </div>

      {/* Recent Uploads */}
      <section className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900">Recent Uploads</h2>
          <button className="text-sm font-semibold text-primary hover:underline">View All Archive</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-widest">
              <tr>
                <th className="px-6 py-4">Document Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-right">Size</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_REPORTS.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded flex items-center justify-center",
                        report.name.endsWith('.pdf') ? "bg-red-50 text-red-500" : "bg-blue-50 text-blue-500"
                      )}>
                        {report.name.endsWith('.pdf') ? <FileText className="w-5 h-5" /> : <FileSpreadsheet className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{report.name}</p>
                        <p className="text-[10px] text-slate-500 font-medium">{report.uploadDate}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">{report.category}</td>
                  <td className="px-6 py-4 text-sm text-slate-900 text-right data-tabular">{report.size}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide",
                      report.status === 'Processed' ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                    )}>
                      {report.status === 'Analyzing' && <Loader2 className="w-3 h-3 animate-spin mr-1" />}
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
