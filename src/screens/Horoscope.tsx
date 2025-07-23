import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';
import { globalStyles } from '../styles/globalStyles';
import { useAppStore } from '../store/appStore';

interface HoroscopeCard {
  sign: string;
  emoji: string;
  title: string;
  content: string;
  love: string;
  career: string;
  wellness: string;
}

export default function Horoscope() {
  const [selectedSign, setSelectedSign] = useState<string>('');
  const { currentUser, isPremium } = useAppStore();

  const horoscopes: HoroscopeCard[] = [
    {
      sign: 'Aries',
      emoji: '♈',
      title: 'The Ram',
      content: 'Today brings fiery energy and new beginnings. Your natural leadership shines bright, attracting opportunities and admirers alike.',
      love: 'Venus favors bold romantic gestures. Take the initiative in love.',
      career: 'Your pioneering spirit opens new professional doors.',
      wellness: 'Channel your energy through physical activity and movement.',
    },
    {
      sign: 'Taurus',
      emoji: '♉',
      title: 'The Bull',
      content: 'Stability and sensuality guide your day. Focus on building lasting foundations in both love and career.',
      love: 'Slow and steady wins the heart. Enjoy intimate moments.',
      career: 'Your persistence pays off in tangible results.',
      wellness: 'Indulge in self-care and comfort foods mindfully.',
    },
    // Add more signs...
  ];

  const currentHoroscope = currentUser ? horoscopes.find(h => h.sign === currentUser.sunSign) : null;

  return (
    <View style={globalStyles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Daily Horoscope</Text>
        <Text style={styles.headerSubtitle}>
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Your Sign Section */}
        {currentUser && currentHoroscope && (
          <View style={styles.yourSignContainer}>
            <View style={styles.sectionHeader}>
              <Icon name="star" size={20} color={colors.galactic.gold} />
              <Text style={styles.sectionTitle}>Your Daily Reading</Text>
            </View>
            
            <View style={styles.horoscopeCard}>
              <View style={styles.signHeader}>
                <Text style={styles.signEmoji}>{currentHoroscope.emoji}</Text>
                <View style={styles.signInfo}>
                  <Text style={styles.signName}>{currentHoroscope.sign}</Text>
                  <Text style={styles.signTitle}>{currentHoroscope.title}</Text>
                </View>
              </View>
              
              <Text style={styles.horoscopeContent}>
                {currentHoroscope.content}
              </Text>
              
              <View style={styles.aspectsContainer}>
                <View style={styles.aspect}>
                  <Icon name="favorite" size={16} color={colors.galactic.gold} />
                  <View style={styles.aspectContent}>
                    <Text style={styles.aspectLabel}>Love:</Text>
                    <Text style={styles.aspectText}>{currentHoroscope.love}</Text>
                  </View>
                </View>
                
                {isPremium ? (
                  <>
                    <View style={styles.aspect}>
                      <Icon name="work" size={16} color={colors.galactic.teal} />
                      <View style={styles.aspectContent}>
                        <Text style={styles.aspectLabel}>Career:</Text>
                        <Text style={styles.aspectText}>{currentHoroscope.career}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.aspect}>
                      <Icon name="spa" size={16} color={colors.galactic.lavender} />
                      <View style={styles.aspectContent}>
                        <Text style={styles.aspectLabel}>Wellness:</Text>
                        <Text style={styles.aspectText}>{currentHoroscope.wellness}</Text>
                      </View>
                    </View>
                  </>
                ) : (
                  <View style={styles.premiumPrompt}>
                    <View style={styles.premiumContent}>
                      <Icon name="lock" size={20} color={colors.galactic.gold} />
                      <Text style={styles.premiumText}>
                        Unlock career and wellness insights
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.premiumButton}>
                      <Text style={styles.premiumButtonText}>Upgrade to Premium</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        )}

        {/* All Signs Section */}
        <View style={styles.allSignsContainer}>
          <View style={styles.sectionHeader}>
            <Icon name="auto-awesome" size={20} color={colors.galactic.gold} />
            <Text style={styles.sectionTitle}>All Signs</Text>
          </View>
          
          <View style={styles.signsGrid}>
            {horoscopes.map((horoscope) => (
              <TouchableOpacity
                key={horoscope.sign}
                style={[
                  styles.signButton,
                  selectedSign === horoscope.sign && styles.selectedSignButton
                ]}
                onPress={() => setSelectedSign(selectedSign === horoscope.sign ? '' : horoscope.sign)}
              >
                <View style={styles.signButtonHeader}>
                  <Text style={styles.signButtonEmoji}>{horoscope.emoji}</Text>
                  <View style={styles.signButtonInfo}>
                    <Text style={styles.signButtonName}>{horoscope.sign}</Text>
                    <Text style={styles.signButtonTitle}>{horoscope.title}</Text>
                  </View>
                </View>
                
                {selectedSign === horoscope.sign && (
                  <View style={styles.expandedContent}>
                    <Text style={styles.expandedText}>{horoscope.content}</Text>
                    <View style={styles.expandedAspect}>
                      <Text style={styles.expandedAspectLabel}>Love:</Text>
                      <Text style={styles.expandedAspectText}>{horoscope.love}</Text>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Cosmic Tip */}
        <View style={styles.cosmicTip}>
          <View style={styles.tipHeader}>
            <Icon name="lightbulb" size={20} color={colors.galactic.gold} />
            <Text style={styles.tipTitle}>Cosmic Tip of the Day</Text>
          </View>
          <Text style={styles.tipContent}>
            The universe speaks through synchronicities. Pay attention to repeated numbers, 
            unexpected encounters, and intuitive nudges today - they're guiding you toward your destiny.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: colors.galactic.purple + '30',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.galactic.white,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.galactic.lavender,
    textAlign: 'center',
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  yourSignContainer: {
    marginVertical: 20,
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
  horoscopeCard: {
    backgroundColor: colors.cosmic.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.galactic.purple + '30',
  },
  signHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  signEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  signInfo: {
    flex: 1,
  },
  signName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.galactic.white,
  },
  signTitle: {
    fontSize: 14,
    color: colors.galactic.lavender,
  },
  horoscopeContent: {
    fontSize: 16,
    color: colors.galactic.white,
    lineHeight: 24,
    marginBottom: 16,
  },
  aspectsContainer: {
    marginTop: 8,
  },
  aspect: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  aspectContent: {
    flex: 1,
    marginLeft: 12,
  },
  aspectLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.galactic.gold,
  },
  aspectText: {
    fontSize: 14,
    color: colors.galactic.white + '80',
    marginTop: 2,
  },
  premiumPrompt: {
    backgroundColor: colors.galactic.purple + '20',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  premiumContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  premiumText: {
    fontSize: 14,
    color: colors.galactic.white + '80',
    marginLeft: 8,
  },
  premiumButton: {
    alignSelf: 'center',
  },
  premiumButtonText: {
    fontSize: 14,
    color: colors.galactic.gold,
    fontWeight: '600',
  },
  allSignsContainer: {
    marginBottom: 20,
  },
  signsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  signButton: {
    width: '48%',
    backgroundColor: colors.cosmic.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.galactic.purple + '30',
  },
  selectedSignButton: {
    borderColor: colors.galactic.purple,
    backgroundColor: colors.galactic.purple + '10',
  },
  signButtonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signButtonEmoji: {
    fontSize: 24,
    marginRight: 8,
  },
  signButtonInfo: {
    flex: 1,
  },
  signButtonName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.galactic.white,
  },
  signButtonTitle: {
    fontSize: 12,
    color: colors.galactic.lavender,
  },
  expandedContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.galactic.purple + '30',
  },
  expandedText: {
    fontSize: 12,
    color: colors.galactic.white + '80',
    lineHeight: 18,
    marginBottom: 8,
  },
  expandedAspect: {
    marginTop: 4,
  },
  expandedAspectLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.galactic.gold,
  },
  expandedAspectText: {
    fontSize: 12,
    color: colors.galactic.white + '70',
    marginTop: 2,
  },
  cosmicTip: {
    backgroundColor: colors.galactic.teal + '20',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.galactic.gold + '30',
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.galactic.white,
    marginLeft: 8,
  },
  tipContent: {
    fontSize: 14,
    color: colors.galactic.white + '80',
    lineHeight: 20,
  },
});
