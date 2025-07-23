import React from 'react';
import { motion } from 'framer-motion';

interface InterestsSelectorProps {
  selectedInterests: string[];
  onInterestsChange: (interests: string[]) => void;
  maxInterests?: number;
  required?: boolean;
}

const MILLENNIAL_GENZ_INTERESTS = [
  // Social Media & Digital Culture
  'TikTok', 'Instagram', 'YouTube', 'Podcasts', 'Streaming', 'Memes', 'Content Creation',
  'Influencer Culture', 'Social Media', 'Digital Art', 'NFTs', 'Crypto',
  
  // Entertainment & Pop Culture
  'Netflix & Chill', 'Binge Watching', 'Marvel Movies', 'Anime', 'K-Pop', 'Taylor Swift',
  'Harry Potter', 'Disney+', 'Gaming', 'Esports', 'Twitch', 'Reality TV', 'True Crime',
  
  // Food & Lifestyle
  'Brunch', 'Bubble Tea', 'Avocado Toast', 'Food Trucks', 'Craft Beer', 'Wine Tasting',
  'Vegan Food', 'Plant-Based', 'Meal Prep', 'Food Photography', 'Coffee Culture', 'Matcha',
  
  // Wellness & Self-Care
  'Mental Health', 'Therapy', 'Meditation', 'Mindfulness', 'Self-Care', 'Skincare',
  'Yoga', 'Pilates', 'Wellness', 'Manifestation', 'Journaling', 'Breathwork',
  
  // Creative & Artistic
  'Photography', 'Art', 'Music Festivals', 'Concerts', 'Vinyl Records', 'Indie Music',
  'Creative Writing', 'Poetry', 'DIY Projects', 'Crafting', 'Painting', 'Drawing',
  
  // Tech & Innovation
  'Tech', 'AI', 'Startups', 'Side Hustles', 'Entrepreneurship', 'Remote Work',
  'Digital Nomad', 'Coding', 'Web Design', 'UX/UI Design', 'Innovation',
  
  // Outdoor & Adventure
  'Hiking', 'Rock Climbing', 'Camping', 'Festival Season', 'Road Trips', 'Travel',
  'Backpacking', 'National Parks', 'Beach Days', 'Surfing', 'Skateboarding',
  
  // Fitness & Sports
  'Gym Life', 'CrossFit', 'Running', 'Cycling', 'Swimming', 'Dance', 'Martial Arts',
  'Rock Climbing', 'Bouldering', 'Outdoor Fitness', 'Home Workouts',
  
  // Social Causes & Values
  'Sustainability', 'Climate Change', 'Social Justice', 'Volunteering', 'Activism',
  'LGBTQ+ Rights', 'Feminism', 'Diversity & Inclusion', 'Community Building',
  
  // Learning & Growth
  'Personal Development', 'Online Courses', 'Language Learning', 'Reading',
  'Philosophy', 'Psychology', 'History', 'Science', 'Documentaries',
  
  // Nightlife & Social
  'Rooftop Bars', 'Speakeasies', 'Live Music', 'Dancing', 'Karaoke', 'Game Nights',
  'Trivia Nights', 'Escape Rooms', 'Bowling', 'Mini Golf', 'Arcade Games',
  
  // Hobbies & Collections
  'Thrifting', 'Vintage Shopping', 'Sneaker Culture', 'Fashion', 'Makeup',
  'Plant Parenting', 'Gardening', 'Board Games', 'Video Games', 'Collecting',
  
  // Spiritual & Alternative
  'Astrology', 'Crystals', 'Tarot', 'Spirituality', 'Energy Healing', 'Chakras',
  'Moon Phases', 'Manifestation', 'Sacred Geometry', 'Witchcraft', 'Paganism'
];

const InterestsSelector: React.FC<InterestsSelectorProps> = ({ 
  selectedInterests, 
  onInterestsChange, 
  maxInterests = 5,
  required = false
}) => {
  
  const handleInterestToggle = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      onInterestsChange(selectedInterests.filter(i => i !== interest));
    } else if (selectedInterests.length < maxInterests) {
      onInterestsChange([...selectedInterests, interest]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-heading text-galactic-white mb-2">
          What sparks your cosmic curiosity?
        </h3>
        <p className="text-galactic-white/70 font-body text-sm mb-4">
          Choose up to {maxInterests} interests that define your cosmic journey.
        </p>
        <div className="bg-cosmic-card rounded-full px-4 py-2 inline-block">
          <span className="text-galactic-white font-body text-sm">
            {selectedInterests.length} / {maxInterests} selected
          </span>
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto">
        <div className="grid grid-cols-2 gap-2">
          {MILLENNIAL_GENZ_INTERESTS.map((interest) => {
            const isSelected = selectedInterests.includes(interest);
            const canSelect = selectedInterests.length < maxInterests || isSelected;
            
            return (
              <motion.button
                key={interest}
                className={`p-3 rounded-lg border transition-all duration-300 text-sm font-body ${
                  isSelected
                    ? 'border-galactic-gold bg-galactic-gold/20 text-galactic-white'
                    : canSelect
                    ? 'border-galactic-purple/30 bg-cosmic-card text-galactic-white/80 hover:border-galactic-purple hover:bg-galactic-purple/10'
                    : 'border-galactic-white/10 bg-cosmic-card/30 text-galactic-white/30 cursor-not-allowed'
                }`}
                onClick={() => canSelect && handleInterestToggle(interest)}
                disabled={!canSelect}
                whileHover={canSelect ? { scale: 1.02 } : {}}
                whileTap={canSelect ? { scale: 0.98 } : {}}
              >
                {interest}
              </motion.button>
            );
          })}
        </div>
      </div>

      {selectedInterests.length > 0 && (
        <motion.div
          className="bg-galactic-purple/20 rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h4 className="text-galactic-white font-heading mb-3">Your Selected Interests:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedInterests.map((interest) => (
              <span
                key={interest}
                className="bg-galactic-gold/20 text-galactic-gold px-3 py-1 rounded-full text-xs font-body"
              >
                {interest}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default InterestsSelector;
