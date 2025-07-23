import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/appStore';
import PaymentModal from './PaymentModal';

interface ProfileBoostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileBoostModal: React.FC<ProfileBoostModalProps> = ({ isOpen, onClose }) => {
  const [showPayment, setShowPayment] = useState(false);
  const [selectedBoost, setSelectedBoost] = useState<any>(null);
  const { isPremium, hasPurchase } = useAppStore();

  const boostOptions = [
    {
      id: 'profile-boost-1h',
      name: '1 Hour Boost',
      price: '$1.99',
      description: 'Get 10x more visibility for 1 hour',
      icon: 'bi-rocket',
      duration: '1 hour',
      multiplier: '10x',
      popular: false,
    },
    {
      id: 'profile-boost-24h',
      name: '24 Hour Boost',
      price: '$2.99',
      description: 'Get 10x more visibility for 24 hours',
      icon: 'bi-rocket-takeoff',
      duration: '24 hours',
      multiplier: '10x',
      popular: true,
    },
    {
      id: 'profile-boost-week',
      name: 'Weekly Boost',
      price: '$7.99',
      description: 'Get 5x more visibility for 7 days',
      icon: 'bi-lightning',
      duration: '7 days',
      multiplier: '5x',
      popular: false,
    },
  ];

  const handleBoostSelect = (boost: any) => {
    setSelectedBoost(boost);
    setShowPayment(true);
  };

  const handleBoostSuccess = () => {
    // Handle successful boost purchase
    alert(`Profile boost activated! You'll get ${selectedBoost.multiplier} more visibility for ${selectedBoost.duration} 🚀`);
    onClose();
  };

  const hasActiveBoost = hasPurchase('profile-boost-1h') || hasPurchase('profile-boost-24h') || hasPurchase('profile-boost-week');

  return (
    <>
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
              className="bg-card-gradient rounded-3xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto border border-galactic-gold/30"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="text-center mb-6">
                <motion.div
                  className="w-20 h-20 mx-auto mb-4 bg-galactic-gold/20 rounded-full flex items-center justify-center relative"
                  animate={{ 
                    boxShadow: [
                      '0 0 20px rgba(255, 215, 0, 0.3)',
                      '0 0 40px rgba(255, 215, 0, 0.6)',
                      '0 0 20px rgba(255, 215, 0, 0.3)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <i className="bi bi-lightning text-3xl text-galactic-gold"></i>
                  
                  {/* Spark effects */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-galactic-gold rounded-full"
                      style={{
                        left: '50%',
                        top: '50%',
                        transformOrigin: '0 0',
                      }}
                      animate={{
                        rotate: [0, 360],
                        scale: [0, 1, 0],
                        x: [0, 25 * Math.cos((i * Math.PI * 2) / 6)],
                        y: [0, 25 * Math.sin((i * Math.PI * 2) / 6)],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </motion.div>
                
                <h2 className="text-2xl font-heading text-galactic-gold mb-2">
                  Profile Boost
                </h2>
                <p className="text-galactic-white/80 font-body text-sm mb-4">
                  Get more visibility and increase your chances of finding cosmic connections
                </p>
                
                {hasActiveBoost && (
                  <div className="bg-galactic-teal/20 rounded-lg p-3 mb-4 border border-galactic-teal/30">
                    <div className="flex items-center justify-center space-x-2">
                      <i className="bi bi-check-circle-fill text-galactic-teal"></i>
                      <span className="text-galactic-white/80 font-body text-sm">
                        You have an active boost!
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Boost Benefits */}
              <div className="bg-galactic-purple/20 rounded-2xl p-4 mb-6">
                <h3 className="text-galactic-white font-heading mb-3 text-center">Boost Benefits</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <i className="bi bi-eye text-galactic-teal"></i>
                    <span className="text-galactic-white/80 font-body text-sm">
                      Increased profile visibility
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="bi bi-heart text-galactic-gold"></i>
                    <span className="text-galactic-white/80 font-body text-sm">
                      More likes and matches
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="bi bi-star text-galactic-lavender"></i>
                    <span className="text-galactic-white/80 font-body text-sm">
                      Priority in discovery queue
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="bi bi-graph-up text-galactic-white"></i>
                    <span className="text-galactic-white/80 font-body text-sm">
                      Real-time boost analytics
                    </span>
                  </div>
                </div>
              </div>

              {/* Boost Options */}
              <div className="space-y-3 mb-6">
                <h3 className="text-galactic-white font-heading mb-3">Choose Your Boost</h3>
                {boostOptions.map((boost, index) => (
                  <motion.button
                    key={boost.id}
                    className="w-full bg-cosmic-card hover:bg-galactic-purple/20 border border-galactic-purple/30 rounded-xl p-4 text-left transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleBoostSelect(boost)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-galactic-gold/20 rounded-full flex items-center justify-center">
                          <i className={`${boost.icon} text-galactic-gold text-lg`}></i>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-heading text-galactic-white">
                              {boost.name}
                            </h4>
                            {boost.popular && (
                              <span className="bg-galactic-teal text-cosmic-bg text-xs font-bold px-2 py-1 rounded-full">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-galactic-white/60 font-body text-sm">
                            {boost.description}
                          </p>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className="text-galactic-gold font-body text-xs">
                              {boost.multiplier} visibility
                            </span>
                            <span className="text-galactic-teal font-body text-xs">
                              {boost.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-galactic-gold font-heading text-lg">
                          {boost.price}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Premium Info */}
              {!isPremium && (
                <div className="bg-gradient-to-r from-galactic-gold/20 to-galactic-purple/20 rounded-xl p-4 mb-6 border border-galactic-gold/30">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <i className="bi bi-crown text-galactic-gold"></i>
                      <span className="text-galactic-white font-heading text-sm">Premium Members</span>
                    </div>
                    <p className="text-galactic-white/70 font-body text-xs">
                      Get 5 free boosts every month with Premium subscription
                    </p>
                  </div>
                </div>
              )}

              {/* Close Button */}
              <motion.button
                className="w-full bg-transparent border border-galactic-white/30 text-galactic-white font-body py-3 px-6 rounded-full hover:bg-galactic-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
              >
                Maybe Later
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Modal */}
      {selectedBoost && (
        <PaymentModal
          isOpen={showPayment}
          onClose={() => setShowPayment(false)}
          purchaseType="one-time"
          item={selectedBoost}
          onSuccess={handleBoostSuccess}
        />
      )}
    </>
  );
};

export default ProfileBoostModal;
