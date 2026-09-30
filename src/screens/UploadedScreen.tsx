import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { Colors } from '../theme/colors';
import { getStorageResources, ResourceItem } from '../services/api';
import VideoListItem from '../components/VideoListItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function UploadedScreen({ navigation }: any) {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await getStorageResources();
        const videoData = data.filter(item => item.file_type === 'VIDEO');
        setResources(videoData);
      } catch (error) {
        console.error('Failed to fetch resources', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const handleVideoPress = (item: ResourceItem) => {
    if (item.file_type === 'VIDEO') {
      navigation.navigate('VideoPlayer', {
        fileId: item.file_id,
        fileName: item.file_name,
        fileUrl: item.file_url,
      });
    } else if (item.file_type === 'IMAGE') {
      navigation.navigate('ImageScreen', {
        fileUrl: item.file_url,
        fileName: item.file_name,
      });
    }
  };

  const handleOptionsPress = (_item: ResourceItem, event: any) => {
    const { pageY } = event.nativeEvent;
    setMenuPosition({ top: pageY + 10, right: 20 });
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const renderItem = ({ item }: { item: ResourceItem }) => (
    <VideoListItem
      item={item}
      onPress={handleVideoPress}
      showEarnings={true}
      onOptionsPress={handleOptionsPress}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Uploaded</Text>
        <View style={{ width: 40 }} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={resources}
          keyExtractor={(item, index) => item.file_id || index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      )}

      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <BlurView
                style={[
                  styles.menuContainer,
                  { top: menuPosition.top, right: menuPosition.right },
                ]}
                blurType="dark"
                blurAmount={20}
                reducedTransparencyFallbackColor="rgba(30,30,32,0.97)"
              >
                <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
                  <Text style={styles.menuItemText}>Edit</Text>
                  <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
                  <Text style={styles.menuItemText}>Share</Text>
                  <Ionicons name="share-outline" size={22} color="#FFFFFF" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
                  <Text style={styles.menuItemText}>Delete Folder</Text>
                  <Ionicons name="trash-outline" size={22} color="#FF3B30" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
                  <Text style={styles.menuItemText}>Download</Text>
                  <Ionicons name="download-outline" size={22} color="#FFFFFF" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
                  <Text style={styles.menuItemText}>Saved</Text>
                  <Ionicons name="bookmark-outline" size={22} color="#FFFFFF" />
                </TouchableOpacity>
              </BlurView>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  listContent: {
    padding: 16,
  },
  modalOverlay: {
    flex: 1,
  },
  menuContainer: {
    position: 'absolute',
    width: 230,
    borderRadius: 16,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  menuItemText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    letterSpacing: 0.1,
  },
});
