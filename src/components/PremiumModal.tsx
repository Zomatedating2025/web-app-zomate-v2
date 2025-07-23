import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: string;
  description: string;
}

const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose, feature, description }) => {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    onClose();
    navigate('/premium');
  };

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
            className="bg-card-gradient rounded-3xl p-8 max-w-sm w-full text-center border border-galactic-gold/30"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Premium Crown */}
            <motion.div
              className="relative mb-6"
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <div className="w-20 h-20 mx-auto bg-galactic-gold/20 rounded-full flex items-center justify-center relative">
                <i className="bi bi-crown text-4xl text-galactic-gold"></i>
                {/* Sparkles */}
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
                      x: [0, 30 * Math.cos((i * Math.PI * 2) / 6)],
                      y: [0, 30 * Math.sin((i * Math.PI * 2) / 6)],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            <motion.h2
              className="text-2xl font-heading text-galactic-gold mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Unlock {feature}
            </motion.h2>

            <motion.p
              className="text-galactic-white/80 font-body mb-6 leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {description}
            </motion.p>

            {/* Premium Benefits Preview */}
            <motion.div
              className="bg-galactic-purple/20 rounded-2xl p-4 mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-galactic-white font-heading mb-3 text-sm">Premium Includes:</h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2">
                  <i className="bi bi-check-circle-fill text-galactic-teal"></i>
                  <span className="text-galactic-white/80 font-body">Unlimited cosmic features</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="bi bi-check-circle-fill text-galactic-teal"></i>
                  <span className="text-galactic-white/80 font-body">Advanced compatibility insights</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="bi bi-check-circle-fill text-galactic-teal"></i>
                  <span className="text-galactic-white/80 font-body">Priority cosmic support</span>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <motion.button
                className="w-full bg-galactic-gold hover:bg-galactic-gold/90 text-cosmic-bg font-heading py-3 px-6 rounded-full transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={handleUpgrade}
              >
                Upgrade to Premium ✨
              </motion.button>
              <motion.button
                className="w-full bg-transparent border border-galactic-white/30 text-galactic-white font-body py-3 px-6 rounded-full hover:bg-galactic-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={onClose}
              >
                Maybe Later
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PremiumModal;
