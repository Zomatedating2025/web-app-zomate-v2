import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/home', icon: 'bi-heart', label: 'Explore' },
    { path: '/matches', icon: 'bi-chat-heart', label: 'Messages' },
    { path: '/zodi', icon: 'bi-stars', label: 'Zodi' },
    { path: '/horoscope', icon: 'bi-moon-stars', label: 'Horoscope' },
    { path: '/profile', icon: 'bi-person-circle', label: 'Profile' },
  ];

  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 bg-cosmic-card border-t border-galactic-purple/30 backdrop-blur-lg z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex justify-around items-center py-2 px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-300 ${
                isActive 
                  ? 'text-galactic-gold bg-galactic-purple/20' 
                  : 'text-galactic-white/70 hover:text-galactic-white'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <i className={`${item.icon} text-xl mb-1`}></i>
              <span className="text-xs font-body">{item.label}</span>
              {isActive && (
                <motion.div
                  className="absolute -bottom-1 w-8 h-0.5 bg-galactic-gold rounded-full"
                  layoutId="activeTab"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default Navigation;
