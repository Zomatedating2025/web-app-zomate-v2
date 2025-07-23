import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/appStore';
import PremiumFeature from '../components/PremiumFeature';
import CosmicBackground from '../components/CosmicBackground';

interface HoroscopeCard {
  sign: string;
  emoji: string;
  title: string;
  content: string;
  love: string;
  career: string;
  wellness: string;
  isPremium?: boolean;
}

const Horoscope: React.FC = () => {
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
    {
      sign: 'Gemini',
      emoji: '♊',
      title: 'The Twins',
      content: 'Communication flows effortlessly today. Your wit and charm open hearts and minds around you.',
      love: 'Intellectual connections spark romantic interest.',
      career: 'Networking and collaboration bring unexpected opportunities.',
      wellness: 'Mental stimulation energizes your entire being.',
    },
    {
      sign: 'Cancer',
      emoji: '♋',
      title: 'The Crab',
      content: 'Emotional intuition guides your decisions. Trust your feelings and nurture the connections that matter most.',
      love: 'Deep emotional bonds strengthen. Home is where the heart is.',
      career: 'Your caring nature makes you invaluable to your team.',
      wellness: 'Honor your emotional needs and create safe spaces.',
    },
    {
      sign: 'Leo',
      emoji: '♌',
      title: 'The Lion',
      content: 'Your radiant energy attracts attention and admiration. Step into the spotlight with confidence and grace.',
      love: 'Romance takes center stage. Express your feelings dramatically.',
      career: 'Leadership opportunities await your golden touch.',
      wellness: 'Creative expression fuels your vitality.',
    },
    {
      sign: 'Virgo',
      emoji: '♍',
      title: 'The Virgin',
      content: 'Attention to detail serves you well today. Your practical wisdom helps others find clarity and direction.',
      love: 'Small gestures of service show your deep affection.',
      career: 'Your analytical skills solve complex problems.',
      wellness: 'Organize your environment to calm your mind.',
    },
    {
      sign: 'Libra',
      emoji: '♎',
      title: 'The Scales',
      content: 'Balance and harmony flow through all your interactions. Your diplomatic nature brings peace to conflicts.',
      love: 'Partnership energy is strong. Seek mutual understanding.',
      career: 'Collaboration and fairness lead to success.',
      wellness: 'Beauty and aesthetics restore your inner balance.',
    },
    {
      sign: 'Scorpio',
      emoji: '♏',
      title: 'The Scorpion',
      content: 'Intense transformative energy surrounds you. Dive deep into mysteries and emerge with profound insights.',
      love: 'Passionate connections reach new depths of intimacy.',
      career: 'Your investigative nature uncovers hidden opportunities.',
      wellness: 'Embrace transformation and release what no longer serves.',
    },
    {
      sign: 'Sagittarius',
      emoji: '♐',
      title: 'The Archer',
      content: 'Adventure calls your name today. Expand your horizons through learning, travel, or philosophical exploration.',
      love: 'Foreign connections or long-distance romance spark interest.',
      career: 'Teaching, publishing, or international ventures flourish.',
      wellness: 'Outdoor adventures and learning feed your soul.',
    },
    {
      sign: 'Capricorn',
      emoji: '♑',
      title: 'The Goat',
      content: 'Ambitious energy propels you toward your goals. Your disciplined approach creates lasting achievements.',
      love: 'Traditional romance and commitment take precedence.',
      career: 'Authority and recognition come through hard work.',
      wellness: 'Structure and routine support your well-being.',
    },
    {
      sign: 'Aquarius',
      emoji: '♒',
      title: 'The Water Bearer',
      content: 'Innovation and humanitarian ideals guide your actions. Your unique perspective inspires positive change.',
      love: 'Unconventional romance and friendship-based love thrive.',
      career: 'Technology and progressive ideas open new paths.',
      wellness: 'Community connections and social causes energize you.',
    },
    {
      sign: 'Pisces',
      emoji: '♓',
      title: 'The Fish',
      content: 'Intuitive dreams and creative visions flow freely. Your compassionate nature heals and inspires others.',
      love: 'Spiritual and emotional connections deepen beautifully.',
      career: 'Artistic and healing professions call to you.',
      wellness: 'Water, meditation, and creative expression restore you.',
    },
  ];

  const currentHoroscope = currentUser ? horoscopes.find(h => h.sign === currentUser.sunSign) : null;

  return (
    <div className="min-h-screen bg-cosmic-gradient relative">
      <CosmicBackground />
      
      {/* Header */}
      <div className="relative z-10 p-4 border-b border-galactic-purple/30">
        <h1 className="text-2xl font-heading text-galactic-white text-center">Daily Horoscope</h1>
        <p className="text-galactic-lavender font-body text-center text-sm mt-1">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      <div className="relative z-10 p-4">
        {/* Your Sign Section */}
        {currentUser && currentHoroscope && (
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-lg font-heading text-galactic-white mb-3 flex items-center">
              <i className="bi bi-star-fill text-galactic-gold mr-2"></i>
              Your Daily Reading
            </h2>
            
            <div className="bg-card-gradient rounded-2xl p-6 border border-galactic-purple/30">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-3">{currentHoroscope.emoji}</span>
                <div>
                  <h3 className="text-xl font-heading text-galactic-white">
                    {currentHoroscope.sign}
                  </h3>
                  <p className="text-galactic-lavender font-body text-sm">
                    {currentHoroscope.title}
                  </p>
                </div>
              </div>
              
              <p className="text-galactic-white font-body mb-4 leading-relaxed">
                {currentHoroscope.content}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <i className="bi bi-heart-fill text-galactic-gold text-sm mt-1"></i>
                  <div>
                    <p className="text-galactic-white/80 font-body text-sm">
                      <span className="font-semibold text-galactic-gold">Love:</span> {currentHoroscope.love}
                    </p>
                  </div>
                </div>
                
                {isPremium ? (
                  <>
                    <div className="flex items-start space-x-3">
                      <i className="bi bi-briefcase-fill text-galactic-teal text-sm mt-1"></i>
                      <div>
                        <p className="text-galactic-white/80 font-body text-sm">
                          <span className="font-semibold text-galactic-teal">Career:</span> {currentHoroscope.career}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <i className="bi bi-heart-pulse-fill text-galactic-lavender text-sm mt-1"></i>
                      <div>
                        <p className="text-galactic-white/80 font-body text-sm">
                          <span className="font-semibold text-galactic-lavender">Wellness:</span> {currentHoroscope.wellness}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <PremiumFeature
                    feature="Complete Horoscopes"
                    description="Unlock full daily readings with career, wellness, and detailed love insights for deeper cosmic guidance."
                  >
                    <div className="bg-galactic-purple/20 rounded-lg p-3 text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <i className="bi bi-crown text-galactic-gold"></i>
                        <p className="text-galactic-white/80 font-body text-sm">
                          Unlock career and wellness insights
                        </p>
                      </div>
                      <span className="text-galactic-gold font-heading text-sm">
                        Upgrade to Premium
                      </span>
                    </div>
                  </PremiumFeature>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* All Signs Section */}
        <div>
          <h2 className="text-lg font-heading text-galactic-white mb-3 flex items-center">
            <i className="bi bi-stars text-galactic-gold mr-2"></i>
            All Signs
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
            {horoscopes.map((horoscope, index) => (
              <motion.button
                key={horoscope.sign}
                className={`bg-card-gradient rounded-xl p-4 text-left border transition-all duration-300 ${
                  selectedSign === horoscope.sign
                    ? 'border-galactic-purple bg-galactic-purple/10'
                    : 'border-galactic-purple/30 hover:border-galactic-purple/50'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedSign(selectedSign === horoscope.sign ? '' : horoscope.sign)}
              >
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">{horoscope.emoji}</span>
                  <div>
                    <h3 className="font-heading text-galactic-white text-sm">
                      {horoscope.sign}
                    </h3>
                    <p className="text-galactic-lavender font-body text-xs">
                      {horoscope.title}
                    </p>
                  </div>
                </div>
                
                {selectedSign === horoscope.sign && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-galactic-purple/30"
                  >
                    <p className="text-galactic-white/80 font-body text-xs leading-relaxed">
                      {horoscope.content}
                    </p>
                    <div className="mt-2">
                      <p className="text-galactic-white/70 font-body text-xs">
                        <span className="font-semibold text-galactic-gold">Love:</span> {horoscope.love}
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Cosmic Tip */}
        <motion.div
          className="mt-6 bg-gradient-to-r from-galactic-purple/20 to-galactic-teal/20 rounded-2xl p-4 border border-galactic-gold/30"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center mb-2">
            <i className="bi bi-lightbulb text-galactic-gold mr-2"></i>
            <h3 className="font-heading text-galactic-white">Cosmic Tip of the Day</h3>
          </div>
          <p className="text-galactic-white/80 font-body text-sm">
            The universe speaks through synchronicities. Pay attention to repeated numbers, 
            unexpected encounters, and intuitive nudges today - they're guiding you toward your destiny.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Horoscope;
