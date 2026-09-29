import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../theme/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TermsOfServiceScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms of Service</Text>
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.text}>1. Acceptance of Terms</Text>
        <Text style={styles.paragraph}>By using Hey.Watch, you agree to these terms...</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: Colors.border },
  backButton: { padding: 8, marginRight: 8 },
  headerTitle: { fontSize: 20, fontFamily: 'Poppins-SemiBold', color: Colors.textPrimary },
  container: { flex: 1, padding: 16 },
  text: { fontSize: 18, fontFamily: 'Poppins-Bold', color: Colors.textPrimary, marginTop: 16 },
  paragraph: { fontSize: 14, fontFamily: 'Poppins-Regular', color: Colors.textSecondary, marginTop: 8 },
});
