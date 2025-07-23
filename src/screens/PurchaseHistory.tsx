import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';
import { globalStyles } from '../styles/globalStyles';
import { useAppStore } from '../store/appStore';
import { formatDistanceToNow } from 'date-fns';

export default function PurchaseHistory() {
  const { purchases, isPremium } = useAppStore();
  const navigation = useNavigation();

  const getStatusColor = (purchase: any) => {
    if (purchase.type === 'subscription') {
      return isPremium ? colors.galactic.teal : colors.galactic.white + '50';
    }
    
    if (purchase.expiresAt && new Date() > purchase.expiresAt) {
      return colors.galactic.white + '50';
    }
    
    return colors.galactic.teal;
  };

  const getStatusText = (purchase: any) => {
    if (purchase.type === 'subscription') {
      return isPremium ? 'Active' : 'Expired';
    }
    
    if (purchase.expiresAt && new Date() > purchase.expiresAt) {
      return 'Expired';
    }
    
    return purchase.expiresAt ? 'Active' : 'Purchased';
  };

  return (
    <View style={globalStyles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={colors.galactic.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Purchase History</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {purchases.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="receipt" size={80} color={colors.galactic.purple + '50'} />
            <Text style={styles.emptyTitle}>No purchases yet</Text>
            <Text style={styles.emptyText}>
              Start your cosmic journey with Premium features!
            </Text>
            <TouchableOpacity
              style={globalStyles.button}
              onPress={() => navigation.navigate('Premium' as never)}
            >
              <Text style={globalStyles.buttonText}>Explore Premium</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.purchasesList}>
            {purchases.map((purchase, index) => (
              <View key={purchase.id} style={styles.purchaseItem}>
                <View style={styles.purchaseContent}>
                  <View style={styles.purchaseIcon}>
                    <Icon 
                      name={purchase.type === 'subscription' ? 'workspace-premium' : 'flash-on'} 
                      size={24} 
                      color={colors.galactic.gold} 
                    />
                  </View>
                  <View style={styles.purchaseInfo}>
                    <Text style={styles.purchaseName}>{purchase.name}</Text>
                    <Text style={styles.purchaseType}>
                      {purchase.type === 'subscription' ? 'Subscription' : 'One-time purchase'}
                    </Text>
                  </View>
                  <View style={styles.purchaseMeta}>
                    <Text style={styles.purchasePrice}>{purchase.price}</Text>
                    <Text style={[styles.purchaseStatus, { color: getStatusColor(purchase) }]}>
                      {getStatusText(purchase)}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.purchaseDetails}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Purchased</Text>
                    <Text style={styles.detailValue}>
                      {formatDistanceToNow(purchase.purchasedAt, { addSuffix: true })}
                    </Text>
                  </View>
                  {purchase.expiresAt && (
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>
                        {new Date() > purchase.expiresAt ? 'Expired' : 'Expires'}
                      </Text>
                      <Text style={styles.detailValue}>
                        {formatDistanceToNow(purchase.expiresAt, { addSuffix: true })}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </div>
        )}

        {/* Current Status */}
        <View style={styles.currentStatus}>
          <View style={styles.statusContent}>
            <Icon 
              name={isPremium ? 'workspace-premium' : 'star'} 
              size={32} 
              color={isPremium ? colors.galactic.gold : colors.galactic.purple} 
            />
            <Text style={styles.statusTitle}>
              {isPremium ? 'Premium Active' : 'Free Account'}
            </Text>
            <Text style={styles.statusDescription}>
              {isPremium 
                ? 'Enjoy unlimited access to all cosmic features'
                : 'Upgrade to unlock your full cosmic potential'
              }
            </Text>
            {!isPremium && (
              <TouchableOpacity
                style={globalStyles.goldButton}
                onPress={() => navigation.navigate('Premium' as never)}
              >
                <Text style={globalStyles.goldButtonText}>Upgrade Now</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 50,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.galactic.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
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
  purchasesList: {
    paddingVertical: 20,
  },
  purchaseItem: {
    backgroundColor: colors.cosmic.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.galactic.purple + '30',
  },
  purchaseContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  purchaseIcon: {
    width: 48,
    height: 48,
    backgroundColor: colors.galactic.gold + '20',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  purchaseInfo: {
    flex: 1,
  },
  purchaseName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.galactic.white,
  },
  purchaseType: {
    fontSize: 12,
    color: colors.galactic.white + '60',
    marginTop: 2,
  },
  purchaseMeta: {
    alignItems: 'flex-end',
  },
  purchasePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.galactic.gold,
  },
  purchaseStatus: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  purchaseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.galactic.purple + '20',
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.galactic.white + '50',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    color: colors.galactic.white,
  },
  currentStatus: {
    backgroundColor: colors.galactic.purple + '20',
    borderRadius: 16,
    padding: 20,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: colors.galactic.gold + '30',
  },
  statusContent: {
    alignItems: 'center',
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.galactic.white,
    marginTop: 12,
    marginBottom: 8,
  },
  statusDescription: {
    fontSize: 14,
    color: colors.galactic.white + '80',
    textAlign: 'center',
    marginBottom: 16,
  },
});
