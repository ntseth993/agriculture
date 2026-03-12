import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({
  children,
  className = '',
  hover = true,
  glass = false,
  gradient = false,
  shadow = 'normal',
  padding = 'normal',
  rounded = 'xl',
  onClick,
  neon = false,
  animated = false,
  border = false,
  ...props
}) => {
  const baseClasses = 'relative overflow-hidden transition-all duration-500';
  
  const shadowClasses = {
    none: '',
    normal: 'shadow-xl shadow-black/10',
    large: 'shadow-2xl shadow-black/20',
    glow: 'shadow-2xl shadow-emerald-500/20 hover:shadow-emerald-500/40',
    neon: 'shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50',
    floating: 'shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40'
  };

  const paddingClasses = {
    none: '',
    small: 'p-4',
    normal: 'p-6',
    large: 'p-8'
  };

  const roundedClasses = {
    none: '',
    sm: 'rounded-xl',
    normal: 'rounded-2xl',
    large: 'rounded-3xl',
    full: 'rounded-3xl'
  };

  const borderClasses = {
    none: '',
    light: 'border border-white/20',
    medium: 'border-2 border-white/30',
    heavy: 'border-2 border-white/40',
    gradient: 'border border-transparent bg-gradient-to-r from-emerald-500/20 to-blue-500/20'
  };

  const cardClasses = [
    baseClasses,
    shadowClasses[shadow],
    paddingClasses[padding],
    roundedClasses[rounded],
    glass ? 'glass backdrop-blur-xl' : 'bg-white/10 backdrop-blur-md',
    gradient ? 'gradient-primary' : '',
    hover ? 'card-hover cursor-pointer transform-gpu' : '',
    neon ? 'neon-glow' : '',
    animated ? 'animate-float' : '',
    border ? borderClasses[border] : 'border border-white/20',
    className
  ].filter(Boolean).join(' ');

  return (
    <motion.div
      className={cardClasses}
      onClick={onClick}
      whileHover={hover ? { 
        y: -5,
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      {...props}
    >
      {/* Hover overlay effect */}
      {hover && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-0 pointer-events-none"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {children}
    </motion.div>
  );
};

export const StatCard = ({
  icon,
  title,
  value,
  change,
  trend = 'up',
  color = 'blue',
  className = ''
}) => {
  const colorClasses = {
    green: 'from-green-400 to-green-600',
    blue: 'from-blue-400 to-blue-600', 
    yellow: 'from-yellow-400 to-orange-600',
    red: 'from-red-400 to-red-600',
    purple: 'from-purple-400 to-purple-600'
  };

  const bgClasses = {
    green: 'bg-gradient-to-br from-green-500/20 to-emerald-600/20 border-green-500/30',
    blue: 'bg-gradient-to-br from-blue-500/20 to-indigo-600/20 border-blue-500/30',
    yellow: 'bg-gradient-to-br from-yellow-500/20 to-orange-600/20 border-yellow-500/30',
    red: 'bg-gradient-to-br from-red-500/20 to-pink-600/20 border-red-500/30',
    purple: 'bg-gradient-to-br from-purple-500/20 to-violet-600/20 border-purple-500/30'
  };

  const iconBgClasses = {
    green: 'bg-gradient-to-br from-green-400 to-green-600 text-white',
    blue: 'bg-gradient-to-br from-blue-400 to-blue-600 text-white',
    yellow: 'bg-gradient-to-br from-yellow-400 to-orange-600 text-white',
    red: 'bg-gradient-to-br from-red-400 to-red-600 text-white',
    purple: 'bg-gradient-to-br from-purple-400 to-purple-600 text-white'
  };

  const trendColor = trend === 'up' ? 'text-green-400' : 'text-red-400';

  return (
    <Card 
      hover 
      glass 
      className={`stat-card ${bgClasses[color]} ${className}`}
      shadow="glow"
    >
      <div className="flex items-center justify-between mb-4">
        <motion.div 
          className={`p-3 rounded-xl ${iconBgClasses[color]} shadow-lg`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="text-xl">
            {icon}
          </div>
        </motion.div>
        <motion.div 
          className={`flex items-center gap-1 text-sm font-semibold ${trendColor}`}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            animate={{ y: trend === 'up' ? [0, -2, 0] : [0, 2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {trend === 'up' ? '↑' : '↓'}
          </motion.div>
          {change}
        </motion.div>
      </div>
      <div className="text-3xl font-bold text-white mb-2">
        {value}
      </div>
      <div className="text-sm text-white/80">
        {title}
      </div>
    </Card>
  );
};

export const FeatureCard = ({
  icon,
  title,
  description,
  className = '',
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      viewport={{ once: true }}
    >
      <Card hover className={`text-center ${className}`}>
        <motion.div
          className="mb-6 inline-block"
          whileHover={{ 
            scale: 1.1, 
            rotate: [0, 5, -5, 0],
            transition: { duration: 0.3 }
          }}
        >
          {icon}
        </motion.div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>
      </Card>
    </motion.div>
  );
};

export const TestimonialCard = ({
  name,
  role,
  text,
  rating,
  image,
  className = ''
}) => {
  return (
    <Card hover className={`border-l-4 border-green-500 ${className}`}>
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="text-yellow-400 text-lg"
          >
            ⭐
          </motion.span>
        ))}
      </div>
      
      <motion.div
        className="text-4xl text-green-200 mb-4 opacity-50"
        initial={{ rotate: -10 }}
        whileHover={{ rotate: 0 }}
        transition={{ duration: 0.3 }}
      >
        "
      </motion.div>
      
      <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 leading-relaxed italic">
        {text}
      </p>
      
      <div className="flex items-center gap-4">
        <motion.img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
          whileHover={{ scale: 1.05 }}
        />
        <div>
          <p className="font-bold text-gray-900 dark:text-white">{name}</p>
          <p className="text-green-600 dark:text-green-400 font-medium text-sm">{role}</p>
        </div>
      </div>
    </Card>
  );
};

export const PricingCard = ({
  name,
  price,
  period,
  features,
  highlight = false,
  buttonText = 'Get Started',
  onButtonClick,
  className = ''
}) => {
  return (
    <motion.div
      whileHover={{ scale: highlight ? 1.02 : 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className={`relative ${highlight ? 'gradient-primary text-white' : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600'} ${className}`}
      >
        {highlight && (
          <motion.div
            className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            POPULAR
          </motion.div>
        )}
        
        <h3 className={`text-2xl font-bold mb-4 ${highlight ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
          {name}
        </h3>
        
        <div className="mb-6">
          <span className={`text-5xl font-bold ${highlight ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
            {price}
          </span>
          {period && (
            <span className={`text-lg opacity-80 ${highlight ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`}>
              {period}
            </span>
          )}
        </div>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-2"
            >
              <span className="text-xl">✓</span>
              <span className={highlight ? 'text-white' : 'text-gray-700 dark:text-gray-300'}>
                {feature}
              </span>
            </motion.li>
          ))}
        </ul>
        
        <motion.button
          onClick={onButtonClick}
          className={`w-full py-3 rounded-lg font-bold text-lg transition focus-ring ${
            highlight 
              ? 'bg-white text-green-600 hover:bg-gray-100' 
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {buttonText}
        </motion.button>
      </Card>
    </motion.div>
  );
};
