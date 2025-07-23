import { User } from '../store/appStore';
import { FilterSettings } from '../components/FilterModal';

export class FilterService {
  static applyFilters(users: User[], filters: FilterSettings): User[] {
    return users.filter(user => {
      // Sun Sign Filter
      if (filters.sunSigns.length > 0 && !filters.sunSigns.includes(user.sunSign)) {
        return false;
      }

      // Element Filter
      if (filters.elements.length > 0) {
        const userElement = this.getElementForSign(user.sunSign);
        if (!filters.elements.includes(userElement)) {
          return false;
        }
      }

      // Moon Sign Filter
      if (filters.moonSigns.length > 0 && user.moonSign) {
        if (!filters.moonSigns.includes(user.moonSign)) {
          return false;
        }
      }

      // Rising Sign Filter
      if (filters.risingSigns.length > 0 && user.risingSign) {
        if (!filters.risingSigns.includes(user.risingSign)) {
          return false;
        }
      }

      // Age Range Filter
      if (user.age < filters.ageRange[0] || user.age > filters.ageRange[1]) {
        return false;
      }

      // Distance Filter
      if (user.distance && user.distance > filters.maxDistance) {
        return false;
      }

      // Interests Filter
      if (filters.interests.length > 0 && user.interests) {
        const hasMatchingInterest = filters.interests.some(interest => 
          user.interests?.includes(interest)
        );
        if (!hasMatchingInterest) {
          return false;
        }
      }

      // Online Only Filter
      if (filters.showOnlineOnly && !user.isOnline) {
        return false;
      }

      return true;
    });
  }

  static getElementForSign(sign: string): string {
    const elements = {
      'Aries': 'Fire', 'Leo': 'Fire', 'Sagittarius': 'Fire',
      'Taurus': 'Earth', 'Virgo': 'Earth', 'Capricorn': 'Earth',
      'Gemini': 'Air', 'Libra': 'Air', 'Aquarius': 'Air',
      'Cancer': 'Water', 'Scorpio': 'Water', 'Pisces': 'Water'
    };
    return elements[sign as keyof typeof elements] || 'Unknown';
  }

  static getDefaultFilters(): FilterSettings {
    return {
      sunSigns: [],
      elements: [],
      moonSigns: [],
      risingSigns: [],
      ageRange: [18, 50],
      maxDistance: 100,
      interests: [],
      showOnlineOnly: false
    };
  }

  static getFilterSummary(filters: FilterSettings): string {
    const parts: string[] = [];

    if (filters.sunSigns.length > 0) {
      parts.push(`${filters.sunSigns.length} sun sign${filters.sunSigns.length > 1 ? 's' : ''}`);
    }

    if (filters.elements.length > 0) {
      parts.push(`${filters.elements.length} element${filters.elements.length > 1 ? 's' : ''}`);
    }

    if (filters.moonSigns.length > 0) {
      parts.push(`${filters.moonSigns.length} moon sign${filters.moonSigns.length > 1 ? 's' : ''}`);
    }

    if (filters.interests.length > 0) {
      parts.push(`${filters.interests.length} interest${filters.interests.length > 1 ? 's' : ''}`);
    }

    if (filters.ageRange[0] !== 18 || filters.ageRange[1] !== 50) {
      parts.push(`age ${filters.ageRange[0]}-${filters.ageRange[1]}`);
    }

    if (filters.maxDistance !== 100) {
      parts.push(`within ${filters.maxDistance}km`);
    }

    if (filters.showOnlineOnly) {
      parts.push('online only');
    }

    if (parts.length === 0) {
      return 'No filters applied';
    }

    return parts.join(', ');
  }
}
