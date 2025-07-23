import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  age: number;
  sunSign: string;
  moonSign?: string;
  risingSign?: string;
  bio: string;
  photos: string[];
  isPremium: boolean;
  interests?: string[];
  occupation?: string;
  isOnline?: boolean;
  distance?: number;
}

interface Match {
  id: string;
  user: User;
  matchedAt: Date;
  lastMessage?: string;
  unread: boolean;
  compatibilityScore?: number;
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Date;
  isRead: boolean;
  type: 'text' | 'image' | 'zodi_suggestion';
}

interface Conversation {
  id: string;
  participants: string[];
  messages: Message[];
  lastActivity: Date;
  unreadCount: number;
}

interface Purchase {
  id: string;
  itemId: string;
  name: string;
  price: string;
  type: 'subscription' | 'one-time';
  purchasedAt: Date;
  expiresAt?: Date;
}

interface AppState {
  currentUser: User | null;
  isOnboarded: boolean;
  isPremium: boolean;
  matches: Match[];
  conversations: { [conversationId: string]: Conversation };
  messages: { [conversationId: string]: Message[] };
  purchases: Purchase[];
  dailyZodiMessages: number;
  dailyUndos: number;
  lastUndoReset: string;
  setCurrentUser: (user: User) => void;
  setOnboarded: (status: boolean) => void;
  setPremium: (status: boolean) => void;
  addMatch: (match: Match) => void;
  addMessage: (conversationId: string, message: Message) => void;
  markMessagesAsRead: (conversationId: string) => void;
  createConversation: (participants: string[]) => string;
  addPurchase: (purchase: Purchase) => void;
  hasPurchase: (itemId: string) => boolean;
  incrementZodiMessages: () => void;
  resetDailyZodiMessages: () => void;
  useUndo: () => boolean;
  getRemainingUndos: () => number;
  resetDailyUndos: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentUser: null,
  isOnboarded: false,
  isPremium: false,
  matches: [],
  conversations: {},
  messages: {},
  purchases: [],
  dailyZodiMessages: 0,
  dailyUndos: 0,
  lastUndoReset: new Date().toDateString(),
  
  setCurrentUser: (user) => set({ currentUser: user }),
  setOnboarded: (status) => set({ isOnboarded: status }),
  setPremium: (status) => set({ isPremium: status }),
  
  addMatch: (match) => {
    set((state) => {
      const conversationId = `${state.currentUser?.id}_${match.user.id}`;
      const newConversation: Conversation = {
        id: conversationId,
        participants: [state.currentUser?.id || '', match.user.id],
        messages: [],
        lastActivity: new Date(),
        unreadCount: 0,
      };
      
      return {
        matches: [...state.matches, match],
        conversations: {
          ...state.conversations,
          [conversationId]: newConversation,
        },
        messages: {
          ...state.messages,
          [conversationId]: [],
        },
      };
    });
  },
  
  addMessage: (conversationId, message) => {
    set((state) => {
      const currentMessages = state.messages[conversationId] || [];
      const updatedMessages = [...currentMessages, message];
      
      const conversation = state.conversations[conversationId];
      if (conversation) {
        const updatedConversation = {
          ...conversation,
          lastActivity: message.timestamp,
          unreadCount: message.senderId !== state.currentUser?.id 
            ? conversation.unreadCount + 1 
            : conversation.unreadCount,
        };
        
        return {
          messages: {
            ...state.messages,
            [conversationId]: updatedMessages,
          },
          conversations: {
            ...state.conversations,
            [conversationId]: updatedConversation,
          },
        };
      }
      
      return {
        messages: {
          ...state.messages,
          [conversationId]: updatedMessages,
        },
      };
    });
  },
  
  markMessagesAsRead: (conversationId) => {
    set((state) => {
      const messages = state.messages[conversationId] || [];
      const updatedMessages = messages.map(msg => ({ ...msg, isRead: true }));
      
      const conversation = state.conversations[conversationId];
      const updatedConversation = conversation 
        ? { ...conversation, unreadCount: 0 }
        : conversation;
      
      return {
        messages: {
          ...state.messages,
          [conversationId]: updatedMessages,
        },
        conversations: updatedConversation 
          ? {
              ...state.conversations,
              [conversationId]: updatedConversation,
            }
          : state.conversations,
      };
    });
  },
  
  createConversation: (participants) => {
    const conversationId = participants.sort().join('_');
    const state = get();
    
    if (!state.conversations[conversationId]) {
      const newConversation: Conversation = {
        id: conversationId,
        participants,
        messages: [],
        lastActivity: new Date(),
        unreadCount: 0,
      };
      
      set((state) => ({
        conversations: {
          ...state.conversations,
          [conversationId]: newConversation,
        },
        messages: {
          ...state.messages,
          [conversationId]: [],
        },
      }));
    }
    
    return conversationId;
  },
  
  addPurchase: (purchase) => {
    set((state) => {
      if (purchase.itemId.includes('premium')) {
        return {
          purchases: [...state.purchases, purchase],
          isPremium: true,
        };
      }
      
      return {
        purchases: [...state.purchases, purchase],
      };
    });
  },
  
  hasPurchase: (itemId) => {
    const state = get();
    const purchase = state.purchases.find(p => p.itemId === itemId);
    
    if (!purchase) return false;
    
    if (purchase.expiresAt && new Date() > purchase.expiresAt) {
      return false;
    }
    
    return true;
  },
  
  incrementZodiMessages: () => set((state) => ({ 
    dailyZodiMessages: state.dailyZodiMessages + 1 
  })),
  
  resetDailyZodiMessages: () => set({ dailyZodiMessages: 0 }),

  useUndo: () => {
    const state = get();
    const today = new Date().toDateString();
    
    if (state.lastUndoReset !== today) {
      set({ dailyUndos: 0, lastUndoReset: today });
    }
    
    if (state.isPremium || state.dailyUndos < 3) {
      set((state) => ({ 
        dailyUndos: state.isPremium ? state.dailyUndos : state.dailyUndos + 1 
      }));
      return true;
    }
    
    return false;
  },

  getRemainingUndos: () => {
    const state = get();
    const today = new Date().toDateString();
    
    if (state.lastUndoReset !== today) {
      return 3;
    }
    
    return state.isPremium ? Infinity : Math.max(0, 3 - state.dailyUndos);
  },

  resetDailyUndos: () => {
    const today = new Date().toDateString();
    set({ dailyUndos: 0, lastUndoReset: today });
  },
}));
