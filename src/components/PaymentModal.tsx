import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/appStore';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  purchaseType: 'subscription' | 'one-time';
  item: {
    id: string;
    name: string;
    price: string;
    description: string;
    icon: string;
    duration?: string;
  };
  onSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ 
  isOpen, 
  onClose, 
  purchaseType, 
  item, 
  onSuccess 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'google'>('card');
  const { addPurchase } = useAppStore();

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => window.setTimeout(resolve, 2000));
    
    // Add purchase to store
    addPurchase({
      id: Date.now().toString(),
      itemId: item.id,
      name: item.name,
      price: item.price,
      type: purchaseType,
      purchasedAt: new Date(),
      expiresAt: purchaseType === 'subscription' 
        ? new Date(Date.now() + (item.id.includes('yearly') ? 365 : 30) * 24 * 60 * 60 * 1000)
        : item.duration 
          ? new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours for temporary features
          : undefined
    });
    
    setIsProcessing(false);
    onSuccess();
    onClose();
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
                className="w-16 h-16 mx-auto mb-4 bg-galactic-gold/20 rounded-full flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              >
                <i className={`${item.icon} text-2xl text-galactic-gold`}></i>
              </motion.div>
              
              <h2 className="text-xl font-heading text-galactic-white mb-2">
                {item.name}
              </h2>
              <p className="text-galactic-white/70 font-body text-sm mb-4">
                {item.description}
              </p>
              
              <div className="text-center">
                <span className="text-3xl font-heading text-galactic-gold">
                  {item.price}
                </span>
                {item.duration && (
                  <span className="text-galactic-white/60 font-body ml-1">
                    {item.duration}
                  </span>
                )}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-6">
              <h3 className="text-galactic-white font-heading mb-3 text-sm">Payment Method</h3>
              <div className="space-y-2">
                <motion.button
                  className={`w-full p-3 rounded-lg border transition-all duration-300 flex items-center space-x-3 ${
                    paymentMethod === 'card'
                      ? 'border-galactic-gold bg-galactic-gold/10'
                      : 'border-galactic-purple/30 hover:border-galactic-purple/50'
                  }`}
                  onClick={() => setPaymentMethod('card')}
                  whileTap={{ scale: 0.98 }}
                >
                  <i className="bi bi-credit-card text-galactic-white"></i>
                  <span className="text-galactic-white font-body">Credit/Debit Card</span>
                  {paymentMethod === 'card' && (
                    <i className="bi bi-check-circle-fill text-galactic-gold ml-auto"></i>
                  )}
                </motion.button>
                
                <motion.button
                  className={`w-full p-3 rounded-lg border transition-all duration-300 flex items-center space-x-3 ${
                    paymentMethod === 'apple'
                      ? 'border-galactic-gold bg-galactic-gold/10'
                      : 'border-galactic-purple/30 hover:border-galactic-purple/50'
                  }`}
                  onClick={() => setPaymentMethod('apple')}
                  whileTap={{ scale: 0.98 }}
                >
                  <i className="bi bi-apple text-galactic-white"></i>
                  <span className="text-galactic-white font-body">Apple Pay</span>
                  {paymentMethod === 'apple' && (
                    <i className="bi bi-check-circle-fill text-galactic-gold ml-auto"></i>
                  )}
                </motion.button>
                
                <motion.button
                  className={`w-full p-3 rounded-lg border transition-all duration-300 flex items-center space-x-3 ${
                    paymentMethod === 'google'
                      ? 'border-galactic-gold bg-galactic-gold/10'
                      : 'border-galactic-purple/30 hover:border-galactic-purple/50'
                  }`}
                  onClick={() => setPaymentMethod('google')}
                  whileTap={{ scale: 0.98 }}
                >
                  <i className="bi bi-google text-galactic-white"></i>
                  <span className="text-galactic-white font-body">Google Pay</span>
                  {paymentMethod === 'google' && (
                    <i className="bi bi-check-circle-fill text-galactic-gold ml-auto"></i>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-galactic-teal/10 rounded-lg p-3 mb-6 border border-galactic-teal/30">
              <div className="flex items-center space-x-2">
                <i className="bi bi-shield-check text-galactic-teal"></i>
                <span className="text-galactic-white/80 font-body text-xs">
                  Secure payment powered by Stripe
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <motion.button
                className="w-full bg-galactic-gold hover:bg-galactic-gold/90 text-cosmic-bg font-heading py-3 px-6 rounded-full transition-all duration-300 disabled:opacity-50"
                whileHover={{ scale: isProcessing ? 1 : 1.05 }}
                whileTap={{ scale: isProcessing ? 1 : 0.95 }}
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <motion.div
                      className="w-4 h-4 border-2 border-cosmic-bg border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    <span>Processing...</span>
                  </div>
                ) : (
                  `Purchase ${item.price}`
                )}
              </motion.button>
              
              <motion.button
                className="w-full bg-transparent border border-galactic-white/30 text-galactic-white font-body py-3 px-6 rounded-full hover:bg-galactic-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                disabled={isProcessing}
              >
                Cancel
              </motion.button>
            </div>

            {/* Terms */}
            <p className="text-galactic-white/50 font-body text-xs text-center mt-4">
              By purchasing, you agree to our Terms of Service and Privacy Policy.
              {purchaseType === 'subscription' && ' Subscription auto-renews unless cancelled.'}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
