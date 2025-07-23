import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CosmicBackground from '../components/CosmicBackground';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      navigate('/onboarding');
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-cosmic-gradient flex items-center justify-center relative overflow-hidden">
      <CosmicBackground />
      
      <div className="text-center z-10">
        {/* Logo Animation */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: 'spring', 
            stiffness: 260, 
            damping: 20,
            duration: 1.5 
          }}
        >
          <div className="w-32 h-32 mx-auto bg-galactic-purple rounded-full flex items-center justify-center shadow-2xl animate-glow">
            <i className="bi bi-stars text-6xl text-galactic-gold"></i>
          </div>
        </motion.div>

        {/* App Name */}
        <motion.h1
          className="text-6xl font-heading text-galactic-white mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          ZoMate
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-xl font-body text-galactic-lavender mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Swipe with the Stars
        </motion.p>

        {/* Loading Animation */}
        <motion.div
          className="flex justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-galactic-teal rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10"
          animate={{ y: [-10, 10, -10], rotate: [0, 180, 360] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <i className="bi bi-moon-stars text-2xl text-galactic-lavender opacity-30"></i>
        </motion.div>

        <motion.div
          className="absolute bottom-32 right-16"
          animate={{ y: [10, -10, 10], rotate: [360, 180, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <i className="bi bi-heart text-3xl text-galactic-gold opacity-40"></i>
        </motion.div>
      </div>
    </div>
  );
};

export default SplashScreen;
