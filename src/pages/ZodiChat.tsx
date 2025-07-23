import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/appStore';
import CosmicBackground from '../components/CosmicBackground';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ZodiChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '✨ Hello, beautiful soul! I\'m Zodi, your cosmic guide to love and relationships. What would you like to know about your astrological journey?',
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentUser, isPremium, dailyZodiMessages, incrementZodiMessages } = useAppStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const zodiacResponses = {
    compatibility: [
      "Your cosmic compatibility depends on how your elements interact! Fire signs (Aries, Leo, Sagittarius) spark with Air signs, while Earth signs (Taurus, Virgo, Capricorn) ground Water signs beautifully. ✨",
      "The stars whisper that opposite signs often create the most magnetic attractions! Think Aries-Libra or Taurus-Scorpio - it's all about balance, darling. 💫"
    ],
    love: [
      "Love is written in the stars, but you hold the pen! Your Venus sign reveals how you express affection, while your Mars sign shows what ignites your passion. 💕",
      "The universe is conspiring to bring you love! Trust in divine timing and keep your heart open to cosmic connections. 🌟"
    ],
    general: [
      "The cosmos has infinite wisdom to share! Ask me about compatibility, your love language based on your signs, or what the stars say about your romantic future. 🔮",
      "Every soul has a unique cosmic blueprint! Your birth chart is like a celestial map guiding you to your perfect match. What aspect would you like to explore? ✨"
    ]
  };

  const getZodiResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('compatibility') || message.includes('match') || message.includes('compatible')) {
      return zodiacResponses.compatibility[Math.floor(Math.random() * zodiacResponses.compatibility.length)];
    } else if (message.includes('love') || message.includes('relationship') || message.includes('romance')) {
      return zodiacResponses.love[Math.floor(Math.random() * zodiacResponses.love.length)];
    } else {
      return zodiacResponses.general[Math.floor(Math.random() * zodiacResponses.general.length)];
    }
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    // Check daily limit for free users
    if (!isPremium && dailyZodiMessages >= 1) {
      const limitMessage: Message = {
        id: Date.now().toString(),
        text: '🌙 You\'ve reached your daily message limit! Upgrade to Premium for unlimited cosmic wisdom. ✨',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, limitMessage]);
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    incrementZodiMessages();

    // Simulate Zodi typing and response
    window.setTimeout(() => {
      const zodiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getZodiResponse(inputText),
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, zodiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const quickQuestions = [
    "What's my love compatibility?",
    "When will I find love?",
    "What's my ideal partner like?",
    "How do I attract love?",
  ];

  return (
    <div className="min-h-screen bg-cosmic-gradient relative flex flex-col">
      <CosmicBackground />
      
      {/* Header */}
      <div className="relative z-10 p-4 border-b border-galactic-purple/30 bg-cosmic-card/50 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <motion.div
            className="w-12 h-12 bg-galactic-purple rounded-full flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <i className="bi bi-stars text-galactic-gold text-xl"></i>
          </motion.div>
          <div>
            <h1 className="text-xl font-heading text-galactic-white">Zodi</h1>
            <p className="text-sm text-galactic-lavender font-body">Your Cosmic Guide</p>
          </div>
          <div className="ml-auto">
            {!isPremium && (
              <div className="text-right">
                <p className="text-xs text-galactic-white/60 font-body">
                  Daily messages: {dailyZodiMessages}/1
                </p>
                <button className="text-xs text-galactic-gold font-heading">
                  Upgrade
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 relative z-10 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.isUser
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
          ))}
          
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

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="relative z-10 px-4 pb-4">
          <p className="text-galactic-white/70 font-body text-sm mb-3">Quick questions:</p>
          <div className="grid grid-cols-2 gap-2">
            {quickQuestions.map((question, index) => (
              <motion.button
                key={index}
                className="bg-cosmic-card border border-galactic-purple/30 text-galactic-white font-body text-sm py-2 px-3 rounded-lg hover:bg-galactic-purple/20 transition-all duration-300"
                whileTap={{ scale: 0.95 }}
                onClick={() => setInputText(question)}
              >
                {question}
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
            placeholder="Ask Zodi about your cosmic love journey..."
            className="flex-1 bg-cosmic-card border border-galactic-purple/30 rounded-full px-4 py-3 text-galactic-white placeholder-galactic-white/50 focus:border-galactic-purple focus:outline-none"
            disabled={!isPremium && dailyZodiMessages >= 1}
          />
          <motion.button
            onClick={handleSendMessage}
            className="w-12 h-12 bg-galactic-purple rounded-full flex items-center justify-center disabled:opacity-50"
            whileTap={{ scale: 0.95 }}
            disabled={!inputText.trim() || (!isPremium && dailyZodiMessages >= 1)}
          >
            <i className="bi bi-send text-galactic-white"></i>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ZodiChat;
