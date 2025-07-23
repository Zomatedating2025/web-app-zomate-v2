import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User } from '../store/appStore';
import { CompatibilityService } from '../services/compatibilityService';
import { useAppStore } from '../store/appStore';

interface SwipeCardProps {
  user: User;
  onSwipe?: (direction: 'left' | 'right', user: User) => void;
  isTop?: boolean;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ user, onSwipe, isTop = false }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const { currentUser } = useAppStore();

  const zodiacEmojis = {
    'Aries': '♈', 'Taurus': '♉', 'Gemini': '♊', 'Cancer': '♋',
    'Leo': '♌', 'Virgo': '♍', 'Libra': '♎', 'Scorpio': '♏',
    'Sagittarius': '♐', 'Capricorn': '♑', 'Aquarius': '♒', 'Pisces': '♓'
  };

  // Calculate compatibility if current user exists
  const compatibility = currentUser ? CompatibilityService.calculateCompatibility(currentUser, user) : null;

  const handlePhotoTap = (side: 'left' | 'right') => {
    if (side === 'right' && currentPhotoIndex < user.photos.length - 1) {
      setCurrentPhotoIndex(prev => prev + 1);
    } else if (side === 'left' && currentPhotoIndex > 0) {
      setCurrentPhotoIndex(prev => prev - 1);
    }
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 80) return 'border-yellow-400 bg-yellow-400/20';
    if (score >= 60) return 'border-cyan-400 bg-cyan-400/20';
    if (score >= 40) return 'border-purple-400 bg-purple-400/20';
    return 'border-white/60 bg-white/10';
  };

  const getCompatibilityTextColor = (score: number) => {
    if (score >= 80) return 'text-yellow-400';
    if (score >= 60) return 'text-cyan-400';
    if (score >= 40) return 'text-purple-400';
    return 'text-white/60';
  };

  return (
    <motion.div
      className={`w-80 h-[500px] bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-purple-500/30 ${
        isTop ? 'absolute z-10' : 'absolute z-0 scale-95 opacity-50'
      }`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: isTop ? 1 : 0.95, opacity: isTop ? 1 : 0.5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Photo Section */}
      <div className="relative h-80">
        <img
          src={user.photos[currentPhotoIndex] || user.photos[0]}
          alt={user.name}
          className="w-full h-full object-cover"
          crossOrigin="anonymous"
        />
        
        {/* Photo Navigation */}
        <div className="absolute inset-0 flex">
          <button 
            className="flex-1 bg-transparent"
            onClick={() => handlePhotoTap('left')}
          />
          <button 
            className="flex-1 bg-transparent"
            onClick={() => handlePhotoTap('right')}
          />
        </div>

        {/* Photo Indicators */}
        {user.photos.length > 1 && (
          <div className="absolute top-4 left-4 right-4 flex gap-1">
            {user.photos.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-1 rounded-full ${
                  index === currentPhotoIndex ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        )}

        {/* Compatibility Circle - Top Left */}
        {compatibility && (
          <motion.div
            className={`absolute top-4 left-4 w-12 h-12 rounded-full border-2 backdrop-blur-sm flex items-center justify-center ${getCompatibilityColor(compatibility.overall)}`}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          >
            <div className="text-center">
              <span className={`text-xs font-bold ${getCompatibilityTextColor(compatibility.overall)}`}>
                {compatibility.overall}%
              </span>
            </div>
            
            {/* Animated ring */}
            <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 48 48">
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                className="text-white/20"
              />
              <motion.circle
                cx="24"
                cy="24"
                r="20"
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 20}`}
                strokeDashoffset={`${2 * Math.PI * 20 * (1 - compatibility.overall / 100)}`}
                className={getCompatibilityTextColor(compatibility.overall)}
                initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 20 * (1 - compatibility.overall / 100) }}
                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              />
            </svg>
          </motion.div>
        )}

        {/* Zodiac Badge - Top Right */}
        <div className="absolute top-4 right-4 bg-purple-600/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
          <span className="text-sm">{zodiacEmojis[user.sunSign as keyof typeof zodiacEmojis]}</span>
          <span className="text-sm font-medium text-white">{user.sunSign}</span>
        </div>

        {/* Distance */}
        {user.distance && (
          <div className="absolute bottom-4 left-4 bg-slate-800/80 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-xs text-white">{user.distance} km away</span>
          </div>
        )}

        {/* Online Status */}
        {user.isOnline && (
          <div className="absolute bottom-4 right-4 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
        )}
      </div>

      {/* Info Section */}
      <div className="p-5 flex-1">
        <div className="mb-2">
          <h3 className="text-xl font-bold text-white">
            {user.name}, {user.age}
          </h3>
          {compatibility && (
            <div className="flex items-center space-x-2 mt-1">
              <i className="bi bi-stars text-xs text-yellow-400"></i>
              <span className={`text-xs ${getCompatibilityTextColor(compatibility.overall)}`}>
                {compatibility.overall >= 90 ? 'Cosmic Soulmates' :
                 compatibility.overall >= 80 ? 'Stellar Match' :
                 compatibility.overall >= 70 ? 'Strong Connection' :
                 compatibility.overall >= 60 ? 'Good Harmony' :
                 compatibility.overall >= 50 ? 'Potential Match' : 'Different Paths'}
              </span>
            </div>
          )}
        </div>
        
        <p className="text-sm text-white/80 leading-relaxed mb-4 line-clamp-3">
          {user.bio}
        </p>

        {/* Interests */}
        {user.interests && user.interests.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {user.interests.slice(0, 3).map((interest, index) => (
              <span
                key={index}
                className="bg-purple-600/30 text-white px-3 py-1 rounded-full text-xs"
              >
                {interest}
              </span>
            ))}
            {user.interests.length > 3 && (
              <span className="text-white/60 text-xs self-center">
                +{user.interests.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SwipeCard;
