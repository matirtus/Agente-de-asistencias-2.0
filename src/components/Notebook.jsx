import React, { useState, useEffect } from 'react';
import { Book, Save, Download, Link, FileText, X, Plus, ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { exportToPDF } from '../utils/export';

const NotebookEntry = ({ entry }) => {
  const { t } = useTranslation();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      exportToPDF(entry);
      setIsExporting(false);
    }, 800);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="journal-paper p-10 rounded-3xl mb-12 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
        <Book size={120} className="text-emerald" />
      </div>
      
      <div className="flex justify-between items-start mb-10 pb-8 border-b border-gray-100">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 bg-emerald flex items-center justify-center text-gfp font-mono font-bold rounded-lg shadow-inner">
            {entry.id.slice(-2)}
          </div>
          <div>
            <h3 className="journal-title text-3xl font-bold">{entry.title}</h3>
            <p className="text-[10px] text-graphite-400 font-mono uppercase tracking-[0.3em] font-bold mt-1">{t('notebook.log_id')}: {entry.id}</p>
          </div>
        </div>
        <div className="text-right">
           <p className="text-xs font-bold text-graphite">{entry.date}</p>
           <p className="text-[10px] text-emerald font-bold tracking-widest uppercase mt-1">{t('notebook.verified')}</p>
        </div>
      </div>

      <div className="prose prose-sm max-w-none text-graphite-700 leading-relaxed font-sans text-lg first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:text-emerald first-letter:mt-1 whitespace-pre-wrap">
        {entry.content}
      </div>

      {entry.image && (
        <div className="mt-10 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-gray-100 bg-gray-50">
          <img src={entry.image} alt="Research Evidence" className="w-full object-contain max-h-[500px]" />
          <div className="bg-gray-50 p-4 text-[10px] text-graphite-400 font-mono italic uppercase tracking-widest">
             {t('notebook.fig_caption')}
          </div>
        </div>
      )}

      <div className="mt-12 pt-8 border-t border-gray-50 flex justify-between items-center text-[10px] font-mono font-bold text-graphite-400 tracking-widest">
         <div className="flex gap-6 uppercase">
            <span className="flex items-center gap-1"><Link size={12} className="text-emerald" /> {t('notebook.citations')}: {entry.citations || 0}</span>
            <span className="flex items-center gap-1"><FileText size={12} className="text-emerald" /> {t('notebook.type')}: {entry.type}</span>
         </div>
         <button 
           onClick={handleExport}
           disabled={isExporting}
           className="flex items-center gap-2 hover:text-emerald transition-colors disabled:opacity-50"
         >
            <Download size={14} className={isExporting ? 'animate-bounce' : ''} /> 
            {isExporting ? t('notebook.exporting') : t('notebook.export')}
         </button>
      </div>
    </motion.div>
  );
};

const LogForm = ({ onSave, onCancel }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ title: '', type: 'empirical', content: '', image: '' });

  const handlePaste = (e) => {
    const items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.indexOf('image') !== -1) {
        const blob = item.getAsFile();
        const reader = new FileReader();
        reader.onload = (event) => setFormData(prev => ({ ...prev, image: event.target.result }));
        reader.readAsDataURL(blob);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-10 rounded-[2.5rem] shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
    >
      <button onClick={onCancel} className="absolute top-6 right-6 text-gray-400 hover:text-emerald"><X /></button>
      <h3 className="journal-title text-4xl mb-8">{t('notebook.new_log')}</h3>
      
      <div className="space-y-8">
        <div>
          <label className="text-[10px] font-mono font-bold text-emerald uppercase tracking-widest block mb-2">{t('notebook.form.title')}</label>
          <input 
            autoFocus
            className="w-full bg-journal p-4 rounded-xl border-l-4 border-emerald focus:ring-2 ring-emerald/20 transition-all outline-none font-serif text-xl"
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-[10px] font-mono font-bold text-emerald uppercase tracking-widest block mb-2">{t('notebook.form.type')}</label>
            <select 
               className="w-full bg-journal p-4 rounded-xl border-l-4 border-emerald outline-none"
               value={formData.type}
               onChange={e => setFormData({...formData, type: e.target.value})}
            >
              <option value="empirical">{t('notebook.types.empirical')}</option>
              <option value="theoretical">{t('notebook.types.theoretical')}</option>
              <option value="protocol">{t('notebook.types.protocol')}</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-[10px] font-mono font-bold text-emerald uppercase tracking-widest block mb-2">{t('notebook.form.content')}</label>
          <textarea 
            onPaste={handlePaste}
            rows={8}
            className="w-full bg-journal p-6 rounded-2xl border-l-4 border-emerald focus:ring-2 ring-emerald/20 transition-all outline-none font-sans leading-relaxed"
            value={formData.content}
            onChange={e => setFormData({...formData, content: e.target.value})}
          />
          <p className="text-[10px] text-graphite-400 font-mono mt-2 italic">{t('notebook.form.image_hint')}</p>
        </div>

        {formData.image && (
          <div className="relative group">
            <img src={formData.image} className="w-full rounded-2xl border border-gray-100 max-h-48 object-cover" />
            <button onClick={() => setFormData({...formData, image: ''})} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><X size={12} /></button>
          </div>
        )}

        <div className="flex gap-4 pt-4">
          <button 
            onClick={() => onSave(formData)}
            className="btn-primary flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 group"
          >
            <Save size={18} className="text-gfp group-hover:scale-110 transition-transform" />
            {t('notebook.form.save')}
          </button>
          <button onClick={onCancel} className="px-8 py-4 text-graphite-400 hover:text-red-500 font-bold uppercase text-xs tracking-widest">
            {t('notebook.form.cancel')}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Notebook = () => {
  const { t } = useTranslation();
  const [entries, setEntries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('biotech_logs');
    if (saved) {
      setEntries(JSON.parse(saved));
    } else {
      // Default example
      setEntries([
        {
          id: "ELN-BTCH-8429",
          title: t('notebook.example_title'),
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase(),
          type: t('notebook.types.empirical'),
          citations: 12,
          content: t('notebook.example_content'),
          image: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?auto=format&fit=crop&q=80&w=1200"
        }
      ]);
    }
  }, []);

  const handleSave = (data) => {
    const newEntry = {
      ...data,
      id: `ELN-BTCH-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase(),
      citations: 0,
    };
    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem('biotech_logs', JSON.stringify(updated));
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="mb-20 text-center relative">
         <div className="absolute inset-0 flex items-center py-20 pointer-events-none">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent"></div>
         </div>
         <h2 className="journal-title text-6xl mb-4 relative z-10 bg-journal inline-block px-10 italic">{t('notebook.title')}</h2>
         <p className="text-graphite-400 font-sans tracking-widest uppercase text-xs font-bold relative z-10">{t('notebook.subtitle')}</p>
      </div>

      <div className="space-y-4">
        {entries.map(entry => (
          <NotebookEntry key={entry.id} entry={entry} />
        ))}
      </div>
      
      <div className="mt-12 text-center pb-20">
         <button 
           onClick={() => setIsModalOpen(true)}
           className="btn-primary rounded-full px-12 py-6 font-bold shadow-2xl flex items-center gap-3 mx-auto group hover:scale-105 transition-transform"
         >
            <Plus size={24} className="text-gfp group-hover:rotate-90 transition-transform duration-500" />
            <span className="text-lg">{t('notebook.new_log')}</span>
         </button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-emerald/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0" onClick={() => setIsModalOpen(false)} 
            />
            <LogForm onSave={handleSave} onCancel={() => setIsModalOpen(false)} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notebook;
