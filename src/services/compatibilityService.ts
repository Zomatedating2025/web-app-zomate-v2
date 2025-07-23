import { User } from '../store/appStore';

export interface CompatibilityScore {
  overall: number;
  interests: number;
  sunSign: number;
  moonSign: number;
  risingSign: number;
  breakdown: {
    interests: {
      score: number;
      shared: string[];
      total: number;
    };
    astrology: {
      sun: { score: number; compatibility: string };
      moon: { score: number; compatibility: string };
      rising: { score: number; compatibility: string };
    };
  };
}

export class CompatibilityService {
  // Astrological compatibility matrix (0-100 scale)
  private static readonly SIGN_COMPATIBILITY = {
    'Aries': {
      'Aries': 85, 'Taurus': 45, 'Gemini': 75, 'Cancer': 35, 'Leo': 95, 'Virgo': 40,
      'Libra': 70, 'Scorpio': 50, 'Sagittarius': 90, 'Capricorn': 30, 'Aquarius': 80, 'Pisces': 55
    },
    'Taurus': {
      'Aries': 45, 'Taurus': 80, 'Gemini': 35, 'Cancer': 85, 'Leo': 60, 'Virgo': 90,
      'Libra': 75, 'Scorpio': 70, 'Sagittarius': 40, 'Capricorn': 95, 'Aquarius': 45, 'Pisces': 80
    },
    'Gemini': {
      'Aries': 75, 'Taurus': 35, 'Gemini': 70, 'Cancer': 45, 'Leo': 85, 'Virgo': 55,
      'Libra': 95, 'Scorpio': 40, 'Sagittarius': 80, 'Capricorn': 35, 'Aquarius': 90, 'Pisces': 50
    },
    'Cancer': {
      'Aries': 35, 'Taurus': 85, 'Gemini': 45, 'Cancer': 75, 'Leo': 55, 'Virgo': 80,
      'Libra': 60, 'Scorpio': 95, 'Sagittarius': 35, 'Capricorn': 70, 'Aquarius': 40, 'Pisces': 90
    },
    'Leo': {
      'Aries': 95, 'Taurus': 60, 'Gemini': 85, 'Cancer': 55, 'Leo': 80, 'Virgo': 45,
      'Libra': 90, 'Scorpio': 65, 'Sagittarius': 95, 'Capricorn': 40, 'Aquarius': 85, 'Pisces': 50
    },
    'Virgo': {
      'Aries': 40, 'Taurus': 90, 'Gemini': 55, 'Cancer': 80, 'Leo': 45, 'Virgo': 75,
      'Libra': 65, 'Scorpio': 85, 'Sagittarius': 35, 'Capricorn': 95, 'Aquarius': 50, 'Pisces': 70
    },
    'Libra': {
      'Aries': 70, 'Taurus': 75, 'Gemini': 95, 'Cancer': 60, 'Leo': 90, 'Virgo': 65,
      'Libra': 80, 'Scorpio': 55, 'Sagittarius': 85, 'Capricorn': 50, 'Aquarius': 95, 'Pisces': 60
    },
    'Scorpio': {
      'Aries': 50, 'Taurus': 70, 'Gemini': 40, 'Cancer': 95, 'Leo': 65, 'Virgo': 85,
      'Libra': 55, 'Scorpio': 85, 'Sagittarius': 45, 'Capricorn': 80, 'Aquarius': 35, 'Pisces': 95
    },
    'Sagittarius': {
      'Aries': 90, 'Taurus': 40, 'Gemini': 80, 'Cancer': 35, 'Leo': 95, 'Virgo': 35,
      'Libra': 85, 'Scorpio': 45, 'Sagittarius': 85, 'Capricorn': 45, 'Aquarius': 90, 'Pisces': 55
    },
    'Capricorn': {
      'Aries': 30, 'Taurus': 95, 'Gemini': 35, 'Cancer': 70, 'Leo': 40, 'Virgo': 95,
      'Libra': 50, 'Scorpio': 80, 'Sagittarius': 45, 'Capricorn': 85, 'Aquarius': 55, 'Pisces': 75
    },
    'Aquarius': {
      'Aries': 80, 'Taurus': 45, 'Gemini': 90, 'Cancer': 40, 'Leo': 85, 'Virgo': 50,
      'Libra': 95, 'Scorpio': 35, 'Sagittarius': 90, 'Capricorn': 55, 'Aquarius': 80, 'Pisces': 60
    },
    'Pisces': {
      'Aries': 55, 'Taurus': 80, 'Gemini': 50, 'Cancer': 90, 'Leo': 50, 'Virgo': 70,
      'Libra': 60, 'Scorpio': 95, 'Sagittarius': 55, 'Capricorn': 75, 'Aquarius': 60, 'Pisces': 85
    }
  };

