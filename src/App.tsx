import { useState } from 'react';
import { AppView, ExtraordinaryEvent } from './types';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import AnalysisDashboard from './components/AnalysisDashboard';
import UploadCenter from './components/UploadCenter';
import ObservationsView from './components/ObservationsView';
import AnalysisReport from './components/AnalysisReport';
import AnalysisLoading from './components/AnalysisLoading';
import * as api from './services/api';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('Upload');
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeFileName, setActiveFileName] = useState<string | null>(null);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleUploadComplete = (fileName: string, fileId?: string) => {
    setActiveFileName(fileName);
    setActiveFileId(fileId || 'temp_id');
    setCurrentView('Observations');
  };

  const handleStartAnalysis = async (adjustments: ExtraordinaryEvent[]) => {
    setIsProcessing(true);
    try {
      const result = await api.analyzeFinancials(activeFileId || '', adjustments);
      setAnalysisResult(result);
      // O AnalysisLoading chama o onComplete quando termina a animação
    } catch (error) {
      console.error('Erro na análise:', error);
      setIsProcessing(false);
    }
  };

  const handleAnalysisFinished = () => {
    setIsProcessing(false);
    setIsAnalyzed(true);
    setCurrentView('Dashboard');
  };

  const renderView = () => {
    if (isProcessing) {
      return <AnalysisLoading onComplete={handleAnalysisFinished} />;
    }

    switch (currentView) {
      case 'Upload':
        return <UploadCenter onUploadComplete={handleUploadComplete} />;
      case 'Observations':
        return <ObservationsView onFinish={handleStartAnalysis} />;
      case 'Dashboard':
        return <AnalysisDashboard fileName={activeFileName} data={analysisResult} />;
      case 'Report':
        return <AnalysisReport data={analysisResult} />;
      default:
        return <UploadCenter onUploadComplete={handleUploadComplete} />;
    }
  };




  return (
    <div className="min-h-screen bg-[#f7f9ff] flex flex-col">
      <Navbar />
      <div className="flex flex-1 max-w-[1440px] mx-auto w-full">
        <Sidebar 
          currentView={currentView} 
          onViewChange={setCurrentView} 
          isAnalyzed={isAnalyzed}
        />
        <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
}

