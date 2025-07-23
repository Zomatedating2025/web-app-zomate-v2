import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from './pages/SplashScreen';
import OnboardingFlow from './pages/OnboardingFlow';
import HomeSwipe from './pages/HomeSwipe';
import Matches from './pages/Matches';
import ChatScreen from './pages/ChatScreen';
import ZodiChat from './pages/ZodiChat';
import Horoscope from './pages/Horoscope';
import Premium from './pages/Premium';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import SeeWhoLikedYou from './pages/SeeWhoLikedYou';
import PurchaseHistory from './pages/PurchaseHistory';
import Navigation from './components/Navigation';
import { useAppStore } from './store/appStore';

function App() {
  const { isOnboarded } = useAppStore();

  return (
    <Router>
      <div className="min-h-screen bg-cosmic-gradient text-galactic-white overflow-hidden">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/onboarding" element={<OnboardingFlow />} />
            <Route path="/home" element={
              <div className="pb-20">
                <HomeSwipe />
                <Navigation />
              </div>
            } />
            <Route path="/matches" element={
              <div className="pb-20">
                <Matches />
                <Navigation />
              </div>
            } />
            <Route path="/chat/:conversationId" element={<ChatScreen />} />
            <Route path="/zodi" element={
              <div className="pb-20">
                <ZodiChat />
                <Navigation />
              </div>
            } />
            <Route path="/horoscope" element={
              <div className="pb-20">
                <Horoscope />
                <Navigation />
              </div>
            } />
            <Route path="/premium" element={<Premium />} />
            <Route path="/see-who-liked-you" element={<SeeWhoLikedYou />} />
            <Route path="/purchase-history" element={<PurchaseHistory />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/profile" element={
              <div className="pb-20">
                <Profile />
                <Navigation />
              </div>
            } />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
