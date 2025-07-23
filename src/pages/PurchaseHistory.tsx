import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import CosmicBackground from '../components/CosmicBackground';
import { formatDistanceToNow } from 'date-fns';

const PurchaseHistory: React.FC = () => {
  const { purchases, isPremium } = useAppStore();
  const navigate = useNavigate();

  const getStatusColor = (purchase: any) => {
    if (purchase.type === 'subscription') {
      return isPremium ? 'text-galactic-teal' : 'text-galactic-white/50';
    }
    
    if (purchase.expiresAt && new Date() > purchase.expiresAt) {
      return 'text-galactic-white/50';
    }
    
    return 'text-galactic-teal';
  };

  const getStatusText = (purchase: any) => {
    if (purchase.type === 'subscription') {
      return isPremium ? 'Active' : 'Expired';
    }
    
    if (purchase.expiresAt && new Date() > purchase.expiresAt) {
      return 'Expired';
    }
    
    return purchase.expiresAt ? 'Active' : 'Purchased';
  };

  return (
    <div className="min-h-screen bg-cosmic-gradient relative">
      <CosmicBackground />
      
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-4">
        <motion.button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-galactic-purple/20 rounded-full transition-colors"
          whileTap={{ scale: 0.95 }}
        >
          <i className="bi bi-arrow-left text-galactic-white text-xl"></i>
        </motion.button>
        <h1 className="text-xl font-heading text-galactic-white">Purchase History</h1>
        <div className="w-10"></div>
      </div>

      <div className="relative z-10 p-4">
        {purchases.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <i className="bi bi-receipt text-6xl text-galactic-purple/50 mb-4 block"></i>
            <h3 className="text-xl font-heading text-galactic-white mb-2">No purchases yet</h3>
            <p className="text-galactic-white/70 font-body mb-6">
              Start your cosmic journey with Premium features!
            </p>
            <button
              onClick={() => navigate('/premium')}
              className="bg-galactic-purple hover:bg-galactic-purple/80 text-galactic-white font-heading py-3 px-6 rounded-full transition-all duration-300"
            >
              Explore Premium
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {purchases.map((purchase, index) => (
              <motion.div
                key={purchase.id}
                className="bg-card-gradient rounded-2xl p-4 border border-galactic-purple/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-galactic-gold/20 rounded-full flex items-center justify-center">
                      <i className={`${
                        purchase.type === 'subscription' ? 'bi-crown' : 'bi-lightning'
                      } text-galactic-gold`}></i>
                    </div>
                    <div>
                      <h3 className="font-heading text-galactic-white">
                        {purchase.name}
                      </h3>
                      <p className="text-galactic-white/60 font-body text-sm">
                        {purchase.type === 'subscription' ? 'Subscription' : 'One-time purchase'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-galactic-gold font-heading">
                      {purchase.price}
                    </p>
                    <p className={`font-body text-sm ${getStatusColor(purchase)}`}>
                      {getStatusText(purchase)}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-galactic-white/50 font-body">Purchased</p>
                    <p className="text-galactic-white font-body">
                      {formatDistanceToNow(purchase.purchasedAt, { addSuffix: true })}
                    </p>
                  </div>
                  {purchase.expiresAt && (
                    <div>
                      <p className="text-galactic-white/50 font-body">
                        {new Date() > purchase.expiresAt ? 'Expired' : 'Expires'}
                      </p>
                      <p className="text-galactic-white font-body">
                        {formatDistanceToNow(purchase.expiresAt, { addSuffix: true })}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Current Status */}
        <motion.div
          className="mt-8 bg-gradient-to-r from-galactic-purple/20 to-galactic-teal/20 rounded-2xl p-6 border border-galactic-gold/30"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-center">
            <i className={`${isPremium ? 'bi-crown' : 'bi-star'} text-4xl ${
              isPremium ? 'text-galactic-gold' : 'text-galactic-purple'
            } mb-3 block`}></i>
            <h3 className="text-lg font-heading text-galactic-white mb-2">
              {isPremium ? 'Premium Active' : 'Free Account'}
            </h3>
            <p className="text-galactic-white/80 font-body text-sm mb-4">
              {isPremium 
                ? 'Enjoy unlimited access to all cosmic features'
                : 'Upgrade to unlock your full cosmic potential'
              }
            </p>
            {!isPremium && (
              <button
                onClick={() => navigate('/premium')}
                className="bg-galactic-gold hover:bg-galactic-gold/90 text-cosmic-bg font-heading py-3 px-8 rounded-full transition-all duration-300"
              >
                Upgrade Now
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PurchaseHistory;
