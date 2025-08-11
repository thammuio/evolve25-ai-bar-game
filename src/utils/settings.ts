import { AppSettings } from '../types/game';

const SETTINGS_KEY = 'cloudera-game-settings';

export const defaultSettings: AppSettings = {
  enableNotifications: true,
  showAnalytics: true
};

export const saveSettings = (settings: AppSettings): void => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

export const getSettings = (): AppSettings => {
  const stored = localStorage.getItem(SETTINGS_KEY);
  return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
};