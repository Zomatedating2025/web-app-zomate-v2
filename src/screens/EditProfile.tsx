import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';
import { globalStyles } from '../styles/globalStyles';
import { useAppStore } from '../store/appStore';
import InterestsSelector from '../components/InterestsSelector';

export default function EditProfile() {
  const navigation = useNavigation();
  const { currentUser, setCurrentUser } = useAppStore();
  const [activeTab, setActiveTab] = useState<'basic' | 'interests' | 'birth'>('basic');
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    occupation: '',
    birthDate: '',
    birthTime: '',
    birthLocation: '',
  });
  const [interests, setInterests] = useState<string[]>([]);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name,
        bio: currentUser.bio,
        occupation: currentUser.occupation || '',
        birthDate: '1995-06-15', // Mock data
        birthTime: '14:30',
        birthLocation: 'Los Angeles, CA, USA',
      });
      setInterests(currentUser.interests || []);
    }
  }, [currentUser]);

  const handleSave = () => {
    if (!currentUser) return;

    if (!formData.name || !formData.bio) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    const updatedUser = {
      ...currentUser,
      name: formData.name,
      bio: formData.bio,
      occupation: formData.occupation,
      interests,
    };

    setCurrentUser(updatedUser);
    Alert.alert('Success', 'Profile updated successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: 'person' },
    { id: 'interests', label: 'Interests', icon: 'favorite' },
    { id: 'birth', label: 'Birth Info', icon: 'auto-awesome' },
  ];

  if (!currentUser) {
    return (
      <View style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.galactic.white }}>Loading...</Text>
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
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabNavigation}>
        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                activeTab === tab.id && styles.activeTab
              ]}
              onPress={() => setActiveTab(tab.id as any)}
            >
              <Icon 
                name={tab.icon} 
                size={16} 
                color={activeTab === tab.id ? colors.galactic.white : colors.galactic.white + '70'} 
              />
              <Text style={[
                styles.tabText,
                activeTab === tab.id && styles.activeTabText
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Basic Info Tab */}
        {activeTab === 'basic' && (
          <View style={styles.tabContent}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Basic Information</Text>
              
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
                <Text style={styles.label}>Occupation</Text>
                <TextInput
                  style={styles.input}
                  value={formData.occupation}
                  onChangeText={(text) => setFormData({...formData, occupation: text})}
                  placeholder="What do you do for work?"
                  placeholderTextColor={colors.galactic.white + '50'}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>About You *</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={formData.bio}
                  onChangeText={(text) => setFormData({...formData, bio: text})}
                  placeholder="Tell us about yourself..."
                  placeholderTextColor={colors.galactic.white + '50'}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
                <View style={styles.inputFooter}>
                  <Text style={styles.helperText}>
                    Share what makes your soul shine
                  </Text>
                  <Text style={styles.characterCount}>
                    {formData.bio.length}/500
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Interests Tab */}
        {activeTab === 'interests' && (
          <View style={styles.tabContent}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Your Interests</Text>
              <InterestsSelector
                selectedInterests={interests}
                onInterestsChange={setInterests}
                maxInterests={5}
              />
            </View>
          </View>
        )}

        {/* Birth Info Tab */}
        {activeTab === 'birth' && (
          <View style={styles.tabContent}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Birth Information</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Birth Date *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.birthDate}
                  onChangeText={(text) => setFormData({...formData, birthDate: text})}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor={colors.galactic.white + '50'}
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Birth Time</Text>
                <TextInput
                  style={styles.input}
                  value={formData.birthTime}
                  onChangeText={(text) => setFormData({...formData, birthTime: text})}
                  placeholder="HH:MM"
                  placeholderTextColor={colors.galactic.white + '50'}
                />
                <Text style={styles.helperText}>
                  For accurate moon and rising sign calculations
                </Text>
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

              {/* Astrological Preview */}
              <View style={styles.astroPreview}>
                <Text style={styles.astroPreviewTitle}>Your Astrological Profile</Text>
                <View style={styles.astroPreviewGrid}>
                  <View style={styles.astroPreviewItem}>
                    <Text style={styles.astroPreviewLabel}>☀️ Sun</Text>
                    <Text style={styles.astroPreviewValue}>Leo</Text>
                  </View>
                  <View style={styles.astroPreviewItem}>
                    <Text style={styles.astroPreviewLabel}>🌙 Moon</Text>
                    <Text style={styles.astroPreviewValue}>Scorpio</Text>
                  </View>
                  <View style={styles.astroPreviewItem}>
                    <Text style={styles.astroPreviewLabel}>⬆️ Rising</Text>
                    <Text style={styles.astroPreviewValue}>Gemini</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
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
  saveButton: {
    backgroundColor: colors.galactic.gold,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveButtonText: {
    color: colors.cosmic.bg,
    fontSize: 16,
    fontWeight: '600',
  },
  tabNavigation: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabContainer: {
    backgroundColor: colors.cosmic.card,
    borderRadius: 25,
    padding: 4,
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 21,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: colors.galactic.purple,
  },
  tabText: {
    fontSize: 12,
    color: colors.galactic.white + '70',
    marginLeft: 4,
    fontWeight: '500',
  },
  activeTabText: {
    color: colors.galactic.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tabContent: {
    flex: 1,
  },
  section: {
    backgroundColor: colors.cosmic.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.galactic.purple + '30',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.galactic.white,
    marginBottom: 20,
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
  inputFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  helperText: {
    fontSize: 12,
    color: colors.galactic.white + '60',
  },
  characterCount: {
    fontSize: 12,
    color: colors.galactic.white + '60',
  },
  astroPreview: {
    backgroundColor: colors.cosmic.card,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  astroPreviewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.galactic.white,
    textAlign: 'center',
    marginBottom: 16,
  },
  astroPreviewGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  astroPreviewItem: {
    alignItems: 'center',
  },
  astroPreviewLabel: {
    fontSize: 14,
    color: colors.galactic.gold,
    marginBottom: 4,
  },
  astroPreviewValue: {
    fontSize: 12,
    color: colors.galactic.white,
  },
});
