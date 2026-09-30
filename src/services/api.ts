import axios from 'axios';
import { CONFIG } from './config';

export interface ResourceItem {
  file_id: string;
  file_name: string;
  file_type: 'VIDEO' | 'IMAGE' | string;
  file_url: string;
  thumbnail_url?: string;
  size?: number;
  created_at?: string;
  view_count?: number;
  total_earnings?: string;
  owner?: {
    username: string;
    profile_photo: string;
    first_name: string;
    last_name: string;
  };
}

export interface ExploreResponse {
  data: {
    resources: ResourceItem[];
  };
}

const apiClient = axios.create({
  baseURL: 'https://api.hey.watch/api/v1',
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const getStorageResources = async (
  folderId: string = CONFIG.DEFAULT_FOLDER_ID,
  limit: number = 30,
) => {
  try {
    console.log('📡 Fetching resources for folder:', folderId);

    const response = await apiClient.get('/storage/explore/', {
      params: { folder_id: folderId, limit },
      headers: {
        Authorization: `Bearer ${CONFIG.ACCESS_TOKEN}`,
      },
    });

    console.log('📡 Response status:', response.status);
    console.log('📡 Resources count:', response.data?.data?.resources?.length);

    return response.data.data.resources as ResourceItem[];
  } catch (error: any) {
    if (error.response) {
      // Server responded with non-2xx status
      console.error('📡 HTTP Error:', error.response.status, error.response.data);
      if (error.response.status === 401) {
        throw new Error('Authentication failed (401). Token is invalid or expired.');
      }
      throw new Error(`HTTP Error: ${error.response.status}`);
    } else if (error.request) {
      // Request made but no response — network issue
      console.error('📡 No response received. Network issue or wrong URL.');
      console.error('📡 Request config:', error.config?.url);
    } else {
      console.error('📡 Request setup error:', error.message);
    }
    throw error;
  }
};

export const getStreamUrl = (fileId: string) => {
  return `${CONFIG.STREAM_API_BASE_URL}${fileId}/?token=${CONFIG.ACCESS_TOKEN}`;
};
