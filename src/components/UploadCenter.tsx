import { useState, useEffect } from 'react';
import { Upload, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface UploadCenterProps {
  onUploadComplete: (fileName: string) => void;
}

export default function UploadCenter({ onUploadComplete }: UploadCenterProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleSimulateUpload = () => {
    setIsUploading(true);
    // Simulação rápida de leitura local
    setTimeout(() => {
      onUploadComplete('Relatório_Financeiro_Q3.pdf');
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <section>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Central de Inteligência</h1>
        <p className="text-slate-500">Inicie enviando sua demonstração financeira para análise contextual.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <p className="text-slate-500 mb-6 max-w-xs text-sm">PDF ou Excel. O processamento completo ocorrerá após a revisão de ajustes.</p>
                <button className="px-8 py-3 bg-primary text-white font-bold uppercase text-xs tracking-widest rounded hover:opacity-90 transition-opacity shadow-sm">
                  Selecionar Arquivo
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-80 bg-slate-50 border border-slate-200 rounded-lg flex flex-col items-center justify-center text-center p-8"
              >
                <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
                <h3 className="text-lg font-bold text-slate-900">Leitura Rápida em Curso...</h3>
                <p className="text-slate-500 text-sm mt-1">Extraindo metadados para curadoria.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="bg-primary text-white p-8 rounded-xl flex flex-col justify-between relative overflow-hidden shadow-lg">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
               <Sparkles className="w-5 h-5 text-tertiary-fixed" />
               <h3 className="text-xl font-bold">Fluxo Otimizado</h3>
            </div>
            <p className="text-sm opacity-90 leading-relaxed mb-6">
              Nesta versão, a IA aguarda seus **ajustes manuais** para realizar uma única análise consolidada, economizando tempo e garantindo maior precisão nos KPIs.
            </p>
            <ul className="space-y-3 text-xs opacity-80">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> 1. Upload & Scan
              </li>
              <li className="flex items-center gap-2 text-white font-bold">
                <CheckCircle2 className="w-4 h-4" /> 2. Ajustes Manuais
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> 3. Processamento IA Final
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}



