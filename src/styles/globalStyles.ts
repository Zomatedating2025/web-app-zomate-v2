import { StyleSheet, Dimensions } from 'react-native';
import { colors } from './colors';

const { width, height } = Dimensions.get('window');

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cosmic.bg,
  },
  cosmicGradient: {
    flex: 1,
    backgroundColor: colors.cosmic.bg,
  },
  cardGradient: {
    backgroundColor: colors.cosmic.card,
    borderRadius: 16,
    padding: 16,
  },
  headingText: {
    fontFamily: 'System',
    fontWeight: '600',
    color: colors.galactic.white,
  },
  bodyText: {
    fontFamily: 'System',
    fontWeight: '400',
    color: colors.galactic.white,
  },
  button: {
    backgroundColor: colors.galactic.purple,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.galactic.white,
    fontWeight: '600',
    fontSize: 16,
  },
  goldButton: {
    backgroundColor: colors.galactic.gold,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goldButtonText: {
    color: colors.cosmic.bg,
    fontWeight: '600',
    fontSize: 16,
  },
  screenWidth: width,
  screenHeight: height,
});
