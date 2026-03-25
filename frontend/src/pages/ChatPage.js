import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiSend, FiArrowLeft, FiRefreshCw, FiMessageSquare, FiAlertCircle } from 'react-icons/fi';
import { FaLeaf, FaRobot } from 'react-icons/fa';

const apiClient = axios.create({ baseURL: '' });
apiClient.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

const STARTER_QUESTIONS = [
  'My tomato leaves have brown spots with yellow borders. What disease is it?',
  'How do I prevent powdery mildew on my cucumber plants?',
  'What fertilizer should I use for maize at vegetative stage?',
  'My potato plants are wilting and turning black. Help!',
  'How often should I spray fungicide on my crops?',
  'What are signs of aphid infestation and how to treat it?',
];

const MessageBubble = ({ msg, isLast }) => {
  const isUser = msg.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center ${isUser ? 'bg-gradient-to-br from-green-400 to-emerald-600' : 'bg-gradient-to-br from-blue-500 to-indigo-600'}`}>
        {isUser ? <FaLeaf className="text-white text-sm" /> : <FaRobot className="text-white text-sm" />}
      </div>
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${isUser ? 'bg-green-500/20 border border-green-500/30 text-white text-right rounded-tr-sm' : 'bg-white/5 border border-white/10 text-white/90 rounded-tl-sm'}`}>
        {msg.content}
        {msg.source === 'knowledge-base' || msg.source === 'fallback' ? (
          <div className="mt-2 flex items-center gap-1 text-xs text-white/30">
            <FiAlertCircle size={10} />
            <span>Offline mode</span>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
};

export const ChatPage = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hello ${user?.name?.split(' ')[0] || 'Farmer'}! I'm your CropHealth AI assistant. I can help you with:\n\n• Crop disease diagnosis\n• Treatment recommendations\n• Pest management\n• Fertilization advice\n• Weather impact on crops\n\nHow can I help you today?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    const userText = (text || input).trim();
    if (!userText) return;
    setInput('');
    const updatedMessages = [...messages, { role: 'user', content: userText }];
    setMessages(updatedMessages);
    setLoading(true);
    try {
      const apiMessages = updatedMessages.filter(m => m.role === 'user' || m.role === 'assistant');
      const res = await apiClient.post('/api/chat', { messages: apiMessages, language });
      setMessages(prev => [...prev, { role: 'assistant', content: res.data.message, source: res.data.source }]);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Connection error. Please try again.';
      toast.error(errorMsg);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I\'m having trouble connecting right now. Please check that your device is online and try again. In the meantime, you can use the Disease Detection feature to scan your crops.',
        source: 'fallback',
      }]);
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([{
      role: 'assistant',
      content: `Hello ${user?.name?.split(' ')[0] || 'Farmer'}! I'm your CropHealth AI assistant. How can I help you today?`,
    }]);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <nav className="bg-gray-900/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3.5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
              <FiArrowLeft />
            </button>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <FaRobot className="text-white text-sm" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">{t('aiChat')}</p>
              <p className="text-white/40 text-xs">Crop Disease Expert</p>
            </div>
          </div>
          <button onClick={resetChat} className="p-2 bg-white/5 border border-white/10 text-white/60 rounded-xl hover:text-white transition-colors" title="New Chat">
            <FiRefreshCw size={14} />
          </button>
        </div>
      </nav>

      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4">
        {messages.length === 1 && (
          <div className="py-6">
            <p className="text-white/40 text-xs font-medium mb-3 text-center">Quick questions:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {STARTER_QUESTIONS.map((q, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => sendMessage(q)}
                  className="text-left text-xs p-3 bg-white/5 border border-white/10 text-white/70 rounded-xl hover:bg-white/10 hover:text-white transition-all"
                >
                  <FiMessageSquare className="inline mr-2 text-green-400" size={12} />
                  {q}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1 py-4 space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 220px)', overflowY: 'auto' }}>
          {messages.map((msg, i) => (
            <MessageBubble key={i} msg={msg} isLast={i === messages.length - 1} />
          ))}
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                <FaRobot className="text-white text-sm" />
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} className="w-2 h-2 bg-green-400 rounded-full" animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.2 }} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="py-4">
          <div className="flex gap-3 bg-gray-900/80 border border-white/10 rounded-2xl p-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder={t('typeMessage')}
              className="flex-1 bg-transparent text-white text-sm px-3 placeholder-white/30 focus:outline-none"
              disabled={loading}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiSend size={14} />
              <span className="hidden sm:inline">{t('sendMessage')}</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};
