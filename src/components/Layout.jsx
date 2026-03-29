import React from 'react';
import { Microscope, Activity, BookOpen, Users, Settings, LogOut, ChevronRight, Languages } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLng = i18n.language.startsWith('en') ? 'es' : 'en';
    i18n.changeLanguage(nextLng);
  };

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="bg-emerald p-2 rounded-lg text-gfp">
          <Microscope size={24} />
        </div>
        <div>
          <h1 className="journal-title text-xl leading-none">BiotecHub</h1>
          <p className="text-[10px] text-graphite-400 font-mono tracking-widest mt-1 uppercase">{t('header.vol')}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-8">
        {/* Language Switcher */}
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-100 hover:border-emerald/30 transition-all text-[10px] font-mono font-bold tracking-widest group"
        >
          <Languages size={14} className="text-emerald group-hover:scale-110 transition-transform" />
          <span className={i18n.language.startsWith('es') ? 'text-emerald' : 'text-gray-300'}>ES</span>
          <span className="text-gray-200">/</span>
          <span className={i18n.language.startsWith('en') ? 'text-emerald' : 'text-gray-300'}>EN</span>
        </button>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-graphite uppercase">Dr. Alex Sterling</p>
            <p className="text-[10px] text-emerald font-bold uppercase tracking-tighter">{t('header.role')}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-light border-2 border-emerald-dark flex items-center justify-center text-white font-bold">
            AS
          </div>
        </div>
      </div>
    </header>
  );
};

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation();
  
  const menuItems = [
    { id: 'registry', icon: Users, label: t('nav.community') },
    { id: 'notebook', icon: BookOpen, label: t('nav.notebook') },
    { id: 'analytics', icon: Activity, label: t('nav.analytics') },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-[calc(100vh-80px)] sticky top-20">
      <nav className="flex-1 py-10 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                  activeTab === item.id 
                    ? 'bg-emerald text-white shadow-md' 
                    : 'text-graphite-400 hover:bg-gray-50 hover:text-graphite'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} />
                  <span className="font-sans font-semibold text-sm">{item.label}</span>
                </div>
                {activeTab === item.id && <motion.div layoutId="arrow"><ChevronRight size={16} /></motion.div>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-50 mt-auto">
        <button className="w-full flex items-center gap-3 p-3 text-graphite-400 hover:text-red-500 transition-colors text-sm font-semibold">
          <LogOut size={20} />
          <span>{t('nav.exit')}</span>
        </button>
      </div>
    </aside>
  );
};

export default Header;
export { Sidebar };
