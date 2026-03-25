import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertsPanel } from '../components/AlertsPanel';
import { FaLeaf, FaCamera, FaMapMarkerAlt, FaBell, FaChartLine } from 'react-icons/fa';
import { FiLogOut, FiMenu, FiX, FiUser, FiChevronRight } from 'react-icons/fi';

export const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const quickActions = [
    {
      icon: <FaCamera />,
      title: 'Disease Detection',
      description: 'Upload crop images to detect diseases using AI',
      href: '/detect',
      gradient: 'from-green-500 to-emerald-600',
      shadow: 'shadow-green-500/30',
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Find Services',
      description: 'Locate nearby agro-vets and pharmacies',
      href: '/locations',
      gradient: 'from-blue-500 to-indigo-600',
      shadow: 'shadow-blue-500/30',
    },
    {
      icon: <FaBell />,
      title: 'My Alerts',
      description: 'Receive weather and pest outbreak alerts',
      href: '/alerts',
      gradient: 'from-yellow-500 to-orange-500',
      shadow: 'shadow-yellow-500/30',
    },
  ];

  const tips = [
    'Take clear photos of affected crop areas for better disease detection',
    'Enable location services to find nearby agro-vets and pharmacies',
    'Subscribe to weather alerts to get timely notifications',
    'Review recommended treatments and check farmer feedback',
    'Keep your crop and location information updated regularly',
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Top Nav */}
      <nav className="bg-gray-900/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex justify-between items-center">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center">
              <FaLeaf className="text-white text-sm" />
            </div>
            <span className="text-white font-bold hidden sm:block">CropHealth <span className="text-green-400">AI</span></span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl">
              <div className="w-7 h-7 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">{user?.name?.charAt(0) || 'U'}</span>
              </div>
              <div>
                <p className="text-white text-xs font-semibold leading-none">{user?.name}</p>
                <p className="text-white/40 text-xs capitalize">{user?.role}</p>
              </div>
            </div>
            <motion.button
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-2 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 rounded-xl text-xs font-medium transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FiLogOut className="text-sm" />
              <span className="hidden sm:inline">Sign Out</span>
            </motion.button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <motion.div
          className="relative overflow-hidden rounded-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <img
            src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&q=70"
            alt="Farm"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 to-gray-950/50" />
          <div className="relative z-10 p-8">
            <div className="flex items-center gap-2 text-green-400 text-sm font-medium mb-2">
              <FaLeaf className="text-xs" />
              <span>Dashboard</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-1">Welcome back, {user?.name?.split(' ')[0] || 'Farmer'}!</h1>
            <p className="text-white/60 text-sm max-w-md">Your farm health dashboard is ready. Use the tools below to monitor and protect your crops.</p>
          </div>
        </motion.div>

        {/* Quick Action Cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {quickActions.map((action, index) => (
            <motion.a
              key={index}
              href={action.href}
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -3 }}
            >
              <div className={`bg-gradient-to-br ${action.gradient} rounded-2xl p-6 shadow-xl ${action.shadow} group cursor-pointer`}>
                <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
                  <div className="text-white text-xl">{action.icon}</div>
                </div>
                <h3 className="text-white font-bold text-lg mb-1">{action.title}</h3>
                <p className="text-white/75 text-sm mb-4">{action.description}</p>
                <div className="flex items-center gap-1 text-white text-sm font-semibold">
                  Open <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {[
            { label: 'Scans Today', value: '0', icon: <FaCamera />, color: 'green' },
            { label: 'Active Alerts', value: '0', icon: <FaBell />, color: 'yellow' },
            { label: 'Nearby Vets', value: '—', icon: <FaMapMarkerAlt />, color: 'blue' },
            { label: 'Crops Tracked', value: '0', icon: <FaChartLine />, color: 'purple' },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-white/20 transition-all">
              <div className={`text-${stat.color}-400 text-lg mb-2`}>{stat.icon}</div>
              <div className="text-white font-bold text-2xl mb-0.5">{stat.value}</div>
              <div className="text-white/45 text-xs">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Alerts Panel */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <AlertsPanel />
        </motion.div>

        {/* Quick Tips */}
        <motion.div
          className="bg-white/5 border border-white/10 rounded-2xl p-7"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
            <FaLeaf className="text-green-400 text-base" />
            Quick Tips
          </h2>
          <ul className="space-y-3">
            {tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-white/65 text-sm">
                <div className="w-5 h-5 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                </div>
                {tip}
              </li>
            ))}
          </ul>
        </motion.div>
      </main>
    </div>
  );
};
