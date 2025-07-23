import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';
import { globalStyles } from '../styles/globalStyles';
import { useAppStore } from '../store/appStore';
import InterestsSelector from '../components/InterestsSelector';

export default function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthDate: '',
    birthTime: '',
    birthLocation: '',
    bio: '',
    interests: [] as string[],
  });
  
  const navigation = useNavigation();
  const { setCurrentUser, setOnboarded } = useAppStore();

  const zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  const getSunSign = (birthDate: string) => {
    // Simplified zodiac calculation
    const month = parseInt(birthDate.split('-')[1]);
    const day = parseInt(birthDate.split('-')[2]);
    
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
    return 'Pisces';
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleComplete = () => {
    if (!formData.name || !formData.email || !formData.birthDate || !formData.bio) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    const sunSign = getSunSign(formData.birthDate);
    const age = calculateAge(formData.birthDate);
    
    const user = {
      id: '1',
      name: formData.name,
      age,
      sunSign,
      bio: formData.bio,
      photos: ['https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face'],
      interests: formData.interests,
      isPremium: false,
    };

    setCurrentUser(user);
    setOnboarded(true);
    navigation.navigate('Main' as never);
  };

  const steps = [
    {
      title: 'Welcome to ZoMate',
      subtitle: 'Let the stars guide your love story',
      content: (
        <View style={styles.welcomeContainer}>
          <View style={styles.iconContainer}>
            <Icon name="auto-awesome" size={60} color={colors.galactic.gold} />
          </View>
          <Text style={styles.welcomeText}>
            Find your cosmic connection through the ancient wisdom of astrology. 
            Your birth chart holds the key to compatibility and deeper understanding.
          </Text>
          <TouchableOpacity 
            style={globalStyles.button}
            onPress={() => setStep(1)}
          >
            <Text style={globalStyles.buttonText}>Begin Your Cosmic Journey</Text>
          </TouchableOpacity>
        </View>
      )
    },
    {
      title: 'Tell us about yourself',
      subtitle: 'Basic information to get started',
      content: (
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(text) => setFormData({...formData, name: text})}
              placeholder="Enter your full name"
              placeholderTextColor={colors.galactic.white + '50'}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address *</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => setFormData({...formData, email: text})}
              placeholder="your.email@example.com"
              placeholderTextColor={colors.galactic.white + '50'}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>
      )
    },
    {
      title: 'Your Birth Details',
      subtitle: 'Essential for accurate astrological calculations',
      content: (
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Birth Date *</Text>
            <TextInput
              style={styles.input}
              value={formData.birthDate}
              onChangeText={(text) => setFormData({...formData, birthDate: text})}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={colors.galactic.white + '50'}
            />
            <Text style={styles.helperText}>Used to calculate your sun sign and compatibility</Text>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Birth Time (Optional)</Text>
            <TextInput
              style={styles.input}
              value={formData.birthTime}
              onChangeText={(text) => setFormData({...formData, birthTime: text})}
              placeholder="HH:MM"
              placeholderTextColor={colors.galactic.white + '50'}
            />
            <Text style={styles.helperText}>For moon and rising sign calculations</Text>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Birth Location *</Text>
            <TextInput
              style={styles.input}
              value={formData.birthLocation}
              onChangeText={(text) => setFormData({...formData, birthLocation: text})}
              placeholder="City, State/Province, Country"
              placeholderTextColor={colors.galactic.white + '50'}
            />
          </View>
        </View>
      )
    },
    {
      title: 'What lights up your soul?',
      subtitle: 'Choose interests that define your cosmic journey',
      content: (
        <InterestsSelector
          selectedInterests={formData.interests}
          onInterestsChange={(interests) => setFormData({...formData, interests})}
          maxInterests={5}
        />
      )
    },
    {
      title: 'Tell your cosmic story',
      subtitle: 'Let others know what makes you special',
      content: (
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>About You *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.bio}
              onChangeText={(text) => setFormData({...formData, bio: text})}
              placeholder="Tell us about yourself, your interests, what you're looking for..."
              placeholderTextColor={colors.galactic.white + '50'}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            <Text style={styles.helperText}>
              Share your passions, values, and what makes your soul shine
            </Text>
          </View>
        </View>
      )
    }
  ];

  const canProceed = () => {
    switch (step) {
      case 1: return formData.name && formData.email;
      case 2: return formData.birthDate && formData.birthLocation;
      case 3: return true; // Interests are optional
      case 4: return formData.bio && formData.bio.length >= 20;
      default: return true;
    }
  };

  return (
    <View style={globalStyles.container}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Step {step + 1} of {steps.length}</Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((step + 1) / steps.length) * 100}%` }
              ]} 
            />
          </View>
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{steps[step].title}</Text>
          <Text style={styles.subtitle}>{steps[step].subtitle}</Text>
          
          {steps[step].content}
        </View>

        {/* Navigation Buttons */}
        {step > 0 && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => setStep(step - 1)}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            
            {step < steps.length - 1 ? (
              <TouchableOpacity 
                style={[globalStyles.button, !canProceed() && styles.disabledButton]}
                onPress={() => canProceed() && setStep(step + 1)}
                disabled={!canProceed()}
              >
                <Text style={globalStyles.buttonText}>Continue</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={[globalStyles.goldButton, !canProceed() && styles.disabledButton]}
                onPress={handleComplete}
                disabled={!canProceed()}
              >
                <Text style={globalStyles.goldButtonText}>Complete Profile</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  progressContainer: {
    marginBottom: 32,
  },
  progressText: {
    color: colors.galactic.white + '60',
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.cosmic.card,
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.galactic.purple,
    borderRadius: 2,
  },
  contentContainer: {
    flex: 1,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.galactic.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.galactic.white + '70',
    textAlign: 'center',
    marginBottom: 32,
  },
  welcomeContainer: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 100,
    height: 100,
    backgroundColor: colors.galactic.purple + '20',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 16,
    color: colors.galactic.white + '80',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  formContainer: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: colors.galactic.white,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: colors.cosmic.card,
    borderColor: colors.galactic.purple + '30',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    color: colors.galactic.white,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  helperText: {
    fontSize: 12,
    color: colors.galactic.white + '60',
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  backButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderColor: colors.galactic.white + '30',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  backButtonText: {
    color: colors.galactic.white,
    fontSize: 16,
    fontWeight: '500',
  },
  disabledButton: {
    opacity: 0.5,
  },
});
