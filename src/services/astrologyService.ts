import axios from 'axios';

interface AstrologyReading {
  sign: string;
  date: string;
  general: string;
  love: string;
  career: string;
  wellness: string;
  luckyNumbers: number[];
  luckyColor: string;
  compatibility: string[];
}

// Mock astrology service - in production, integrate with real APIs like astro-seek
export class AstrologyService {
  private static readonly SIGNS = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  private static readonly COLORS = [
    'Cosmic Purple', 'Stellar Gold', 'Lunar Silver', 'Mars Red', 'Venus Pink',
    'Mercury Blue', 'Jupiter Orange', 'Saturn Green', 'Neptune Teal', 'Pluto Black'
  ];

  private static readonly READINGS_TEMPLATES = {
    general: [
      'The cosmic energies align favorably for you this week. Trust your intuition as it guides you toward new opportunities.',
      'Planetary movements suggest a time of transformation and growth. Embrace change with an open heart.',
      'The stars whisper of hidden talents ready to emerge. This is your time to shine brightly.',
      'Universal forces support your endeavors. Take bold steps toward your dreams.',
      'Celestial harmony brings clarity to confusing situations. Solutions will reveal themselves naturally.'
    ],
    love: [
      'Venus dances through your romantic sector, bringing passionate encounters and deep connections.',
      'The moon illuminates matters of the heart. Existing relationships deepen while new love may surprise you.',
      'Cosmic cupid aims his arrow in your direction. Be open to unexpected romantic possibilities.',
      'Your heart chakra glows with magnetic energy, attracting soulmate connections.',
      'The universe conspires to bring you closer to your romantic destiny.'
    ],
    career: [
      'Professional planets align to boost your career trajectory. Recognition and advancement await.',
      'Your natural leadership abilities shine under current stellar influences.',
      'Creative projects receive cosmic support. Innovation leads to success.',
      'Networking under these planetary aspects opens doors to exciting opportunities.',
      'The stars favor bold career moves and entrepreneurial ventures.'
    ],
    wellness: [
      'Lunar energy supports emotional healing and inner peace. Practice mindfulness and self-care.',
      'Your body temple craves balance. Listen to its wisdom and honor its needs.',
      'Cosmic vibrations enhance your natural healing abilities. Trust your body\'s intelligence.',
      'The elements call you to reconnect with nature for optimal wellness.',
      'Stellar influences support detoxification and renewal on all levels.'
    ]
  };

  static async getWeeklyHoroscopes(): Promise<{ [sign: string]: AstrologyReading }> {
    // Simulate API delay
    await new Promise(resolve => window.setTimeout(resolve, 1000));

    const horoscopes: { [sign: string]: AstrologyReading } = {};
    const currentDate = new Date().toISOString().split('T')[0];

    this.SIGNS.forEach(sign => {
      horoscopes[sign] = {
        sign,
        date: currentDate,
        general: this.getRandomReading('general', sign),
        love: this.getRandomReading('love', sign),
        career: this.getRandomReading('career', sign),
        wellness: this.getRandomReading('wellness', sign),
        luckyNumbers: this.generateLuckyNumbers(),
        luckyColor: this.COLORS[Math.floor(Math.random() * this.COLORS.length)],
        compatibility: this.getCompatibleSigns(sign)
      };
    });

    return horoscopes;
  }

  private static getRandomReading(type: keyof typeof this.READINGS_TEMPLATES, sign: string): string {
    const templates = this.READINGS_TEMPLATES[type];
    const baseReading = templates[Math.floor(Math.random() * templates.length)];
    
    // Add sign-specific touches
    const signSpecific = this.getSignSpecificAddition(sign, type);
    return `${baseReading} ${signSpecific}`;
  }

  private static getSignSpecificAddition(sign: string, type: string): string {
    const additions: { [key: string]: { [key: string]: string[] } } = {
      Aries: {
        general: ['Your pioneering spirit leads the way.', 'Bold action brings swift results.'],
        love: ['Passion ignites quickly under your fiery influence.', 'Direct communication wins hearts.'],
        career: ['Leadership opportunities multiply.', 'Your competitive edge gives you advantage.'],
        wellness: ['High-energy activities restore your vitality.', 'Channel your fire element wisely.']
      },
      Taurus: {
        general: ['Steady progress builds lasting foundations.', 'Your patience yields beautiful rewards.'],
        love: ['Sensual pleasures deepen romantic bonds.', 'Loyalty and commitment are highlighted.'],
        career: ['Practical skills bring tangible success.', 'Your reliability opens new doors.'],
        wellness: ['Grounding exercises restore your balance.', 'Luxury and comfort support healing.']
      },
      // Add more sign-specific content as needed
    };

    const signAdditions = additions[sign];
    if (signAdditions && signAdditions[type]) {
      const options = signAdditions[type];
      return options[Math.floor(Math.random() * options.length)];
    }
    
    return 'The cosmos smiles upon your unique journey.';
  }

  private static generateLuckyNumbers(): number[] {
    const numbers: number[] = [];
    while (numbers.length < 6) {
      const num = Math.floor(Math.random() * 49) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    return numbers.sort((a, b) => a - b);
  }

  private static getCompatibleSigns(sign: string): string[] {
    const compatibility: { [key: string]: string[] } = {
      Aries: ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'],
      Taurus: ['Virgo', 'Capricorn', 'Cancer', 'Pisces'],
      Gemini: ['Libra', 'Aquarius', 'Aries', 'Leo'],
      Cancer: ['Scorpio', 'Pisces', 'Taurus', 'Virgo'],
      Leo: ['Aries', 'Sagittarius', 'Gemini', 'Libra'],
      Virgo: ['Taurus', 'Capricorn', 'Cancer', 'Scorpio'],
      Libra: ['Gemini', 'Aquarius', 'Leo', 'Sagittarius'],
      Scorpio: ['Cancer', 'Pisces', 'Virgo', 'Capricorn'],
      Sagittarius: ['Aries', 'Leo', 'Libra', 'Aquarius'],
      Capricorn: ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
      Aquarius: ['Gemini', 'Libra', 'Sagittarius', 'Aries'],
      Pisces: ['Cancer', 'Scorpio', 'Capricorn', 'Taurus']
    };

    return compatibility[sign] || [];
  }

  static calculateCompatibility(sign1: string, sign2: string): number {
    const compatibility = this.getCompatibleSigns(sign1);
    
    if (compatibility.includes(sign2)) {
      // High compatibility
      return 75 + Math.floor(Math.random() * 25);
    } else if (sign1 === sign2) {
      // Same sign
      return 60 + Math.floor(Math.random() * 30);
    } else {
      // Lower compatibility but still possible
      return 30 + Math.floor(Math.random() * 40);
    }
  }
}

export default AstrologyService;
