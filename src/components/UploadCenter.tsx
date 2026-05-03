import { useState, useEffect } from 'react';
import { Upload, FileText, FileSpreadsheet, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface UploadCenterProps {
  onUploadComplete: (fileName: string) => void;
}

export default function UploadCenter({ onUploadComplete }: UploadCenterProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setProgress(0);
  };

  useEffect(() => {
    if (isUploading && progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prev => Math.min(prev + Math.random() * 15, 100));
      }, 300);
      return () => clearTimeout(timer);
    } else if (isUploading && progress >= 100) {
      setTimeout(() => {
        onUploadComplete('Relatório_Financeiro_Q3.pdf');
      }, 800);
    }
  }, [isUploading, progress, onUploadComplete]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Central de Inteligência</h1>
        <p className="text-slate-500">Inicie uma nova análise enviando sua demonstração financeira (DRE ou Balanço).</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Drop Zone / Upload Action */}
        <div className="md:col-span-2 bg-white border border-slate-200 p-8 rounded-xl shadow-sm">
          <AnimatePresence mode="wait">
            {!isUploading ? (
              <motion.div 
                key="dropzone"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-80 border-2 border-dashed border-slate-300 bg-slate-50 rounded-lg flex flex-col items-center justify-center text-center p-8 transition-colors hover:bg-slate-100 group cursor-pointer"
                onClick={handleSimulateUpload}
              >
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Arraste seu arquivo aqui</h3>
                <p className="text-slate-500 mb-6 max-w-xs text-sm">Suporte para PDF e Excel. O sistema irá mapear as contas automaticamente.</p>
                <button className="px-8 py-3 bg-primary text-white font-bold uppercase text-xs tracking-widest rounded hover:opacity-90 transition-opacity shadow-sm">
                  Selecionar Arquivo
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="processing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-80 bg-slate-900 rounded-lg flex flex-col items-center justify-center text-center p-8 relative overflow-hidden"
              >
                <div className="relative z-10 w-full max-w-xs">
                  <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-white mb-2">Processando com IA...</h3>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-4">
                    <motion.div 
                      className="h-full bg-primary" 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-white/60 text-xs font-medium uppercase tracking-[0.2em] animate-pulse">
                    {progress < 40 && 'Lendo estrutura do arquivo...'}
                    {progress >= 40 && progress < 70 && 'Identificando planos de contas...'}
                    {progress >= 70 && 'Gerando insights financeiros...'}
                  </p>
                </div>
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Info Card */}
        <div className="bg-primary text-white p-8 rounded-xl flex flex-col justify-between relative overflow-hidden shadow-lg">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
               <Sparkles className="w-5 h-5 text-tertiary-fixed" />
               <h3 className="text-xl font-bold">Análise Pontual</h3>
            </div>
            <ul className="space-y-4 text-sm opacity-90">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-tertiary-fixed" />
                Extração de dados via OCR
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-tertiary-fixed" />
                Mapeamento de KPIs
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-tertiary-fixed" />
                Sem armazenamento de dados
              </li>
            </ul>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10">
             <p className="text-[10px] uppercase font-bold tracking-widest text-white/60">Segurança</p>
             <p className="text-xs mt-1">Seus dados são processados em memória e não ficam salvos no servidor.</p>
          </div>
        </div>
      </div>
    </div>
  );
}


