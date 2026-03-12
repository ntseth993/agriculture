import React from 'react';
import { motion } from 'framer-motion';
import { FaGoogle, FaGithub, FaEnvelope } from 'react-icons/fa';

export const OAuthButtons = ({ onGoogleSignIn, onGitHubSignIn, loading = false }) => {
  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            Or continue with
          </span>
        </div>
      </div>

      <motion.button
        onClick={onGoogleSignIn}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus-ring transition-all duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FaGoogle className="text-xl text-red-500" />
        <span className="font-medium">
          {loading ? 'Connecting...' : 'Continue with Google'}
        </span>
      </motion.button>

      <motion.button
        onClick={onGitHubSignIn}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus-ring transition-all duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FaGithub className="text-xl" />
        <span className="font-medium">
          {loading ? 'Connecting...' : 'Continue with GitHub'}
        </span>
      </motion.button>

      <motion.button
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus-ring transition-all duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FaEnvelope className="text-xl text-blue-500" />
        <span className="font-medium">
          {loading ? 'Sending...' : 'Continue with Email'}
        </span>
      </motion.button>
    </div>
  );
};

export const SocialLoginCard = ({ title, description, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>

      {children}

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          By continuing, you agree to our{' '}
          <a href="#" className="text-green-600 dark:text-green-400 hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-green-600 dark:text-green-400 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </motion.div>
  );
};
