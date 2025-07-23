import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';
import { globalStyles } from '../styles/globalStyles';
import { useAppStore } from '../store/appStore';

export default function Profile() {
  const { currentUser, isPremium } = useAppStore();
  const [showSettings, setShowSettings] = useState(false);
  const navigation = useNavigation();

  if (!currentUser) {
    return (
      <View style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.galactic.white }}>Loading profile...</Text>
      </View>
    );
  }

  const zodiacEmojis = {
    'Aries': '♈', 'Taurus': '♉', 'Gemini': '♊', 'Cancer': '♋',
    'Leo': '♌', 'Virgo': '♍', 'Libra': '♎', 'Scorpio': '♏',
    'Sagittarius': '♐', 'Capricorn': '♑', 'Aquarius': '♒', 'Pisces': '♓'
  };

  const profileStats = [
    { label: 'Matches', value: '12', icon: 'favorite' },
    { label: 'Likes', value: '47', icon: 'star' },
    { label: 'Views', value: '156', icon: 'visibility' },
  ];

  const settingsOptions = [
    { icon: 'person', label: 'Edit Profile', action: () => navigation.navigate('EditProfile' as never) },
    { icon: 'settings', label: 'Preferences', action: () => {} },
    { icon: 'notifications', label: 'Notifications', action: () => {} },
    { icon: 'receipt', label: 'Purchase History', action: () => navigation.navigate('PurchaseHistory' as never) },
    { icon: 'security', label: 'Privacy', action: () => {} },
    { icon: 'help', label: 'Help & Support', action: () => {} },
    { icon: 'logout', label: 'Sign Out', action: () => {} },
  ];

  return (
    <View style={globalStyles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => setShowSettings(!showSettings)}
        >
          <Icon name="more-vert" size={24} color={colors.galactic.white} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          {/* Profile Image & Basic Info */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: currentUser.photos[0] }}
                style={styles.avatar}
              />
              {isPremium && (
                <View style={styles.premiumBadge}>
                  <Icon name="workspace-premium" size={16} color={colors.cosmic.bg} />
                </View>
              )}
            </View>
            
            <Text style={styles.profileName}>
              {currentUser.name}, {currentUser.age}
            </Text>
            
            <View style={styles.zodiacInfo}>
              <Text style={styles.zodiacEmoji}>
                {zodiacEmojis[currentUser.sunSign as keyof typeof zodiacEmojis]}
              </Text>
              <Text style={styles.zodiacText}>{currentUser.sunSign}</Text>
              {currentUser.moonSign && (
                <>
                  <Text style={styles.zodiacSeparator}>•</Text>
                  <Text style={styles.moonSign}>🌙 {currentUser.moonSign}</Text>
                </>
              )}
              {currentUser.risingSign && (
                <>
                  <Text style={styles.zodiacSeparator}>•</Text>
                  <Text style={styles.risingSign}>⬆️ {currentUser.risingSign}</Text>
                </>
              )}
            </View>
            
            <Text style={styles.profileBio}>{currentUser.bio}</Text>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            {profileStats.map((stat, index) => (
              <TouchableOpacity key={index} style={styles.statItem}>
                <Icon name={stat.icon} size={24} color={colors.galactic.gold} />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={globalStyles.button}
              onPress={() => navigation.navigate('EditProfile' as never)}
            >
              <Text style={globalStyles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            
            {!isPremium && (
              <TouchableOpacity
                style={[globalStyles.goldButton, { marginTop: 12 }]}
                onPress={() => navigation.navigate('Premium' as never)}
              >
                <Text style={globalStyles.goldButtonText}>Upgrade to Premium ✨</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Astrological Profile */}
        <View style={styles.astroProfile}>
          <View style={styles.sectionHeader}>
            <Icon name="auto-awesome" size={20} color={colors.galactic.gold} />
            <Text style={styles.sectionTitle}>Your Cosmic Profile</Text>
          </View>
          
          <View style={styles.astroItems}>
            <View style={styles.astroItem}>
              <View style={styles.astroIcon}>
                <Text style={styles.astroEmoji}>
                  {zodiacEmojis[currentUser.sunSign as keyof typeof zodiacEmojis]}
                </Text>
              </View>
              <View style={styles.astroInfo}>
                <Text style={styles.astroLabel}>Sun Sign</Text>
                <Text style={styles.astroValue}>{currentUser.sunSign}</Text>
              </View>
              <Text style={styles.astroDescription}>Core Identity</Text>
            </View>
            
            {currentUser.moonSign ? (
              <View style={styles.astroItem}>
                <View style={styles.astroIcon}>
                  <Text style={styles.astroEmoji}>🌙</Text>
                </View>
                <View style={styles.astroInfo}>
                  <Text style={styles.astroLabel}>Moon Sign</Text>
                  <Text style={styles.astroValue}>{currentUser.moonSign}</Text>
                </View>
                <Text style={styles.astroDescription}>Emotions</Text>
              </View>
            ) : (
              <TouchableOpacity style={styles.lockedAstroItem}>
                <View style={styles.astroIcon}>
                  <Text style={[styles.astroEmoji, { opacity: 0.5 }]}>🌙</Text>
                </View>
                <View style={styles.astroInfo}>
                  <Text style={styles.lockedAstroLabel}>Moon Sign</Text>
                  <Text style={styles.lockedAstroValue}>Unlock for $1.99</Text>
                </View>
                <View style={styles.unlockPrice}>
                  <Icon name="lock" size={16} color={colors.galactic.gold} />
                  <Text style={styles.priceText}>$1.99</Text>
                </View>
              </TouchableOpacity>
            )}
            
            {currentUser.risingSign ? (
              <View style={styles.astroItem}>
                <View style={styles.astroIcon}>
                  <Text style={styles.astroEmoji}>⬆️</Text>
                </View>
                <View style={styles.astroInfo}>
                  <Text style={styles.astroLabel}>Rising Sign</Text>
                  <Text style={styles.astroValue}>{currentUser.risingSign}</Text>
                </View>
                <Text style={styles.astroDescription}>First Impression</Text>
              </View>
            ) : (
              <TouchableOpacity style={styles.lockedAstroItem}>
                <View style={styles.astroIcon}>
                  <Text style={[styles.astroEmoji, { opacity: 0.5 }]}>⬆️</Text>
                </View>
                <View style={styles.astroInfo}>
                  <Text style={styles.lockedAstroLabel}>Rising Sign</Text>
                  <Text style={styles.lockedAstroValue}>Unlock for $1.99</Text>
                </View>
                <View style={styles.unlockPrice}>
                  <Icon name="lock" size={16} color={colors.galactic.gold} />
                  <Text style={styles.priceText}>$1.99</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Premium Features or Premium User Features */}
        {!isPremium ? (
          <View style={styles.premiumPrompt}>
            <View style={styles.premiumHeader}>
              <Icon name="workspace-premium" size={32} color={colors.galactic.gold} />
              <Text style={styles.premiumTitle}>Unlock Your Full Potential</Text>
              <Text style={styles.premiumDescription}>
                Get unlimited Zodi chats, advanced filters, and see who likes you
              </Text>
            </View>
            <View style={styles.premiumActions}>
              <TouchableOpacity 
                style={globalStyles.goldButton}
                onPress={() => navigation.navigate('Premium' as never)}
              >
                <Text style={globalStyles.goldButtonText}>Go Premium</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.purchaseHistoryButton}
                onPress={() => navigation.navigate('PurchaseHistory' as never)}
              >
                <Text style={styles.purchaseHistoryText}>View Purchases</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.premiumFeatures}>
            <TouchableOpacity
              style={styles.premiumFeatureButton}
              onPress={() => navigation.navigate('SeeWhoLikedYou' as never)}
            >
              <Icon name="visibility" size={24} color={colors.galactic.white} />
              <Text style={styles.premiumFeatureText}>See Who Liked You</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.premiumFeatureButton}
              onPress={() => navigation.navigate('PurchaseHistory' as never)}
            >
              <Icon name="receipt" size={24} color={colors.galactic.white} />
              <Text style={styles.premiumFeatureText}>Purchase History</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Settings Modal */}
      {showSettings && (
        <View style={styles.settingsModal}>
          <View style={styles.settingsContent}>
            {settingsOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.settingsOption}
                onPress={() => {
                  option.action();
                  setShowSettings(false);
                }}
              >
                <Icon name={option.icon} size={20} color={colors.galactic.white} />
                <Text style={styles.settingsOptionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
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
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.galactic.white,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.cosmic.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileCard: {
    backgroundColor: colors.cosmic.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.galactic.purple + '30',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: colors.galactic.gold,
  },
  premiumBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 32,
    height: 32,
    backgroundColor: colors.galactic.gold,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.galactic.white,
    marginBottom: 8,
  },
  zodiacInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  zodiacEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  zodiacText: {
    fontSize: 16,
    color: colors.galactic.lavender,
  },
  zodiacSeparator: {
    fontSize: 16,
    color: colors.galactic.white + '30',
    marginHorizontal: 8,
  },
  moonSign: {
    fontSize: 14,
    color: colors.galactic.teal,
  },
  risingSign: {
    fontSize: 14,
    color: colors.galactic.gold,
  },
  profileBio: {
    fontSize: 16,
    color: colors.galactic.white + '80',
    textAlign: 'center',
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: colors.cosmic.card,
    borderRadius: 12,
    padding: 12,
    flex: 1,
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.galactic.white,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.galactic.white + '60',
    marginTop: 4,
  },
  actionButtons: {
    marginTop: 8,
  },
  astroProfile: {
    backgroundColor: colors.cosmic.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.galactic.purple + '30',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.galactic.white,
    marginLeft: 8,
  },
  astroItems: {
    gap: 16,
  },
  astroItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cosmic.card,
    borderRadius: 12,
    padding: 12,
  },
  lockedAstroItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cosmic.card + '50',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.galactic.purple + '30',
    borderStyle: 'dashed',
  },
  astroIcon: {
    width: 40,
    height: 40,
    backgroundColor: colors.galactic.purple + '20',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  astroEmoji: {
    fontSize: 20,
  },
  astroInfo: {
    flex: 1,
  },
  astroLabel: {
    fontSize: 14,
    color: colors.galactic.white,
    fontWeight: '500',
  },
  astroValue: {
    fontSize: 14,
    color: colors.galactic.lavender,
  },
  lockedAstroLabel: {
    fontSize: 14,
    color: colors.galactic.white + '50',
    fontWeight: '500',
  },
  lockedAstroValue: {
    fontSize: 12,
    color: colors.galactic.white + '30',
  },
  astroDescription: {
    fontSize: 12,
    color: colors.galactic.gold,
    fontWeight: '500',
  },
  unlockPrice: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 12,
    color: colors.galactic.gold,
    marginLeft: 4,
    fontWeight: '600',
  },
  premiumPrompt: {
    backgroundColor: colors.galactic.gold + '20',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.galactic.gold + '30',
  },
  premiumHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  premiumTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.galactic.white,
    marginTop: 12,
    marginBottom: 8,
  },
  premiumDescription: {
    fontSize: 14,
    color: colors.galactic.white + '80',
    textAlign: 'center',
  },
  premiumActions: {
    gap: 12,
  },
  purchaseHistoryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.galactic.white + '30',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  purchaseHistoryText: {
    color: colors.galactic.white,
    fontSize: 16,
    fontWeight: '500',
  },
  premiumFeatures: {
    gap: 16,
    marginBottom: 20,
  },
  premiumFeatureButton: {
    backgroundColor: colors.galactic.teal,
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumFeatureText: {
    color: colors.galactic.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  settingsModal: {
    position: 'absolute',
    top: 90,
    right: 20,
    backgroundColor: colors.cosmic.card,
    borderRadius: 16,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: colors.galactic.purple + '30',
  },
  settingsContent: {
    minWidth: 200,
  },
  settingsOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  settingsOptionText: {
    fontSize: 16,
    color: colors.galactic.white,
    marginLeft: 12,
  },
});
