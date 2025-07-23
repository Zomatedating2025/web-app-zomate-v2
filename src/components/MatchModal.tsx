import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';

interface User {
  id: string;
  name: string;
  age: number;
  sunSign: string;
  photos: string[];
}

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  matchedUser: User;
}

const MatchModal: React.FC<MatchModalProps> = ({ isOpen, onClose, currentUser, matchedUser }) => {
  const navigate = useNavigate();
  const { createConversation } = useAppStore();

  const handleSendMessage = () => {
    // Create conversation and navigate to chat
    const conversationId = createConversation([currentUser.id, matchedUser.id]);
    onClose();
    navigate(`/chat/${conversationId}`, {
      state: {
        user: matchedUser,
        matchId: `${currentUser.id}_${matchedUser.id}`
      }
    });
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
            className="bg-card-gradient rounded-3xl p-8 max-w-sm w-full text-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Constellation Animation */}
            <motion.div
              className="relative mb-6"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-24 h-24 mx-auto bg-galactic-purple/20 rounded-full flex items-center justify-center">
                <i className="bi bi-stars text-4xl text-galactic-gold animate-pulse"></i>
              </div>
              {/* Sparkles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-galactic-teal rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                    transformOrigin: '0 0',
                  }}
                  animate={{
                    rotate: [0, 360],
                    scale: [0, 1, 0],
                    x: [0, 40 * Math.cos((i * Math.PI * 2) / 8)],
                    y: [0, 40 * Math.sin((i * Math.PI * 2) / 8)],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>

            <motion.h2
              className="text-3xl font-heading text-galactic-gold mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Cosmic Connection!
            </motion.h2>

            <motion.p
              className="text-galactic-white/80 font-body mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              The stars have aligned! You and {matchedUser.name} have formed a celestial bond.
            </motion.p>

            {/* Profile Photos */}
            <motion.div
              className="flex justify-center items-center space-x-4 mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-galactic-gold">
                <img
                  src={currentUser.photos[0] || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>
              <motion.i
                className="bi bi-heart-fill text-2xl text-galactic-gold"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              ></motion.i>
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-galactic-gold">
                <img
                  src={matchedUser.photos[0] || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'}
                  alt={matchedUser.name}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <motion.button
                className="w-full bg-galactic-purple hover:bg-galactic-purple/80 text-galactic-white font-heading py-3 px-6 rounded-full transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={handleSendMessage}
              >
                Send Cosmic Message
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
                Continue Exploring
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MatchModal;
