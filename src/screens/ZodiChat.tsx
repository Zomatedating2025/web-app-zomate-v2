import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';
import { globalStyles } from '../styles/globalStyles';
import { useAppStore } from '../store/appStore';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ZodiChat() {
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
  const scrollViewRef = useRef<ScrollView>(null);
  const { currentUser, isPremium, dailyZodiMessages, incrementZodiMessages } = useAppStore();

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
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
    
    if (!isPremium && dailyZodiMessages >= 5) {
      const limitMessage: Message = {
        id: Date.now().toString(),
        text: '🌙 You\'ve reached your daily message limit! Upgrade to Premium for unlimited cosmic wisdom. ✨',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, limitMessage]);
      return;
    }

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

    setTimeout(() => {
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
    <KeyboardAvoidingView 
      style={globalStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.zodiAvatar}>
            <Icon name="auto-awesome" size={24} color={colors.galactic.gold} />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Zodi</Text>
            <Text style={styles.headerSubtitle}>Your Cosmic Guide</Text>
          </View>
          {!isPremium && (
            <View style={styles.limitInfo}>
              <Text style={styles.limitText}>
                Daily messages: {dailyZodiMessages}/5
              </Text>
              <TouchableOpacity>
                <Text style={styles.upgradeText}>Upgrade</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Messages */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageContainer,
              message.isUser ? styles.userMessage : styles.zodiMessage
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                message.isUser ? styles.userBubble : styles.zodiBubble
              ]}
            >
              <Text style={styles.messageText}>{message.text}</Text>
              <Text style={styles.messageTime}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
          </View>
        ))}
        
        {isTyping && (
          <View style={[styles.messageContainer, styles.zodiMessage]}>
            <View style={[styles.messageBubble, styles.zodiBubble]}>
              <View style={styles.typingIndicator}>
                <View style={styles.typingDot} />
                <View style={styles.typingDot} />
                <View style={styles.typingDot} />
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <View style={styles.quickQuestionsContainer}>
          <Text style={styles.quickQuestionsTitle}>Quick questions:</Text>
          <View style={styles.quickQuestionsGrid}>
            {quickQuestions.map((question, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickQuestionButton}
                onPress={() => setInputText(question)}
              >
                <Text style={styles.quickQuestionText}>{question}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Input */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask Zodi about your cosmic love journey..."
            placeholderTextColor={colors.galactic.white + '50'}
            multiline
            maxLength={500}
            editable={isPremium || dailyZodiMessages < 5}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              (!inputText.trim() || (!isPremium && dailyZodiMessages >= 5)) && styles.disabledSendButton
            ]}
            onPress={handleSendMessage}
            disabled={!inputText.trim() || (!isPremium && dailyZodiMessages >= 5)}
          >
            <Icon name="send" size={20} color={colors.galactic.white} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: colors.galactic.purple + '30',
    backgroundColor: colors.cosmic.card + '50',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  zodiAvatar: {
    width: 48,
    height: 48,
    backgroundColor: colors.galactic.purple,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.galactic.white,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.galactic.lavender,
  },
  limitInfo: {
    alignItems: 'flex-end',
  },
  limitText: {
    fontSize: 12,
    color: colors.galactic.white + '60',
  },
  upgradeText: {
    fontSize: 12,
    color: colors.galactic.gold,
    fontWeight: '600',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  zodiMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: colors.galactic.purple,
  },
  zodiBubble: {
    backgroundColor: colors.cosmic.card,
    borderWidth: 1,
    borderColor: colors.galactic.purple + '30',
  },
  messageText: {
    fontSize: 16,
    color: colors.galactic.white,
    lineHeight: 22,
  },
  messageTime: {
    fontSize: 12,
    color: colors.galactic.white + '60',
    marginTop: 4,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingDot: {
    width: 8,
    height: 8,
    backgroundColor: colors.galactic.lavender,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  quickQuestionsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  quickQuestionsTitle: {
    fontSize: 14,
    color: colors.galactic.white + '70',
    marginBottom: 12,
  },
  quickQuestionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickQuestionButton: {
    backgroundColor: colors.cosmic.card,
    borderWidth: 1,
    borderColor: colors.galactic.purple + '30',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    width: '48%',
  },
  quickQuestionText: {
    fontSize: 12,
    color: colors.galactic.white,
    textAlign: 'center',
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.galactic.purple + '30',
    backgroundColor: colors.cosmic.card + '50',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    backgroundColor: colors.cosmic.card,
    borderWidth: 1,
    borderColor: colors.galactic.purple + '30',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: colors.galactic.white,
    fontSize: 16,
    maxHeight: 100,
    marginRight: 12,
  },
  sendButton: {
    width: 48,
    height: 48,
    backgroundColor: colors.galactic.purple,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledSendButton: {
    opacity: 0.5,
  },
});
