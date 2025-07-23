import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SwipeCard from '../components/SwipeCard';
import MatchModal from '../components/MatchModal';
import UndoModal from '../components/UndoModal';
import ProfileBoostModal from '../components/ProfileBoostModal';
import FilterModal, { FilterSettings } from '../components/FilterModal';
import PremiumFeature from '../components/PremiumFeature';
import CosmicBackground from '../components/CosmicBackground';
import { useAppStore, User } from '../store/appStore';
import { CompatibilityService } from '../services/compatibilityService';
import { FilterService } from '../services/filterService';

const HomeSwipe: React.FC = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [showUndoModal, setShowUndoModal] = useState(false);
  const [showBoostModal, setShowBoostModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState<FilterSettings>(FilterService.getDefaultFilters());
  const [matchedUser, setMatchedUser] = useState<User | null>(null);
  const [lastSwipedUser, setLastSwipedUser] = useState<User | null>(null);
  const [lastSwipeDirection, setLastSwipeDirection] = useState<'left' | 'right' | null>(null);
  
  const { currentUser, addMatch, isPremium, useUndo, getRemainingUndos, hasPurchase } = useAppStore();

  // Enhanced mock users data with better compatibility
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: '2',
        name: 'Luna',
        age: 26,
        sunSign: 'Scorpio',
        moonSign: 'Pisces',
        risingSign: 'Cancer',
        occupation: 'Yoga Instructor',
        bio: 'Water sign seeking deep connections. Love moonlit walks, meditation, and meaningful conversations. Looking for someone who understands the language of the soul and isn\'t afraid to dive deep.',
        photos: [
          'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face',
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=face'
        ],
        distance: 3,
        interests: ['Yoga', 'Meditation', 'Crystals'],
        isPremium: false,
        isOnline: true
      },
      {
        id: '3',
        name: 'Phoenix',
        age: 29,
        sunSign: 'Leo',
        moonSign: 'Aries',
        risingSign: 'Sagittarius',
        occupation: 'Travel Photographer',
        bio: 'Fire sign with a passion for adventure and creativity. Love traveling, dancing, and living life to the fullest. Seeking someone to share epic adventures and create beautiful memories together.',
        photos: [
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
        ],
        distance: 7,
        interests: ['Photography', 'Travel', 'Dancing'],
        isPremium: false,
        isOnline: false
      },
      {
        id: '4',
        name: 'Sage',
        age: 24,
        sunSign: 'Virgo',
        moonSign: 'Capricorn',
        risingSign: 'Taurus',
        occupation: 'Herbalist',
        bio: 'Earth sign who loves nature, organic living, and holistic wellness. Seeking someone grounded and authentic for a stable, loving relationship built on mutual growth and respect.',
        photos: [
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face'
        ],
        distance: 12,
        interests: ['Gardening', 'Cooking', 'Hiking'],
        isPremium: false,
        isOnline: true
      },
      {
        id: '5',
        name: 'Zephyr',
        age: 27,
        sunSign: 'Aquarius',
        moonSign: 'Gemini',
        risingSign: 'Libra',
        occupation: 'UX Designer',
        bio: 'Air sign with big dreams and innovative ideas. Love intellectual conversations, art, and making the world a better place through technology and human connection.',
        photos: [
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
          'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face'
        ],
        distance: 5,
        interests: ['Design', 'Tech', 'Art'],
        isPremium: false,
        isOnline: true
      }
    ];

    // Sort users by compatibility if current user exists
    if (currentUser) {
      const sortedUsers = mockUsers
        .map(user => ({
          ...user,
          compatibilityScore: CompatibilityService.calculateCompatibility(currentUser, user).overall
        }))
        .sort((a, b) => b.compatibilityScore - a.compatibilityScore);
      
      setAllUsers(sortedUsers);
    } else {
      setAllUsers(mockUsers);
    }
  }, [currentUser]);

  // Apply filters whenever filters or allUsers change
  useEffect(() => {
    const filtered = FilterService.applyFilters(allUsers, filters);
    setFilteredUsers(filtered);
    setCurrentIndex(0); // Reset to first card when filters change
  }, [allUsers, filters]);

  const handleSwipe = (direction: 'left' | 'right', user: User) => {
    setLastSwipedUser(user);
    setLastSwipeDirection(direction);
    
    if (direction === 'right') {
      // Calculate compatibility for match probability
      const compatibility = currentUser ? CompatibilityService.calculateCompatibility(currentUser, user) : null;
      const matchProbability = compatibility ? compatibility.overall / 100 * 0.5 + 0.3 : 0.3; // 30-80% based on compatibility
      
      if (Math.random() < matchProbability) {
        setMatchedUser(user);
        setShowMatchModal(true);
        if (currentUser) {
          addMatch({
            id: Date.now().toString(),
            user,
            matchedAt: new Date(),
            unread: true,
            compatibilityScore: compatibility?.overall
          });
        }
      }
    }
    
    setCurrentIndex(prev => prev + 1);
  };

  const handleLike = () => {
    if (currentIndex < filteredUsers.length) {
      handleSwipe('right', filteredUsers[currentIndex]);
    }
  };

  const handlePass = () => {
    if (currentIndex < filteredUsers.length) {
      handleSwipe('left', filteredUsers[currentIndex]);
    }
  };

  const handleUndo = () => {
    const canUndo = useUndo();
    
    if (canUndo && lastSwipedUser && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setLastSwipedUser(null);
      setLastSwipeDirection(null);
    } else if (!canUndo && !isPremium) {
      // Show undo purchase modal
      setShowUndoModal(true);
    }
  };

  const handleUndoPurchased = () => {
    // After purchasing an undo, perform the undo action
    if (lastSwipedUser && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setLastSwipedUser(null);
      setLastSwipeDirection(null);
    }
  };

  const handleAstroLike = () => {
    if (currentIndex < filteredUsers.length) {
      const user = filteredUsers[currentIndex];
      setLastSwipedUser(user);
      setLastSwipeDirection('right');
      
      // Astro Like has higher match probability based on compatibility
      const compatibility = currentUser ? CompatibilityService.calculateCompatibility(currentUser, user) : null;
      const matchProbability = compatibility ? Math.min(0.9, compatibility.overall / 100 * 0.7 + 0.4) : 0.6; // 40-90% based on compatibility
      
      if (Math.random() < matchProbability) {
        setMatchedUser(user);
        setShowMatchModal(true);
        if (currentUser) {
          addMatch({
            id: Date.now().toString(),
            user,
            matchedAt: new Date(),
            unread: true,
            compatibilityScore: compatibility?.overall
          });
        }
      }
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleBoost = () => {
    setShowBoostModal(true);
  };

  const handleFiltersApply = (newFilters: FilterSettings) => {
    setFilters(newFilters);
  };

  const getActiveFiltersCount = () => {
    return filters.sunSigns.length + 
           filters.elements.length + 
           filters.moonSigns.length + 
           filters.risingSigns.length + 
           filters.interests.length +
           (filters.showOnlineOnly ? 1 : 0) +
           (filters.ageRange[0] !== 18 || filters.ageRange[1] !== 50 ? 1 : 0) +
           (filters.maxDistance !== 100 ? 1 : 0);
  };

  const remainingUndos = getRemainingUndos();
  const canUseUndo = isPremium || remainingUndos > 0;
  const hasActiveBoost = hasPurchase('profile-boost-1h') || hasPurchase('profile-boost-24h') || hasPurchase('profile-boost-week');
  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="min-h-screen bg-cosmic-gradient relative overflow-hidden">
      <CosmicBackground />
      
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-4">
        <motion.button
          className={`p-3 rounded-full relative transition-all duration-300 ${
            activeFiltersCount > 0
              ? 'bg-galactic-purple text-galactic-white'
              : 'bg-cosmic-card text-galactic-white hover:bg-galactic-purple/20'
          }`}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowFilterModal(true)}
        >
          <i className="bi bi-funnel text-xl"></i>
          {activeFiltersCount > 0 && (
            <motion.div
              className="absolute -top-1 -right-1 w-5 h-5 bg-galactic-gold rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
            >
              <span className="text-xs font-bold text-cosmic-bg">{activeFiltersCount}</span>
            </motion.div>
          )}
        </motion.button>
        
        <div className="text-center">
          <h1 className="text-2xl font-heading text-galactic-white">Explore</h1>
          <div className="flex items-center justify-center space-x-2 text-xs text-galactic-white/60 font-body">
            <span>{filteredUsers.length} profiles</span>
            {!isPremium && (
              <>
                <span>•</span>
                <span>{remainingUndos} undos left</span>
              </>
            )}
          </div>
        </div>
        
        <motion.button
          className={`p-3 rounded-full relative transition-all duration-300 ${
            hasActiveBoost 
              ? 'bg-galactic-gold text-cosmic-bg animate-pulse' 
              : 'bg-cosmic-card text-galactic-gold hover:bg-galactic-gold/20'
          }`}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={handleBoost}
        >
          <i className="bi bi-lightning text-xl"></i>
          {hasActiveBoost && (
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-galactic-teal rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.button>
      </div>

      {/* Swipe Cards */}
      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="relative w-80 h-[500px]">
          {currentIndex >= filteredUsers.length ? (
            <motion.div
              className="absolute inset-0 bg-card-gradient rounded-2xl flex items-center justify-center text-center p-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div>
                <i className="bi bi-stars text-6xl text-galactic-gold mb-4 block"></i>
                <h3 className="text-xl font-heading text-galactic-white mb-2">
                  {activeFiltersCount > 0 ? 'No matches for your filters' : 'No more profiles'}
                </h3>
                <p className="text-galactic-white/70 font-body mb-4">
                  {activeFiltersCount > 0 
                    ? 'Try adjusting your filters to see more cosmic connections'
                    : 'Check back later for new cosmic connections'
                  }
                </p>
                <div className="space-y-2">
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={() => setShowFilterModal(true)}
                      className="w-full bg-galactic-purple hover:bg-galactic-purple/80 text-galactic-white font-heading py-2 px-6 rounded-full transition-all duration-300"
                    >
                      Adjust Filters
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setCurrentIndex(0);
                      setLastSwipedUser(null);
                      setLastSwipeDirection(null);
                      if (activeFiltersCount > 0) {
                        setFilters(FilterService.getDefaultFilters());
                      }
                    }}
                    className="w-full bg-transparent border border-galactic-white/30 text-galactic-white font-body py-2 px-6 rounded-full hover:bg-galactic-white/10 transition-all duration-300"
                  >
                    {activeFiltersCount > 0 ? 'Clear Filters & Refresh' : 'Refresh'}
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Next card (background) */}
              {currentIndex + 1 < filteredUsers.length && (
                <SwipeCard
                  key={filteredUsers[currentIndex + 1].id}
                  user={filteredUsers[currentIndex + 1]}
                  isTop={false}
                />
              )}
              
              {/* Current card (top) */}
              <SwipeCard
                key={filteredUsers[currentIndex].id}
                user={filteredUsers[currentIndex]}
                onSwipe={handleSwipe}
                isTop={true}
              />
            </>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 flex justify-center items-center space-x-4 pb-8">
        {/* Undo Button */}
        <motion.button
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 relative ${
            canUseUndo
              ? 'bg-galactic-teal hover:bg-galactic-teal/80' 
              : 'bg-gray-500 cursor-pointer'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleUndo}
          disabled={!lastSwipedUser}
        >
          <i className={`bi bi-arrow-counterclockwise text-xl ${
            canUseUndo ? 'text-white' : 'text-white/50'
          }`}></i>
          
          {!isPremium && (
            <div className="absolute -top-2 -right-2 bg-galactic-gold text-cosmic-bg text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
              {remainingUndos}
            </div>
          )}
        </motion.button>

        {/* Pass Button */}
        <motion.button
          className="w-14 h-14 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePass}
          disabled={currentIndex >= filteredUsers.length}
        >
          <i className="bi bi-x-lg text-white text-xl"></i>
        </motion.button>
        
        {/* Astro Like Button */}
        <div className="relative">
          <motion.button
            className="w-16 h-16 bg-galactic-gold hover:bg-galactic-gold/90 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAstroLike}
            disabled={currentIndex >= filteredUsers.length}
          >
            {/* Pulsing ring animation */}
            <motion.div
              className="absolute inset-0 border-2 border-galactic-teal rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            <i className="bi bi-star-fill text-cosmic-bg text-xl relative z-10"></i>
          </motion.button>
          
          <motion.div
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-xs font-body text-galactic-gold bg-cosmic-card/80 px-2 py-1 rounded-full">
              Astro Like
            </span>
          </motion.div>
        </div>
        
        {/* Like Button */}
        <motion.button
          className="w-14 h-14 bg-green-500 hover:green-600 rounded-full flex items-center justify-center shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          disabled={currentIndex >= filteredUsers.length}
        >
          <i className="bi bi-heart-fill text-white text-xl"></i>
        </motion.button>
      </div>

      {/* Match Modal */}
      {showMatchModal && matchedUser && currentUser && (
        <MatchModal
          isOpen={showMatchModal}
          onClose={() => setShowMatchModal(false)}
          currentUser={currentUser}
          matchedUser={matchedUser}
        />
      )}

      {/* Undo Modal */}
      <UndoModal
        isOpen={showUndoModal}
        onClose={() => setShowUndoModal(false)}
        onUndoPurchased={handleUndoPurchased}
      />

      {/* Profile Boost Modal */}
      <ProfileBoostModal
        isOpen={showBoostModal}
        onClose={() => setShowBoostModal(false)}
      />

      {/* Filter Modal */}
      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onFiltersApply={handleFiltersApply}
        currentFilters={filters}
      />
    </div>
  );
};

export default HomeSwipe;
