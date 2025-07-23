import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';
import { globalStyles } from '../styles/globalStyles';
import { useAppStore } from '../store/appStore';
import { formatDistanceToNow } from 'date-fns';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Date;
  isRead: boolean;
  type: 'text' | 'image' | 'zodi_suggestion';
}

export default function ChatScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { conversationId, user: chatUser } = route.params as any;
  
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  
  const { 
    messages, 
    currentUser, 
    addMessage, 
    markMessagesAsRead,
    isPremium,
    dailyZodiMessages,
    incrementZodiMessages
  } = useAppStore();

  const chatMessages = messages[conversationId] || [];

  useEffect(() => {
    if (conversationId) {
      markMessagesAsRead(conversationId);
    }
  }, [conversationId, markMessagesAsRead]);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    // Add initial welcome message if no messages exist
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
    scrollViewRef.current?.scrollToEnd({ animated: true });
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
    
    setTimeout(() => {
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

  if (!chatUser) {
    return (
      <View style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Icon name="error" size={48} color={colors.galactic.gold} />
        <Text style={styles.errorTitle}>Chat not found</Text>
        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={globalStyles.buttonText}>Back to Messages</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={globalStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={colors.galactic.white} />
        </TouchableOpacity>
        
        <View style={styles.userInfo}>
          <Image
            source={{ uri: chatUser.photos[0] }}
            style={styles.userAvatar}
          />
          {chatUser.isOnline && <View style={styles.onlineIndicator} />}
        </View>
        
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{chatUser.name}</Text>
          <View style={styles.userMeta}>
            <Text style={styles.userSign}>{chatUser.sunSign}</Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.matchText}>85% match</Text>
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.headerButton}
          onPress={getZodiSuggestion}
        >
          <Icon name="auto-awesome" size={20} color={colors.galactic.gold} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.messagesContent}
      >
        {/* Welcome message */}
        <View style={styles.welcomeMessage}>
          <View style={styles.welcomeContent}>
            <Icon name="auto-awesome" size={20} color={colors.galactic.gold} />
            <Text style={styles.welcomeText}>
              You and {chatUser.name} are a cosmic match! ✨
            </Text>
            <Text style={styles.compatibilityText}>85% compatibility</Text>
          </View>
        </View>

        {chatMessages.map((message) => {
          const isOwn = message.senderId === currentUser?.id;
          return (
            <View
              key={message.id}
              style={[
                styles.messageContainer,
                isOwn ? styles.ownMessage : styles.otherMessage
              ]}
            >
              <View
                style={[
                  styles.messageBubble,
                  isOwn ? styles.ownBubble : styles.otherBubble
                ]}
              >
                <Text style={styles.messageText}>{message.text}</Text>
                <Text style={styles.messageTime}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
            </View>
          );
        })}
        
        {isTyping && (
          <View style={[styles.messageContainer, styles.otherMessage]}>
            <View style={[styles.messageBubble, styles.otherBubble]}>
              <View style={styles.typingIndicator}>
                <View style={styles.typingDot} />
                <View style={styles.typingDot} />
                <View style={styles.typingDot} />
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Quick Suggestions */}
      {chatMessages.length <= 2 && (
        <View style={styles.suggestionsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              "How's your day going? ✨",
              "What's your favorite thing about astrology? 🌟",
              "Tell me about your interests! 💫"
            ].map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionButton}
                onPress={() => setInputText(suggestion)}
              >
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Input */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Send a cosmic message..."
            placeholderTextColor={colors.galactic.white + '50'}
            multiline
            maxHeight={100}
          />
          
          <TouchableOpacity
            style={[
              styles.sendButton,
              !inputText.trim() && styles.disabledSendButton
            ]}
            onPress={handleSendMessage}
            disabled={!inputText.trim()}
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: colors.galactic.purple + '30',
    backgroundColor: colors.cosmic.card + '50',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userInfo: {
    position: 'relative',
    marginRight: 12,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.galactic.gold + '30',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    backgroundColor: colors.galactic.teal,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.cosmic.bg,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.galactic.white,
  },
  userMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  userSign: {
    fontSize: 14,
    color: colors.galactic.lavender,
  },
  separator: {
    fontSize: 14,
    color: colors.galactic.white + '30',
    marginHorizontal: 8,
  },
  matchText: {
    fontSize: 12,
    color: colors.galactic.gold,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.galactic.purple + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
  },
  welcomeMessage: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeContent: {
    backgroundColor: colors.galactic.purple + '20',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    maxWidth: 280,
  },
  welcomeText: {
    fontSize: 14,
    color: colors.galactic.white + '80',
    textAlign: 'center',
    marginVertical: 8,
  },
  compatibilityText: {
    fontSize: 12,
    color: colors.galactic.gold,
    fontWeight: '600',
  },
  messageContainer: {
    marginBottom: 16,
  },
  ownMessage: {
    alignItems: 'flex-end',
  },
  otherMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  ownBubble: {
    backgroundColor: colors.galactic.purple,
  },
  otherBubble: {
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
  suggestionsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  suggestionButton: {
    backgroundColor: colors.cosmic.card,
    borderWidth: 1,
    borderColor: colors.galactic.purple + '30',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  suggestionText: {
    fontSize: 14,
    color: colors.galactic.white,
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
  errorTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.galactic.white,
    marginTop: 16,
    marginBottom: 32,
  },
});