  private static getCompatibilityLabel(score: number): string {
    if (score >= 90) return 'Cosmic Soulmates';
    if (score >= 80) return 'Stellar Match';
    if (score >= 70) return 'Strong Connection';
    if (score >= 60) return 'Good Harmony';
    if (score >= 50) return 'Potential Match';
    if (score >= 40) return 'Challenging but Possible';
    return 'Different Paths';
  }

  private static calculateInterestCompatibility(user1: User, user2: User): {
    score: number;
    shared: string[];
    total: number;
  } {
    const interests1 = user1.interests || [];
    const interests2 = user2.interests || [];
    
    if (interests1.length === 0 || interests2.length === 0) {
      return { score: 50, shared: [], total: 0 }; // Neutral score if no interests
    }

    const sharedInterests = interests1.filter(interest => 
      interests2.includes(interest)
    );
    
    const totalUniqueInterests = new Set([...interests1, ...interests2]).size;
    const sharedCount = sharedInterests.length;
    
    // Calculate score based on shared interests ratio
    const score = Math.min(100, (sharedCount / Math.min(interests1.length, interests2.length)) * 100);
    
    return {
      score: Math.round(score),
      shared: sharedInterests,
      total: sharedCount
    };
  }

  private static calculateAstrologicalCompatibility(user1: User, user2: User): {
    sun: { score: number; compatibility: string };
    moon: { score: number; compatibility: string };
    rising: { score: number; compatibility: string };
  } {
    const sunScore = this.SIGN_COMPATIBILITY[user1.sunSign]?.[user2.sunSign] || 50;
    
    const moonScore = user1.moonSign && user2.moonSign 
      ? this.SIGN_COMPATIBILITY[user1.moonSign]?.[user2.moonSign] || 50
      : 50; // Neutral if missing moon signs
    
    const risingScore = user1.risingSign && user2.risingSign
      ? this.SIGN_COMPATIBILITY[user1.risingSign]?.[user2.risingSign] || 50
      : 50; // Neutral if missing rising signs

    return {
      sun: {
        score: sunScore,
        compatibility: this.getCompatibilityLabel(sunScore)
      },
      moon: {
        score: moonScore,
        compatibility: this.getCompatibilityLabel(moonScore)
      },
      rising: {
        score: risingScore,
        compatibility: this.getCompatibilityLabel(risingScore)
      }
    };
  }

  static calculateCompatibility(user1: User, user2: User): CompatibilityScore {
    const interestData = this.calculateInterestCompatibility(user1, user2);
    const astroData = this.calculateAstrologicalCompatibility(user1, user2);

    // Zodiac compatibility accounts for 70% of the total score
    const weights = {
      interests: 0.15,  // 15%
      sun: 0.50,        // 50% (main zodiac compatibility)
      moon: 0.15,       // 15%
      rising: 0.20      // 20%
    };

    const weightedScore = 
      (interestData.score * weights.interests) +
      (astroData.sun.score * weights.sun) +
      (astroData.moon.score * weights.moon) +
      (astroData.rising.score * weights.rising);

    const overallScore = Math.round(weightedScore);

    return {
      overall: overallScore,
      interests: interestData.score,
      sunSign: astroData.sun.score,
      moonSign: astroData.moon.score,
      risingSign: astroData.rising.score,
      breakdown: {
        interests: interestData,
        astrology: astroData
      }
    };
  }

  static getCompatibilityColor(score: number): string {
    if (score >= 80) return 'text-galactic-gold';
    if (score >= 60) return 'text-galactic-teal';
    if (score >= 40) return 'text-galactic-lavender';
    return 'text-galactic-white/60';
  }

  static getCompatibilityGradient(score: number): string {
    if (score >= 80) return 'from-galactic-gold to-yellow-400';
    if (score >= 60) return 'from-galactic-teal to-cyan-400';
    if (score >= 40) return 'from-galactic-lavender to-purple-400';
    return 'from-galactic-white/60 to-gray-400';
  }
}
