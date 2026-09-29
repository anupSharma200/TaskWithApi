import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors } from '../theme/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONFIG } from '../services/config';

export default function SplashScreen({ navigation }: any) {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('@access_token');
        if (token) {
          CONFIG.setAccessToken(token);
          setTimeout(() => navigation.replace('MainTabs'), 2000);
        } else {
          setTimeout(() => navigation.replace('Login'), 2000);
        }
      } catch (error) {
        setTimeout(() => navigation.replace('Login'), 2000);
      }
    };

    checkToken();
  }, [navigation, opacity]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity }}>
        <Text style={styles.title}>Without Api</Text>
        <Text style={styles.subtitle}>Streaming Enterprise</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontFamily: 'Poppins-Bold',
    color: Colors.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
});

export default SplashScreen;
