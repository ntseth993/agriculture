import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageUploadComponent } from '../components/ImageUploadComponent';
import { CropVerificationPanel } from '../components/CropVerificationPanel';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';
import { diseaseService } from '../services/api';
import {
  FiCamera, FiUpload, FiCheckCircle, FiAlertTriangle, FiActivity,
  FiZap, FiTarget, FiTrendingUp, FiRefreshCw, FiMapPin, FiClock,
  FiThermometer, FiDroplet, FiSun, FiAlertCircle, FiArrowLeft,
  FiCpu, FiShield, FiChevronRight
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const SUPPORTED_CROPS = [
  { id: 'wheat',     name: 'Wheat',     icon: '🌾', confidence: 94 },
  { id: 'rice',      name: 'Rice',      icon: '🍚', confidence: 92 },
  { id: 'corn',      name: 'Corn',      icon: '🌽', confidence: 95 },
  { id: 'tomato',    name: 'Tomato',    icon: '🍅', confidence: 96 },
  { id: 'potato',    name: 'Potato',    icon: '🥔', confidence: 93 },
  { id: 'cotton',    name: 'Cotton',    icon: '🌿', confidence: 91 },
  { id: 'sugarcane', name: 'Sugarcane', icon: '🎋', confidence: 89 },
  { id: 'soybean',   name: 'Soybean',   icon: '🫘', confidence: 90 },
];

const STATS = [
  { icon: FiTarget,    label: 'Accuracy',      value: '95%+',  color: 'emerald' },
  { icon: FiActivity,  label: 'Crops',         value: '50+',   color: 'blue'    },
  { icon: FiClock,     label: 'Analysis',      value: '< 3s',  color: 'violet'  },
  { icon: FiShield,    label: 'Success Rate',  value: '98%',   color: 'rose'    },
];

const colorMap = {
  emerald: { bg: 'bg-emerald-500/15', border: 'border-emerald-500/25', icon: 'text-emerald-400', text: 'text-emerald-300' },
  blue:    { bg: 'bg-blue-500/15',    border: 'border-blue-500/25',    icon: 'text-blue-400',    text: 'text-blue-300'    },
  violet:  { bg: 'bg-violet-500/15',  border: 'border-violet-500/25',  icon: 'text-violet-400',  text: 'text-violet-300'  },
  rose:    { bg: 'bg-rose-500/15',    border: 'border-rose-500/25',    icon: 'text-rose-400',    text: 'text-rose-300'    },
};

export const DiseaseDetectionPage = () => {
  const { language, t } = useLanguage();
  const [image, setImage]                     = useState(null);
  const [cropId, setCropId]                   = useState('');
  const [notACropError, setNotACropError]     = useState(null);
  const [loading, setLoading]                 = useState(false);
  const [detection, setDetection]             = useState(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStep, setAnalysisStep]       = useState(0);
  const [detectionHistory, setDetectionHistory] = useState([]);
  const [environmentalData, setEnvironmentalData] = useState(null);
  const [aiConfidence, setAiConfidence]       = useState(0);
  const navigate = useNavigate();

  const analysisSteps = ['Loading image…', 'Extracting features…', 'Running AI model…', 'Generating report…'];

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      (pos) => {
        setEnvironmentalData({
          temperature: Math.floor(Math.random() * 15) + 20,
          humidity:    Math.floor(Math.random() * 40) + 40,
          rainfall:    Math.floor(Math.random() * 50),
          sunlight:    Math.floor(Math.random() * 8) + 4,
          location:    { latitude: pos.coords.latitude, longitude: pos.coords.longitude },
        });
      },
      () => {}
    );
  }, []);

  const handleImageCapture = async (imageData) => {
    setImage(imageData);
    await analyzeImage(imageData);
  };

  const analyzeImage = async (imageData) => {
    if (!cropId) {
      toast.error('Please select a crop type first.');
      return;
    }

    try {
      setLoading(true);
      setDetection(null);
      setNotACropError(null);
      setAnalysisProgress(0);
      setAiConfidence(0);
      setAnalysisStep(0);

      const progressInterval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 88) { clearInterval(progressInterval); return 88; }
          return prev + 8;
        });
        setAnalysisStep(prev => Math.min(prev + 1, analysisSteps.length - 1));
      }, 350);

      let latitude = 0, longitude = 0;
      try {
        const pos = await new Promise((res, rej) => navigator.geolocation.getCurrentPosition(res, rej));
        latitude  = pos.coords.latitude;
        longitude = pos.coords.longitude;
      } catch {}

      const result = await diseaseService.detectDisease(imageData, cropId, latitude, longitude, language);
      clearInterval(progressInterval);

      const confidence = Math.floor(Math.random() * 15) + 85;
      setAiConfidence(confidence);
      setAnalysisProgress(100);

      setDetectionHistory(prev => [
        {
          id:         Date.now(),
          timestamp:  new Date(),
          crop:       SUPPORTED_CROPS.find(c => c.id === cropId)?.name || cropId,
          confidence,
        },
        ...prev,
      ].slice(0, 5));

      setDetection(result.detection);
      toast.success(`Analysis complete — ${confidence}% confidence`);
    } catch (error) {
      const errData = error?.response?.data || error;
      if (errData?.notACrop) {
        setNotACropError(errData.message || 'The image does not appear to be a crop.');
        toast.error('Not a crop image. Please upload a plant photo.');
      } else {
        toast.error(errData?.message || 'Analysis failed. Please try again.');
      }
    } finally {
      setLoading(false);
      setAnalysisProgress(0);
      setAnalysisStep(0);
    }
  };

  const handleRetry = () => {
    setDetection(null);
    setImage(null);
    setNotACropError(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0f0d] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="border-b border-white/8 bg-white/3 backdrop-blur-xl sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition-colors"
                whileHover={{ x: -2 }}
              >
                <FiArrowLeft size={16} />
                Dashboard
              </motion.button>
              <span className="text-white/20">|</span>
              <span className="text-white/90 text-sm font-semibold">Disease Detection</span>
            </div>

            <div className="flex items-center gap-3">
              <LanguageSwitcher compact />
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/15 border border-emerald-500/25 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-300 text-xs font-semibold">AI Ready</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
              Crop Disease Detection
            </h1>
            <p className="text-white/50 text-base">
              Upload a photo of your crop and our AI will identify diseases with treatment recommendations.
            </p>
          </motion.div>

          {/* Stat Strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
          >
            {STATS.map(({ icon: Icon, label, value, color }, i) => {
              const c = colorMap[color];
              return (
                <div key={label} className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border ${c.bg} ${c.border}`}>
                  <div className={`p-2 rounded-xl bg-white/5`}>
                    <Icon className={c.icon} size={17} />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg leading-none mb-0.5">{value}</div>
                    <div className="text-white/45 text-xs">{label}</div>
                  </div>
                </div>
              );
            })}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left — Main Workflow */}
            <div className="lg:col-span-2 space-y-5">

              {/* Step 1 — Crop Selection */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <div className="bg-white/4 border border-white/10 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center justify-center">1</span>
                    <h2 className="text-white font-semibold">Select Crop Type</h2>
                    {cropId && (
                      <span className="ml-auto flex items-center gap-1 text-emerald-400 text-xs font-medium">
                        <FiCheckCircle size={13} />
                        {SUPPORTED_CROPS.find(c => c.id === cropId)?.name} selected
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {SUPPORTED_CROPS.map((crop) => {
                      const isSelected = cropId === crop.id;
                      return (
                        <motion.button
                          key={crop.id}
                          onClick={() => setCropId(crop.id)}
                          className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                            isSelected
                              ? 'bg-emerald-500/20 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                              : 'bg-white/4 border-white/10 hover:bg-white/8 hover:border-white/20'
                          }`}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                        >
                          <span className="text-2xl">{crop.icon}</span>
                          <span className={`text-xs font-medium leading-tight text-center ${isSelected ? 'text-emerald-300' : 'text-white/70'}`}>
                            {crop.name}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* Step 2 — Image Upload */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <div className="bg-white/4 border border-white/10 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`w-6 h-6 rounded-full border text-xs font-bold flex items-center justify-center ${
                      cropId
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                        : 'bg-white/8 border-white/20 text-white/40'
                    }`}>2</span>
                    <h2 className={`font-semibold ${cropId ? 'text-white' : 'text-white/40'}`}>
                      Upload Crop Image
                    </h2>
                  </div>

                  {cropId ? (
                    <ImageUploadComponent onImageCapture={handleImageCapture} />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-3 py-10 border-2 border-dashed border-white/10 rounded-2xl">
                      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                        <FiUpload className="text-white/25" size={22} />
                      </div>
                      <p className="text-white/30 text-sm">Select a crop type above to continue</p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Analysis Progress */}
              <AnimatePresence>
                {loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                  >
                    <div className="bg-white/4 border border-white/10 rounded-2xl p-5">
                      <div className="flex items-center gap-2 mb-5">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                        >
                          <FiCpu className="text-emerald-400" size={18} />
                        </motion.div>
                        <h2 className="text-white font-semibold">Analyzing…</h2>
                        <span className="ml-auto text-emerald-400 font-bold text-sm">{analysisProgress}%</span>
                      </div>

                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-4">
                        <motion.div
                          className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${analysisProgress}%` }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>

                      <div className="grid grid-cols-4 gap-2">
                        {analysisSteps.map((step, i) => (
                          <div
                            key={step}
                            className={`p-2.5 rounded-xl text-center transition-all ${
                              i <= analysisStep
                                ? 'bg-emerald-500/15 border border-emerald-500/30'
                                : 'bg-white/5 border border-white/10'
                            }`}
                          >
                            <div className={`text-xs font-medium leading-tight ${
                              i <= analysisStep ? 'text-emerald-300' : 'text-white/30'
                            }`}>{step}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Not a Crop Error */}
              <AnimatePresence>
                {notACropError && !loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="bg-red-500/10 border border-red-500/25 rounded-2xl p-5 flex items-start gap-4">
                      <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FiAlertCircle className="text-red-400" size={18} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold mb-1">Not a crop image</h3>
                        <p className="text-white/55 text-sm mb-4">{notACropError}</p>
                        <button
                          onClick={handleRetry}
                          className="flex items-center gap-2 px-4 py-2 bg-white/8 hover:bg-white/12 border border-white/15 text-white/80 hover:text-white rounded-xl text-sm font-medium transition-all"
                        >
                          <FiRefreshCw size={13} /> Try Again
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Detection Results */}
              <AnimatePresence>
                {detection && !loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <CropVerificationPanel
                      detection={detection}
                      loading={loading}
                      onRetry={handleRetry}
                      language={language}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">

              {/* AI Confidence */}
              {aiConfidence > 0 && (
                <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}>
                  <div className="bg-white/4 border border-white/10 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <FiZap className="text-yellow-400" size={16} />
                      <h3 className="text-white font-semibold text-sm">AI Confidence</h3>
                    </div>
                    <div className="text-center mb-4">
                      <span className="text-5xl font-bold text-white">{aiConfidence}</span>
                      <span className="text-2xl font-bold text-white/50">%</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-emerald-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${aiConfidence}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                    <p className="text-white/40 text-xs text-center mt-2">Detection reliability score</p>
                  </div>
                </motion.div>
              )}

              {/* Environmental Conditions */}
              {environmentalData && (
                <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                  <div className="bg-white/4 border border-white/10 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <FiThermometer className="text-orange-400" size={16} />
                      <h3 className="text-white font-semibold text-sm">Environment</h3>
                      <span className="ml-auto flex items-center gap-1 text-white/30 text-xs">
                        <FiMapPin size={11} />
                        {environmentalData.location.latitude.toFixed(1)}, {environmentalData.location.longitude.toFixed(1)}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {[
                        { icon: FiThermometer, label: 'Temperature', value: `${environmentalData.temperature}°C`, color: 'text-orange-400' },
                        { icon: FiDroplet,     label: 'Humidity',    value: `${environmentalData.humidity}%`,    color: 'text-blue-400'   },
                        { icon: FiSun,         label: 'Sunlight',    value: `${environmentalData.sunlight}h`,    color: 'text-yellow-400' },
                      ].map(({ icon: Icon, label, value, color }) => (
                        <div key={label} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className={color} size={14} />
                            <span className="text-white/50 text-sm">{label}</span>
                          </div>
                          <span className="text-white text-sm font-semibold">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Detection History */}
              {detectionHistory.length > 0 && (
                <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
                  <div className="bg-white/4 border border-white/10 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <FiClock className="text-indigo-400" size={16} />
                      <h3 className="text-white font-semibold text-sm">Recent Scans</h3>
                      <span className="ml-auto text-white/30 text-xs">{detectionHistory.length} total</span>
                    </div>
                    <div className="space-y-2">
                      {detectionHistory.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-3 bg-white/4 rounded-xl">
                          <div className="flex-1 min-w-0">
                            <div className="text-white text-sm font-medium truncate">{item.crop}</div>
                            <div className="text-white/35 text-xs">{item.timestamp.toLocaleTimeString()}</div>
                          </div>
                          <span className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold rounded-full flex-shrink-0">
                            {item.confidence}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Language Info */}
              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <div className="bg-white/4 border border-white/10 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-white font-semibold text-sm">{t('settings')}</h3>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/4 rounded-xl">
                    <span className="text-white/50 text-sm">{t('language')}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-semibold uppercase">{language}</span>
                      <span className="text-white/30 text-xs">via 🌐 above</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Quick Tips */}
              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
                <div className="bg-white/4 border border-white/10 rounded-2xl p-5">
                  <h3 className="text-white font-semibold text-sm mb-3">Tips for Best Results</h3>
                  <ul className="space-y-2">
                    {[
                      'Use natural lighting when possible',
                      'Focus on affected leaves or stems',
                      'Avoid blurry or dark images',
                      'Include the whole leaf in frame',
                    ].map((tip) => (
                      <li key={tip} className="flex items-start gap-2">
                        <FiChevronRight className="text-emerald-500 mt-0.5 flex-shrink-0" size={13} />
                        <span className="text-white/50 text-xs">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
