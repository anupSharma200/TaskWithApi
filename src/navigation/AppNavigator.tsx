import React from 'react';
import { View, Text, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import { Colors } from '../theme/colors';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import VideoPlayerScreen from '../screens/VideoPlayerScreen';
import ImageScreen from '../screens/ImageScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';
import TermsOfServiceScreen from '../screens/TermsOfServiceScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import UploadedScreen from '../screens/UploadedScreen';

// Custom tab Images
const Homeimage = require('../essets/Images/home.png');
const Uploadimage = require('../essets/Images/Upload.png');
const reelimage = require('../essets/Images/reel.png');
const Settingsimage = require('../essets/Images/setting.png');

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  MainTabs: undefined;

  VideoPlayer: {
    fileId?: string;
    fileName: string;
    localUri?: string;
    fileUrl?: string;
  };

  Imagescreen: {
    fileUrl: string;
    fileName: string;
  };

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

        tabBarLabel: ({ focused }) => {
          if (!focused) {
            return null;
          }

          return (
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 11,
                fontFamily: 'Poppins-Medium',
                marginTop: 4,
              }}
            >
              {route.name}
            </Text>
          );
        },

        tabBarIcon: ({ focused }) => {
          let iconSource;

          // Home icon
          if (route.name === 'Home') {
            iconSource = Homeimage;
          }

          // Upload icon
          else if (route.name === 'Upload') {
            iconSource = Uploadimage;
          }

          // Dashboard / Reel icon
          else if (route.name === 'Dashboard') {
            iconSource = reelimage;
          }

          // Settings icon
          else if (route.name === 'Settings') {
            iconSource = Settingsimage;
          }

          return (
            <View
              style={{
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Top edge glowing flare */}
              {focused && (
                <View
                  style={{
                    position: 'absolute',
                    top: -16,
                    width: 100,
                    height: 3,
                    backgroundColor: '#00E5FF',
                    borderRadius: 3,

                    shadowColor: '#00E5FF',
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 10,

                    elevation: 5,
                  }}
                />
              )}

              {/* Background Glow */}
              {focused && (
                <View
                  style={{
                    position: 'absolute',
                    width: 50,
                    height: 50,
                    backgroundColor: '#00E5FF',
                    opacity: 0.2,
                    borderRadius: 25,
                  }}
                />
              )}

              {/* Custom Image Icon */}
              {iconSource && (
                <Image
                  source={iconSource}
                  style={{
                    width: 24,
                    height: 24,
                    resizeMode: 'contain',
                    opacity: focused ? 1 : 0.7,
                  }}
                />
              )}
            </View>
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Upload"
        component={UploadedScreen}
      />

      <Tab.Screen
        name="Dashboard"
        component={ProfileScreen}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Splash */}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />

        {/* Login */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        {/* Main Bottom Tabs */}
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
        />

        {/* Video Player */}
        <Stack.Screen
          name="VideoPlayer"
          component={VideoPlayerScreen}
          options={{
            presentation: 'fullScreenModal',
          }}
        />

        {/* Image Screen */}
        <Stack.Screen
          name="Imagescreen"
          component={ImageScreen}
          options={{
            presentation: 'fullScreenModal',
          }}
        />

        {/* Contact Us */}
        <Stack.Screen
          name="ContactUs"
          component={ContactUsScreen}
        />

        {/* Update Profile */}
        <Stack.Screen
          name="UpdateProfile"
          component={UpdateProfileScreen}
        />

        {/* Terms */}
        <Stack.Screen
          name="TermsOfService"
          component={TermsOfServiceScreen}
        />

        {/* Privacy Policy */}
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicyScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;