import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaLeaf, FaCamera, FaMapMarkerAlt, FaBell, FaStar, FaQuoteLeft,
  FaArrowRight, FaTractor, FaShieldAlt, FaHeadset, FaChartLine,
  FaSeedling, FaBug, FaRobot, FaCheckCircle, FaPlay, FaTimes
} from 'react-icons/fa';
import { FiMenu, FiChevronRight, FiShield, FiZap, FiTarget, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { ThemeToggle } from '../components/ThemeToggle';

const AGRI_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1400&q=80',
    caption: 'Wheat fields at golden hour',
  },
  {
    url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1400&q=80',
    caption: 'Healthy rice paddy',
  },
  {
    url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1400&q=80',
    caption: 'Lush green farmland',
  },
  {
    url: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1400&q=80',
    caption: 'Modern precision farming',
  },
];

const GALLERY_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=800&q=80',
    label: 'Corn Crops',
  },
  {
    url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80',
    label: 'Drone Monitoring',
  },
  {
    url: 'https://images.unsplash.com/photo-1505471768190-275e2ad7b3f9?w=800&q=80',
    label: 'Smart Tractors',
  },
  {
    url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
    label: 'Soil Health',
  },
  {
    url: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&q=80',
    label: 'Greenhouse Tech',
  },
  {
    url: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80',
    label: 'Irrigation Systems',
  },
];

