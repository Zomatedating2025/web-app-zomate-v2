import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import CosmicBackground from '../components/CosmicBackground';
import { CompatibilityService } from '../services/compatibilityService';
import { formatDistanceToNow } from 'date-fns';

const Matches: React.FC = () => {
  const { matches, conversations, messages, currentUser } = useAppStore();
  const navigate = useNavigate();

  // Create sample conversations for existing matches
  useEffect(() => {
    if (matches.length > 0 && Object.keys(conversations).length === 0) {
      // Add some sample messages to make the chat feel alive
      const sampleMessages = [
        "Hey! I love your cosmic energy! ✨",
        "Your Scorpio vibes are amazing 🌙",
        "Would love to chat about astrology sometime!",
        "The stars really aligned for us to match! 💫",
        "Your profile caught my eye - fellow water sign here! 🌊"
      ];

      matches.forEach((match, index) => {
        const conversationId = `${currentUser?.id}_${match.user.id}`;
        if (index < 2) { // Add messages to first 2 matches
          window.setTimeout(() => {
            // Simulate receiving a message
            const message = {
              id: Date.now().toString() + index,
              senderId: match.user.id,
              receiverId: currentUser?.id || '',
              text: sampleMessages[index % sampleMessages.length],
              timestamp: new Date(Date.now() - (index + 1) * 3600000), // Hours ago
              isRead: false,
              type: 'text' as const,
            };
            
            // This would normally be handled by the store
            // For demo purposes, we'll just show the UI
          }, 1000);
        }
      });
    }
  }, [matches, conversations, currentUser]);

  const getConversationForMatch = (match: any) => {
    const conversationId = `${currentUser?.id}_${match.user.id}`;
    return conversations[conversationId];
  };

  const getLastMessage = (match: any) => {
    const conversationId = `${currentUser?.id}_${match.user.id}`;
    const conversationMessages = messages[conversationId] || [];
    return conversationMessages[conversationMessages.length - 1];
  };

  const getUnreadCount = (match: any) => {
    const conversation = getConversationForMatch(match);
    return conversation?.unreadCount || 0;
  };

  const handleMatchClick = (match: any) => {
    const conversationId = `${currentUser?.id}_${match.user.id}`;
    navigate(`/chat/${conversationId}`, { 
      state: { 
        user: match.user,
        matchId: match.id 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-cosmic-gradient relative">
      <CosmicBackground />
      
      {/* Header */}
      <div className="relative z-10 p-4 border-b border-galactic-purple/30">
        <h1 className="text-2xl font-heading text-galactic-white text-center">Messages</h1>
        <p className="text-galactic-lavender font-body text-center text-sm mt-1">
          Your cosmic connections await
        </p>
      </div>

      <div className="relative z-10 p-4">
        {matches.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <i className="bi bi-chat-heart text-6xl text-galactic-purple/50 mb-4 block"></i>
            <h3 className="text-xl font-heading text-galactic-white mb-2">No matches yet</h3>
            <p className="text-galactic-white/70 font-body mb-6">
              Start exploring to find your cosmic connection!
            </p>
            <button
              onClick={() => navigate('/home')}
              className="bg-galactic-purple hover:bg-galactic-purple/80 text-galactic-white font-heading py-3 px-6 rounded-full transition-all duration-300"
            >
              Start Exploring
            </button>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {matches.map((match, index) => {
              const lastMessage = getLastMessage(match);
              const unreadCount = getUnreadCount(match);
              const hasMessages = lastMessage !== undefined;
              const compatibility = currentUser ? CompatibilityService.calculateCompatibility(currentUser, match.user) : null;
              
              return (
                <motion.div
                  key={match.id}
                  className="bg-card-gradient rounded-2xl p-4 cursor-pointer hover:bg-galactic-purple/10 transition-all duration-300 border border-galactic-purple/20"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleMatchClick(match)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={match.user.photos[0]}
                        alt={match.user.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-galactic-gold/30"
                        crossOrigin="anonymous"
                      />
                      {match.user.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-galactic-teal rounded-full border-2 border-cosmic-bg"></div>
                      )}
                      {unreadCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-galactic-gold rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-cosmic-bg">{unreadCount}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-heading text-galactic-white truncate">{match.user.name}</h3>
                        <span className="text-sm text-galactic-lavender flex-shrink-0">
                          {match.user.sunSign}
                        </span>
                        {compatibility && (
                          <div className="flex items-center space-x-1">
                            <i className="bi bi-stars text-xs text-galactic-gold"></i>
                            <span className={`text-xs ${CompatibilityService.getCompatibilityColor(compatibility.overall)}`}>
                              {compatibility.overall}%
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-sm text-galactic-white/70 font-body truncate">
                        {hasMessages 
                          ? lastMessage.text 
                          : "You matched! Start the conversation..."
                        }
                      </p>
                    </div>
                    
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-galactic-white/50 font-body mb-1">
                        {hasMessages 
                          ? formatDistanceToNow(lastMessage.timestamp, { addSuffix: true })
                          : formatDistanceToNow(match.matchedAt, { addSuffix: true })
                        }
                      </p>
                      <i className="bi bi-chevron-right text-galactic-white/30"></i>
                    </div>
                  </div>
                  
                  {/* Match indicator for new matches */}
                  {!hasMessages && (
                    <div className="mt-3 pt-3 border-t border-galactic-purple/20">
                      <div className="flex items-center justify-center space-x-2 text-galactic-gold">
                        <i className="bi bi-star-fill text-sm"></i>
                        <span className="text-sm font-body">New cosmic connection!</span>
                        <i className="bi bi-star-fill text-sm"></i>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Quick Actions */}
        {matches.length > 0 && (
          <motion.div
            className="mt-6 bg-galactic-purple/10 rounded-2xl p-4 border border-galactic-purple/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="font-heading text-galactic-white mb-3 flex items-center">
              <i className="bi bi-lightning text-galactic-gold mr-2"></i>
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => navigate('/home')}
                className="bg-cosmic-card hover:bg-galactic-purple/20 text-galactic-white font-body py-3 px-4 rounded-lg transition-all duration-300 text-sm"
              >
                <i className="bi bi-heart mr-2"></i>
                Find More Matches
              </button>
              <button
                onClick={() => navigate('/zodi')}
                className="bg-cosmic-card hover:bg-galactic-purple/20 text-galactic-white font-body py-3 px-4 rounded-lg transition-all duration-300 text-sm"
              >
                <i className="bi bi-stars mr-2"></i>
                Ask Zodi
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Matches;
