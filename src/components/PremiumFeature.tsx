import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/appStore';
import OneTimePurchaseModal from './OneTimePurchaseModal';

interface PremiumFeatureProps {
  children: React.ReactNode;
  feature: string;
  description: string;
  className?: string;
  disabled?: boolean;
  allowOneTimePurchase?: boolean;
}

const PremiumFeature: React.FC<PremiumFeatureProps> = ({ 
  children, 
  feature, 
  description, 
  className = '',
  disabled = false,
  allowOneTimePurchase = true
}) => {
  const [showModal, setShowModal] = useState(false);
  const { isPremium, hasPurchase } = useAppStore();

  // Check if user has relevant one-time purchase
  const hasRelevantPurchase = () => {
    if (feature.includes('Moon') || feature.includes('Rising')) {
      return hasPurchase('unlock-natal-chart');
    }
    if (feature.includes('Undo')) {
      return false; // Undo is Premium-only
    }
    if (feature.includes('Who Liked')) {
      return hasPurchase('see-who-liked-24h');
    }
    if (feature.includes('Boost')) {
      return hasPurchase('profile-boost');
    }
    return false;
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isPremium && !hasRelevantPurchase() && !disabled) {
      e.preventDefault();
      e.stopPropagation();
      setShowModal(true);
    }
  };

  if (isPremium || hasRelevantPurchase()) {
    return <>{children}</>;
  }

  return (
    <>
      <div 
        className={`relative ${className}`}
        onClick={handleClick}
      >
        {/* Premium Overlay */}
        <div className="relative">
          {children}
          
          {/* Lock Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] rounded-lg flex items-center justify-center cursor-pointer">
            <motion.div
              className="bg-galactic-gold/20 backdrop-blur-sm rounded-full p-3 border border-galactic-gold/50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(255, 215, 0, 0.3)',
                  '0 0 30px rgba(255, 215, 0, 0.5)',
                  '0 0 20px rgba(255, 215, 0, 0.3)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <i className="bi bi-crown text-galactic-gold text-xl"></i>
            </motion.div>
          </div>
        </div>
      </div>

      {allowOneTimePurchase ? (
        <OneTimePurchaseModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          feature={feature}
          description={description}
        />
      ) : (
        // For Premium-only features, show direct Premium modal
        <OneTimePurchaseModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          feature={feature}
          description={description}
        />
      )}
    </>
  );
};

export default PremiumFeature;
