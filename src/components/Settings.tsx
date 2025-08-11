import React from 'react';
import { Settings as SettingsIcon, Bell, BellOff, BarChart3, X } from 'lucide-react';
import { getSettings, saveSettings } from '../utils/settings';
import { AppSettings } from '../types/game';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsChange: (settings: AppSettings) => void;
}

export default function Settings({ isOpen, onClose, onSettingsChange }: SettingsProps) {
  const [settings, setSettings] = React.useState<AppSettings>(getSettings());

  const handleSettingChange = (key: keyof AppSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    saveSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        handleSettingChange('enableNotifications', true);
      }
    } else if (Notification.permission === 'granted') {
      handleSettingChange('enableNotifications', !settings.enableNotifications);
    } else {
      alert('Notifications are blocked. Please enable them in your browser settings.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <SettingsIcon className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Notifications Setting */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              {settings.enableNotifications ? (
                <Bell className="w-5 h-5 text-blue-600" />
              ) : (
                <BellOff className="w-5 h-5 text-gray-400" />
              )}
              <div>
                <h3 className="font-medium text-gray-800">Notifications</h3>
                <p className="text-sm text-gray-600">Get notified about game events</p>
              </div>
            </div>
            <button
              onClick={requestNotificationPermission}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.enableNotifications ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.enableNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Analytics Setting */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <BarChart3 className={`w-5 h-5 ${settings.showAnalytics ? 'text-blue-600' : 'text-gray-400'}`} />
              <div>
                <h3 className="font-medium text-gray-800">Analytics Dashboard</h3>
                <p className="text-sm text-gray-600">Show detailed game analytics</p>
              </div>
            </div>
            <button
              onClick={() => handleSettingChange('showAnalytics', !settings.showAnalytics)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.showAnalytics ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.showAnalytics ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Settings are saved automatically
          </p>
        </div>
      </div>
    </div>
  );
}