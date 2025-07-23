import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';
import { globalStyles } from '../styles/globalStyles';
import { useAppStore } from '../store/appStore';
import { formatDistanceToNow } from 'date-fns';

interface LikedProfile {
  id: string;
  name: string;
  age: number;
  sunSign: string;
  photos: string[];
  distance?: number;
  likedAt: Date;
  isBlurred?: boolean;
}

export default function SeeWhoLikedYou() {
  const [likedProfiles, setLikedProfiles] = useState<LikedProfile[]>([]);
  const { isPremium, currentUser } = useAppStore();
  const navigation = useNavigation();

  useEffect(() => {
    // Mock data for profiles who liked you
    const mockLikedProfiles: LikedProfile[] = [
      {
        id: 'liked-1',
        name: 'Aurora',
        age: 28,
        sunSign: 'Pisces',
        photos: ['https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face'],
        distance: 5,
        likedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        isBlurred: !isPremium
      },
      {
        id: 'liked-2',
        name: 'Stella',
        age: 25,
        sunSign: 'Leo',
        photos: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face'],
        distance: 8,
        likedAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        isBlurred: !isPremium
      },
      {
        id: 'liked-3',
        name: 'Nova',
        age: 30,
        sunSign: 'Scorpio',
        photos: ['https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'],
        distance: 12,
        likedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        isBlurred: !isPremium
      },
      {
        id: 'liked-4',
        name: 'Luna',
        age: 26,
        sunSign: 'Cancer',
        photos: ['https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face'],
        distance: 3,
        likedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        isBlurred: !isPremium
      }
    ];

    setLikedProfiles(mockLikedProfiles);
  }, [isPremium]);

  const zodiacEmojis = {
    'Aries': '♈', 'Taurus': '♉', 'Gemini': '♊', 'Cancer': '♋',
    'Leo': '♌', 'Virgo': '♍', 'Libra': '♎', 'Scorpio': '♏',
    'Sagittarius': '♐', 'Capricorn': '♑', 'Aquarius': '♒', 'Pisces': '♓'
  };

  const handleProfileClick = (profile: LikedProfile) => {
    if (!isPremium) {
      navigation.navigate('Premium' as never);
      return;
    }
    // Navigate to profile or start conversation
    navigation.navigate('Explore' as never); // In real app, would navigate to specific profile
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  if (!isPremium) {
    return (
      <View style={globalStyles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color={colors.galactic.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Who Likes You</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Premium Required */}
        <View style={styles.premiumRequired}>
          <View style={styles.premiumIcon}>
            <Icon name="workspace-premium" size={60} color={colors.galactic.gold} />
          </View>
          
          <Text style={styles.premiumTitle}>Unlock Your Admirers</Text>
          
          <Text style={styles.premiumDescription}>
            See who's been swiping right on your cosmic energy! Upgrade to Premium to reveal your secret admirers.
          </Text>

          {/* Blurred Preview */}
          <View style={styles.previewGrid}>
            {likedProfiles.slice(0, 4).map((profile, index) => (
              <View key={profile.id} style={styles.previewCard}>
                <View style={styles.blurredImageContainer}>
                  <Image
                    source={{ uri: profile.photos[0] }}
                    style={[styles.previewImage, { opacity: 0.3 }]}
                    blurRadius={10}
                  />
                  <View style={styles.heartOverlay}>
                    <Icon name="favorite" size={24} color={colors.galactic.gold} />
                  </View>
                </View>
                <View style={styles.blurredInfo}>
                  <View style={styles.blurredText} />
                  <View style={[styles.blurredText, { width: '60%' }]} />
                </View>
              </View>
            ))}
          </View>
          
          <TouchableOpacity
            style={globalStyles.goldButton}
            onPress={() => navigation.navigate('Premium' as never)}
          >
            <Text style={globalStyles.goldButtonText}>Upgrade to See All ✨</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={colors.galactic.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Who Likes You</Text>
        <View style={styles.premiumBadge}>
          <Icon name="workspace-premium" size={16} color={colors.galactic.gold} />
          <Text style={styles.premiumBadgeText}>Premium</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {likedProfiles.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="favorite" size={80} color={colors.galactic.purple + '50'} />
            <Text style={styles.emptyTitle}>No likes yet</Text>
            <Text style={styles.emptyText}>
              Keep exploring to attract your cosmic admirers!
            </Text>
            <TouchableOpacity
              style={globalStyles.button}
              onPress={() => navigation.navigate('Explore' as never)}
            >
              <Text style={globalStyles.buttonText}>Start Exploring</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.admirersHeader}>
              <Text style={styles.admirersTitle}>
                {likedProfiles.length} Cosmic Admirers
              </Text>
              <Text style={styles.admirersSubtitle}>
                These beautiful souls have swiped right on you! ✨
              </Text>
            </View>

            <View style={styles.admirersGrid}>
              {likedProfiles.map((profile, index) => (
                <TouchableOpacity
                  key={profile.id}
                  style={styles.admirerCard}
                  onPress={() => handleProfileClick(profile)}
                >
                  <View style={styles.admirerImageContainer}>
                    <Image
                      source={{ uri: profile.photos[0] }}
                      style={styles.admirerImage}
                    />
                    
                    {/* Zodiac Badge */}
                    <View style={styles.zodiacBadge}>
                      <Text style={styles.zodiacEmoji}>
                        {zodiacEmojis[profile.sunSign as keyof typeof zodiacEmojis]}
                      </Text>
                    </View>

                    {/* Like Indicator */}
                    <View style={styles.likeIndicator}>
                      <Icon name="favorite" size={16} color={colors.cosmic.bg} />
                    </View>
                  </View>
                  
                  <View style={styles.admirerInfo}>
                    <Text style={styles.admirerName}>
                      {profile.name}, {profile.age}
                    </Text>
                    <View style={styles.admirerMeta}>
                      <Text style={styles.admirerSign}>{profile.sunSign}</Text>
                      {profile.distance && (
                        <>
                          <Text style={styles.separator}>•</Text>
                          <Text style={styles.admirerDistance}>{profile.distance}km</Text>
                        </>
                      )}
                    </View>
                    <Text style={styles.likedTime}>
                      Liked you {getTimeAgo(profile.likedAt)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Action Button */}
            <View style={styles.actionContainer}>
              <TouchableOpacity
                style={globalStyles.button}
                onPress={() => navigation.navigate('Explore' as never)}
              >
                <Text style={globalStyles.buttonText}>Start Matching</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.galactic.white,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.galactic.gold + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  premiumBadgeText: {
    fontSize: 12,
    color: colors.galactic.gold,
    fontWeight: '600',
    marginLeft: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  premiumRequired: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  premiumIcon: {
    width: 100,
    height: 100,
    backgroundColor: colors.galactic.gold + '20',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  premiumTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.galactic.white,
    marginBottom: 16,
  },
  premiumDescription: {
    fontSize: 16,
    color: colors.galactic.white + '80',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  previewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  previewCard: {
    width: '48%',
    backgroundColor: colors.cosmic.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.galactic.purple + '30',
  },
  blurredImageContainer: {
    position: 'relative',
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  heartOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -12 }, { translateY: -12 }],
  },
  blurredInfo: {
    alignItems: 'center',
  },
  blurredText: {
    height: 12,
    backgroundColor: colors.galactic.white + '20',
    borderRadius: 6,
    marginBottom: 4,
    width: '80%',
  },
  admirersHeader: {
    alignItems: 'center',
    marginVertical: 24,
  },
  admirersTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.galactic.white,
    marginBottom: 8,
  },
  admirersSubtitle: {
    fontSize: 16,
    color: colors.galactic.white + '70',
    textAlign: 'center',
  },
  admirersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  admirerCard: {
    width: '48%',
    backgroundColor: colors.cosmic.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.galactic.purple + '30',
  },
  admirerImageContainer: {
    position: 'relative',
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  admirerImage: {
    width: '100%',
    height: '100%',
  },
  zodiacBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.galactic.purple + '80',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zodiacEmoji: {
    fontSize: 16,
  },
  likeIndicator: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: colors.galactic.gold + '80',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  admirerInfo: {
    alignItems: 'center',
  },
  admirerName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.galactic.white,
    marginBottom: 4,
  },
  admirerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  admirerSign: {
    fontSize: 14,
    color: colors.galactic.lavender,
  },
  separator: {
    fontSize: 14,
    color: colors.galactic.white + '30',
    marginHorizontal: 8,
  },
  admirerDistance: {
    fontSize: 12,
    color: colors.galactic.white + '60',
  },
  likedTime: {
    fontSize: 12,
    color: colors.galactic.teal,
  },
  actionContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
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
