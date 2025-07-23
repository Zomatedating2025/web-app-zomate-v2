import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import PremiumFeature from '../components/PremiumFeature';
import CosmicBackground from '../components/CosmicBackground';

const Profile: React.FC = () => {
  const { currentUser, isPremium } = useAppStore();
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-cosmic-gradient flex items-center justify-center">
        <p className="text-galactic-white">Loading profile...</p>
      </div>
    );
  }

  const zodiacEmoji = {
    'Aries': '♈', 'Taurus': '♉', 'Gemini': '♊', 'Cancer': '♋',
    'Leo': '♌', 'Virgo': '♍', 'Libra': '♎', 'Scorpio': '♏',
    'Sagittarius': '♐', 'Capricorn': '♑', 'Aquarius': '♒', 'Pisces': '♓'
  };

  const profileStats = [
    { label: 'Matches', value: '12', icon: 'bi-heart' },
    { label: 'Likes', value: '47', icon: 'bi-star' },
    { label: 'Views', value: '156', icon: 'bi-eye' },
  ];

  const settingsOptions = [
    { icon: 'bi-person', label: 'Edit Profile', action: () => navigate('/edit-profile') },
    { icon: 'bi-gear', label: 'Preferences', action: () => {} },
    { icon: 'bi-bell', label: 'Notifications', action: () => {} },
    { icon: 'bi-receipt', label: 'Purchase History', action: () => navigate('/purchase-history') },
    { icon: 'bi-shield', label: 'Privacy', action: () => {} },
    { icon: 'bi-question-circle', label: 'Help & Support', action: () => {} },
    { icon: 'bi-box-arrow-right', label: 'Sign Out', action: () => {} },
  ];

  return (
    <div className="min-h-screen bg-cosmic-gradient relative">
      <CosmicBackground />
      
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-4">
        <h1 className="text-2xl font-heading text-galactic-white">Profile</h1>
        <motion.button
          className="p-2 bg-cosmic-card rounded-full"
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowSettings(!showSettings)}
        >
          <i className="bi bi-three-dots text-galactic-white text-xl"></i>
        </motion.button>
      </div>

      {/* Settings Dropdown */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            className="absolute top-16 right-4 bg-card-gradient rounded-2xl p-2 z-30 shadow-2xl border border-galactic-purple/30"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
          >
            {settingsOptions.map((option, index) => (
              <motion.button
                key={index}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-galactic-purple/20 rounded-xl transition-all duration-200"
                whileHover={{ x: 5 }}
                onClick={() => {
                  option.action();
                  setShowSettings(false);
                }}
              >
                <i className={`${option.icon} text-galactic-white`}></i>
                <span className="text-galactic-white font-body">{option.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 p-4">
        {/* Profile Card */}
        <motion.div
          className="bg-card-gradient rounded-3xl p-6 mb-6 border border-galactic-purple/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Profile Image & Basic Info */}
          <div className="text-center mb-6">
            <div className="relative inline-block mb-4">
              <img
                src={currentUser.photos[0]}
                alt={currentUser.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-galactic-gold"
                crossOrigin="anonymous"
              />
              {isPremium && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-galactic-gold rounded-full flex items-center justify-center">
                  <i className="bi bi-crown text-cosmic-bg text-sm"></i>
                </div>
              )}
            </div>
            
            <h2 className="text-2xl font-heading text-galactic-white mb-1">
              {currentUser.name}, {currentUser.age}
            </h2>
            
            <div className="flex items-center justify-center space-x-2 mb-4">
              <span className="text-2xl">
                {zodiacEmoji[currentUser.sunSign as keyof typeof zodiacEmoji]}
              </span>
              <span className="text-galactic-lavender font-body">
                {currentUser.sunSign}
              </span>
              {currentUser.moonSign && (
                <>
                  <span className="text-galactic-white/30">•</span>
                  <span className="text-galactic-teal font-body text-sm">
                    🌙 {currentUser.moonSign}
                  </span>
                </>
              )}
              {currentUser.risingSign && (
                <>
                  <span className="text-galactic-white/30">•</span>
                  <span className="text-galactic-gold font-body text-sm">
                    ⬆️ {currentUser.risingSign}
                  </span>
                </>
              )}
            </div>
            
            <p className="text-galactic-white/80 font-body text-sm leading-relaxed">
              {currentUser.bio}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {profileStats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-3 bg-cosmic-card rounded-xl"
                whileHover={{ scale: 1.05 }}
              >
                <i className={`${stat.icon} text-galactic-gold text-xl mb-2 block`}></i>
                <p className="text-xl font-heading text-galactic-white">{stat.value}</p>
                <p className="text-galactic-white/60 font-body text-xs">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <motion.button
              className="w-full bg-galactic-purple hover:bg-galactic-purple/80 text-galactic-white font-heading py-3 px-6 rounded-full transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/edit-profile')}
            >
              Edit Profile
            </motion.button>
            
            {!isPremium && (
              <motion.button
                className="w-full bg-galactic-gold hover:bg-galactic-gold/90 text-cosmic-bg font-heading py-3 px-6 rounded-full transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/premium')}
              >
                Upgrade to Premium ✨
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Astrological Profile */}
        <motion.div
          className="bg-card-gradient rounded-2xl p-6 mb-6 border border-galactic-purple/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-heading text-galactic-white mb-4 flex items-center">
            <i className="bi bi-stars text-galactic-gold mr-2"></i>
            Your Cosmic Profile
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-cosmic-card rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">
                  {zodiacEmoji[currentUser.sunSign as keyof typeof zodiacEmoji]}
                </span>
                <div>
                  <p className="text-galactic-white font-body">Sun Sign</p>
                  <p className="text-galactic-lavender font-body text-sm">{currentUser.sunSign}</p>
                </div>
              </div>
              <span className="text-galactic-gold font-body text-sm">Core Identity</span>
            </div>
            
            {currentUser.moonSign ? (
              <div className="flex items-center justify-between p-3 bg-cosmic-card rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🌙</span>
                  <div>
                    <p className="text-galactic-white font-body">Moon Sign</p>
                    <p className="text-galactic-teal font-body text-sm">{currentUser.moonSign}</p>
                  </div>
                </div>
                <span className="text-galactic-teal font-body text-sm">Emotions</span>
              </div>
            ) : (
              <PremiumFeature
                feature="Moon & Rising Signs"
                description="Unlock your complete astrological profile with Moon and Rising signs for deeper compatibility insights."
              >
                <div className="flex items-center justify-between p-3 bg-cosmic-card/50 rounded-lg border border-dashed border-galactic-purple/30">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl opacity-50">🌙</span>
                    <div>
                      <p className="text-galactic-white/50 font-body">Moon Sign</p>
                      <p className="text-galactic-white/30 font-body text-sm">Unlock for $1.99</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <i className="bi bi-crown text-galactic-gold text-sm"></i>
                    <span className="text-galactic-gold font-body text-sm">$1.99</span>
                  </div>
                </div>
              </PremiumFeature>
            )}
            
            {currentUser.risingSign ? (
              <div className="flex items-center justify-between p-3 bg-cosmic-card rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">⬆️</span>
                  <div>
                    <p className="text-galactic-white font-body">Rising Sign</p>
                    <p className="text-galactic-gold font-body text-sm">{currentUser.risingSign}</p>
                  </div>
                </div>
                <span className="text-galactic-gold font-body text-sm">First Impression</span>
              </div>
            ) : (
              <PremiumFeature
                feature="Moon & Rising Signs"
                description="Unlock your complete astrological profile with Moon and Rising signs for deeper compatibility insights."
              >
                <div className="flex items-center justify-between p-3 bg-cosmic-card/50 rounded-lg border border-dashed border-galactic-purple/30">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl opacity-50">⬆️</span>
                    <div>
                      <p className="text-galactic-white/50 font-body">Rising Sign</p>
                      <p className="text-galactic-white/30 font-body text-sm">Unlock for $1.99</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <i className="bi bi-crown text-galactic-gold text-sm"></i>
                    <span className="text-galactic-gold font-body text-sm">$1.99</span>
                  </div>
                </div>
              </PremiumFeature>
            )}
          </div>
        </motion.div>

        {/* Premium Features */}
        {!isPremium && (
          <motion.div
            className="bg-gradient-to-r from-galactic-gold/20 to-galactic-purple/20 rounded-2xl p-6 border border-galactic-gold/30 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-center">
              <i className="bi bi-crown text-4xl text-galactic-gold mb-3 block"></i>
              <h3 className="text-lg font-heading text-galactic-white mb-2">
                Unlock Your Full Potential
              </h3>
              <p className="text-galactic-white/80 font-body text-sm mb-4">
                Get unlimited Zodi chats, advanced filters, and see who likes you
              </p>
              <div className="flex space-x-3">
                <button 
                  onClick={() => navigate('/premium')}
                  className="flex-1 bg-galactic-gold hover:bg-galactic-gold/90 text-cosmic-bg font-heading py-3 px-6 rounded-full transition-all duration-300"
                >
                  Go Premium
                </button>
                <button 
                  onClick={() => navigate('/purchase-history')}
                  className="flex-1 bg-transparent border border-galactic-white/30 text-galactic-white font-body py-3 px-6 rounded-full hover:bg-galactic-white/10 transition-all duration-300"
                >
                  View Purchases
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Premium User Features */}
        {isPremium && (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              onClick={() => navigate('/see-who-liked-you')}
              className="w-full bg-galactic-teal hover:bg-galactic-teal/80 text-galactic-white font-heading py-4 px-6 rounded-full transition-all duration-300 flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <i className="bi bi-eye text-xl"></i>
              <span>See Who Liked You</span>
            </motion.button>
            
            <motion.button
              onClick={() => navigate('/purchase-history')}
              className="w-full bg-cosmic-card hover:bg-galactic-purple/20 text-galactic-white font-body py-3 px-6 rounded-full transition-all duration-300 flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <i className="bi bi-receipt"></i>
              <span>Purchase History</span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Profile;
