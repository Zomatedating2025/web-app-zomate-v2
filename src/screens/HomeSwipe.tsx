import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  useAnimatedGestureHandler,
  runOnJS,
  withSpring,
  interpolate
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';
import { globalStyles } from '../styles/globalStyles';
import { useAppStore } from '../store/appStore';
import SwipeCard from '../components/SwipeCard';

const { width: screenWidth } = Dimensions.get('window');

export default function HomeSwipe() {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { currentUser, addMatch, isPremium, useUndo, getRemainingUndos } = useAppStore();

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);

  useEffect(() => {
    // Mock users data
    const mockUsers = [
      {
        id: '2',
        name: 'Luna',
        age: 26,
        sunSign: 'Scorpio',
        bio: 'Water sign seeking deep connections. Love moonlit walks, meditation, and meaningful conversations.',
        photos: ['https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face'],
        distance: 3,
        interests: ['Meditation', 'Astrology', 'Yoga'],
        isPremium: false,
        isOnline: true
      },
      {
        id: '3',
        name: 'Phoenix',
        age: 29,
        sunSign: 'Leo',
        bio: 'Fire sign with a passion for adventure and creativity. Love traveling, dancing, and living life to the fullest.',
        photos: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'],
        distance: 7,
        interests: ['Travel', 'Dancing', 'Photography'],
        isPremium: false,
        isOnline: false
      },
      // Add more mock users...
    ];
    setUsers(mockUsers);
  }, []);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      // Simulate match probability
      if (Math.random() > 0.7) {
        const user = users[currentIndex];
        addMatch({
          id: Date.now().toString(),
          user,
          matchedAt: new Date(),
          unread: true,
        });
        Alert.alert('Cosmic Match!', `You and ${user.name} are a stellar connection! ✨`);
      }
    }
    
    setCurrentIndex(prev => prev + 1);
    resetCard();
  };

  const resetCard = () => {
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
    rotate.value = withSpring(0);
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = translateX.value;
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
      translateY.value = context.startY + event.translationY;
      rotate.value = interpolate(
        translateX.value,
        [-screenWidth / 2, screenWidth / 2],
        [-30, 30]
      );
    },
    onEnd: (event) => {
      const shouldSwipe = Math.abs(event.translationX) > screenWidth * 0.3;
      
      if (shouldSwipe) {
        const direction = event.translationX > 0 ? 'right' : 'left';
        runOnJS(handleSwipe)(direction);
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotate.value = withSpring(0);
      }
    },
  });

  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate.value}deg` },
      ],
    };
  });

  const handleLike = () => handleSwipe('right');
  const handlePass = () => handleSwipe('left');
  
  const handleUndo = () => {
    const canUndo = useUndo();
    if (canUndo && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      resetCard();
    } else {
      Alert.alert('No Undos Left', 'Upgrade to Premium for unlimited undos!');
    }
  };

  const remainingUndos = getRemainingUndos();

  if (currentIndex >= users.length) {
    return (
      <View style={[globalStyles.container, styles.emptyContainer]}>
        <Icon name="auto-awesome" size={80} color={colors.galactic.purple + '50'} />
        <Text style={styles.emptyTitle}>No more profiles</Text>
        <Text style={styles.emptyText}>Check back later for new cosmic connections</Text>
        <TouchableOpacity 
          style={globalStyles.button}
          onPress={() => setCurrentIndex(0)}
        >
          <Text style={globalStyles.buttonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="tune" size={24} color={colors.galactic.white} />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Explore</Text>
          <Text style={styles.headerSubtitle}>{users.length} profiles</Text>
        </View>
        
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="flash-on" size={24} color={colors.galactic.gold} />
        </TouchableOpacity>
      </View>

      {/* Cards */}
      <View style={styles.cardContainer}>
        {/* Next card (background) */}
        {currentIndex + 1 < users.length && (
          <SwipeCard user={users[currentIndex + 1]} />
        )}
        
        {/* Current card (top) */}
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.topCard, cardStyle]}>
            <SwipeCard user={users[currentIndex]} />
          </Animated.View>
        </PanGestureHandler>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.undoButton]}
          onPress={handleUndo}
        >
          <Icon name="undo" size={24} color={colors.galactic.teal} />
          {!isPremium && (
            <View style={styles.undoBadge}>
              <Text style={styles.undoBadgeText}>{remainingUndos}</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.passButton]}
          onPress={handlePass}
        >
          <Icon name="close" size={28} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.astroButton]}
        >
          <Icon name="auto-awesome" size={24} color={colors.cosmic.bg} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.likeButton]}
          onPress={handleLike}
        >
          <Icon name="favorite" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 50,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cosmic.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.galactic.white,
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.galactic.white + '60',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  topCard: {
    position: 'absolute',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  actionButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  undoButton: {
    backgroundColor: colors.galactic.teal,
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  passButton: {
    backgroundColor: '#FF4458',
  },
  astroButton: {
    backgroundColor: colors.galactic.gold,
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  likeButton: {
    backgroundColor: '#42C767',
  },
  undoBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.galactic.gold,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  undoBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.cosmic.bg,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.galactic.white,
    marginTop: 20,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: colors.galactic.white + '70',
    textAlign: 'center',
    marginBottom: 32,
  },
});
