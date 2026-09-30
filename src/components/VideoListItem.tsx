import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../theme/colors';
import { ResourceItem } from '../services/api';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function VideoListItem({ item, onPress, showEarnings = true, onOptionsPress }: any) {
  const { file_name, file_type, thumbnail_url, view_count, total_earnings, created_at } = item as ResourceItem;

  const renderThumbnail = () => {
    if (file_type === 'IMAGE' || file_type === 'VIDEO') {
      return (
        <View style={styles.videoThumbnail}>
          {thumbnail_url ? (
            <Image source={{ uri: thumbnail_url }} style={styles.thumbnailImage} />
          ) : (
            <View style={[styles.thumbnailImage, { backgroundColor: '#333' }]} />
          )}
          {file_type === 'VIDEO' && (
            <View style={styles.playIconContainer}>
              <Ionicons name="play" size={20} color="#FFF" />
            </View>
          )}
        </View>
      );
    }

    // Stacked/Folder mock (if folder was supported)
    return (
      <View style={styles.stackedContainer}>
        <View style={[styles.stackImage, styles.stackBack]} />
        <View style={[styles.stackImage, styles.stackMiddle]} />
        <View style={[styles.stackImage, styles.stackFront]}>
          <View style={styles.itemBadge}>
            <Text style={styles.itemBadgeText}>Folder</Text>
          </View>
        </View>
      </View>
    );
  };

  // Basic time ago mock since created_at is a raw string
  const timeAgo = created_at ? '5 hours ago' : 'Recently';
  const views = view_count || 0;
  const subtitleStr = `${timeAgo} — ${views >= 1000 ? (views/1000).toFixed(1) + 'K' : views} views`;

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
      {renderThumbnail()}
      
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {file_name}
        </Text>
        <Text style={styles.subtitle}>
          {subtitleStr}
        </Text>
        {showEarnings && total_earnings && (
          <Text style={styles.earnings}>${parseFloat(total_earnings).toFixed(0)} earn</Text>
        )}
      </View>

      <TouchableOpacity 
        style={styles.optionsButton} 
        onPress={onOptionsPress ? (event) => onOptionsPress(item, event) : undefined}
      >
        <Ionicons name="ellipsis-horizontal" size={16} color="#FFFFFF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  // Single File
  singleThumbnail: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  // Stacked Folders
  stackedContainer: {
    width: 64,
    height: 64,
  },
  stackImage: {
    position: 'absolute',
    borderRadius: 12,
    backgroundColor: '#FF6B6B', // using a colorful placeholder color
  },
  stackBack: {
    width: 50,
    height: 50,
    top: -6,
    right: -4,
    opacity: 0.4,
    backgroundColor: '#4ECDC4',
  },
  stackMiddle: {
    width: 56,
    height: 56,
    top: -3,
    right: -2,
    opacity: 0.7,
    backgroundColor: '#FFE66D',
  },
  stackFront: {
    width: 64,
    height: 64,
    bottom: 0,
    left: 0,
    backgroundColor: '#FF6B6B',
    overflow: 'hidden',
  },
  itemBadge: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    backgroundColor: '#000',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  itemBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
  },
  // Video
  videoThumbnail: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  playIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 2, // optical center for play button
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
    // justifyContent: 'center',
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    marginBottom: 4,
    lineHeight: 20,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginBottom: 4,
  },
  earnings: {
    color: '#00E5FF',
    fontSize: 13,
    fontFamily: 'Poppins-SemiBold',
  },
  optionsButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});
