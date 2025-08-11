import React, { useState, useEffect } from 'react';
import { X, BarChart3, Users, Trophy, Target, Clock, TrendingUp, Activity, Building, Award } from 'lucide-react';
import { AnalyticsData } from '../types/game';
import { generateAnalyticsData } from '../utils/analytics';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar
} from 'recharts';

interface AnalyticsProps {
  onClose: () => void;
}

export const Analytics: React.FC<AnalyticsProps> = ({ onClose }) => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsLoading(true);
        const data = await generateAnalyticsData();
        setAnalytics(data);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError('Failed to load analytics data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const COLORS = ['#f97316', '#dc2626', '#ea580c', '#c2410c', '#9a3412', '#7c2d12'];

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500 text-lg">Loading analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
          <div className="p-12 text-center">
            <BarChart3 className="text-red-300 mx-auto mb-4" size={48} />
            <p className="text-red-500 text-lg">Error loading analytics</p>
            <p className="text-gray-400">{error}</p>
            <button
              onClick={onClose}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart3 size={28} />
              <div>
                <h2 className="text-2xl font-bold">Game Analytics</h2>
                <p className="text-blue-100 text-sm">Comprehensive insights into player behavior and game performance</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Total Players</p>
                  <p className="text-2xl font-bold text-blue-800">{analytics.totalPlayers}</p>
                </div>
                <Users className="text-blue-500" size={32} />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Total Games</p>
                  <p className="text-2xl font-bold text-green-800">{analytics.totalGames}</p>
                </div>
                <Trophy className="text-green-500" size={32} />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 text-sm font-medium">Average Score</p>
                  <p className="text-2xl font-bold text-orange-800">{analytics.averageScore}</p>
                </div>
                <Target className="text-orange-500" size={32} />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Completion Rate</p>
                  <p className="text-2xl font-bold text-purple-800">{analytics.completionRate}%</p>
                </div>
                <TrendingUp className="text-purple-500" size={32} />
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 gap-8">
            {/* Company Performance Comparison */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Building size={20} className="text-indigo-500" />
                Company Performance Comparison
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={analytics.companyStats.slice(0, 10)} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="company" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    interval={0}
                  />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip
  formatter={(value, name, props) => {
    const key = props.dataKey; // safer than relying on 'name'

    if (key === 'averageScore') {
      return [`${value} pts`, 'Avg Score'];
    }
    if (key === 'completionRate') {
      return [`${value}%`, 'Completion Rate'];
    }
    if (key === 'playerCount') {
      return [value, 'Players'];
    }
    return [value, 'Total Games'];
  }}
  labelFormatter={(company) => `Company: ${company}`}
/>
                  <Legend />
                  <Bar yAxisId="left" dataKey="averageScore" fill="#6366f1" name="Average Score" />
                  <Bar yAxisId="right" dataKey="completionRate" fill="#10b981" name="Completion Rate %" />
                  <Bar yAxisId="left" dataKey="playerCount" fill="#f59e0b" name="Player Count" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Top Companies Pie Chart */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Trophy size={20} className="text-yellow-500" />
                Top Companies by Player Count
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={analytics.companyStats.slice(0, 8)}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ company, playerCount, percent }) => 
                      `${company}: ${playerCount} (${(percent * 100).toFixed(1)}%)`
                    }
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey='playerCount'
                    nameKey="company"
                  >
                    {analytics.companyStats.slice(0, 8).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} players`, 'Player Count']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Company Engagement Metrics */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Activity size={20} className="text-green-500" />
                Company Engagement Metrics
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={analytics.companyStats.slice(0, 8)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="company" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    interval={0}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'totalGames' ? `Total Games: ${value} ` : `Total Games: ${value}`
                    ]}
                  />
                  <Legend />
                  <Bar dataKey="totalGames" fill="#3b82f6" name="Total Games" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Daily Activity Trend */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-blue-500" />
                Daily Activity Trend (Last 7 Days)
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={analytics.dailyStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="newPlayers" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="New Players"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="gamesPlayed" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Games Played"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Category Performance */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Target size={20} className="text-orange-500" />
                Service Category Accuracy
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={analytics.categoryPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="category" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Accuracy Rate']} />
                  <Bar 
                    dataKey="accuracy" 
                    fill="#f97316"
                    name="Accuracy %"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Performers Table */}
          <div className="mt-8 bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Award size={20} className="text-yellow-500" />
              Top 10 Performers
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4">Rank</th>
                    <th className="text-left py-3 px-4">Player</th>
                    <th className="text-left py-3 px-4">Company</th>
                    <th className="text-right py-3 px-4">Best Score</th>
                    <th className="text-right py-3 px-4">Total Games</th>
                    <th className="text-right py-3 px-4">Avg Score</th>
                    <th className="text-right py-3 px-4">Completion Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.topPerformers.map((performer, index) => (
                    <tr key={performer.name} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {index < 3 ? (
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                              index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-600'
                            }`}>
                              {index + 1}
                            </div>
                          ) : (
                            <span className="text-slate-500 font-medium">#{index + 1}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-800">{performer.name}</td>
                      <td className="py-3 px-4 text-slate-600">{performer.company}</td>
                      <td className="py-3 px-4 text-right font-bold text-slate-800">{performer.bestScore}</td>
                      <td className="py-3 px-4 text-right text-slate-600">{performer.totalGames}</td>
                      <td className="py-3 px-4 text-right text-slate-600">{performer.averageScore}</td>
                      <td className="py-3 px-4 text-right text-slate-600">{performer.completionRate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Insights */}
          <div className="mt-8 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Key Insights & Game Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="space-y-2">
                <h4 className="font-medium text-slate-700 mb-2">Performance Leaders</h4>
                <p className="text-slate-700">
                  <strong>Top Company:</strong> {
                    analytics.companyStats.length > 0 
                      ? analytics.companyStats[0].company
                      : 'N/A'
                  }
                </p>
                <p className="text-slate-700">
                  <strong>Best Player:</strong> {
                    analytics.topPerformers.length > 0
                      ? analytics.topPerformers[0].name
                      : 'N/A'
                  }
                </p>
                <p className="text-slate-700">
                  <strong>Most Active Category:</strong> {
                    analytics.categoryPerformance.length > 0 
                      ? analytics.categoryPerformance.reduce((best, current) => 
                          current.correctMatches > best.correctMatches ? current : best
                        ).category
                      : 'N/A'
                  }
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-slate-700 mb-2">Game Statistics</h4>
                <p className="text-slate-700">
                  <strong>Avg Game Duration:</strong> {analytics.gameMetrics.averageGameDuration}s
                </p>
                <p className="text-slate-700">
                  <strong>Avg Tiles Revealed:</strong> {analytics.gameMetrics.averageTilesRevealed}
                </p>
                <p className="text-slate-700">
                  <strong>Peak Activity Hour:</strong> {
                    analytics.gameMetrics.peakPlayTime
                  }
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-slate-700 mb-2">Engagement Metrics</h4>
                <p className="text-slate-700">
                  <strong>Games per Player:</strong> {
                    analytics.totalPlayers > 0 
                      ? (analytics.totalGames / analytics.totalPlayers).toFixed(1)
                      : '0'
                  }
                </p>
                <p className="text-slate-700">
                  <strong>Total Play Time:</strong> {analytics.gameMetrics.totalPlayTime} minutes
                </p>
                <p className="text-slate-700">
                  <strong>Success Rate:</strong> {analytics.completionRate}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};