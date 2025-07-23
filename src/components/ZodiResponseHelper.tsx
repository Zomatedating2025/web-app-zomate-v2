import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';

interface ZodiResponseHelperProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResponse: (response: string) => void;
  chatPartner: {
    name: string;
    sunSign: string;
    moonSign?: string;
    interests?: string[];
  };
  conversationContext?: string[];
}

const ZodiResponseHelper: React.FC<ZodiResponseHelperProps> = ({ 
  isOpen, 
  onClose, 
  onSelectResponse,
  chatPartner,
  conversationContext = []
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { isPremium, dailyZodiMessages, incrementZodiMessages } = useAppStore();
  const navigate = useNavigate();

  const canUseZodi = isPremium || dailyZodiMessages < 5;

  const generateSuggestions = async () => {
    if (!canUseZodi) {
      return;
    }

    setIsGenerating(true);
    incrementZodiMessages();

    // Simulate AI generation delay
    await new Promise(resolve => window.setTimeout(resolve, 2000));

    // Generate contextual responses based on partner's astrology and conversation
    const responses = getZodiSuggestions(chatPartner, conversationContext);
    setSuggestions(responses);
    setIsGenerating(false);
  };

  const getZodiSuggestions = (partner: any, context: string[]) => {
    const signTraits = {
      'Aries': { energy: 'fiery', likes: 'adventure and spontaneity', approach: 'direct and enthusiastic' },
      'Taurus': { energy: 'grounded', likes: 'comfort and sensuality', approach: 'steady and genuine' },
      'Gemini': { energy: 'curious', likes: 'intellectual stimulation', approach: 'witty and engaging' },
      'Cancer': { energy: 'nurturing', likes: 'emotional connection', approach: 'caring and intuitive' },
      'Leo': { energy: 'radiant', likes: 'appreciation and drama', approach: 'confident and warm' },
      'Virgo': { energy: 'thoughtful', likes: 'meaningful details', approach: 'considerate and helpful' },
      'Libra': { energy: 'harmonious', likes: 'beauty and balance', approach: 'charming and diplomatic' },
      'Scorpio': { energy: 'intense', likes: 'depth and mystery', approach: 'passionate and authentic' },
      'Sagittarius': { energy: 'adventurous', likes: 'freedom and exploration', approach: 'optimistic and philosophical' },
      'Capricorn': { energy: 'ambitious', likes: 'goals and achievement', approach: 'respectful and determined' },
      'Aquarius': { energy: 'innovative', likes: 'uniqueness and ideals', approach: 'original and friendly' },
      'Pisces': { energy: 'dreamy', likes: 'imagination and empathy', approach: 'gentle and creative' }
    };

    const partnerTraits = signTraits[partner.sunSign as keyof typeof signTraits];
    
    const suggestions = [
      `Your ${partner.sunSign} energy is so ${partnerTraits.energy}! What's been inspiring you lately? ✨`,
      `I love how ${partner.sunSign} signs appreciate ${partnerTraits.likes}. Tell me about something that made you smile today 😊`,
      `As a ${partner.sunSign}, you probably have amazing stories about ${partnerTraits.likes}. I'd love to hear one! 🌟`,
      `Your ${partnerTraits.energy} ${partner.sunSign} vibe is magnetic! What's your favorite way to unwind? 🌙`,
      `I'm curious about your ${partner.sunSign} perspective on this - what do you think makes a perfect evening? 💫`
    ];

    // Add interest-based suggestions if available
    if (partner.interests && partner.interests.length > 0) {
      const sharedInterest = partner.interests[0];
      suggestions.push(
        `I noticed you're into ${sharedInterest}! That's so cool - what got you started with that? 🎯`,
        `Your passion for ${sharedInterest} really shows your ${partner.sunSign} spirit! Any recent discoveries? 🔥`
      );
    }

    // Add moon sign suggestions if available
    if (partner.moonSign) {
      suggestions.push(
        `With your ${partner.sunSign} sun and ${partner.moonSign} moon, you must have such interesting emotional depths. What moves your soul? 🌊`,
        `Your ${partner.moonSign} moon probably gives you amazing intuition! Do you ever get those cosmic gut feelings? 🔮`
      );
    }

    // Return 3 random suggestions
    return suggestions.sort(() => Math.random() - 0.5).slice(0, 3);
  };

  React.useEffect(() => {
    if (isOpen && suggestions.length === 0 && canUseZodi) {
      generateSuggestions();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-card-gradient rounded-3xl p-6 max-w-md w-full border border-galactic-purple/30"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="text-center mb-6">
              <motion.div
                className="w-16 h-16 mx-auto mb-4 bg-galactic-purple/20 rounded-full flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              >
                <i className="bi bi-stars text-2xl text-galactic-gold"></i>
              </motion.div>
              
              <h2 className="text-xl font-heading text-galactic-white mb-2">
                Zodi's Cosmic Suggestions
              </h2>
              <p className="text-galactic-white/70 font-body text-sm">
                Perfect responses for {partner.name} ({partner.sunSign})
              </p>
              
              {!isPremium && (
                <div className="bg-cosmic-card rounded-lg p-3 mt-3">
                  <p className="text-galactic-white/60 font-body text-xs">
                    Daily Zodi help: {dailyZodiMessages}/5 used
                  </p>
                </div>
              )}
            </div>

            {/* Content */}
            {!canUseZodi ? (
              <div className="text-center py-8">
                <i className="bi bi-crown text-4xl text-galactic-gold mb-4 block"></i>
                <h3 className="text-lg font-heading text-galactic-white mb-2">
                  Daily Limit Reached
                </h3>
                <p className="text-galactic-white/70 font-body text-sm mb-6">
                  You've used all 5 daily Zodi suggestions. Upgrade to Premium for unlimited cosmic guidance!
                </p>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/premium');
                  }}
                  className="bg-galactic-gold hover:bg-galactic-gold/90 text-cosmic-bg font-heading py-3 px-6 rounded-full transition-all duration-300"
                >
                  Upgrade to Premium ✨
                </button>
              </div>
            ) : isGenerating ? (
              <div className="text-center py-8">
                <motion.div
                  className="w-12 h-12 mx-auto mb-4 border-4 border-galactic-purple border-t-galactic-gold rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                <p className="text-galactic-white/80 font-body">
                  Zodi is channeling cosmic wisdom...
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="text-galactic-white font-heading mb-3 text-center">
                  Choose a cosmic response:
                </h3>
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={index}
                    className="w-full bg-cosmic-card hover:bg-galactic-purple/20 border border-galactic-purple/30 rounded-xl p-4 text-left transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onSelectResponse(suggestion);
                      onClose();
                    }}
                  >
                    <p className="text-galactic-white font-body text-sm leading-relaxed">
                      {suggestion}
                    </p>
                  </motion.button>
                ))}
                
                <motion.button
                  className="w-full bg-galactic-purple/20 hover:bg-galactic-purple/30 border border-galactic-purple/50 rounded-xl p-3 text-center transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSuggestions([]);
                    generateSuggestions();
                  }}
                  disabled={!canUseZodi}
                >
                  <i className="bi bi-arrow-clockwise text-galactic-gold mr-2"></i>
                  <span className="text-galactic-white font-body text-sm">
                    Generate New Suggestions
                  </span>
                </motion.button>
              </div>
            )}

            {/* Close Button */}
            <motion.button
              className="w-full mt-6 bg-transparent border border-galactic-white/30 text-galactic-white font-body py-3 px-6 rounded-full hover:bg-galactic-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ZodiResponseHelper;
