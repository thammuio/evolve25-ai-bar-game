import React from 'react';
import { Trophy, Medal, Award, X } from 'lucide-react';
import { GameScore } from '../types/game';
import { getScoreRating } from '../utils/scoring';

interface WinnerPopupProps {
  winners: GameScore[];
  onClose: () => void;
}

export const WinnerPopup: React.FC<WinnerPopupProps> = ({ winners, onClose }) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="text-yellow-500" size={32} />;
      case 2: return <Medal className="text-gray-400" size={32} />;
      case 3: return <Award className="text-amber-600" size={32} />;
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy size={32} />
              <div>
                <h2 className="text-2xl font-bold">🎉 Session Winners!</h2>
                <p className="text-yellow-100 text-sm">Congratulations to our session champions!</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-yellow-200 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {winners.slice(0, 3).map((winner, index) => {
              const rank = index + 1;
              const rating = getScoreRating(winner.score);
              
              return (
                <div
                  key={winner.id}
                  className={`
                    p-6 rounded-xl border-2 text-center transform transition-all duration-300 hover:scale-105
                    ${rank === 1 ? 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-lg' : 
                      rank === 2 ? 'border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100' :
                      'border-amber-300 bg-gradient-to-br from-amber-50 to-amber-100'}
                  `}
                >
                  <div className="flex justify-center mb-3">
                    {getRankIcon(rank)}
                  </div>
                  
                  <div className={`text-lg font-bold mb-1 ${
                    rank === 1 ? 'text-yellow-700' :
                    rank === 2 ? 'text-gray-700' :
                    'text-amber-700'
                  }`}>
                    {rank === 1 ? '🥇 Champion' : rank === 2 ? '🥈 Runner-up' : '🥉 Third Place'}
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-1">{winner.player.name}</h3>
                  <p className="text-sm text-slate-600 mb-3">{winner.player.company}</p>
                  
                  <div className="text-3xl font-bold text-slate-800 mb-2">{winner.score}</div>
                  <div className={`text-sm font-medium ${rating.color} mb-3`}>{rating.rating}</div>
                  
                  <div className="text-xs text-slate-500 space-y-1">
                    <div>✅ {winner.matchedPairs}/8 matches</div>
                    <div>🎯 {winner.tilesRevealed} tiles revealed</div>
                    <div>{winner.completedGame ? '🏆 Completed' : '⏱️ Incomplete'}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 text-center">
            <p className="text-slate-600 mb-4">
              These champions dominated the session with their exceptional memory skills!
            </p>
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
            >
              Awesome! 👏
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};