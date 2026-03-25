import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FaLeaf, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FiArrowLeft, FiMail, FiLock, FiUser, FiPhone } from 'react-icons/fi';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '', role: 'farmer', businessName: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.password) return toast.error('Please fill in all required fields');
    if (formData.password !== formData.confirmPassword) return toast.error('Passwords do not match');
    if (formData.password.length < 6) return toast.error('Password must be at least 6 characters');
    if (formData.role !== 'farmer' && !formData.businessName) return toast.error('Business name is required');
    try {
      setLoading(true);
      const data = { name: formData.name, email: formData.email, phone: formData.phone, password: formData.password, role: formData.role };
      if (formData.role !== 'farmer') data.businessName = formData.businessName;
      await register(data);
      toast.success('Welcome to CropHealth AI!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      await loginWithGoogle(credentialResponse.credential);
      toast.success('Account created with Google!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Google sign-up failed. Please try again.');
    }
  };

  const inputClass = "w-full py-3 bg-white/5 border border-white/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 text-white placeholder-white/25 text-sm transition-all";

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden flex-col">
        <img src="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1200&q=80" alt="Farm" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 to-gray-950/90" />
        <div className="relative z-10 flex flex-col justify-between p-12 h-full">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center">
              <FaLeaf className="text-white text-lg" />
            </div>
            <span className="text-white font-bold text-lg">CropHealth <span className="text-green-400">AI</span></span>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-4 leading-snug">Start protecting your crops today</h2>
            <p className="text-white/60 mb-8 text-sm">Create your free account and get instant access to AI-powered disease detection.</p>
            <ul className="space-y-3">
              {['Free to get started — no credit card required', '95%+ disease detection accuracy', 'Real-time alerts & expert support', 'Trusted by 10,000+ farmers'].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-white/70 text-sm">
                  <div className="w-5 h-5 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col justify-center px-6 py-10 lg:px-12 overflow-y-auto">
        <div className="max-w-md w-full mx-auto">
          <motion.button onClick={() => navigate('/')} className="flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors" whileHover={{ x: -3 }}>
            <FiArrowLeft /> Back to home
          </motion.button>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="lg:hidden flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center">
                <FaLeaf className="text-white text-sm" />
              </div>
              <span className="text-white font-bold">CropHealth AI</span>
            </div>

            <h1 className="text-3xl font-bold text-white mb-1">Create your account</h1>
            <p className="text-white/50 mb-6 text-sm">Free forever. Upgrade when you need more.</p>

            {/* Google Sign Up */}
            <div className="mb-5">
              <div className="w-full [&>div]:!w-full [&>div>div>iframe]:!w-full">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => toast.error('Google sign-up was cancelled or failed.')}
                  theme="filled_black"
                  shape="rectangular"
                  size="large"
                  width="448"
                  text="signup_with"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 mb-5">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/35 text-xs font-medium">OR</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-white/65 mb-1.5">Full Name *</label>
                <div className="relative">
                  <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35 text-sm" />
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className={`${inputClass} pl-10 pr-4`} placeholder="Your full name" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-white/65 mb-1.5">Email *</label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35 text-sm" />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className={`${inputClass} pl-10 pr-4`} placeholder="you@example.com" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-white/65 mb-1.5">Phone Number *</label>
                <div className="relative">
                  <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35 text-sm" />
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className={`${inputClass} pl-10 pr-4`} placeholder="+1 (555) 000-0000" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-white/65 mb-1.5">Role *</label>
                <select name="role" value={formData.role} onChange={handleChange} className={`${inputClass} px-4`}>
                  <option value="farmer" className="bg-gray-900">Farmer</option>
                  <option value="agro-vet" className="bg-gray-900">Agro Vet</option>
                  <option value="pharmacy" className="bg-gray-900">Pharmacy</option>
                </select>
              </div>

              {formData.role !== 'farmer' && (
                <div>
                  <label className="block text-xs font-medium text-white/65 mb-1.5">Business Name *</label>
                  <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} className={`${inputClass} px-4`} placeholder="Your business name" />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-white/65 mb-1.5">Password *</label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35 text-sm" />
                  <input type={showPassword ? 'text' : 'password'} name="password" autoComplete="new-password" value={formData.password} onChange={handleChange} required className={`${inputClass} pl-10 pr-11`} placeholder="At least 6 characters" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/35 hover:text-white/70 transition-colors">
                    {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-white/65 mb-1.5">Confirm Password *</label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35 text-sm" />
                  <input type={showConfirm ? 'text' : 'password'} name="confirmPassword" autoComplete="new-password" value={formData.confirmPassword} onChange={handleChange} required className={`${inputClass} pl-10 pr-11`} placeholder="Repeat your password" />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/35 hover:text-white/70 transition-colors">
                    {showConfirm ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-green-500 hover:bg-green-400 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-green-500/30 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                      <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" className="opacity-75" strokeLinecap="round" />
                    </svg>
                    Creating account...
                  </span>
                ) : 'Create Account'}
              </motion.button>
            </form>

            <p className="text-center text-white/40 text-xs mt-5">
              Already have an account?{' '}
              <button onClick={() => navigate('/login')} className="text-green-400 hover:text-green-300 font-semibold transition-colors">Sign in</button>
            </p>
            <p className="text-center text-white/25 text-xs mt-2">By continuing, you agree to our Terms of Service and Privacy Policy.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
