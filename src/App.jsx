import React, { useState } from 'react';
import Header, { Sidebar } from './components/Layout';
import Registry from './components/Registry';
import Notebook from './components/Notebook';
import Analytics from './components/Analytics';
import PetriSim from './components/PetriSim';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('notebook');

  return (
    <div className="min-h-screen bg-journal flex flex-col font-sans">
      <Header />
      
      <div className="flex flex-1">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 p-10 overflow-auto">
          <div className="max-w-7xl mx-auto flex gap-10">
            
            {/* Center Content Section */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === 'registry' && <Registry />}
                  {activeTab === 'notebook' && <Notebook />}
                  {activeTab === 'analytics' && <Analytics />}
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Right Side Sidebar (Fixed Widgets) */}
            <div className="w-96 hidden xl:block space-y-10">
               <div className="journal-paper p-8 rounded-3xl group">
                  <h4 className="journal-title text-sm mb-6 underline underline-offset-8 decoration-emerald/20 decoration-2 italic">{t('sidebar.simulation')}</h4>
                  <PetriSim />
                  <div className="mt-4 p-4 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-between text-[10px] font-mono font-bold tracking-widest text-graphite-400">
                     <span>H-NODE: ACTIVE</span>
                     <span className="text-emerald animate-pulse">{t('sidebar.streaming')}</span>
                  </div>
               </div>
               
               <div className="journal-paper p-8 rounded-3xl">
                  <h4 className="journal-title text-sm mb-6 font-bold underline underline-offset-8 decoration-emerald/20 decoration-2 italic">{t('sidebar.stats_title')}</h4>
                  <div className="space-y-6">
                     <div className="flex justify-between items-end border-b border-gray-50 pb-2">
                        <span className="text-[10px] font-bold text-graphite-400 uppercase tracking-widest">{t('sidebar.global_samples')}</span>
                        <span className="text-3xl font-serif text-emerald">1.2k+</span>
                     </div>
                     <div className="flex justify-between items-end border-b border-gray-50 pb-2">
                        <span className="text-[10px] font-bold text-graphite-400 uppercase tracking-widest">{t('sidebar.active_papers')}</span>
                        <span className="text-3xl font-serif text-emerald">482</span>
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
