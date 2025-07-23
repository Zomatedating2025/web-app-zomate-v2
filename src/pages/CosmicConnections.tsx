import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import CosmicBackground from '../components/CosmicBackground';
import { formatDistanceToNow } from 'date-fns';

const CosmicConnections: React.FC = () => {
  const { cosmicConnections } = useAppStore();
  const navigate = useNavigate();

  const getCompatibilityColor = (score: number) => {
    if (score >= 80) return 'text-galactic-gold';
    if (score >= 60) return 'text-galactic-teal';
    if (score >= 40) return 'text-galactic-lavender';
    return 'text-galactic-white/60';
  };

  const getCompatibilityLabel = (score: number) => {
    if (score >= 80) return 'Cosmic Soulmates';
    if (score >= 60) return 'Star-Crossed';
    if (score >= 40) return 'Celestial Harmony';
    return 'Exploring the Stars';
  };

  return (
    <div className="min-h-screen bg-cosmic-gradient relative">
      <CosmicBackground />
      
      {/* Header */}
      <div className="relative z-10 p-4 border-b border-galactic-purple/30">
        <h1 className="text-2xl font-heading text-galactic-white text-center">Cosmic Connections</h1>
        <p className="text-galactic-lavender font-body text-center text-sm mt-1">
          Your celestial bonds await
        </p>
      </div>

      <div className="relative z-10 p-4">
        {cosmicConnections.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <i className="bi bi-stars text-6xl text-galactic-purple/50 mb-4 block"></i>
            <h3 className="text-xl font-heading text-galactic-white mb-2">No cosmic connections yet</h3>
            <p className="text-galactic-white/70 font-body mb-6">
              Keep exploring to find your stellar matches!
            </p>
            <button
              onClick={() => navigate('/home')}
              className="bg-galactic-purple hover:bg-galactic-purple/80 text-galactic-white font-heading py-3 px-6 rounded-full transition-all duration-300"
            >
              Start Discovering
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {cosmicConnections.map((connection, index) => (
              <motion.div
                key={connection.id}
                className="bg-card-gradient rounded-2xl p-4 cursor-pointer hover:bg-galactic-purple/10 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(`/chat/${connection.id}`)}
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={connection.user.photos[0]}
                      alt={connection.user.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-galactic-gold/30"
                      crossOrigin="anonymous"
                    />
                    {connection.user.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-galactic-teal rounded-full border-2 border-cosmic-bg"></div>
                    )}
                    {connection.unread > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-galactic-gold rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-cosmic-bg">{connection.unread}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-heading text-galactic-white">{connection.user.name}</h3>
                      <span className="text-sm text-galactic-lavender">
                        {connection.user.sunSign}
                      </span>
                      <div className="flex items-center space-x-1">
                        <i className="bi bi-stars text-xs text-galactic-gold"></i>
                        <span className={`text-xs font-body ${getCompatibilityColor(connection.compatibilityScore)}`}>
                          {connection.compatibilityScore}%
                        </span>
                      </div>
                    </div>
                    
                    <p className={`text-xs font-body mb-1 ${getCompatibilityColor(connection.compatibilityScore)}`}>
                      {getCompatibilityLabel(connection.compatibilityScore)}
                    </p>
                    
                    <p className="text-sm text-galactic-white/70 font-body truncate">
                      {connection.lastMessage?.text || 'Start your cosmic conversation...'}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xs text-galactic-white/50 font-body mb-1">
                      {connection.lastMessage 
                        ? formatDistanceToNow(connection.lastMessage.timestamp, { addSuffix: true })
                        : formatDistanceToNow(connection.connectedAt, { addSuffix: true })
                      }
                    </p>
                    <i className="bi bi-chevron-right text-galactic-white/30"></i>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CosmicConnections;
