import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';
import { globalStyles } from '../styles/globalStyles';
import { useAppStore } from '../store/appStore';

export default function Premium() {
  const { isPremium, setPremium } = useAppStore();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');
  const navigation = useNavigation();

  const premiumFeatures = [
    {
      icon: 'account-tree',
      title: 'Full Natal Chart',
      description: 'Unlock your complete astrological profile with Moon and Rising signs',
      highlight: 'Most Popular',
    },
    {
      icon: 'tune',
      title: 'Advanced Filters',
      description: 'Filter matches by element, modality, or specific zodiac signs',
      highlight: null,
    },
    {
      icon: 'chat',
      title: 'Unlimited Zodi Chat',
      description: 'Ask unlimited questions to your cosmic AI guide',
      highlight: null,
    },
    {
      icon: 'book',
      title: 'Complete Horoscopes',
      description: 'Access full daily readings for Sun, Moon, Rising + Love insights',
      highlight: null,
    },
    {
      icon: 'visibility',
      title: 'See Who Liked You',
      description: 'View all profiles that have swiped right on your cosmic energy',
      highlight: 'Popular',
    },
    {
      icon: 'rocket-launch',
      title: 'Monthly Star Boost',
      description: 'Get 5 profile boosts per month to increase your visibility',
      highlight: null,
    },
    {
      icon: 'undo',
      title: 'Undo Swipes',
      description: 'Take back accidental swipes and get second chances',
      highlight: null,
    },
    {
      icon: 'support',
      title: 'Priority Support',
      description: 'Get cosmic customer support with priority response times',
      highlight: null,
    },
  ];

  const plans = {
    monthly: {
      id: 'premium-monthly',
      name: 'Monthly Premium',
      price: '$9.99',
      period: '/month',
      originalPrice: null,
      savings: null,
      description: 'Perfect for exploring your cosmic connections',
    },
    yearly: {
      id: 'premium-yearly',
      name: 'Yearly Premium',
      price: '$59.99',
      period: '/year',
      originalPrice: '$119.88',
      savings: 'Save 50%',
      description: 'Best value for serious cosmic seekers',
    },
  };

  const handleSubscribe = () => {
    // Simulate purchase
    Alert.alert(
      'Purchase Successful!',
      'Welcome to ZoMate Premium! ✨',
      [
        {
          text: 'OK',
          onPress: () => {
            setPremium(true);
            navigation.goBack();
          }
        }
      ]
    );
  };

  if (isPremium) {
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
          <Text style={styles.headerTitle}>Premium</Text>
          <View style={{ width: 40 }} />
        </View>
        
        <View style={styles.premiumActiveContainer}>
          <View style={styles.premiumActiveContent}>
            <View style={styles.premiumIcon}>
              <Icon name="workspace-premium" size={60} color={colors.galactic.gold} />
            </View>
            
            <Text style={styles.premiumActiveTitle}>You're Premium! ✨</Text>
            
            <Text style={styles.premiumActiveText}>
              Enjoy unlimited access to all cosmic features and find your perfect astrological match.
            </Text>
            
            <View style={styles.benefitsContainer}>
              <Text style={styles.benefitsTitle}>Your Premium Benefits</Text>
              <View style={styles.benefitsGrid}>
                {premiumFeatures.map((feature, index) => (
                  <View key={index} style={styles.benefitItem}>
                    <Icon name={feature.icon} size={16} color={colors.galactic.gold} />
                    <Text style={styles.benefitText}>{feature.title}</Text>
                  </View>
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={globalStyles.goldButton}
              onPress={() => navigation.navigate('SeeWhoLikedYou' as never)}
            >
              <Text style={globalStyles.goldButtonText}>See Who Liked You</Text>
            </TouchableOpacity>
          </View>
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
        <Text style={styles.headerTitle}>ZoMate Premium</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Icon name="workspace-premium" size={48} color={colors.galactic.gold} />
          </View>
          
          <Text style={styles.heroTitle}>Unlock Your Cosmic Potential</Text>
          <Text style={styles.heroSubtitle}>
            Choose your cosmic journey: Premium subscription or individual features
          </Text>
        </View>

        {/* Plan Toggle */}
        <View style={styles.planToggle}>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                selectedPlan === 'monthly' && styles.activeToggle
              ]}
              onPress={() => setSelectedPlan('monthly')}
            >
              <Text style={[
                styles.toggleText,
                selectedPlan === 'monthly' && styles.activeToggleText
              ]}>
                Monthly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                selectedPlan === 'yearly' && styles.activeToggle,
                { position: 'relative' }
              ]}
              onPress={() => setSelectedPlan('yearly')}
            >
              <Text style={[
                styles.toggleText,
                selectedPlan === 'yearly' && styles.activeToggleText
              ]}>
                Yearly
              </Text>
              <View style={styles.savingsBadge}>
                <Text style={styles.savingsText}>50% OFF</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Selected Plan */}
        <View style={styles.selectedPlan}>
          <Text style={styles.planName}>{plans[selectedPlan].name}</Text>
          <Text style={styles.planDescription}>{plans[selectedPlan].description}</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{plans[selectedPlan].price}</Text>
            <Text style={styles.period}>{plans[selectedPlan].period}</Text>
          </View>
          
          {plans[selectedPlan].originalPrice && (
            <Text style={styles.originalPrice}>{plans[selectedPlan].originalPrice}</Text>
          )}
          
          {plans[selectedPlan].savings && (
            <Text style={styles.savings}>{plans[selectedPlan].savings}</Text>
          )}
          
          <TouchableOpacity
            style={globalStyles.goldButton}
            onPress={handleSubscribe}
          >
            <Text style={globalStyles.goldButtonText}>Start Premium Journey ✨</Text>
          </TouchableOpacity>
        </View>

        {/* Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>Premium Features</Text>
          
          <View style={styles.featuresGrid}>
            {premiumFeatures.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.featureHeader}>
                  <Icon name={feature.icon} size={20} color={colors.galactic.gold} />
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  {feature.highlight && (
                    <View style={[
                      styles.highlightBadge,
                      feature.highlight === 'Most Popular' 
                        ? styles.popularBadge 
                        : styles.trendingBadge
                    ]}>
                      <Text style={styles.highlightText}>{feature.highlight}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Money Back Guarantee */}
        <View style={styles.guarantee}>
          <Icon name="verified" size={24} color={colors.galactic.teal} />
          <Text style={styles.guaranteeText}>
            7-day money-back guarantee • Cancel anytime • No hidden fees
          </Text>
        </View>

        {/* Terms */}
        <Text style={styles.terms}>
          By subscribing, you agree to our Terms of Service and Privacy Policy.
          Subscription automatically renews unless cancelled 24 hours before renewal.
        </Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  hero: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  heroIcon: {
    width: 80,
    height: 80,
    backgroundColor: colors.galactic.gold + '20',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.galactic.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.galactic.lavender,
    textAlign: 'center',
  },
  planToggle: {
    marginBottom: 24,
  },
  toggleContainer: {
    backgroundColor: colors.cosmic.card,
    borderRadius: 25,
    padding: 4,
    flexDirection: 'row',
    maxWidth: 300,
    alignSelf: 'center',
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 21,
    alignItems: 'center',
    position: 'relative',
  },
  activeToggle: {
    backgroundColor: colors.galactic.gold,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.galactic.white,
  },
  activeToggleText: {
    color: colors.cosmic.bg,
  },
  savingsBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: colors.galactic.teal,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  savingsText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.cosmic.bg,
  },
  selectedPlan: {
    backgroundColor: colors.galactic.gold + '20',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: colors.galactic.gold,
    alignItems: 'center',
  },
  planName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.galactic.white,
    marginBottom: 8,
  },
  planDescription: {
    fontSize: 14,
    color: colors.galactic.white + '60',
    textAlign: 'center',
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  price: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.galactic.gold,
  },
  period: {
    fontSize: 16,
    color: colors.galactic.white + '60',
    marginLeft: 4,
  },
  originalPrice: {
    fontSize: 14,
    color: colors.galactic.white + '40',
    textDecorationLine: 'line-through',
    marginBottom: 4,
  },
  savings: {
    fontSize: 14,
    color: colors.galactic.teal,
    fontWeight: '600',
    marginBottom: 16,
  },
  featuresSection: {
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.galactic.white,
    textAlign: 'center',
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%',
    backgroundColor: colors.cosmic.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.galactic.purple + '30',
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.galactic.white,
    marginLeft: 8,
    flex: 1,
  },
  highlightBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 4,
  },
  popularBadge: {
    backgroundColor: colors.galactic.gold,
  },
  trendingBadge: {
    backgroundColor: colors.galactic.teal,
  },
  highlightText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.cosmic.bg,
  },
  featureDescription: {
    fontSize: 12,
    color: colors.galactic.white + '70',
    lineHeight: 16,
  },
  guarantee: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.galactic.teal + '10',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.galactic.teal + '30',
  },
  guaranteeText: {
    fontSize: 14,
    color: colors.galactic.white + '80',
    marginLeft: 8,
    textAlign: 'center',
    flex: 1,
  },
  terms: {
    fontSize: 12,
    color: colors.galactic.white + '50',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 32,
  },
  premiumActiveContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  premiumActiveContent: {
    alignItems: 'center',
    maxWidth: 320,
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
  premiumActiveTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.galactic.white,
    marginBottom: 16,
  },
  premiumActiveText: {
    fontSize: 16,
    color: colors.galactic.white + '80',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  benefitsContainer: {
    backgroundColor: colors.cosmic.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    width: '100%',
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.galactic.white,
    textAlign: 'center',
    marginBottom: 16,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 8,
  },
  benefitText: {
    fontSize: 12,
    color: colors.galactic.white + '80',
    marginLeft: 8,
    flex: 1,
  },
});
