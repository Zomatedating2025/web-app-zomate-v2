import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFiltersApply: (filters: FilterSettings) => void;
  currentFilters: FilterSettings;
}

export interface FilterSettings {
  sunSigns: string[];
  elements: string[];
  moonSigns: string[];
  risingSigns: string[];
  ageRange: [number, number];
  maxDistance: number;
  interests: string[];
  showOnlineOnly: boolean;
}

const FilterModal: React.FC<FilterModalProps> = ({ 
  isOpen, 
  onClose, 
  onFiltersApply, 
  currentFilters 
}) => {
  const { isPremium } = useAppStore();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterSettings>(currentFilters);
  const [activeTab, setActiveTab] = useState<'signs' | 'advanced' | 'preferences'>('signs');

  const zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  const elements = ['Fire', 'Earth', 'Air', 'Water'];
  
  const elementSigns = {
    Fire: ['Aries', 'Leo', 'Sagittarius'],
    Earth: ['Taurus', 'Virgo', 'Capricorn'],
    Air: ['Gemini', 'Libra', 'Aquarius'],
    Water: ['Cancer', 'Scorpio', 'Pisces']
  };

  const zodiacEmojis = {
    'Aries': '♈', 'Taurus': '♉', 'Gemini': '♊', 'Cancer': '♋',
    'Leo': '♌', 'Virgo': '♍', 'Libra': '♎', 'Scorpio': '♏',
    'Sagittarius': '♐', 'Capricorn': '♑', 'Aquarius': '♒', 'Pisces': '♓'
  };

  const popularInterests = [
    'Astrology', 'Yoga', 'Meditation', 'Travel', 'Photography', 'Art',
    'Music', 'Dancing', 'Hiking', 'Cooking', 'Reading', 'Fitness'
  ];

  useEffect(() => {
    setFilters(currentFilters);
  }, [currentFilters]);

  const handleSunSignToggle = (sign: string) => {
    setFilters(prev => ({
      ...prev,
      sunSigns: prev.sunSigns.includes(sign)
        ? prev.sunSigns.filter(s => s !== sign)
        : [...prev.sunSigns, sign]
    }));
  };

  const handleElementToggle = (element: string) => {
    if (!isPremium) {
      navigate('/premium');
      return;
    }

    setFilters(prev => ({
      ...prev,
      elements: prev.elements.includes(element)
        ? prev.elements.filter(e => e !== element)
        : [...prev.elements, element]
    }));
  };

  const handleMoonSignToggle = (sign: string) => {
    if (!isPremium) {
      navigate('/premium');
      return;
    }

    setFilters(prev => ({
      ...prev,
      moonSigns: prev.moonSigns.includes(sign)
        ? prev.moonSigns.filter(s => s !== sign)
        : [...prev.moonSigns, sign]
    }));
  };

  const handleInterestToggle = (interest: string) => {
    if (!isPremium) {
      navigate('/premium');
      return;
    }

    setFilters(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSelectAllSigns = () => {
    setFilters(prev => ({
      ...prev,
      sunSigns: prev.sunSigns.length === zodiacSigns.length ? [] : [...zodiacSigns]
    }));
  };

  const handleSelectElement = (element: string) => {
    const elementSignsList = elementSigns[element as keyof typeof elementSigns];
    setFilters(prev => ({
      ...prev,
      sunSigns: elementSignsList.every(sign => prev.sunSigns.includes(sign))
        ? prev.sunSigns.filter(sign => !elementSignsList.includes(sign))
        : [...new Set([...prev.sunSigns, ...elementSignsList])]
    }));
  };

  const handleApplyFilters = () => {
    onFiltersApply(filters);
    onClose();
  };

  const handleClearFilters = () => {
    const clearedFilters: FilterSettings = {
      sunSigns: [],
      elements: [],
      moonSigns: [],
      risingSigns: [],
      ageRange: [18, 50],
      maxDistance: 100,
      interests: [],
      showOnlineOnly: false
    };
    setFilters(clearedFilters);
  };

  const getActiveFiltersCount = () => {
    return filters.sunSigns.length + 
           filters.elements.length + 
           filters.moonSigns.length + 
           filters.risingSigns.length + 
           filters.interests.length +
           (filters.showOnlineOnly ? 1 : 0);
  };

  const tabs = [
    { id: 'signs', label: 'Zodiac Signs', icon: 'bi-stars', free: true },
    { id: 'advanced', label: 'Advanced', icon: 'bi-sliders', free: false },
    { id: 'preferences', label: 'Preferences', icon: 'bi-gear', free: false },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-card-gradient rounded-3xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto border border-galactic-purple/30"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-heading text-galactic-white">Filters</h2>
                <p className="text-galactic-white/60 font-body text-sm">
                  {getActiveFiltersCount()} active filters
                </p>
              </div>
              <motion.button
                onClick={onClose}
                className="p-2 hover:bg-galactic-purple/20 rounded-full transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                <i className="bi bi-x-lg text-galactic-white text-xl"></i>
              </motion.button>
            </div>

            {/* Tab Navigation */}
            <div className="bg-cosmic-card rounded-full p-1 flex mb-6">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  className={`flex-1 py-2 px-3 rounded-full font-body text-sm transition-all duration-300 flex items-center justify-center space-x-1 relative ${
                    activeTab === tab.id
                      ? 'bg-galactic-purple text-galactic-white'
                      : 'text-galactic-white/70 hover:text-galactic-white'
                  }`}
                  onClick={() => setActiveTab(tab.id as any)}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className={`${tab.icon} text-sm`}></i>
                  <span className="hidden sm:inline">{tab.label}</span>
                  {!tab.free && !isPremium && (
                    <i className="bi bi-crown text-galactic-gold text-xs"></i>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Zodiac Signs Tab */}
            {activeTab === 'signs' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-galactic-white font-heading">Sun Signs</h3>
                    <button
                      onClick={handleSelectAllSigns}
                      className="text-galactic-gold font-body text-sm hover:text-galactic-gold/80"
                    >
                      {filters.sunSigns.length === zodiacSigns.length ? 'Clear All' : 'Select All'}
                    </button>
                  </div>
                  
                  {/* Element Quick Selectors */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {Object.entries(elementSigns).map(([element, signs]) => (
                      <motion.button
                        key={element}
                        className={`p-2 rounded-lg border text-sm font-body transition-all duration-300 ${
                          signs.every(sign => filters.sunSigns.includes(sign))
                            ? 'border-galactic-gold bg-galactic-gold/20 text-galactic-white'
                            : 'border-galactic-purple/30 bg-cosmic-card hover:border-galactic-purple text-galactic-white/80'
                        }`}
                        onClick={() => handleSelectElement(element)}
                        whileTap={{ scale: 0.95 }}
                      >
                        {element} Signs
                      </motion.button>
                    ))}
                  </div>

                  {/* Individual Signs */}
                  <div className="grid grid-cols-3 gap-2">
                    {zodiacSigns.map((sign) => (
                      <motion.button
                        key={sign}
                        className={`p-3 rounded-lg border transition-all duration-300 ${
                          filters.sunSigns.includes(sign)
                            ? 'border-galactic-gold bg-galactic-gold/20 text-galactic-white'
                            : 'border-galactic-purple/30 bg-cosmic-card hover:border-galactic-purple text-galactic-white/80'
                        }`}
                        onClick={() => handleSunSignToggle(sign)}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="text-center">
                          <span className="text-2xl block mb-1">
                            {zodiacEmojis[sign as keyof typeof zodiacEmojis]}
                          </span>
                          <span className="text-xs font-body">{sign}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Advanced Tab */}
            {activeTab === 'advanced' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {!isPremium ? (
                  <div className="text-center py-8">
                    <i className="bi bi-crown text-4xl text-galactic-gold mb-4 block"></i>
                    <h3 className="text-lg font-heading text-galactic-white mb-2">
                      Premium Filters
                    </h3>
                    <p className="text-galactic-white/70 font-body text-sm mb-6">
                      Unlock advanced filtering by elements, moon signs, and more
                    </p>
                    <button
                      onClick={() => navigate('/premium')}
                      className="bg-galactic-gold hover:bg-galactic-gold/90 text-cosmic-bg font-heading py-3 px-6 rounded-full transition-all duration-300"
                    >
                      Upgrade to Premium
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Elements */}
                    <div>
                      <h3 className="text-galactic-white font-heading mb-3">Elements</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {elements.map((element) => (
                          <motion.button
                            key={element}
                            className={`p-3 rounded-lg border transition-all duration-300 ${
                              filters.elements.includes(element)
                                ? 'border-galactic-teal bg-galactic-teal/20 text-galactic-white'
                                : 'border-galactic-purple/30 bg-cosmic-card hover:border-galactic-purple text-galactic-white/80'
                            }`}
                            onClick={() => handleElementToggle(element)}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span className="font-body text-sm">{element}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Moon Signs */}
                    <div>
                      <h3 className="text-galactic-white font-heading mb-3">Moon Signs</h3>
                      <div className="grid grid-cols-4 gap-2">
                        {zodiacSigns.map((sign) => (
                          <motion.button
                            key={sign}
                            className={`p-2 rounded-lg border transition-all duration-300 ${
                              filters.moonSigns.includes(sign)
                                ? 'border-galactic-teal bg-galactic-teal/20 text-galactic-white'
                                : 'border-galactic-purple/30 bg-cosmic-card hover:border-galactic-purple text-galactic-white/80'
                            }`}
                            onClick={() => handleMoonSignToggle(sign)}
                            whileTap={{ scale: 0.95 }}
                          >
                            <div className="text-center">
                              <span className="text-lg block">
                                {zodiacEmojis[sign as keyof typeof zodiacEmojis]}
                              </span>
                              <span className="text-xs font-body">{sign.slice(0, 3)}</span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Interests */}
                    <div>
                      <h3 className="text-galactic-white font-heading mb-3">Interests</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {popularInterests.map((interest) => (
                          <motion.button
                            key={interest}
                            className={`p-2 rounded-lg border transition-all duration-300 text-sm ${
                              filters.interests.includes(interest)
                                ? 'border-galactic-lavender bg-galactic-lavender/20 text-galactic-white'
                                : 'border-galactic-purple/30 bg-cosmic-card hover:border-galactic-purple text-galactic-white/80'
                            }`}
                            onClick={() => handleInterestToggle(interest)}
                            whileTap={{ scale: 0.95 }}
                          >
                            {interest}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {!isPremium ? (
                  <div className="text-center py-8">
                    <i className="bi bi-crown text-4xl text-galactic-gold mb-4 block"></i>
                    <h3 className="text-lg font-heading text-galactic-white mb-2">
                      Premium Preferences
                    </h3>
                    <p className="text-galactic-white/70 font-body text-sm mb-6">
                      Set age range, distance, and online status preferences
                    </p>
                    <button
                      onClick={() => navigate('/premium')}
                      className="bg-galactic-gold hover:bg-galactic-gold/90 text-cosmic-bg font-heading py-3 px-6 rounded-full transition-all duration-300"
                    >
                      Upgrade to Premium
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Age Range */}
                    <div>
                      <h3 className="text-galactic-white font-heading mb-3">
                        Age Range: {filters.ageRange[0]} - {filters.ageRange[1]}
                      </h3>
                      <div className="space-y-2">
                        <input
                          type="range"
                          min="18"
                          max="50"
                          value={filters.ageRange[0]}
                          onChange={(e) => setFilters(prev => ({
                            ...prev,
                            ageRange: [parseInt(e.target.value), prev.ageRange[1]]
                          }))}
                          className="w-full"
                        />
                        <input
                          type="range"
                          min="18"
                          max="50"
                          value={filters.ageRange[1]}
                          onChange={(e) => setFilters(prev => ({
                            ...prev,
                            ageRange: [prev.ageRange[0], parseInt(e.target.value)]
                          }))}
                          className="w-full"
                        />
                      </div>
                    </div>

                    {/* Distance */}
                    <div>
                      <h3 className="text-galactic-white font-heading mb-3">
                        Max Distance: {filters.maxDistance}km
                      </h3>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={filters.maxDistance}
                        onChange={(e) => setFilters(prev => ({
                          ...prev,
                          maxDistance: parseInt(e.target.value)
                        }))}
                        className="w-full"
                      />
                    </div>

                    {/* Online Only */}
                    <div>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={filters.showOnlineOnly}
                          onChange={(e) => setFilters(prev => ({
                            ...prev,
                            showOnlineOnly: e.target.checked
                          }))}
                          className="w-5 h-5 text-galactic-teal"
                        />
                        <span className="text-galactic-white font-body">Show online users only</span>
                      </label>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-6">
              <motion.button
                className="flex-1 bg-transparent border border-galactic-white/30 text-galactic-white font-body py-3 px-6 rounded-full hover:bg-galactic-white/10 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClearFilters}
              >
                Clear All
              </motion.button>
              <motion.button
                className="flex-1 bg-galactic-purple hover:bg-galactic-purple/80 text-galactic-white font-heading py-3 px-6 rounded-full transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleApplyFilters}
              >
                Apply Filters
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FilterModal;
