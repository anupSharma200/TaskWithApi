import React from 'react';
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../theme/colors';


import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import VideoPlayerScreen from '../screens/VideoPlayerScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';
import TermsOfServiceScreen from '../screens/TermsOfServiceScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  MainTabs: undefined;
  VideoPlayer: { fileId?: string; fileName: string; localUri?: string };
  ContactUs: undefined;
  UpdateProfile: undefined;
  TermsOfService: undefined;
  PrivacyPolicy: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: '#050505',
          borderTopWidth: 0,
          elevation: 0,
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.7)',
        tabBarLabel: ({ focused, color }) => {
          if (!focused) return null;
          return (
            <Text style={{ color: '#FFFFFF', fontSize: 11, fontFamily: 'Poppins-Medium', marginTop: 4 }}>
              {route.name}
            </Text>
          );
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName = 'home';
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Upload') {
            iconName = focused ? 'cloud-upload' : 'cloud-upload-outline';
          } else if (route.name === 'Dashboard') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          
          return (
            <View style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
              {/* Top edge glowing flare */}
              {focused && (
                <View style={{
                  position: 'absolute',
                  top: -16, // Push it up to the top edge of the tab bar
                  width: 100,
                  height: 3,
                  backgroundColor: '#00E5FF',
                  borderRadius: 3,
                  shadowColor: '#00E5FF',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 1,
                  shadowRadius: 10,
                  elevation: 5,
                }} />
              )}
              
              {/* Intense Background Glow */}
              {focused && (
                <View style={{
                  position: 'absolute',
                  width: 50,
                  height: 50,
                  backgroundColor: '#00E5FF',
                  opacity: 0.2,
                  borderRadius: 25,
                }} />
              )}

              <View>
                <Ionicons 
                  name={iconName} 
                  size={24} 
                  color={color} 
                />
                {/* Fake the door dash in the custom home icon */}
                {focused && route.name === 'Home' && (
                  <View style={{ 
                    position: 'absolute', 
                    bottom: 4, 
                    left: 7, 
                    width: 10, 
                    height: 2.5, 
                    backgroundColor: '#050505', 
                    borderRadius: 2 
                  }} />
                )}
              </View>
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* Upload and Dashboard tabs are placeholders based on the design */}
      <Tab.Screen name="Upload" component={ProfileScreen} />
      <Tab.Screen name="Dashboard" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} options={{ presentation: 'fullScreenModal' }} />
        <Stack.Screen name="ContactUs" component={ContactUsScreen} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
        <Stack.Screen name="TermsOfService" component={TermsOfServiceScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
