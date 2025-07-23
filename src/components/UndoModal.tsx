import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import PaymentModal from './PaymentModal';

interface UndoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUndoPurchased: () => void;
}

const UndoModal: React.FC<UndoModalProps> = ({ isOpen, onClose, onUndoPurchased }) => {
  const [showPayment, setShowPayment] = useState(false);
  const { isPremium, getRemainingUndos } = useAppStore();
  const navigate = useNavigate();

  const undoItem = {
    id: 'single-undo',
    name: 'Single Undo',
    price: '$0.99',
    description: 'Get one more chance to undo your last swipe',
    icon: 'bi-arrow-counterclockwise',
  };

  const handlePurchaseUndo = () => {
    setShowPayment(true);
  };

  const handleUpgradeToPremium = () => {
    onClose();
    navigate('/premium');
  };

  const handleUndoSuccess = () => {
    onUndoPurchased();
    onClose();
  };

  const remainingUndos = getRemainingUndos();

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
              className="bg-card-gradient rounded-3xl p-6 max-w-sm w-full border border-galactic-gold/30"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="text-center mb-6">
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 bg-gray-500/20 rounded-full flex items-center justify-center"
                  animate={{ rotate: [0, -15, 15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <i className="bi bi-arrow-counterclockwise text-2xl text-gray-400"></i>
                </motion.div>
                
                <h2 className="text-xl font-heading text-galactic-white mb-2">
                  No More Undos Today
                </h2>
                <p className="text-galactic-white/70 font-body text-sm mb-4">
                  You've used all {3} of your free daily undos. Get more chances to fix those cosmic mistakes!
                </p>
                
                <div className="bg-cosmic-card rounded-lg p-3 mb-4">
                  <p className="text-galactic-white/60 font-body text-xs">
                    Daily undos reset at midnight. You have {remainingUndos} undos remaining today.
                  </p>
                </div>
              </div>

              {/* Purchase Single Undo */}
              <motion.div
                className="bg-cosmic-card rounded-2xl p-4 mb-4 border border-galactic-purple/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-galactic-gold/20 rounded-full flex items-center justify-center">
                    <i className="bi bi-arrow-counterclockwise text-galactic-gold"></i>
                  </div>
                  <div>
                    <h3 className="font-heading text-galactic-white">Single Undo</h3>
                    <p className="text-galactic-white/60 font-body text-sm">One more chance to fix your swipe</p>
                  </div>
                  <div className="ml-auto">
                    <p className="text-galactic-gold font-heading">$0.99</p>
                  </div>
                </div>
                
                <motion.button
                  className="w-full bg-galactic-gold hover:bg-galactic-gold/90 text-cosmic-bg font-heading py-3 px-6 rounded-full transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePurchaseUndo}
                >
                  Buy Single Undo
                </motion.button>
              </motion.div>

              {/* Premium Option */}
              <motion.div
                className="bg-gradient-to-r from-galactic-gold/20 to-galactic-purple/20 rounded-2xl p-4 border border-galactic-gold/50 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <i className="bi bi-crown text-galactic-gold text-lg"></i>
                    <h3 className="font-heading text-galactic-white">Premium Unlimited</h3>
                  </div>
                  <p className="text-galactic-white/80 font-body text-sm mb-3">
                    Get unlimited undos every day plus all premium features
                  </p>
                  <p className="text-galactic-gold font-heading mb-3">
                    Starting at $9.99/month
                  </p>
                  
                  <motion.button
                    className="w-full bg-galactic-purple hover:bg-galactic-purple/80 text-galactic-white font-heading py-3 px-6 rounded-full transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleUpgradeToPremium}
                  >
                    Unlock Premium ✨
                  </motion.button>
                </div>
              </motion.div>

              {/* Close Button */}
              <motion.button
                className="w-full bg-transparent border border-galactic-white/30 text-galactic-white font-body py-3 px-6 rounded-full hover:bg-galactic-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Maybe Later
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        purchaseType="one-time"
        item={undoItem}
        onSuccess={handleUndoSuccess}
      />
    </>
  );
};

export default UndoModal;
