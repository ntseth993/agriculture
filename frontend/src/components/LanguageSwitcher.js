import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import { FiGlobe, FiChevronDown } from 'react-icons/fi';

export const LanguageSwitcher = ({ compact = false }) => {
  const { language, changeLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-3 py-2 bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 rounded-xl text-sm transition-all"
      >
        <FiGlobe className="text-green-400" size={14} />
        {!compact && <span className="hidden sm:inline text-xs">{current.flag} {current.name}</span>}
        {compact && <span className="text-xs">{current.flag}</span>}
        <FiChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 bg-gray-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
          >
            <div className="p-1">
              {SUPPORTED_LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => { changeLanguage(lang.code); setOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${language === lang.code ? 'bg-green-500/20 text-green-300' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span>{lang.name}</span>
                  {language === lang.code && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
