export const CONFIG = {
  EXPLORE_API_URL: 'https://api.hey.watch/api/v1/storage/explore/',
  STREAM_API_BASE_URL: 'http://103.38.50.248:8005/api/v1/storage/stream/',
  DEFAULT_FOLDER_ID: 'bfce46dc-5b98-4a578bda-283ef811682b',
  ACCESS_TOKEN: '',
  setAccessToken: (token: string) => {
    CONFIG.ACCESS_TOKEN = token;
  }
};
