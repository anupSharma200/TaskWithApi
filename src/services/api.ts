import axios from 'axios';
import { CONFIG } from './config';

export interface ResourceItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: number;
  created_at?: string;
  thumbnail_url?: string;
  displayType?: 'single' | 'stacked' | 'video';
  itemCount?: number;
  subtitle?: string;
  badgeText?: string;
}

export interface ExploreResponse {
  data: {
    resources: ResourceItem[];
  };
}

export const getStorageResources = async (folderId: string = CONFIG.DEFAULT_FOLDER_ID, limit: number = 30) => {
  try {
    const url = `https://api.hey.watch/api/v1/storage/explore/?folder_id=${folderId}&limit=${limit}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${CONFIG.ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed (401). Token is invalid or expired.');
      }
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const json = await response.json();
    return json.data.resources;
    
  } catch (error) {
    console.error('Error fetching storage resources', error);
    throw error;
  }
};

export const getStreamUrl = (fileId: string) => {
  return `${CONFIG.STREAM_API_BASE_URL}${fileId}/?token=${CONFIG.ACCESS_TOKEN}`;
};
