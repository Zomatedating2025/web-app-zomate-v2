import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PaymentModal from './PaymentModal';

interface OneTimePurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: string;
  description: string;
}

const OneTimePurchaseModal: React.FC<OneTimePurchaseModalProps> = ({ 
  isOpen, 
  onClose, 
  feature, 
  description 
}) => {
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<any>(null);
  const navigate = useNavigate();

  const oneTimePurchases = [
    {
      id: 'unlock-natal-chart',
      name: 'Unlock Moon & Rising Signs',
      price: '$1.99',
      description: 'Get your complete astrological profile with Moon and Rising signs',
      icon: 'bi-diagram-3',
      popular: false,
    },
    {
      id: 'profile-boost',
      name: 'Profile Boost',
      price: '$2.99',
      description: 'Get 10x more visibility for 24 hours',
      icon: 'bi-rocket',
      duration: '24 hours',
      popular: true,
    },
    {
      id: 'see-who-liked-24h',
      name: 'See Who Liked You',
      price: '$3.99',
      description: 'View all your admirers for 24 hours',
      icon: 'bi-eye',
      duration: '24 hours',
      popular: false,
    },
    {
      id: 'compatibility-report',
      name: 'Zodi Compatibility Report',
      price: '$2.49',
      description: 'Detailed astrological compatibility analysis',
      icon: 'bi-stars',
      popular: false,
    },
    {
      id: 'zodi-icebreaker',
      name: 'Zodi Icebreaker',
      price: '$0.99',
      description: 'Get a personalized conversation starter',
      icon: 'bi-chat-heart',
      popular: false,
    },
  ];

  const handlePurchaseSelect = (purchase: any) => {
    setSelectedPurchase(purchase);
    setShowPayment(true);
  };

  const handlePurchaseSuccess = () => {
    // Handle successful purchase
    alert(`Successfully purchased ${selectedPurchase.name}! 🌟`);
    onClose();
  };

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
                  className="w-16 h-16 mx-auto mb-4 bg-galactic-gold/20 rounded-full flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                >
                  <i className="bi bi-lightning text-2xl text-galactic-gold"></i>
                </motion.div>
                
                <h2 className="text-xl font-heading text-galactic-gold mb-2">
                  Unlock {feature}
                </h2>
                <p className="text-galactic-white/80 font-body text-sm mb-4">
                  {description}
                </p>
                
                <div className="bg-galactic-purple/20 rounded-lg p-3 mb-4">
                  <p className="text-galactic-white/70 font-body text-xs">
                    Choose a one-time purchase or upgrade to Premium for unlimited access
                  </p>
                </div>
              </div>

              {/* One-Time Purchases */}
              <div className="space-y-3 mb-6">
                <h3 className="text-galactic-white font-heading mb-3">One-Time Purchases</h3>
                {oneTimePurchases.map((purchase, index) => (
                  <motion.button
                    key={purchase.id}
                    className="w-full bg-cosmic-card hover:bg-galactic-purple/20 border border-galactic-purple/30 rounded-xl p-4 text-left transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePurchaseSelect(purchase)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-galactic-gold/20 rounded-full flex items-center justify-center">
                          <i className={`${purchase.icon} text-galactic-gold`}></i>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-heading text-galactic-white text-sm">
                              {purchase.name}
                            </h4>
                            {purchase.popular && (
                              <span className="bg-galactic-teal text-cosmic-bg text-xs font-bold px-2 py-1 rounded-full">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-galactic-white/60 font-body text-xs">
                            {purchase.description}
                          </p>
                          {purchase.duration && (
                            <p className="text-galactic-teal font-body text-xs mt-1">
                              Valid for {purchase.duration}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-galactic-gold font-heading">
                          {purchase.price}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Premium Option */}
              <div className="border-t border-galactic-purple/30 pt-6">
                <motion.button
                  className="w-full bg-gradient-to-r from-galactic-gold/20 to-galactic-purple/20 border border-galactic-gold/50 rounded-xl p-4 text-center transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onClose();
                    navigate('/premium');
                  }}
                >
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <i className="bi bi-crown text-galactic-gold text-lg"></i>
                    <h4 className="font-heading text-galactic-white">
                      Or Get Premium
                    </h4>
                  </div>
                  <p className="text-galactic-white/70 font-body text-sm mb-2">
                    Unlimited access to all features
                  </p>
                  <p className="text-galactic-gold font-heading">
                    Starting at $9.99/month
                  </p>
                </motion.button>
              </div>

              {/* Close Button */}
              <motion.button
                className="w-full mt-4 bg-transparent border border-galactic-white/30 text-galactic-white font-body py-3 px-6 rounded-full hover:bg-galactic-white/10 transition-all duration-300"
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
      {selectedPurchase && (
        <PaymentModal
          isOpen={showPayment}
          onClose={() => setShowPayment(false)}
          purchaseType="one-time"
          item={selectedPurchase}
          onSuccess={handlePurchaseSuccess}
        />
      )}
    </>
  );
};

export default OneTimePurchaseModal;
