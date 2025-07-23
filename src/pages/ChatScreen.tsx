import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import { CompatibilityService } from '../services/compatibilityService';
import CompatibilityMeter from '../components/CompatibilityMeter';
import CosmicBackground from '../components/CosmicBackground';

const ChatScreen: React.FC = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCompatibility, setShowCompatibility] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { 
    messages, 
    currentUser, 
    addMessage, 
    markMessagesAsRead,
    isPremium,
    dailyZodiMessages,
    incrementZodiMessages
  } = useAppStore();

  // Get user info from location state or find from matches
  const chatUser = location.state?.user;
  const chatMessages = messages[conversationId || ''] || [];

  useEffect(() => {
    if (conversationId) {
      markMessagesAsRead(conversationId);
    }
  }, [conversationId, markMessagesAsRead]);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    // Add some initial messages for demo
    if (conversationId && chatMessages.length === 0 && chatUser) {
      const welcomeMessage = {
        id: 'welcome-' + Date.now(),
        senderId: chatUser.id,
        receiverId: currentUser?.id || '',
        text: `Hey ${currentUser?.name}! I'm so excited we matched! ✨ Your ${currentUser?.sunSign} energy really caught my attention. How's your day going?`,
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
        isRead: true,
        type: 'text' as const,
      };
      
      addMessage(conversationId, welcomeMessage);
    }
  }, [conversationId, chatMessages.length, chatUser, currentUser, addMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!inputText.trim() || !conversationId || !currentUser || !chatUser) return;

    const newMessage = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      receiverId: chatUser.id,
      text: inputText,
      timestamp: new Date(),
      isRead: false,
      type: 'text' as const,
    };

    addMessage(conversationId, newMessage);
    setInputText('');
    setIsTyping(true);

    // Simulate response after delay
    const responses = [
      "That's so interesting! Tell me more! ✨",
      "I love your perspective on that! 🌟",
      "You have such a beautiful way of thinking 💫",
      "I feel like we're really connecting! 🌙",
      "Your energy is amazing! ⭐",
      "I'd love to hear more about that! 🌸",
      "You're so thoughtful! 💕",
      "That resonates with me so much! 🔮"
    ];
    
    window.setTimeout(() => {
      const responseMessage = {
        id: (Date.now() + 1).toString(),
        senderId: chatUser.id,
        receiverId: currentUser.id,
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        isRead: true,
        type: 'text' as const,
      };
      
      addMessage(conversationId, responseMessage);
      setIsTyping(false);
    }, 2000 + Math.random() * 3000);
  };

  const getZodiSuggestion = () => {
    if (!isPremium && dailyZodiMessages >= 3) {
      alert('Upgrade to Premium for unlimited Zodi assistance! ✨');
      return;
    }

    const suggestions = [
      `As a ${currentUser?.sunSign}, try asking about their favorite way to unwind - ${chatUser?.sunSign} signs love sharing their peaceful moments! 🌙`,
      `Your ${currentUser?.sunSign} energy pairs beautifully with ${chatUser?.sunSign}! Ask about their dreams and aspirations - you'll connect on a deep level. ✨`,
      `${chatUser?.sunSign} signs appreciate authenticity. Share something meaningful about yourself to deepen your cosmic bond! 💫`,
      `Try complimenting their ${chatUser?.sunSign} traits - mention how you admire their natural wisdom and intuition! 🌟`,
      `Ask about their favorite season or time of day - ${chatUser?.sunSign} signs often have beautiful perspectives on nature's rhythms! 🌸`,
    ];

    const suggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    setInputText(suggestion);
    incrementZodiMessages();
  };

  // Calculate compatibility
  const compatibility = currentUser && chatUser ? CompatibilityService.calculateCompatibility(currentUser, chatUser) : null;

  if (!chatUser) {
    return (
      <div className="min-h-screen bg-cosmic-gradient flex items-center justify-center">
        <div className="text-center">
          <i className="bi bi-exclamation-triangle text-4xl text-galactic-gold mb-4 block"></i>
          <h2 className="text-xl font-heading text-galactic-white mb-2">Chat not found</h2>
          <button
            onClick={() => navigate('/matches')}
            className="bg-galactic-purple text-galactic-white font-heading py-2 px-6 rounded-full"
          >
            Back to Messages
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cosmic-gradient relative flex flex-col">
      <CosmicBackground />
      
      {/* Header */}
      <div className="relative z-10 p-4 border-b border-galactic-purple/30 bg-cosmic-card/50 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <motion.button
            onClick={() => navigate('/matches')}
            className="p-2 hover:bg-galactic-purple/20 rounded-full transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <i className="bi bi-arrow-left text-galactic-white text-xl"></i>
          </motion.button>
          
          <div className="relative">
            <img
              src={chatUser.photos[0]}
              alt={chatUser.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-galactic-gold/30"
              crossOrigin="anonymous"
            />
            {chatUser.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-galactic-teal rounded-full border-2 border-cosmic-bg"></div>
            )}
          </div>
          
          <div className="flex-1">
            <h1 className="text-lg font-heading text-galactic-white">{chatUser.name}</h1>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-galactic-lavender">{chatUser.sunSign}</span>
              <span className="text-galactic-white/30">•</span>
              {compatibility && (
                <div className="flex items-center space-x-1">
                  <i className="bi bi-stars text-xs text-galactic-gold"></i>
                  <span className={`text-xs ${CompatibilityService.getCompatibilityColor(compatibility.overall)}`}>
                    {compatibility.overall}% match
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {compatibility && (
            <motion.button
              onClick={() => setShowCompatibility(!showCompatibility)}
              className="p-2 bg-galactic-purple/20 hover:bg-galactic-purple/40 rounded-full transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <i className="bi bi-graph-up text-galactic-gold text-xl"></i>
            </motion.button>
          )}
          
          <motion.button
            onClick={getZodiSuggestion}
            className="p-2 bg-galactic-purple/20 hover:bg-galactic-purple/40 rounded-full transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <i className="bi bi-moon-stars text-galactic-gold text-xl"></i>
          </motion.button>
        </div>
      </div>

      {/* Compatibility Panel */}
      <AnimatePresence>
        {showCompatibility && compatibility && (
          <motion.div
            className="relative z-10 bg-card-gradient border-b border-galactic-purple/30 p-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <h3 className="text-galactic-white font-heading mb-3">
                Your Compatibility with {chatUser.name}
              </h3>
              <CompatibilityMeter 
                compatibility={compatibility} 
                showDetails={true}
                size="md"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <div className="flex-1 relative z-10 p-4 overflow-y-auto">
        <div className="space-y-4">
          {/* Welcome message */}
          <motion.div
            className="text-center py-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-galactic-purple/20 rounded-2xl p-4 max-w-xs mx-auto">
              <i className="bi bi-stars text-2xl text-galactic-gold mb-2 block"></i>
              <p className="text-sm text-galactic-white/80 font-body">
                You and {chatUser.name} are a cosmic match! ✨
              </p>
              {compatibility && (
                <p className="text-xs text-galactic-gold mt-1">
                  {compatibility.overall}% compatibility
                </p>
              )}
            </div>
          </motion.div>

          {chatMessages.map((message) => {
            const isOwn = message.senderId === currentUser?.id;
            return (
              <motion.div
                key={message.id}
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    isOwn
                      ? 'bg-galactic-purple text-galactic-white'
                      : 'bg-card-gradient text-galactic-white border border-galactic-purple/30'
                  }`}
                >
                  <p className="font-body text-sm leading-relaxed">{message.text}</p>
                  <p className="text-xs opacity-60 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            );
          })}
          
          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="bg-card-gradient border border-galactic-purple/30 px-4 py-3 rounded-2xl">
                  <div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-galactic-lavender rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      {chatMessages.length <= 2 && (
        <div className="relative z-10 px-4 pb-2">
          <div className="flex space-x-2 overflow-x-auto">
            {[
              "How's your day going? ✨",
              "What's your favorite thing about astrology? 🌟",
              "Tell me about your interests! 💫"
            ].map((suggestion, index) => (
              <motion.button
                key={index}
                className="bg-cosmic-card border border-galactic-purple/30 text-galactic-white font-body text-sm py-2 px-4 rounded-full hover:bg-galactic-purple/20 transition-all duration-300 whitespace-nowrap"
                whileTap={{ scale: 0.95 }}
                onClick={() => setInputText(suggestion)}
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="relative z-10 p-4 border-t border-galactic-purple/30 bg-cosmic-card/50 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Send a cosmic message..."
            className="flex-1 bg-cosmic-card border border-galactic-purple/30 rounded-full px-4 py-3 text-galactic-white placeholder-galactic-white/50 focus:border-galactic-purple focus:outline-none"
          />
          
          <motion.button
            onClick={handleSendMessage}
            className="w-12 h-12 bg-galactic-purple rounded-full flex items-center justify-center disabled:opacity-50"
            whileTap={{ scale: 0.95 }}
            disabled={!inputText.trim()}
          >
            <i className="bi bi-send text-galactic-white"></i>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
