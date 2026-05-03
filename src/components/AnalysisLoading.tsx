import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface AnalysisLoadingProps {
  onComplete: () => void;
}

export default function AnalysisLoading({ onComplete }: AnalysisLoadingProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + Math.random() * 8;
      });
    }, 200);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-12 bg-slate-900 rounded-2xl relative overflow-hidden shadow-2xl">
      <div className="relative z-10 w-full max-w-sm">
        <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-8" />
        <h2 className="text-2xl font-bold text-white mb-4">Integrando Dados e Ajustes...</h2>
        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-6">
          <motion.div 
            className="h-full bg-primary shadow-[0_0_20px_rgba(59,130,246,0.5)]" 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        <div className="space-y-2">
          <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.3em] animate-pulse">
            {progress < 30 && 'Consolidando demonstrações financeiras...'}
            {progress >= 30 && progress < 60 && 'Aplicando eventos não recorrentes...'}
            {progress >= 60 && progress < 90 && 'Recalculando indicadores normalizados...'}
            {progress >= 90 && 'Finalizando relatório estratégico...'}
          </p>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
    </div>
  );
}
