import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, PermissionsAndroid, Platform, Alert } from 'react-native';
import { Colors } from '../theme/colors';
import { getStorageResources, ResourceItem } from '../services/api';
import VideoListItem from '../components/VideoListItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchImageLibrary } from 'react-native-image-picker';


export default function HomeScreen({ navigation }: any) {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await getStorageResources();
        console.log("🚀 ~ fetchResources ~ data:", data)
        console.log('API Data:', data);
        setResources(data);
      } catch (error) {
        console.error('Failed to fetch resources', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const handleVideoPress = async (item: ResourceItem) => {
    if (item.file_type === 'VIDEO') {
      navigation.navigate('VideoPlayer', { fileId: item.file_id, fileName: item.file_name, fileUrl: item.file_url });
    } else if (item.file_type === 'IMAGE') {
      navigation.navigate('ImageScreen', { fileUrl: item.file_url, fileName: item.file_name });
    } else if (item.file_type === 'folder') {
      try {
        if (Platform.OS === 'android') {
          
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'Gallery Permission',
              message: 'Hey.Watch needs access to your gallery to upload videos.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED && granted !== 'never_ask_again') {
            console.log('Storage permission denied');
          }
        }

        const result = await launchImageLibrary({
          mediaType: 'video',
          videoQuality: 'high',
        });

        if (result.didCancel) {
          console.log('User cancelled video picker');
        } else if (result.errorCode) {
          Alert.alert('Error', result.errorMessage || 'Could not pick video');
        } else if (result.assets && result.assets.length > 0) {
          const selectedVideo = result.assets[0];
          navigation.navigate('VideoPlayer', { 
            fileName: selectedVideo.fileName || 'Local Video',
            localUri: selectedVideo.uri 
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const renderStatsCard = (title: string, value: string, sub: string, bgColor: string) => (
    <View style={[styles.card, { backgroundColor: bgColor }]}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={styles.cardSub}>{sub}</Text> 
    </View>
  );

  const userName = resources.length > 0 && resources[0].owner ? resources[0].owner.first_name : 'Michael';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingText}>Let's earn something today!</Text>
            <Text style={styles.userName}>Hi, {userName} 👋</Text>
          </View>
          <View style={styles.notificationIcon}>
            <Text style={styles.bell}>🔔</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {renderStatsCard('This month view', '500,000', 'vs. prev. month', Colors.cardBlue)}
          {renderStatsCard('This month earning', '$450', 'vs. prev. month', Colors.cardOrange)}
          {renderStatsCard('Storage used', '13.74 MB', 'Total storage used', Colors.cardPurple)}
          {renderStatsCard('Total uploaded', '400', 'vs. prev. month', Colors.cardGreen)}
        </View>

        {/* Recent Uploaded List */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Uploaded</Text>
          <Text style={styles.viewAll}>View all</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <View style={styles.listContainer}>
            {resources.slice(0, 5).map((item, index) => (
              <VideoListItem key={item.file_id || index.toString()} item={item} onPress={handleVideoPress} showEarnings={true} />
            ))}
          </View>
        )}
        
        {/* Second Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Create link list</Text>
          <Text style={[styles.viewAll, { color: '#00E5FF' }]}>Copy link</Text>
        </View>
        {!loading && resources.length > 5 && (
           <View style={styles.listContainer}>
             {resources.slice(5).map((item, index) => (
               <VideoListItem key={item.file_id || index.toString()} item={item} onPress={handleVideoPress} showEarnings={false} />
             ))}
           </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greetingText: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginBottom: 4,
    fontFamily: 'Poppins-Regular',
  },
  userName: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bell: {
    fontSize: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  card: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  cardTitle: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginBottom: 8,
    fontFamily: 'Poppins-Regular',
  },
  cardValue: {
    color: Colors.textPrimary,
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginBottom: 8,
  },
  cardSub: {
    color: Colors.textSecondary,
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  viewAll: {
    color: Colors.primary,
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
  },
  listContainer: {
    marginBottom: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    marginVertical: 16,
  },
});

export default HomeScreen;
