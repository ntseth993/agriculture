import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FaLeaf, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FiArrowLeft, FiMail, FiLock, FiShield, FiTarget, FiTrendingUp, FiUsers } from 'react-icons/fi';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      await loginWithGoogle(credentialResponse.credential);
      toast.success('Signed in with Google!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Google sign-in failed. Please try again.');
    }
  };

  const stats = [
    { icon: <FiTarget />, value: '95%+', label: 'Detection Accuracy' },
    { icon: <FiUsers />, value: '10K+', label: 'Farmers Helped' },
    { icon: <FiTrendingUp />, value: '30%', label: 'Yield Increase' },
    { icon: <FiShield />, value: '50K+', label: 'Crops Protected' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Left panel — image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&q=80"
          alt="Wheat fields"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 to-gray-950/90" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center">
              <FaLeaf className="text-white text-lg" />
            </div>
            <span className="text-white font-bold text-lg">CropHealth <span className="text-green-400">AI</span></span>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
              Protect your crops<br />with the power of AI
            </h2>
            <p className="text-white/65 text-base mb-8">Join 10,000+ farmers using smart technology to boost yields and prevent disease.</p>
            <div className="grid grid-cols-2 gap-3">
              {stats.map(({ icon, value, label }) => (
                <div key={label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/15">
                  <div className="text-green-400 text-xl mb-1">{icon}</div>
                  <div className="text-white font-black text-2xl">{value}</div>
                  <div className="text-white/55 text-xs mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16">
        <div className="max-w-md w-full mx-auto">
          <motion.button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/50 hover:text-white text-sm mb-10 transition-colors"
            whileHover={{ x: -3 }}
          >
            <FiArrowLeft /> Back to home
          </motion.button>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center">
                <FaLeaf className="text-white text-sm" />
              </div>
              <span className="text-white font-bold">CropHealth AI</span>
            </div>

            <h1 className="text-3xl font-bold text-white mb-1">Welcome back</h1>
            <p className="text-white/50 mb-8 text-sm">Sign in to your account to continue</p>

            {/* Google Sign In Button */}
            <div className="mb-6">
              <div className="w-full [&>div]:!w-full [&>div>div>iframe]:!w-full">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => toast.error('Google sign-in was cancelled or failed.')}
                  theme="filled_black"
                  shape="rectangular"
                  size="large"
                  width="448"
                  text="signin_with"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/35 text-xs font-medium">OR</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Email address</label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35 text-sm" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 text-white placeholder-white/25 text-sm transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35 text-sm" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-11 py-3 bg-white/5 border border-white/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 text-white placeholder-white/25 text-sm transition-all"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/35 hover:text-white/70 transition-colors">
                    {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-green-500 hover:bg-green-400 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-green-500/30 disabled:opacity-60 disabled:cursor-not-allowed"
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                      <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" className="opacity-75" strokeLinecap="round" />
                    </svg>
                    Signing in...
                  </span>
                ) : 'Sign In'}
              </motion.button>
            </form>

            <p className="text-center text-white/45 text-sm mt-6">
              Don't have an account?{' '}
              <button onClick={() => navigate('/register')} className="text-green-400 hover:text-green-300 font-semibold transition-colors">
                Create one free
              </button>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
