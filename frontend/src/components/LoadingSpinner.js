import React from 'react';
import { motion } from 'framer-motion';

export const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <motion.div
        className={`${sizeClasses[size]} border-4 border-green-200 border-t-green-500 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      {text && (
        <motion.p
          className="mt-4 text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export const SkeletonLoader = ({ lines = 3, className = '' }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <motion.div
          key={index}
          className="h-4 bg-gray-200 dark:bg-gray-700 rounded shimmer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          style={{
            width: index === lines - 1 ? '60%' : '100%'
          }}
        />
      ))}
    </div>
  );
};

export const CardSkeleton = () => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full shimmer" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded shimmer mb-2" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded shimmer w-3/4" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded shimmer" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded shimmer w-5/6" />
      </div>
    </motion.div>
  );
};

export const ProgressBar = ({ progress = 0, showLabel = true, color = 'green' }) => {
  const colorClasses = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500'
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Progress
          </span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {Math.round(progress)}%
          </span>
        </div>
      )}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <motion.div
          className={`${colorClasses[color]} h-2 rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};
