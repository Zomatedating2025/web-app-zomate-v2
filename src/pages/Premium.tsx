import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import PaymentModal from '../components/PaymentModal';
import CosmicBackground from '../components/CosmicBackground';

const Premium: React.FC = () => {
  const { isPremium, setPremium } = useAppStore();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');
  const [showPayment, setShowPayment] = useState(false);
  const navigate = useNavigate();

  const premiumFeatures = [
    {
      icon: 'bi-diagram-3',
      title: 'Full Natal Chart',
      description: 'Unlock your complete astrological profile with Moon and Rising signs',
      highlight: 'Most Popular',
    },
    {
      icon: 'bi-funnel',
      title: 'Advanced Filters',
      description: 'Filter matches by element, modality, or specific zodiac signs',
      highlight: null,
    },
    {
      icon: 'bi-chat-dots',
      title: 'Unlimited Zodi Chat',
      description: 'Ask unlimited questions to your cosmic AI guide',
      highlight: null,
    },
    {
      icon: 'bi-book',
      title: 'Complete Horoscopes',
      description: 'Access full daily readings for Sun, Moon, Rising + Love insights',
      highlight: null,
    },
    {
      icon: 'bi-eye',
      title: 'See Who Liked You',
      description: 'View all profiles that have swiped right on your cosmic energy',
      highlight: 'Popular',
    },
    {
      icon: 'bi-rocket',
      title: 'Monthly Star Boost',
      description: 'Get 5 profile boosts per month to increase your visibility',
      highlight: null,
    },
    {
      icon: 'bi-arrow-counterclockwise',
      title: 'Undo Swipes',
      description: 'Take back accidental swipes and get second chances',
      highlight: null,
    },
    {
      icon: 'bi-shield-check',
      title: 'Priority Support',
      description: 'Get cosmic customer support with priority response times',
      highlight: null,
    },
  ];

  const plans = {
    monthly: {
      id: 'premium-monthly',
      name: 'Monthly Premium',
      price: '$9.99',
      period: '/month',
      originalPrice: null,
      savings: null,
      description: 'Perfect for exploring your cosmic connections',
      icon: 'bi-crown',
    },
    yearly: {
      id: 'premium-yearly',
      name: 'Yearly Premium',
      price: '$59.99',
      period: '/year',
      originalPrice: '$119.88',
      savings: 'Save 50%',
      description: 'Best value for serious cosmic seekers',
      icon: 'bi-crown',
    },
  };

  const oneTimePurchases = [
    {
      id: 'unlock-natal-chart',
      name: 'Unlock Moon & Rising',
      price: '$1.99',
      description: 'Get your complete astrological profile',
      icon: 'bi-diagram-3',
    },
    {
      id: 'profile-boost',
      name: 'Profile Boost',
      price: '$2.99',
      description: '10x visibility for 24 hours',
      icon: 'bi-rocket',
    },
    {
      id: 'see-who-liked-24h',
      name: 'See Who Liked You',
      price: '$3.99',
      description: 'View admirers for 24 hours',
      icon: 'bi-eye',
    },
  ];

  const handleSubscribe = () => {
    setShowPayment(true);
  };

  const handleSubscriptionSuccess = () => {
    setPremium(true);
    navigate('/home');
  };

  if (isPremium) {
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
          <h1 className="text-xl font-heading text-galactic-white">Premium</h1>
          <div className="w-10"></div>
        </div>
        
        <div className="relative z-10 p-4">
          <div className="text-center py-20">
            <motion.div
              className="w-24 h-24 mx-auto mb-6 bg-galactic-gold/20 rounded-full flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            >
              <i className="bi bi-crown text-4xl text-galactic-gold"></i>
            </motion.div>
            
            <h1 className="text-3xl font-heading text-galactic-white mb-4">
              You're Premium! ✨
            </h1>
            
            <p className="text-galactic-white/80 font-body mb-8">
              Enjoy unlimited access to all cosmic features and find your perfect astrological match.
            </p>
            
            <div className="bg-card-gradient rounded-2xl p-6 max-w-md mx-auto mb-8">
              <h3 className="font-heading text-galactic-white mb-4">Your Premium Benefits</h3>
              <div className="grid grid-cols-2 gap-3">
                {premiumFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <i className={`${feature.icon} text-galactic-gold text-sm`}></i>
                    <span className="text-galactic-white/80 font-body text-xs">
                      {feature.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <motion.button
              onClick={() => navigate('/see-who-liked-you')}
              className="bg-galactic-gold hover:bg-galactic-gold/90 text-cosmic-bg font-heading py-3 px-8 rounded-full transition-all duration-300 mb-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See Who Liked You
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

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
        <h1 className="text-xl font-heading text-galactic-white">ZoMate Premium</h1>
        <div className="w-10"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 p-4 text-center">
        <motion.div
          className="w-20 h-20 mx-auto mb-4 bg-galactic-gold/20 rounded-full flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        >
          <i className="bi bi-crown text-3xl text-galactic-gold"></i>
        </motion.div>
        
        <h1 className="text-3xl font-heading text-galactic-white mb-2">
          Unlock Your Cosmic Potential
        </h1>
        <p className="text-galactic-lavender font-body mb-6">
          Choose your cosmic journey: Premium subscription or individual features
        </p>
      </div>

      <div className="relative z-10 p-4">
        {/* Plan Toggle */}
        <div className="mb-6">
          <div className="bg-cosmic-card rounded-full p-1 flex max-w-xs mx-auto">
            <motion.button
              className={`flex-1 py-2 px-4 rounded-full font-heading text-sm transition-all duration-300 ${
                selectedPlan === 'monthly'
                  ? 'bg-galactic-gold text-cosmic-bg'
                  : 'text-galactic-white'
              }`}
              onClick={() => setSelectedPlan('monthly')}
              whileTap={{ scale: 0.95 }}
            >
              Monthly
            </motion.button>
            <motion.button
              className={`flex-1 py-2 px-4 rounded-full font-heading text-sm transition-all duration-300 relative ${
                selectedPlan === 'yearly'
                  ? 'bg-galactic-gold text-cosmic-bg'
                  : 'text-galactic-white'
              }`}
              onClick={() => setSelectedPlan('yearly')}
              whileTap={{ scale: 0.95 }}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-galactic-teal text-cosmic-bg text-xs font-bold px-2 py-1 rounded-full">
                50% OFF
              </span>
            </motion.button>
          </div>
        </div>

        {/* Selected Plan */}
        <motion.div
          className="bg-gradient-to-r from-galactic-gold/20 to-galactic-purple/20 rounded-2xl p-6 border-2 border-galactic-gold mb-6"
          key={selectedPlan}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center mb-6">
            <h3 className="text-xl font-heading text-galactic-white mb-2">
              {plans[selectedPlan].name}
            </h3>
            <p className="text-galactic-white/60 font-body text-sm mb-4">
              {plans[selectedPlan].description}
            </p>
            
            <div className="flex items-baseline justify-center mb-2">
              <span className="text-3xl font-heading text-galactic-gold">
                {plans[selectedPlan].price}
              </span>
              <span className="text-galactic-white/60 font-body ml-1">
                {plans[selectedPlan].period}
              </span>
            </div>
            
            {plans[selectedPlan].originalPrice && (
              <p className="text-galactic-white/40 font-body text-sm line-through mb-1">
                {plans[selectedPlan].originalPrice}
              </p>
            )}
            
            {plans[selectedPlan].savings && (
              <p className="text-galactic-teal font-body text-sm font-semibold">
                {plans[selectedPlan].savings}
              </p>
            )}
          </div>
          
          <motion.button
            className="w-full bg-galactic-gold text-cosmic-bg hover:bg-galactic-gold/90 font-heading py-4 px-6 rounded-full text-lg transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubscribe}
          >
            Start Premium Journey ✨
          </motion.button>
        </motion.div>

        {/* Features */}
        <div className="mb-8">
          <h2 className="text-lg font-heading text-galactic-white mb-4 text-center">
            Premium Features
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
            {premiumFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-card-gradient rounded-xl p-3 border border-galactic-purple/30"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <i className={`${feature.icon} text-galactic-gold`}></i>
                  <h3 className="font-heading text-galactic-white text-sm">
                    {feature.title}
                  </h3>
                  {feature.highlight && (
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      feature.highlight === 'Most Popular' 
                        ? 'bg-galactic-gold text-cosmic-bg'
                        : 'bg-galactic-teal text-cosmic-bg'
                    }`}>
                      {feature.highlight}
                    </span>
                  )}
                </div>
                <p className="text-galactic-white/70 font-body text-xs">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* One-Time Purchases */}
        <div className="mb-8">
          <h2 className="text-lg font-heading text-galactic-white mb-4 text-center">
            Or Try Individual Features
          </h2>
          <p className="text-galactic-white/60 font-body text-sm text-center mb-4">
            Perfect for trying specific features before committing to Premium
          </p>
          
          <div className="space-y-3">
            {oneTimePurchases.map((purchase, index) => (
              <motion.div
                key={index}
                className="bg-cosmic-card rounded-xl p-4 border border-galactic-purple/30"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-galactic-purple/20 rounded-full flex items-center justify-center">
                      <i className={`${purchase.icon} text-galactic-lavender`}></i>
                    </div>
                    <div>
                      <h3 className="font-heading text-galactic-white text-sm">
                        {purchase.name}
                      </h3>
                      <p className="text-galactic-white/60 font-body text-xs">
                        {purchase.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-galactic-lavender font-heading text-sm">
                      {purchase.price}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Money Back Guarantee */}
        <motion.div
          className="text-center p-4 bg-galactic-teal/10 rounded-xl border border-galactic-teal/30 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <i className="bi bi-shield-check text-galactic-teal text-2xl mb-2 block"></i>
          <p className="text-galactic-white/80 font-body text-sm">
            7-day money-back guarantee • Cancel anytime • No hidden fees
          </p>
        </motion.div>

        {/* Terms */}
        <div className="text-center">
          <p className="text-galactic-white/50 font-body text-xs leading-relaxed">
            By subscribing, you agree to our Terms of Service and Privacy Policy.
            Subscription automatically renews unless cancelled 24 hours before renewal.
          </p>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        purchaseType="subscription"
        item={plans[selectedPlan]}
        onSuccess={handleSubscriptionSuccess}
      />
    </div>
  );
};

export default Premium;
