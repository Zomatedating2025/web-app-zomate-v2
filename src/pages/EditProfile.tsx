import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppStore } from '../store/appStore';
import CosmicBackground from '../components/CosmicBackground';
import PhotoUpload from '../components/PhotoUpload';
import InterestsSelector from '../components/InterestsSelector';

interface EditProfileData {
  name: string;
  bio: string;
  birthDate: string;
  birthTime?: string;
  birthLocation: string;
  occupation?: string;
}

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useAppStore();
  const [photos, setPhotos] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'basic' | 'photos' | 'interests' | 'birth'>('basic');
  
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<EditProfileData>();

  useEffect(() => {
    if (currentUser) {
      setValue('name', currentUser.name);
      setValue('bio', currentUser.bio);
      setValue('occupation', currentUser.occupation || '');
      setPhotos(currentUser.photos || []);
      setInterests(currentUser.interests || []);
      
      // Set birth data if available (would come from user's stored data)
      // For demo, we'll use placeholder values
      setValue('birthDate', '1995-06-15');
      setValue('birthTime', '14:30');
      setValue('birthLocation', 'Los Angeles, CA, USA');
    }
  }, [currentUser, setValue]);

  const zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  const getSunSign = (birthDate: string) => {
    const date = new Date(birthDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
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

  const getMoonSign = (birthDate: string, birthTime?: string) => {
    if (!birthTime) return undefined;
    
    const date = new Date(birthDate);
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const moonCycle = (dayOfYear + parseInt(birthTime.split(':')[0])) % 12;
    
    return zodiacSigns[moonCycle];
  };

  const getRisingSign = (birthDate: string, birthTime?: string, birthLocation?: string) => {
    if (!birthTime || !birthLocation) return undefined;
    
    const date = new Date(birthDate);
    const hour = parseInt(birthTime.split(':')[0]);
    const locationHash = birthLocation.length % 12;
    const risingIndex = (date.getDate() + hour + locationHash) % 12;
    
    return zodiacSigns[risingIndex];
  };

  const onSubmit = (data: EditProfileData) => {
    if (!currentUser) return;

    const sunSign = getSunSign(data.birthDate);
    const moonSign = getMoonSign(data.birthDate, data.birthTime);
    const risingSign = getRisingSign(data.birthDate, data.birthTime, data.birthLocation);

    const updatedUser = {
      ...currentUser,
      name: data.name,
      bio: data.bio,
      occupation: data.occupation,
      sunSign,
      moonSign,
      risingSign,
      photos: photos.length > 0 ? photos : currentUser.photos,
      interests,
    };

    setCurrentUser(updatedUser);
    navigate('/profile');
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: 'bi-person' },
    { id: 'photos', label: 'Photos', icon: 'bi-camera' },
    { id: 'interests', label: 'Interests', icon: 'bi-heart' },
    { id: 'birth', label: 'Birth Info', icon: 'bi-stars' },
  ];

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-cosmic-gradient flex items-center justify-center">
        <p className="text-galactic-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cosmic-gradient relative">
      <CosmicBackground />
      
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-4">
        <motion.button
          onClick={() => navigate('/profile')}
          className="p-2 hover:bg-galactic-purple/20 rounded-full transition-colors"
          whileTap={{ scale: 0.95 }}
        >
          <i className="bi bi-arrow-left text-galactic-white text-xl"></i>
        </motion.button>
        <h1 className="text-xl font-heading text-galactic-white">Edit Profile</h1>
        <motion.button
          onClick={handleSubmit(onSubmit)}
          className="bg-galactic-gold hover:bg-galactic-gold/90 text-cosmic-bg font-heading py-2 px-4 rounded-full transition-all duration-300"
          whileTap={{ scale: 0.95 }}
        >
          Save
        </motion.button>
      </div>

      {/* Tab Navigation */}
      <div className="relative z-10 px-4 mb-6">
        <div className="bg-cosmic-card rounded-full p-1 flex overflow-x-auto">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              className={`flex-1 min-w-0 py-2 px-3 rounded-full font-body text-sm transition-all duration-300 flex items-center justify-center space-x-1 ${
                activeTab === tab.id
                  ? 'bg-galactic-purple text-galactic-white'
                  : 'text-galactic-white/70 hover:text-galactic-white'
              }`}
              onClick={() => setActiveTab(tab.id as any)}
              whileTap={{ scale: 0.95 }}
            >
              <i className={`${tab.icon} text-sm`}></i>
              <span className="hidden sm:inline">{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="relative z-10 p-4">
        {/* Basic Info Tab */}
        {activeTab === 'basic' && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-card-gradient rounded-2xl p-6">
              <h3 className="text-lg font-heading text-galactic-white mb-4">Basic Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-galactic-white font-body mb-2">Full Name *</label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    className="w-full bg-cosmic-card border border-galactic-purple/30 rounded-lg px-4 py-3 text-galactic-white focus:border-galactic-purple focus:outline-none"
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-galactic-white font-body mb-2">Occupation</label>
                  <input
                    {...register('occupation')}
                    className="w-full bg-cosmic-card border border-galactic-purple/30 rounded-lg px-4 py-3 text-galactic-white focus:border-galactic-purple focus:outline-none"
                    placeholder="What do you do for work?"
                  />
                </div>

                <div>
                  <label className="block text-galactic-white font-body mb-2">About You *</label>
                  <textarea
                    {...register('bio', { 
                      required: 'Bio is required', 
                      minLength: { value: 20, message: 'Bio must be at least 20 characters' },
                      maxLength: { value: 500, message: 'Bio must be less than 500 characters' }
                    })}
                    className="w-full bg-cosmic-card border border-galactic-purple/30 rounded-lg px-4 py-3 text-galactic-white focus:border-galactic-purple focus:outline-none h-32 resize-none"
                    placeholder="Tell us about yourself..."
                  />
                  {errors.bio && <p className="text-red-400 text-sm mt-1">{errors.bio.message}</p>}
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-galactic-white/60 text-sm">
                      Share what makes your soul shine
                    </p>
                    <p className="text-galactic-white/60 text-sm">
                      {watch('bio')?.length || 0}/500
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Photos Tab */}
        {activeTab === 'photos' && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-card-gradient rounded-2xl p-6">
              <h3 className="text-lg font-heading text-galactic-white mb-4">Your Photos</h3>
              <PhotoUpload
                photos={photos}
                onPhotosChange={setPhotos}
                maxPhotos={6}
                required={true}
              />
            </div>
          </motion.div>
        )}

        {/* Interests Tab */}
        {activeTab === 'interests' && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-card-gradient rounded-2xl p-6">
              <h3 className="text-lg font-heading text-galactic-white mb-4">Your Interests</h3>
              <InterestsSelector
                selectedInterests={interests}
                onInterestsChange={setInterests}
                maxInterests={3}
                required={false}
              />
            </div>
          </motion.div>
        )}

        {/* Birth Info Tab */}
        {activeTab === 'birth' && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-card-gradient rounded-2xl p-6">
              <h3 className="text-lg font-heading text-galactic-white mb-4">Birth Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-galactic-white font-body mb-2">Birth Date *</label>
                  <input
                    {...register('birthDate', { required: 'Birth date is required' })}
                    type="date"
                    className="w-full bg-cosmic-card border border-galactic-purple/30 rounded-lg px-4 py-3 text-galactic-white focus:border-galactic-purple focus:outline-none"
                    max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                  />
                  {errors.birthDate && <p className="text-red-400 text-sm mt-1">{errors.birthDate.message}</p>}
                </div>
                
                <div>
                  <label className="block text-galactic-white font-body mb-2">Birth Time</label>
                  <input
                    {...register('birthTime')}
                    type="time"
                    className="w-full bg-cosmic-card border border-galactic-purple/30 rounded-lg px-4 py-3 text-galactic-white focus:border-galactic-purple focus:outline-none"
                  />
                  <p className="text-galactic-white/60 text-sm mt-1">
                    For accurate moon and rising sign calculations
                  </p>
                </div>
                
                <div>
                  <label className="block text-galactic-white font-body mb-2">Birth Location *</label>
                  <input
                    {...register('birthLocation', { required: 'Birth location is required' })}
                    className="w-full bg-cosmic-card border border-galactic-purple/30 rounded-lg px-4 py-3 text-galactic-white focus:border-galactic-purple focus:outline-none"
                    placeholder="City, State/Province, Country"
                  />
                  {errors.birthLocation && <p className="text-red-400 text-sm mt-1">{errors.birthLocation.message}</p>}
                </div>
              </div>

              {/* Astrological Preview */}
              {watch('birthDate') && (
                <div className="mt-6 bg-cosmic-card rounded-lg p-4">
                  <h4 className="text-galactic-white font-heading mb-3">Your Astrological Profile</h4>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p className="text-galactic-gold font-body text-sm">☀️ Sun</p>
                      <p className="text-galactic-white font-body text-xs">
                        {getSunSign(watch('birthDate'))}
                      </p>
                    </div>
                    <div>
                      <p className="text-galactic-teal font-body text-sm">🌙 Moon</p>
                      <p className="text-galactic-white font-body text-xs">
                        {watch('birthTime') ? getMoonSign(watch('birthDate'), watch('birthTime')) : 'Add time'}
                      </p>
                    </div>
                    <div>
                      <p className="text-galactic-lavender font-body text-sm">⬆️ Rising</p>
                      <p className="text-galactic-white font-body text-xs">
                        {watch('birthTime') && watch('birthLocation') 
                          ? getRisingSign(watch('birthDate'), watch('birthTime'), watch('birthLocation'))
                          : 'Add time'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
