import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ThemeToggle } from '../components/ThemeToggle';
import toast from 'react-hot-toast';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(email, password);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-600 dark:from-gray-900 dark:to-gray-800">
      {/* Theme Toggle and Back Button */}
      <div className="fixed top-4 left-4 right-4 flex justify-between items-center z-50">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
        >
          <span>←</span> Back to Home
        </button>
        <ThemeToggle />
      </div>

      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            Crop Health Advisory
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
            Don't have an account?{' '}
            <a href="/register" className="text-green-500 hover:underline font-semibold">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
