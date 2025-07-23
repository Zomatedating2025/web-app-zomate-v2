import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SplashScreen from './src/screens/SplashScreen';
import OnboardingFlow from './src/screens/OnboardingFlow';
import MainTabs from './src/navigation/MainTabs';
import ChatScreen from './src/screens/ChatScreen';
import ZodiChat from './src/screens/ZodiChat';
import Premium from './src/screens/Premium';
import EditProfile from './src/screens/EditProfile';
import SeeWhoLikedYou from './src/screens/SeeWhoLikedYou';
import PurchaseHistory from './src/screens/PurchaseHistory';

const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="light" backgroundColor="#0A0A0F" />
          <Stack.Navigator 
            screenOptions={{ 
              headerShown: false,
              cardStyle: { backgroundColor: '#0A0A0F' }
            }}
          >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingFlow} />
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="ZodiChat" component={ZodiChat} />
            <Stack.Screen name="Premium" component={Premium} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="SeeWhoLikedYou" component={SeeWhoLikedYou} />
            <Stack.Screen name="PurchaseHistory" component={PurchaseHistory} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
