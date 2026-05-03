/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AppView } from './types';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import AnalysisDashboard from './components/AnalysisDashboard';
import UploadCenter from './components/UploadCenter';
import ObservationsView from './components/ObservationsView';
import AnalysisReport from './components/AnalysisReport';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('Dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'Upload':
        return <UploadCenter />;
      case 'Observations':
        return <ObservationsView />;
      case 'Dashboard':
        return <AnalysisDashboard />;
      case 'Report':
        return <AnalysisReport />;
      default:
        return <AnalysisDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9ff] flex flex-col">
      <Navbar />
      <div className="flex flex-1 max-w-[1440px] mx-auto w-full">
        <Sidebar currentView={currentView} onViewChange={setCurrentView} />
        <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
