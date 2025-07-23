import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppStore } from '../store/appStore';
import CosmicBackground from '../components/CosmicBackground';
import PhotoUpload from '../components/PhotoUpload';
import InterestsSelector from '../components/InterestsSelector';

interface OnboardingData {
  name: string;
  email: string;
  birthDate: string;
  birthTime?: string;
  birthLocation: string;
  bio: string;
  photos: string[];
  interests: string[];
}

const OnboardingFlow: React.FC = () => {
  const [step, setStep] = useState(0);
  const [photos, setPhotos] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const navigate = useNavigate();
  const { setCurrentUser, setOnboarded } = useAppStore();
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<OnboardingData>();

  const zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

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

  const onSubmit = (data: OnboardingData) => {
    const sunSign = getSunSign(data.birthDate);
    const moonSign = getMoonSign(data.birthDate, data.birthTime);
    const risingSign = getRisingSign(data.birthDate, data.birthTime, data.birthLocation);
    const age = calculateAge(data.birthDate);
    
    const user = {
      id: '1',
      name: data.name,
      age,
      sunSign,
      moonSign,
      risingSign,
      bio: data.bio,
      photos: photos.length > 0 ? photos : ['https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face'],
      interests,
      isPremium: false,
    };

    setCurrentUser(user);
    setOnboarded(true);
    navigate('/home');
  };

  const canProceedToNextStep = () => {
    switch (step) {
      case 1: // Basic info
        return watch('name') && watch('email');
      case 2: // Birth details
        return watch('birthDate') && watch('birthLocation');
      case 3: // Interests (optional)
        return true; // Always can proceed since interests are optional
      case 4: // Bio
        return watch('bio') && watch('bio').length >= 20;
      case 5: // Photos
        return photos.length >= 3;
      default:
        return true;
    }
  };

  const steps = [
    {
      title: 'Welcome to ZoMate',
      subtitle: 'Let the stars guide your love story',
      content: (
        <div className="text-center">
          <motion.div
            className="w-24 h-24 mx-auto mb-6 bg-galactic-purple/20 rounded-full flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <i className="bi bi-stars text-4xl text-galactic-gold"></i>
          </motion.div>
          <p className="text-galactic-white/80 font-body mb-8 leading-relaxed">
            Find your cosmic connection through the ancient wisdom of astrology. 
            Your birth chart holds the key to compatibility and deeper understanding.
          </p>
          <button
            onClick={() => setStep(1)}
            className="w-full bg-galactic-purple hover:bg-galactic-purple/80 text-galactic-white font-heading py-4 px-6 rounded-full transition-all duration-300"
          >
            Begin Your Cosmic Journey
          </button>
        </div>
      )
    },
    {
      title: 'Tell us about yourself',
      subtitle: 'Basic information to get started',
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-galactic-white font-body mb-2">Full Name *</label>
            <input
              {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Name must be at least 2 characters' } })}
              className="w-full bg-cosmic-card border border-galactic-purple/30 rounded-lg px-4 py-3 text-galactic-white focus:border-galactic-purple focus:outline-none"
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
          </div>
          
          <div>
            <label className="block text-galactic-white font-body mb-2">Email Address *</label>
            <input
              {...register('email', { 
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Please enter a valid email address' }
              })}
              type="email"
              className="w-full bg-cosmic-card border border-galactic-purple/30 rounded-lg px-4 py-3 text-galactic-white focus:border-galactic-purple focus:outline-none"
              placeholder="your.email@example.com"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>
        </div>
      )
    },
    {
      title: 'Your Birth Details',
      subtitle: 'Essential for accurate astrological calculations',
      content: (
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
            <p className="text-galactic-white/60 text-sm mt-1">
              Used to calculate your sun sign and compatibility
            </p>
          </div>
          
          <div>
            <label className="block text-galactic-white font-body mb-2">Birth Time (Optional)</label>
            <input
              {...register('birthTime')}
              type="time"
              className="w-full bg-cosmic-card border border-galactic-purple/30 rounded-lg px-4 py-3 text-galactic-white focus:border-galactic-purple focus:outline-none"
            />
            <p className="text-galactic-white/60 text-sm mt-1">
              For moon and rising sign calculations (more accurate matches!)
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
            <p className="text-galactic-white/60 text-sm mt-1">
              Helps calculate your rising sign and local cosmic influences
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'What lights up your soul?',
      subtitle: 'Choose up to 3 interests to find like-minded cosmic connections',
      content: (
        <InterestsSelector
          selectedInterests={interests}
          onInterestsChange={setInterests}
          maxInterests={3}
          required={false}
        />
      )
    },
    {
      title: 'Tell your cosmic story',
      subtitle: 'Let others know what makes you special',
      content: (
        <div>
          <label className="block text-galactic-white font-body mb-2">About You *</label>
          <textarea
            {...register('bio', { 
              required: 'Bio is required', 
              minLength: { value: 20, message: 'Bio must be at least 20 characters' },
              maxLength: { value: 500, message: 'Bio must be less than 500 characters' }
            })}
            className="w-full bg-cosmic-card border border-galactic-purple/30 rounded-lg px-4 py-3 text-galactic-white focus:border-galactic-purple focus:outline-none h-32 resize-none"
            placeholder="Tell us about yourself, your interests, what you're looking for in a cosmic connection..."
          />
          {errors.bio && <p className="text-red-400 text-sm mt-1">{errors.bio.message}</p>}
          <div className="flex justify-between items-center mt-2">
            <p className="text-galactic-white/60 text-sm">
              Share your passions, values, and what makes your soul shine
            </p>
            <p className="text-galactic-white/60 text-sm">
              {watch('bio')?.length || 0}/500
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Show your cosmic energy',
      subtitle: 'Add at least 3 photos to complete your profile',
      content: (
        <PhotoUpload
          photos={photos}
          onPhotosChange={setPhotos}
          maxPhotos={6}
          required={true}
        />
      )
    },
    {
      title: 'Your Cosmic Profile',
      subtitle: 'Review your astrological information',
      content: (
        <div className="text-center">
          {watch('birthDate') && (
            <div className="bg-card-gradient rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-galactic-purple/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-3xl">
                    {getSunSign(watch('birthDate')) === 'Aries' && '♈'}
                    {getSunSign(watch('birthDate')) === 'Taurus' && '♉'}
                    {getSunSign(watch('birthDate')) === 'Gemini' && '♊'}
                    {getSunSign(watch('birthDate')) === 'Cancer' && '♋'}
                    {getSunSign(watch('birthDate')) === 'Leo' && '♌'}
                    {getSunSign(watch('birthDate')) === 'Virgo' && '♍'}
                    {getSunSign(watch('birthDate')) === 'Libra' && '♎'}
                    {getSunSign(watch('birthDate')) === 'Scorpio' && '♏'}
                    {getSunSign(watch('birthDate')) === 'Sagittarius' && '♐'}
                    {getSunSign(watch('birthDate')) === 'Capricorn' && '♑'}
                    {getSunSign(watch('birthDate')) === 'Aquarius' && '♒'}
                    {getSunSign(watch('birthDate')) === 'Pisces' && '♓'}
                  </span>
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-heading text-galactic-white">
                    {getSunSign(watch('birthDate'))}
                  </h3>
                  <p className="text-galactic-lavender font-body">Your Sun Sign</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div className="bg-cosmic-card rounded-lg p-3">
                  <p className="text-galactic-teal font-body">🌙 Moon Sign</p>
                  <p className="text-galactic-white">
                    {watch('birthTime') ? getMoonSign(watch('birthDate'), watch('birthTime')) : 'Add birth time'}
                  </p>
                </div>
                <div className="bg-cosmic-card rounded-lg p-3">
                  <p className="text-galactic-gold font-body">⬆️ Rising Sign</p>
                  <p className="text-galactic-white">
                    {watch('birthTime') && watch('birthLocation') 
                      ? getRisingSign(watch('birthDate'), watch('birthTime'), watch('birthLocation'))
                      : 'Add birth time'
                    }
                  </p>
                </div>
              </div>

              {/* Photos Preview */}
              {photos.length > 0 && (
                <div className="mb-4">
                  <p className="text-galactic-white font-body text-sm mb-2">Your Photos ({photos.length})</p>
                  <div className="flex space-x-2 overflow-x-auto">
                    {photos.slice(0, 3).map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        crossOrigin="anonymous"
                      />
                    ))}
                    {photos.length > 3 && (
                      <div className="w-16 h-16 bg-cosmic-card rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-galactic-white/60 text-xs">+{photos.length - 3}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Interests Preview */}
              {interests.length > 0 ? (
                <div>
                  <p className="text-galactic-white font-body text-sm mb-2">Your Interests ({interests.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest) => (
                      <span
                        key={interest}
                        className="bg-galactic-gold/20 text-galactic-gold px-2 py-1 rounded-full text-xs font-body"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-galactic-white/60 font-body text-sm">
                    No interests selected - you can add them later in your profile
                  </p>
                </div>
              )}
            </div>
          )}
          
          <p className="text-galactic-white/80 font-body mb-6">
            Your cosmic profile is ready! The stars are aligned for you to find meaningful connections.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-cosmic-gradient flex items-center justify-center p-4 relative overflow-hidden">
      <CosmicBackground />
      
      <div className="w-full max-w-md z-10">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-galactic-white/60 font-body text-sm">Step {step + 1} of {steps.length}</span>
            <span className="text-galactic-white/60 font-body text-sm">{Math.round(((step + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-cosmic-card rounded-full h-2">
            <motion.div
              className="bg-galactic-purple h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-card-gradient rounded-2xl p-6 shadow-2xl"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-heading text-galactic-white mb-2">
                {steps[step].title}
              </h2>
              <p className="text-galactic-white/70 font-body">
                {steps[step].subtitle}
              </p>
            </div>

            {steps[step].content}

            {step > 0 && (
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex-1 bg-transparent border border-galactic-white/30 text-galactic-white font-body py-3 px-6 rounded-full hover:bg-galactic-white/10 transition-all duration-300"
                >
                  Back
                </button>
                {step < steps.length - 1 ? (
                  <button
                    onClick={() => canProceedToNextStep() && setStep(step + 1)}
                    className={`flex-1 font-heading py-3 px-6 rounded-full transition-all duration-300 ${
                      canProceedToNextStep()
                        ? 'bg-galactic-purple hover:bg-galactic-purple/80 text-galactic-white'
                        : 'bg-galactic-white/20 text-galactic-white/50 cursor-not-allowed'
                    }`}
                    disabled={!canProceedToNextStep()}
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit(onSubmit)}
                    className={`flex-1 font-heading py-3 px-6 rounded-full transition-all duration-300 ${
                      canProceedToNextStep()
                        ? 'bg-galactic-gold hover:bg-galactic-gold/80 text-cosmic-bg'
                        : 'bg-galactic-white/20 text-galactic-white/50 cursor-not-allowed'
                    }`}
                    disabled={!canProceedToNextStep()}
                  >
                    Complete Profile
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OnboardingFlow;
