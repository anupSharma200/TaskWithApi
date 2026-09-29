import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../theme/colors';
import { ResourceItem } from '../services/api';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function VideoListItem({ item, onPress, showEarnings }: any) {
  const { displayType, itemCount, name, subtitle, badgeText } = item as ResourceItem;

  const renderThumbnail = () => {
    if (displayType === 'single') {
      return (
        <View style={styles.singleThumbnail}>
          <Ionicons name="document-text-outline" size={28} color="#00E5FF" />
        </View>
      );
    }

    if (displayType === 'stacked') {
      return (
        <View style={styles.stackedContainer}>
          <View style={[styles.stackImage, styles.stackBack]} />
          <View style={[styles.stackImage, styles.stackMiddle]} />
          <View style={[styles.stackImage, styles.stackFront]}>
            <View style={styles.itemBadge}>
              <Text style={styles.itemBadgeText}>{badgeText || '12 items'}</Text>
            </View>
          </View>
        </View>
      );
    }

    // Default 'video' type
    return (
      <View style={styles.videoThumbnail}>
        <View style={styles.playIconContainer}>
          <Ionicons name="play" size={20} color="#FFF" />
        </View>
      </View>
    );
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
      {renderThumbnail()}
      
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {name}
        </Text>
        <Text style={styles.subtitle}>
          {subtitle || '5 hours ago — 21K views'}
        </Text>
        {showEarnings && displayType !== 'stacked' && (
          <Text style={styles.earnings}>$40 earn</Text>
        )}
      </View>

      <TouchableOpacity style={styles.optionsButton}>
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
