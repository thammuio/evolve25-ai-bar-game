import React, { useState } from 'react';
import { User, Building, Phone, Play, Mail } from 'lucide-react';
import { Player } from '../types/game';
import { savePlayer, getPlayerByMobile } from '../utils/storage';

interface PlayerRegistrationProps {
  onPlayerReady: (player: Player) => void;
}

export const PlayerRegistration: React.FC<PlayerRegistrationProps> = ({ onPlayerReady }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    mobile: '',
    email: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateSingaporeMobile = (mobile: string): boolean => {
    // Singapore mobile numbers: +65 followed by 8 or 9 and 7 more digits
    // Formats: +6581234567, +6591234567, 81234567, 91234567
    const sgMobileRegex = /^(\+65)?[89]\d{7}$/;
    return sgMobileRegex.test(mobile.replace(/\s/g, ''));
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!validateSingaporeMobile(formData.mobile.trim())) {
      newErrors.mobile = 'Please enter a valid Singapore mobile number (e.g., +6581234567 or 81234567)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Normalize mobile number format
      let normalizedMobile = formData.mobile.trim().replace(/\s/g, '');
      if (!normalizedMobile.startsWith('+65')) {
        normalizedMobile = '+65' + normalizedMobile;
      }

      // Check if player exists
      const existingPlayer = getPlayerByMobile(normalizedMobile);
      
      const player: Player = {
        id: existingPlayer?.id || Date.now().toString(),
        name: formData.name.trim(),
        company: formData.company.trim(),
        mobile: normalizedMobile,
        email: formData.email.trim().toLowerCase(),
        timestamp: Date.now()
      };

      savePlayer(player);
      onPlayerReady(player);
    } catch (error) {
      console.error('Error saving player:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            Cloudera Memory Challenge
          </h1>
          <p className="text-slate-600">
            Enter your details to start the 1-minute challenge
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <User size={16} className="inline mr-2" />
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.name ? 'border-red-500' : 'border-slate-300'
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Building size={16} className="inline mr-2" />
              Company
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.company ? 'border-red-500' : 'border-slate-300'
              }`}
              placeholder="Enter your company name"
            />
            {errors.company && (
              <p className="text-red-500 text-sm mt-1">{errors.company}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Mail size={16} className="inline mr-2" />
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.email ? 'border-red-500' : 'border-slate-300'
              }`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Phone size={16} className="inline mr-2" />
              Singapore Mobile Number
            </label>
            <input
              type="tel"
              value={formData.mobile}
              onChange={(e) => handleInputChange('mobile', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.mobile ? 'border-red-500' : 'border-slate-300'
              }`}
              placeholder="+6581234567 or 81234567"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
            )}
            <p className="text-xs text-slate-500 mt-1">
              Singapore mobile numbers only (starting with 8 or 9)
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Play size={20} />
                Start Game
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          <p>🎯 Match service names with descriptions</p>
          <p>⏱️ Complete within 1 minute for bonus points</p>
          <p>🏆 Compete on the leaderboard</p>
        </div>
      </div>
    </div>
  );
};