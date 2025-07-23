import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';

import HomeSwipe from '../screens/HomeSwipe';
import Matches from '../screens/Matches';
import ZodiChat from '../screens/ZodiChat';
import Horoscope from '../screens/Horoscope';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

const TabIcon = ({ name, focused, color }: { name: string; focused: boolean; color: string }) => (
  <Icon name={name} size={24} color={color} />
);

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.cosmic.card,
          borderTopColor: colors.galactic.purple + '30',
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
        },
        tabBarActiveTintColor: colors.galactic.gold,
        tabBarInactiveTintColor: colors.galactic.white + '70',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Explore"
        component={HomeSwipe}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon name="favorite" focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Matches}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon name="chat" focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Zodi"
        component={ZodiChat}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon name="auto-awesome" focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Horoscope"
        component={Horoscope}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon name="nights-stay" focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon name="person" focused={focused} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
