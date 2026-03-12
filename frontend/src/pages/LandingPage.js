import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaLeaf, FaCamera, FaMapMarkerAlt, FaBell, FaStar, FaQuoteLeft, 
  FaArrowRight, FaTractor, FaShieldAlt, FaHeadset, FaChartLine, 
  FaUsers, FaSeedling, FaCloudSun, FaHandHoldingWater, FaBug, 
  FaMicroscope, FaRobot, FaCheckCircle, FaPlay, FaBars, FaTimes 
} from 'react-icons/fa';
import { FiMenu, FiX, FiChevronDown, FiShield, FiZap, FiTarget, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { ThemeToggle } from '../components/ThemeToggle';
import { Card, StatCard } from '../components/Card';

export const LandingPage = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'features', 'how-it-works', 'testimonials', 'pricing'];
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
    { id: 'home', label: 'Home', icon: <FaLeaf /> },
    { id: 'features', label: 'Features', icon: <FaStar /> },
    { id: 'how-it-works', label: 'How It Works', icon: <FaRobot /> },
    { id: 'testimonials', label: 'Testimonials', icon: <FaQuoteLeft /> },
    { id: 'pricing', label: 'Pricing', icon: <FaChartLine /> },
  ];

  const features = [
    {
      icon: <FaCamera />,
      title: 'AI Disease Detection',
      description: 'Instantly identify crop diseases with 95%+ accuracy using advanced computer vision',
      gradient: 'from-green-400 to-emerald-600'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Smart Location Tracking',
      description: 'GPS-powered farm mapping and location-specific treatment recommendations',
      gradient: 'from-blue-400 to-indigo-600'
    },
    {
      icon: <FaBell />,
      title: 'Real-time Alerts',
      description: 'Get instant notifications about disease outbreaks and weather conditions',
      gradient: 'from-yellow-400 to-orange-600'
    },
    {
      icon: <FaTractor />,
      title: 'Farm Management',
      description: 'Comprehensive dashboard to manage multiple crops and track growth stages',
      gradient: 'from-purple-400 to-pink-600'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Data Security',
      description: 'Enterprise-grade encryption and secure data storage for your farm information',
      gradient: 'from-red-400 to-pink-600'
    },
    {
      icon: <FaHeadset />,
      title: 'Expert Support',
      description: 'Connect with agricultural experts and get professional advice 24/7',
      gradient: 'from-indigo-400 to-purple-600'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Wheat Farmer, Maharashtra',
      text: 'CropHealth AI helped me identify wheat rust early and save my entire crop. The AI recommendations are spot-on!',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'Rice Farmer, Punjab',
      text: 'The real-time alerts and disease detection have increased my yield by 30%. Best investment for my farm!',
      rating: 5
    },
    {
      name: 'Mohammed Ali',
      role: 'Corn Farmer, Gujarat',
      text: 'Easy to use and incredibly accurate. The expert support team helped me with treatment plans.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={`bg-particle-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
        
        {/* Large Animated Orbs */}
        <motion.div 
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-teal-600/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-indigo-600/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, repeatType: 'reverse' }}
        />
      </div>

      {/* Navigation Bar */}
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'glass border-b border-white/20 backdrop-blur-xl' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center">
                <FaLeaf className="text-white text-xl" />
              </div>
              <span className="text-xl font-bold text-white">CropHealth AI</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-green-400'
                      : 'text-white/80 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <ThemeToggle />
              
              {/* Auth Buttons */}
              <div className="hidden md:flex items-center gap-3">
                <motion.button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 text-white/80 hover:text-white font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign In
                </motion.button>
                <motion.button
                  onClick={() => navigate('/register')}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {mobileMenuOpen ? <FaTimes /> : <FiMenu />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-white/20"
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-3 w-full text-left text-white/80 hover:text-white p-2 rounded-lg ${
                      activeSection === item.id ? 'bg-white/10 text-green-400' : ''
                    }`}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </motion.button>
                ))}
                
                <div className="pt-4 border-t border-white/20 space-y-3">
                  <motion.button
                    onClick={() => navigate('/login')}
                    className="w-full px-4 py-2 text-white/80 hover:text-white font-medium transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign In
                  </motion.button>
                  <motion.button
                    onClick={() => navigate('/register')}
                    className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <FiZap className="text-green-400" />
              <span className="text-green-400 font-semibold">AI-Powered Agriculture</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Protect Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Crops</span> with
              <br />Smart Technology
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
              Advanced AI-powered disease detection and crop management system for modern farmers
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.button
                onClick={() => navigate('/register')}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPlay className="inline mr-2" />
                Get Started Free
              </motion.button>
              
              <motion.button
                onClick={() => scrollToSection('how-it-works')}
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaArrowRight className="inline mr-2" />
                How It Works
              </motion.button>
            </div>
          </motion.div>
          
          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <StatCard
              icon={<FiTarget />}
              title="Detection Accuracy"
              value="95%+"
              change="+3%"
              trend="up"
              color="green"
            />
            <StatCard
              icon={<FiUsers />}
              title="Farmers Helped"
              value="10K+"
              change="+2K"
              trend="up"
              color="blue"
            />
            <StatCard
              icon={<FiTrendingUp />}
              title="Yield Increase"
              value="30%"
              change="+5%"
              trend="up"
              color="yellow"
            />
            <StatCard
              icon={<FiShield />}
              title="Crops Protected"
              value="50K+"
              change="+10K"
              trend="up"
              color="purple"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Powerful Features for Modern Farming
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Everything you need to manage your crops efficiently and increase productivity
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card glass className="p-8 text-center h-full group">
                  <motion.div 
                    className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}
                    whileHover={{ rotate: 5 }}
                  >
                    <div className="text-white text-2xl">{feature.icon}</div>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Get started in 3 simple steps and transform your farming experience
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                icon: <FaCamera />,
                title: 'Capture & Upload',
                description: 'Take a photo of your crop or upload an image from your gallery',
                color: 'green'
              },
              {
                step: 2,
                icon: <FaRobot />,
                title: 'AI Analysis',
                description: 'Our advanced AI analyzes the image and detects diseases with high accuracy',
                color: 'blue'
              },
              {
                step: 3,
                icon: <FaCheckCircle />,
                title: 'Get Solutions',
                description: 'Receive instant treatment recommendations and connect with experts',
                color: 'purple'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card glass className="p-8 text-center">
                  <motion.div 
                    className={`w-20 h-20 bg-gradient-to-br from-${step.color}-400 to-${step.color}-600 rounded-full flex items-center justify-center mx-auto mb-6`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <div className="text-white text-3xl">{step.icon}</div>
                  </motion.div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-white/70 leading-relaxed">{step.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Trusted by Farmers Worldwide
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              See what our users have to say about CropHealth AI
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card glass className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-xl" />
                    ))}
                  </div>
                  <FaQuoteLeft className="text-green-400 text-2xl mb-4" />
                  <p className="text-white/80 mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-white/60 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Choose the plan that works best for your farming needs
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter',
                price: 'Free',
                description: 'Perfect for small farms getting started',
                features: ['5 Disease Scans/month', 'Basic Crop Support', 'Email Support', 'Mobile App'],
                highlighted: false
              },
              {
                name: 'Professional',
                price: '$19',
                period: '/month',
                description: 'Ideal for serious farmers',
                features: ['Unlimited Scans', 'All Crops Supported', 'Priority Support', 'Advanced Analytics', 'Expert Consultation'],
                highlighted: true
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                description: 'For large agricultural businesses',
                features: ['Custom Solutions', 'API Access', 'Dedicated Support', 'Training Programs', 'White Label Options'],
                highlighted: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`p-8 text-center ${plan.highlighted ? 'ring-2 ring-green-400 scale-105' : ''}`}>
                  {plan.highlighted && (
                    <div className="inline-block px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-full mb-4">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    {plan.period && <span className="text-white/60">{plan.period}</span>}
                  </div>
                  <p className="text-white/70 mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-white/80">
                        <FaCheckCircle className="text-green-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    onClick={() => navigate('/register')}
                    className={`w-full py-3 rounded-lg font-semibold transition-all ${
                      plan.highlighted
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                        : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {plan.price === 'Free' ? 'Get Started' : 'Choose Plan'}
                  </motion.button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card glass className="p-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Farm?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Join thousands of farmers who are already using AI to protect and improve their crops
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={() => navigate('/register')}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-lg hover:from-green-600 hover:to-emerald-700 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Free Trial
                </motion.button>
                <motion.button
                  onClick={() => navigate('/login')}
                  className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign In
                </motion.button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass border-t border-white/20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FaLeaf className="text-2xl text-green-400" />
                <span className="text-xl font-bold text-white">CropHealth AI</span>
              </div>
              <p className="text-white/60">Smart farming for the modern world</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('features')} className="text-white/60 hover:text-white transition">Features</button></li>
                <li><button onClick={() => scrollToSection('pricing')} className="text-white/60 hover:text-white transition">Pricing</button></li>
                <li><button className="text-white/60 hover:text-white transition">Security</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><button className="text-white/60 hover:text-white transition">About</button></li>
                <li><button className="text-white/60 hover:text-white transition">Contact</button></li>
                <li><button className="text-white/60 hover:text-white transition">Blog</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><button className="text-white/60 hover:text-white transition">Privacy</button></li>
                <li><button className="text-white/60 hover:text-white transition">Terms</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/60">
            <p>&copy; 2026 CropHealth AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
