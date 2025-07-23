import React from 'react';
import { motion } from 'framer-motion';
import { CompatibilityScore, CompatibilityService } from '../services/compatibilityService';

interface CompatibilityMeterProps {
  compatibility: CompatibilityScore;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const CompatibilityMeter: React.FC<CompatibilityMeterProps> = ({ 
  compatibility, 
  showDetails = false,
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: { container: 'w-16 h-16', text: 'text-xs', detail: 'text-xs' },
    md: { container: 'w-20 h-20', text: 'text-sm', detail: 'text-sm' },
    lg: { container: 'w-24 h-24', text: 'text-base', detail: 'text-base' }
  };

  const classes = sizeClasses[size];
  const circumference = 2 * Math.PI * 30; // radius = 30
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (compatibility.overall / 100) * circumference;

  return (
    <div className="flex flex-col items-center space-y-3">
      {/* Circular Progress */}
      <div className={`relative ${classes.container}`}>
        <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 70 70">
          {/* Background circle */}
          <circle
            cx="35"
            cy="35"
            r="30"
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            className="text-galactic-white/20"
          />
          
          {/* Progress circle */}
          <motion.circle
            cx="35"
            cy="35"
            r="30"
            stroke="url(#compatibilityGradient)"
            strokeWidth="6"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="compatibilityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={compatibility.overall >= 80 ? '#FFD700' : compatibility.overall >= 60 ? '#57F0D0' : '#C8A2C8'} />
              <stop offset="100%" stopColor={compatibility.overall >= 80 ? '#FFA500' : compatibility.overall >= 60 ? '#00CED1' : '#DDA0DD'} />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.span
              className={`font-heading text-galactic-white ${classes.text}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
            >
              {compatibility.overall}%
            </motion.span>
          </div>
        </div>
      </div>

      {/* Compatibility Label */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <p className={`font-body ${CompatibilityService.getCompatibilityColor(compatibility.overall)} ${classes.detail}`}>
          {compatibility.overall >= 90 ? 'Cosmic Soulmates' :
           compatibility.overall >= 80 ? 'Stellar Match' :
           compatibility.overall >= 70 ? 'Strong Connection' :
           compatibility.overall >= 60 ? 'Good Harmony' :
           compatibility.overall >= 50 ? 'Potential Match' :
           compatibility.overall >= 40 ? 'Challenging' : 'Different Paths'}
        </p>
      </motion.div>

      {/* Detailed Breakdown */}
      {showDetails && (
        <motion.div
          className="w-full max-w-sm space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {/* Interests */}
          <div className="bg-cosmic-card rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-galactic-white font-body text-sm flex items-center">
                <i className="bi bi-heart mr-2 text-galactic-gold"></i>
                Shared Interests
              </span>
              <span className={`font-heading text-sm ${CompatibilityService.getCompatibilityColor(compatibility.interests)}`}>
                {compatibility.interests}%
              </span>
            </div>
            {compatibility.breakdown.interests.shared.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {compatibility.breakdown.interests.shared.slice(0, 3).map((interest) => (
                  <span
                    key={interest}
                    className="bg-galactic-gold/20 text-galactic-gold px-2 py-1 rounded-full text-xs font-body"
                  >
                    {interest}
                  </span>
                ))}
                {compatibility.breakdown.interests.shared.length > 3 && (
                  <span className="text-galactic-white/60 text-xs">
                    +{compatibility.breakdown.interests.shared.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Astrological Compatibility */}
          <div className="bg-cosmic-card rounded-lg p-3">
            <h4 className="text-galactic-white font-body text-sm mb-2 flex items-center">
              <i className="bi bi-stars mr-2 text-galactic-teal"></i>
              Astrological Harmony (70% weight)
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-galactic-white/80 text-xs">☀️ Sun Signs (50%)</span>
                <span className={`text-xs ${CompatibilityService.getCompatibilityColor(compatibility.sunSign)}`}>
                  {compatibility.sunSign}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-galactic-white/80 text-xs">🌙 Moon Signs (15%)</span>
                <span className={`text-xs ${CompatibilityService.getCompatibilityColor(compatibility.moonSign)}`}>
                  {compatibility.moonSign}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-galactic-white/80 text-xs">⬆️ Rising Signs (20%)</span>
                <span className={`text-xs ${CompatibilityService.getCompatibilityColor(compatibility.risingSign)}`}>
                  {compatibility.risingSign}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CompatibilityMeter;
