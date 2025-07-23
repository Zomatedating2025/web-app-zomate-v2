import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';
import { globalStyles } from '../styles/globalStyles';
import { useAppStore } from '../store/appStore';
import { formatDistanceToNow } from 'date-fns';

export default function Matches() {
  const navigation = useNavigation();
  const { matches, currentUser } = useAppStore();

  const handleMatchPress = (match: any) => {
    const conversationId = `${currentUser?.id}_${match.user.id}`;
    navigation.navigate('Chat' as never, { 
      conversationId,
      user: match.user,
      matchId: match.id 
    } as never);
  };

  if (matches.length === 0) {
    return (
      <View style={[globalStyles.container, styles.emptyContainer]}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Messages</Text>
          <Text style={styles.headerSubtitle}>Your cosmic connections await</Text>
        </View>
        
        <View style={styles.emptyContent}>
          <Icon name="chat" size={80} color={colors.galactic.purple + '50'} />
          <Text style={styles.emptyTitle}>No matches yet</Text>
          <Text style={styles.emptyText}>
            Start exploring to find your cosmic connection!
          </Text>
          <TouchableOpacity 
            style={globalStyles.button}
            onPress={() => navigation.navigate('Explore' as never)}
          >
            <Text style={globalStyles.buttonText}>Start Exploring</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <Text style={styles.headerSubtitle}>Your cosmic connections await</Text>
      </View>

      <ScrollView style={styles.matchesList} showsVerticalScrollIndicator={false}>
        {matches.map((match, index) => (
          <TouchableOpacity
            key={match.id}
            style={styles.matchItem}
            onPress={() => handleMatchPress(match)}
          >
            <View style={styles.matchContent}>
              <View style={styles.avatarContainer}>
                <Image
                  source={{ uri: match.user.photos[0] }}
                  style={styles.avatar}
                />
                {match.user.isOnline && <View style={styles.onlineIndicator} />}
                {match.unread && <View style={styles.unreadBadge} />}
              </View>
              
              <View style={styles.matchInfo}>
                <View style={styles.matchHeader}>
                  <Text style={styles.matchName}>{match.user.name}</Text>
                  <Text style={styles.matchSign}>{match.user.sunSign}</Text>
                  {match.compatibilityScore && (
                    <View style={styles.compatibilityContainer}>
                      <Icon name="auto-awesome" size={12} color={colors.galactic.gold} />
                      <Text style={styles.compatibilityText}>
                        {match.compatibilityScore}%
                      </Text>
                    </View>
                  )}
                </View>
                
                <Text style={styles.lastMessage} numberOfLines={1}>
                  {match.lastMessage || "You matched! Start the conversation..."}
                </Text>
              </View>
              
              <View style={styles.matchMeta}>
                <Text style={styles.matchTime}>
                  {formatDistanceToNow(match.matchedAt, { addSuffix: true })}
                </Text>
                <Icon name="chevron-right" size={20} color={colors.galactic.white + '30'} />
              </View>
            </View>
            
            {!match.lastMessage && (
              <View style={styles.newMatchIndicator}>
                <Icon name="star" size={16} color={colors.galactic.gold} />
                <Text style={styles.newMatchText}>New cosmic connection!</Text>
                <Icon name="star" size={16} color={colors.galactic.gold} />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Text style={styles.quickActionsTitle}>
          <Icon name="flash-on" size={16} color={colors.galactic.gold} />
          {' '}Quick Actions
        </Text>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('Explore' as never)}
          >
            <Icon name="favorite" size={20} color={colors.galactic.white} />
            <Text style={styles.quickActionText}>Find More Matches</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('Zodi' as never)}
          >
            <Icon name="auto-awesome" size={20} color={colors.galactic.white} />
            <Text style={styles.quickActionText}>Ask Zodi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: colors.galactic.purple + '30',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.galactic.white,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.galactic.lavender,
    textAlign: 'center',
    marginTop: 4,
  },
  matchesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  matchItem: {
    backgroundColor: colors.cosmic.card,
    borderRadius: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: colors.galactic.purple + '20',
  },
  matchContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.galactic.gold + '30',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    backgroundColor: colors.galactic.teal,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.cosmic.bg,
  },
  unreadBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    backgroundColor: colors.galactic.gold,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchInfo: {
    flex: 1,
  },
  matchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  matchName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.galactic.white,
    marginRight: 8,
  },
  matchSign: {
    fontSize: 14,
    color: colors.galactic.lavender,
    marginRight: 8,
  },
  compatibilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compatibilityText: {
    fontSize: 12,
    color: colors.galactic.gold,
    marginLeft: 2,
  },
  lastMessage: {
    fontSize: 14,
    color: colors.galactic.white + '70',
  },
  matchMeta: {
    alignItems: 'flex-end',
  },
  matchTime: {
    fontSize: 12,
    color: colors.galactic.white + '50',
    marginBottom: 4,
  },
  newMatchIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.galactic.purple + '20',
  },
  newMatchText: {
    fontSize: 12,
    color: colors.galactic.gold,
    marginHorizontal: 8,
    fontWeight: '500',
  },
  quickActions: {
    backgroundColor: colors.galactic.purple + '10',
    borderRadius: 16,
    margin: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.galactic.purple + '30',
  },
  quickActionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.galactic.white,
    marginBottom: 12,
    textAlign: 'center',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: colors.cosmic.card,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 6,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  quickActionText: {
    fontSize: 12,
    color: colors.galactic.white,
    marginLeft: 8,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
  },
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.galactic.white,
    marginTop: 20,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: colors.galactic.white + '70',
    textAlign: 'center',
    marginBottom: 32,
  },
});
