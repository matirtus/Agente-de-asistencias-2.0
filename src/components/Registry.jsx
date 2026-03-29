import React, { useState, useEffect } from 'react';
import { UserPlus, Globe, Mail, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Registry = () => {
  const { t } = useTranslation();
  const [researchers, setResearchers] = useState([]);
  const [formData, setFormData] = useState({
    nombres: '', apellidos: '', correo: '', telefono: '', 
    ciudad: '', ocupacion: '', area: '', institucion: '', observaciones: ''
  });
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('biotech_community');
    if (saved) setResearchers(JSON.parse(saved));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newResearcher = {
      ...formData,
      id: Date.now(),
      fecha: new Date().toLocaleString()
    };
    const updated = [newResearcher, ...researchers];
    setResearchers(updated);
    localStorage.setItem('biotech_community', JSON.stringify(updated));
    setFormData({
      nombres: '', apellidos: '', correo: '', telefono: '', 
      ciudad: '', ocupacion: '', area: '', institucion: '', observaciones: ''
    });
    setIsFormVisible(false);
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end border-b border-gray-100 pb-8">
        <div>
          <h2 className="journal-title text-4xl mb-2">{t('registry.title')}</h2>
          <p className="text-graphite-400 font-sans max-w-lg">{t('registry.subtitle')}</p>
        </div>
        <button 
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="btn-gfp flex items-center gap-2 rounded-lg"
        >
          <UserPlus size={18} />
          <span>{t('registry.add_btn')}</span>
        </button>
      </div>

      <AnimatePresence>
        {isFormVisible && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="journal-paper p-8 rounded-2xl mb-10 border-emerald/10">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  className="bg-journal p-3 border-b border-gray-200 outline-none focus:border-emerald" 
                  placeholder={t('registry.form_fn')}
                  required
                  value={formData.nombres}
                  onChange={(e) => setFormData({...formData, nombres: e.target.value})}
                />
                <input 
                  className="bg-journal p-3 border-b border-gray-200 outline-none focus:border-emerald" 
                  placeholder={t('registry.form_ln')}
                  required
                  value={formData.apellidos}
                  onChange={(e) => setFormData({...formData, apellidos: e.target.value})}
                />
                <input 
                  className="bg-journal p-3 border-b border-gray-200 outline-none focus:border-emerald" 
                  placeholder={t('registry.form_em')}
                  type="email"
                  required
                  value={formData.correo}
                  onChange={(e) => setFormData({...formData, correo: e.target.value})}
                />
                <select 
                  className="bg-journal p-3 border-b border-gray-200 outline-none focus:border-emerald"
                  value={formData.area}
                  onChange={(e) => setFormData({...formData, area: e.target.value})}
                >
                  <option value="">{t('registry.form_sp')}</option>
                  <option value="medical">{t('registry.specialties.medical')}</option>
                  <option value="agri">{t('registry.specialties.agri')}</option>
                  <option value="industrial">{t('registry.specialties.industrial')}</option>
                  <option value="marine">{t('registry.specialties.marine')}</option>
                </select>
                <div className="md:col-span-2">
                  <button type="submit" className="btn-primary w-full rounded-lg font-bold">{t('registry.form_submit')}</button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {researchers.map((res) => (
          <motion.div 
            layout
            key={res.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="journal-paper p-6 rounded-2xl hover:border-gfp/30 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-emerald/5 rounded-full flex items-center justify-center text-emerald font-bold text-xl border-2 border-emerald/10">
                  {res.nombres[0]}{res.apellidos[0]}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold leading-tight group-hover:text-emerald transition-colors">{res.nombres} {res.apellidos}</h3>
                  <p className="text-xs text-graphite-400 font-mono uppercase tracking-widest mt-0.5">{res.area ? t(`registry.specialties.${res.area}`) : t('header.role')}</p>
                </div>
              </div>
              <div className="text-[10px] text-graphite-400 font-mono">{res.fecha}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-50 text-sm">
              <div className="flex items-center gap-2 text-graphite-400">
                <Mail size={14} className="text-emerald/40" />
                <span className="truncate">{res.correo}</span>
              </div>
              <div className="flex items-center gap-2 text-graphite-400">
                <MapPin size={14} className="text-emerald/40" />
                <span>{res.ciudad || 'Global Node'}</span>
              </div>
            </div>
          </motion.div>
        ))}
        {researchers.length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl">
             <Globe className="mx-auto text-gray-200 mb-4" size={48} />
             <p className="text-graphite-400 italic">{t('registry.empty')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Registry;
