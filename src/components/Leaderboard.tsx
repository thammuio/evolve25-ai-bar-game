import React from 'react';
import { Trophy, Medal, Award, Clock, Target, User, Building, Download } from 'lucide-react';
import { GameScore } from '../types/game';
import { getScoreRating } from '../utils/scoring';
import { exportLeaderboardToCSV } from '../utils/csvExport';

interface LeaderboardProps {
  scores: GameScore[];
  onClose: () => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ scores, onClose }) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="text-yellow-500" size={20} />;
      case 2: return <Medal className="text-gray-400" size={20} />;
      case 3: return <Award className="text-amber-600" size={20} />;
      default: return <span className="text-slate-500 font-bold text-sm">#{rank}</span>;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleExportCSV = () => {
    exportLeaderboardToCSV(scores);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy size={28} />
              <div>
                <h2 className="text-2xl font-bold">Leaderboard</h2>
                <p className="text-blue-100 text-sm">Top performers in the Cloudera Memory Challenge</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {scores.length > 0 && (
                <button
                  onClick={handleExportCSV}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                >
                  <Download size={16} />
                  Export CSV
                </button>
              )}
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {scores.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="text-gray-300 mx-auto mb-4" size={48} />
              <p className="text-gray-500 text-lg">No scores yet!</p>
              <p className="text-gray-400">Be the first to complete the challenge.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {scores.map((score, index) => {
                const rank = index + 1;
                const rating = getScoreRating(score.score);
                
                return (
                  <div
                    key={score.id}
                    className={`
                      p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md
                      ${rank === 1 ? 'border-yellow-200 bg-yellow-50' : 
                        rank === 2 ? 'border-gray-200 bg-gray-50' :
                        rank === 3 ? 'border-amber-200 bg-amber-50' :
                        'border-slate-200 bg-white'}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10">
                          {getRankIcon(rank)}
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <User size={16} className="text-slate-500" />
                            <span className="font-semibold text-slate-800">{score.player.name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Building size={14} />
                            <span>{score.player.company}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-slate-800 mb-1">
                          {score.score}
                        </div>
                        <div className={`text-sm font-medium ${rating.color}`}>
                          {rating.rating}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Target className="text-green-600" size={16} />
                        <span className="text-slate-600">
                          {score.matchedPairs}/8 matches
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="text-blue-600" size={16} />
                        <span className="text-slate-600">
                          {formatTime(score.timeRemaining)} left
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span className="text-slate-600">
                          {score.tilesRevealed} tiles
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${score.completedGame ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                        <span className="text-slate-600">
                          {score.completedGame ? 'Completed' : 'Incomplete'}
                        </span>
                      </div>
                    </div>

                    <div className="mt-2 text-xs text-slate-400">
                      Played on {new Date(score.gameDate).toLocaleDateString()} at {new Date(score.gameDate).toLocaleTimeString()}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};