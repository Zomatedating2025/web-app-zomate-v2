import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import CosmicBackground from '../components/CosmicBackground';

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

const SeeWhoLikedYou: React.FC = () => {
  const [likedProfiles, setLikedProfiles] = useState<LikedProfile[]>([]);
  const { isPremium, currentUser } = useAppStore();
  const navigate = useNavigate();

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

  const zodiacEmoji = {
    'Aries': '♈', 'Taurus': '♉', 'Gemini': '♊', 'Cancer': '♋',
    'Leo': '♌', 'Virgo': '♍', 'Libra': '♎', 'Scorpio': '♏',
    'Sagittarius': '♐', 'Capricorn': '♑', 'Aquarius': '♒', 'Pisces': '♓'
  };

  const handleProfileClick = (profile: LikedProfile) => {
    if (!isPremium) {
      navigate('/premium');
      return;
    }
    // Navigate to profile or start conversation
    navigate('/home'); // In real app, would navigate to specific profile
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
      <div className="min-h-screen bg-cosmic-gradient relative">
        <CosmicBackground />
        
        {/* Header */}
        <div className="relative z-10 flex items-center justify-between p-4">
          <motion.button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-galactic-purple/20 rounded-full transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <i className="bi bi-arrow-left text-galactic-white text-xl"></i>
          </motion.button>
          <h1 className="text-xl font-heading text-galactic-white">Who Likes You</h1>
          <div className="w-10"></div>
        </div>

        {/* Premium Required */}
        <div className="relative z-10 p-4">
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="w-24 h-24 mx-auto mb-6 bg-galactic-gold/20 rounded-full flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <i className="bi bi-crown text-4xl text-galactic-gold"></i>
            </motion.div>
            
            <h2 className="text-2xl font-heading text-galactic-white mb-4">
              Unlock Your Admirers
            </h2>
            
            <p className="text-galactic-white/80 font-body mb-8 leading-relaxed">
              See who's been swiping right on your cosmic energy! Upgrade to Premium to reveal your secret admirers.
            </p>

            {/* Blurred Preview */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {likedProfiles.slice(0, 4).map((profile, index) => (
                <motion.div
                  key={profile.id}
                  className="relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-card-gradient rounded-2xl p-4 relative overflow-hidden">
                    <div className="relative">
                      <img
                        src={profile.photos[0]}
                        alt="Admirer"
                        className="w-full h-32 object-cover rounded-lg blur-md"
                        crossOrigin="anonymous"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                        <i className="bi bi-heart-fill text-galactic-gold text-2xl"></i>
                      </div>
                    </div>
                    <div className="mt-3 text-center">
                      <div className="h-4 bg-galactic-white/20 rounded mb-2 blur-sm"></div>
                      <div className="h-3 bg-galactic-white/10 rounded w-2/3 mx-auto blur-sm"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.button
              className="bg-galactic-gold hover:bg-galactic-gold/90 text-cosmic-bg font-heading py-4 px-8 rounded-full transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/premium')}
            >
              Upgrade to See All ✨
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cosmic-gradient relative">
      <CosmicBackground />
      
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-4">
        <motion.button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-galactic-purple/20 rounded-full transition-colors"
          whileTap={{ scale: 0.95 }}
        >
          <i className="bi bi-arrow-left text-galactic-white text-xl"></i>
        </motion.button>
        <h1 className="text-xl font-heading text-galactic-white">Who Likes You</h1>
        <div className="flex items-center space-x-1">
          <i className="bi bi-crown text-galactic-gold text-sm"></i>
          <span className="text-galactic-gold text-xs font-heading">Premium</span>
        </div>
      </div>

      <div className="relative z-10 p-4">
        {likedProfiles.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <i className="bi bi-heart text-6xl text-galactic-purple/50 mb-4 block"></i>
            <h3 className="text-xl font-heading text-galactic-white mb-2">No likes yet</h3>
            <p className="text-galactic-white/70 font-body mb-6">
              Keep exploring to attract your cosmic admirers!
            </p>
            <button
              onClick={() => navigate('/home')}
              className="bg-galactic-purple hover:bg-galactic-purple/80 text-galactic-white font-heading py-3 px-6 rounded-full transition-all duration-300"
            >
              Start Exploring
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div
              className="text-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl font-heading text-galactic-white mb-2">
                {likedProfiles.length} Cosmic Admirers
              </h2>
              <p className="text-galactic-white/70 font-body">
                These beautiful souls have swiped right on you! ✨
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {likedProfiles.map((profile, index) => (
                <motion.div
                  key={profile.id}
                  className="bg-card-gradient rounded-2xl p-4 cursor-pointer hover:bg-galactic-purple/10 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleProfileClick(profile)}
                >
                  <div className="relative mb-3">
                    <img
                      src={profile.photos[0]}
                      alt={profile.name}
                      className="w-full h-40 object-cover rounded-lg"
                      crossOrigin="anonymous"
                    />
                    
                    {/* Zodiac Badge */}
                    <div className="absolute top-2 right-2 bg-galactic-purple/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                      <span className="text-sm">{zodiacEmoji[profile.sunSign as keyof typeof zodiacEmoji]}</span>
                    </div>

                    {/* Like Indicator */}
                    <div className="absolute bottom-2 left-2 bg-galactic-gold/80 backdrop-blur-sm rounded-full p-2">
                      <i className="bi bi-heart-fill text-cosmic-bg text-sm"></i>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="font-heading text-galactic-white mb-1">
                      {profile.name}, {profile.age}
                    </h3>
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className="text-galactic-lavender font-body text-sm">{profile.sunSign}</span>
                      {profile.distance && (
                        <>
                          <span className="text-galactic-white/30">•</span>
                          <span className="text-galactic-white/60 font-body text-sm">{profile.distance}km</span>
                        </>
                      )}
                    </div>
                    <p className="text-galactic-teal font-body text-xs">
                      Liked you {getTimeAgo(profile.likedAt)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action Button */}
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button
                onClick={() => navigate('/home')}
                className="bg-galactic-purple hover:bg-galactic-purple/80 text-galactic-white font-heading py-3 px-8 rounded-full transition-all duration-300"
              >
                Start Matching
              </button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default SeeWhoLikedYou;
