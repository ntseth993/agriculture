import React from 'react';
import { motion } from 'framer-motion';
import { FiLoader, FiArrowRight, FiDownload, FiExternalLink } from 'react-icons/fi';

export const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'right',
  fullWidth = false,
  onClick,
  className = '',
  ...props
}) => {
  const baseClasses = 'relative font-semibold rounded-xl transition-all duration-300 focus-ring flex items-center justify-center gap-2';
  
  const variantClasses = {
    primary: 'gradient-primary text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700',
    outline: 'border-2 border-green-500 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20',
    ghost: 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-xl',
    success: 'bg-green-500 text-white hover:bg-green-600 shadow-lg hover:shadow-xl'
  };

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const buttonClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClass,
    disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    className
  ].filter(Boolean).join(' ');

  const renderIcon = () => {
    if (loading) {
      return <FiLoader className="animate-spin" />;
    }
    
    const iconMap = {
      arrow: <FiArrowRight />,
      download: <FiDownload />,
      external: <FiExternalLink />,
      custom: icon
    };

    return iconMap[icon] || icon;
  };

  return (
    <motion.button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      {...props}
    >
      {/* Ripple effect overlay */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-white/20 opacity-0 pointer-events-none"
        whileTap={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
      />
      
      {iconPosition === 'left' && renderIcon()}
      <span className={loading ? 'opacity-70' : ''}>
        {loading ? 'Loading...' : children}
      </span>
      {iconPosition === 'right' && renderIcon()}
    </motion.button>
  );
};

export const IconButton = ({
  icon,
  tooltip,
  variant = 'ghost',
  size = 'medium',
  ...props
}) => {
  const sizeClasses = {
    small: 'p-2',
    medium: 'p-3',
    large: 'p-4'
  };

  return (
    <motion.button
      className={`relative rounded-xl transition-all duration-300 focus-ring ${sizeClasses[size]} ${
        variant === 'ghost' 
          ? 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800' 
          : variant === 'primary'
          ? 'gradient-primary text-white shadow-lg hover:shadow-xl'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={tooltip}
      {...props}
    >
      {icon}
      {tooltip && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 pointer-events-none hover:opacity-100 transition-opacity whitespace-nowrap">
          {tooltip}
        </div>
      )}
    </motion.button>
  );
};

export const FloatingActionButton = ({
  icon,
  onClick,
  position = 'bottom-right',
  color = 'green',
  ...props
}) => {
  const positionClasses = {
    'bottom-right': 'fixed bottom-6 right-6',
    'bottom-left': 'fixed bottom-6 left-6',
    'top-right': 'fixed top-6 right-6',
    'top-left': 'fixed top-6 left-6'
  };

  const colorClasses = {
    green: 'gradient-primary',
    blue: 'gradient-secondary',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500'
  };

  return (
    <motion.button
      className={`p-4 rounded-full text-white shadow-2xl ${colorClasses[color]} ${positionClasses[position]}`}
      onClick={onClick}
      whileHover={{ scale: 1.1, rotate: 90 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      {icon}
    </motion.button>
  );
};