export const LandingPage = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroImageIndex((i) => (i + 1) % AGRI_IMAGES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ['home', 'features', 'gallery', 'how-it-works', 'testimonials', 'pricing'];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'pricing', label: 'Pricing' },
  ];

  const features = [
    { icon: <FaCamera />, title: 'AI Disease Detection', description: 'Instantly identify crop diseases with 95%+ accuracy using advanced computer vision', gradient: 'from-green-400 to-emerald-600' },
    { icon: <FaMapMarkerAlt />, title: 'Smart Location Tracking', description: 'GPS-powered farm mapping and location-specific treatment recommendations', gradient: 'from-blue-400 to-indigo-600' },
    { icon: <FaBell />, title: 'Real-time Alerts', description: 'Get instant notifications about disease outbreaks and weather conditions', gradient: 'from-yellow-400 to-orange-500' },
    { icon: <FaTractor />, title: 'Farm Management', description: 'Comprehensive dashboard to manage multiple crops and track growth stages', gradient: 'from-purple-400 to-pink-600' },
    { icon: <FaShieldAlt />, title: 'Data Security', description: 'Enterprise-grade encryption and secure data storage for your farm information', gradient: 'from-red-400 to-pink-600' },
    { icon: <FaHeadset />, title: 'Expert Support', description: 'Connect with agricultural experts and get professional advice 24/7', gradient: 'from-indigo-400 to-purple-600' },
  ];

  const testimonials = [
    { name: 'Rajesh Kumar', role: 'Wheat Farmer, Maharashtra', text: 'CropHealth AI helped me identify wheat rust early and save my entire crop. The AI recommendations are spot-on!', rating: 5 },
    { name: 'Priya Sharma', role: 'Rice Farmer, Punjab', text: 'The real-time alerts and disease detection have increased my yield by 30%. Best investment for my farm!', rating: 5 },
    { name: 'Mohammed Ali', role: 'Corn Farmer, Gujarat', text: 'Easy to use and incredibly accurate. The expert support team helped me with treatment plans.', rating: 5 },
  ];

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">

      {/* ── Navigation ── */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-950/90 backdrop-blur-xl border-b border-white/10 shadow-xl' : 'bg-transparent'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div className="flex items-center gap-2 cursor-pointer" whileHover={{ scale: 1.05 }} onClick={() => scrollToSection('home')}>
              <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
                <FaLeaf className="text-white text-lg" />
              </div>
              <span className="text-lg font-bold text-white">CropHealth <span className="text-green-400">AI</span></span>
            </motion.div>

            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors ${activeSection === item.id ? 'text-green-400' : 'text-white/60 hover:text-white'}`}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <div className="hidden md:flex items-center gap-2">
                <motion.button onClick={() => navigate('/login')} className="px-4 py-2 text-white/70 hover:text-white text-sm font-medium transition-colors" whileHover={{ scale: 1.05 }}>
                  Sign In
                </motion.button>
                <motion.button onClick={() => navigate('/register')} className="px-4 py-2 bg-green-500 hover:bg-green-400 text-white rounded-lg text-sm font-semibold transition-all shadow-lg shadow-green-500/30" whileHover={{ scale: 1.05 }}>
                  Get Started
                </motion.button>
              </div>
              <motion.button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg" whileTap={{ scale: 0.95 }}>
                {mobileMenuOpen ? <FaTimes /> : <FiMenu />}
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-gray-950/95 backdrop-blur-xl border-t border-white/10">
              <div className="px-4 py-6 space-y-3">
                {navItems.map((item) => (
                  <motion.button key={item.id} onClick={() => scrollToSection(item.id)} className={`flex items-center gap-3 w-full text-left p-3 rounded-xl ${activeSection === item.id ? 'bg-green-500/10 text-green-400' : 'text-white/70 hover:bg-white/5'}`} whileTap={{ scale: 0.98 }}>
                    {item.label}
                  </motion.button>
                ))}
                <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
                  <motion.button onClick={() => navigate('/login')} className="px-4 py-2.5 border border-white/20 text-white rounded-xl text-sm font-medium hover:bg-white/5" whileTap={{ scale: 0.98 }}>Sign In</motion.button>
                  <motion.button onClick={() => navigate('/register')} className="px-4 py-2.5 bg-green-500 text-white rounded-xl text-sm font-semibold" whileTap={{ scale: 0.98 }}>Get Started</motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── Hero Section with Background Slideshow ── */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image slideshow */}
        <AnimatePresence mode="wait">
          <motion.div
            key={heroImageIndex}
            className="absolute inset-0 z-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            <img
              src={AGRI_IMAGES[heroImageIndex].url}
              alt={AGRI_IMAGES[heroImageIndex].caption}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950/70 via-gray-950/60 to-gray-950" />
          </motion.div>
        </AnimatePresence>

        {/* Slideshow dots */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {AGRI_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroImageIndex(i)}
              className={`transition-all duration-300 rounded-full ${i === heroImageIndex ? 'w-6 h-2 bg-green-400' : 'w-2 h-2 bg-white/40 hover:bg-white/60'}`}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center pt-20">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/10 backdrop-blur-md rounded-full border border-green-500/30 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <FiZap className="text-green-400 text-sm" />
              <span className="text-green-400 font-semibold text-sm">AI-Powered Agriculture Platform</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              Protect Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Crops</span>
              <br />with Smart Technology
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              Advanced AI disease detection and crop management system trusted by 10,000+ farmers worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <motion.button
                onClick={() => navigate('/register')}
                className="group px-8 py-4 bg-green-500 hover:bg-green-400 text-white rounded-2xl font-semibold text-base transition-all shadow-2xl shadow-green-500/40 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPlay className="text-sm" />
                Start for Free
                <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('how-it-works')}
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-2xl font-semibold text-base border border-white/20 hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                How It Works
              </motion.button>
            </div>

            {/* Stats row */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {[
                { icon: <FiTarget />, label: 'Detection Accuracy', value: '95%+' },
                { icon: <FiUsers />, label: 'Farmers Helped', value: '10K+' },
                { icon: <FiTrendingUp />, label: 'Yield Increase', value: '30%' },
                { icon: <FiShield />, label: 'Crops Protected', value: '50K+' },
              ].map((stat, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
                  <div className="text-green-400 text-xl mb-1">{stat.icon}</div>
                  <div className="text-white font-bold text-xl">{stat.value}</div>
                  <div className="text-white/50 text-xs mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section id="features" className="py-24 px-4 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/10 rounded-full border border-green-500/20 mb-4">
              <FaSeedling className="text-green-400 text-sm" />
              <span className="text-green-400 text-sm font-semibold">Everything You Need</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Powerful Features for Modern Farming</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">Everything you need to manage your crops efficiently and increase productivity</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="bg-white/5 border border-white/10 rounded-2xl p-7 h-full hover:bg-white/8 hover:border-white/20 transition-all group">
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                    <div className="text-white text-xl">{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/55 leading-relaxed text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery Section ── */}
      <section id="gallery" className="py-24 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-4">
              <FaLeaf className="text-emerald-400 text-sm" />
              <span className="text-emerald-400 text-sm font-semibold">Real Agriculture</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Farming, Reimagined</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">See how modern technology is transforming agriculture around the world</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_IMAGES.map((img, i) => (
              <motion.div
                key={i}
                className="relative overflow-hidden rounded-2xl aspect-video group cursor-pointer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.02 }}
              >
                <img src={img.url} alt={img.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-semibold text-sm bg-green-500/80 backdrop-blur-sm px-3 py-1 rounded-full">{img.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-24 px-4 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20 mb-4">
              <FaRobot className="text-blue-400 text-sm" />
              <span className="text-blue-400 text-sm font-semibold">Simple Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">Get started in 3 simple steps and transform your farming experience</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-px bg-gradient-to-r from-green-500/50 to-blue-500/50" />
            {[
              { step: '01', icon: <FaCamera />, title: 'Capture & Upload', description: 'Take a photo of your crop or upload an image from your gallery', color: 'green' },
              { step: '02', icon: <FaRobot />, title: 'AI Analysis', description: 'Our advanced AI analyzes the image and detects diseases with high accuracy', color: 'blue' },
              { step: '03', icon: <FaCheckCircle />, title: 'Get Solutions', description: 'Receive instant treatment recommendations and connect with experts', color: 'purple' },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="relative text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all">
                  <div className={`w-16 h-16 bg-${step.color}-500/20 border border-${step.color}-500/30 rounded-2xl flex items-center justify-center mx-auto mb-5`}>
                    <div className={`text-${step.color}-400 text-2xl`}>{step.icon}</div>
                  </div>
                  <div className={`text-5xl font-black text-${step.color}-500/20 mb-3`}>{step.step}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-white/55 leading-relaxed text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="py-24 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Trusted by Farmers Worldwide</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">See what our users have to say about CropHealth AI</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -4 }}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-white/20 transition-all h-full">
                  <div className="flex mb-4">
                    {[...Array(t.rating)].map((_, i) => <FaStar key={i} className="text-yellow-400 text-sm mr-0.5" />)}
                  </div>
                  <FaQuoteLeft className="text-green-400 text-xl mb-4" />
                  <p className="text-white/70 mb-6 italic text-sm leading-relaxed">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{t.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">{t.name}</div>
                      <div className="text-white/45 text-xs">{t.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24 px-4 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">Choose the plan that works best for your farming needs</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Starter', price: 'Free', description: 'Perfect for small farms', features: ['5 Disease Scans/month', 'Basic Crop Support', 'Email Support', 'Mobile App'], highlighted: false },
              { name: 'Professional', price: '$19', period: '/mo', description: 'Ideal for serious farmers', features: ['Unlimited Scans', 'All Crops Supported', 'Priority Support', 'Advanced Analytics', 'Expert Consultation'], highlighted: true },
              { name: 'Enterprise', price: 'Custom', description: 'For large operations', features: ['Custom Solutions', 'API Access', 'Dedicated Support', 'Training Programs', 'White Label Options'], highlighted: false },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className={`rounded-2xl p-7 h-full relative ${plan.highlighted ? 'bg-green-500 border-2 border-green-400 shadow-2xl shadow-green-500/30' : 'bg-white/5 border border-white/10 hover:border-white/20'} transition-all`}>
                  {plan.highlighted && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white text-green-600 text-xs font-bold px-4 py-1 rounded-full">MOST POPULAR</div>
                  )}
                  <h3 className={`text-xl font-bold mb-1 ${plan.highlighted ? 'text-white' : 'text-white'}`}>{plan.name}</h3>
                  <p className={`text-sm mb-5 ${plan.highlighted ? 'text-green-100' : 'text-white/50'}`}>{plan.description}</p>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className={`text-4xl font-black ${plan.highlighted ? 'text-white' : 'text-white'}`}>{plan.price}</span>
                    {plan.period && <span className={`text-sm ${plan.highlighted ? 'text-green-100' : 'text-white/50'}`}>{plan.period}</span>}
                  </div>
                  <ul className="space-y-2.5 mb-7">
                    {plan.features.map((f, i) => (
                      <li key={i} className={`flex items-center gap-2.5 text-sm ${plan.highlighted ? 'text-green-50' : 'text-white/65'}`}>
                        <FaCheckCircle className={plan.highlighted ? 'text-white text-xs flex-shrink-0' : 'text-green-400 text-xs flex-shrink-0'} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    onClick={() => navigate('/register')}
                    className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${plan.highlighted ? 'bg-white text-green-600 hover:bg-green-50' : 'border border-white/20 text-white hover:bg-white/10'}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-24 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-3xl p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&q=50')] bg-cover bg-center opacity-5" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Ready to Transform Your Farm?</h2>
                <p className="text-white/65 text-lg mb-8 max-w-xl mx-auto">Join 10,000+ farmers who are already using AI to protect their crops and increase yield.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button onClick={() => navigate('/register')} className="px-8 py-4 bg-green-500 hover:bg-green-400 text-white rounded-2xl font-semibold shadow-xl shadow-green-500/30 flex items-center gap-2 justify-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Start Free Today <FaArrowRight />
                  </motion.button>
                  <motion.button onClick={() => navigate('/login')} className="px-8 py-4 border border-white/20 text-white rounded-2xl font-semibold hover:bg-white/10 transition-all" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Sign In
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 px-4 bg-gray-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center">
              <FaLeaf className="text-white text-xs" />
            </div>
            <span className="text-white/80 font-semibold text-sm">CropHealth AI</span>
          </div>
          <p className="text-white/35 text-sm">© 2026 CropHealth AI. All rights reserved.</p>
          <div className="flex gap-5">
            {['Privacy', 'Terms', 'Contact'].map((item) => (
              <a key={item} href="#" className="text-white/40 hover:text-white/70 text-sm transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
};
