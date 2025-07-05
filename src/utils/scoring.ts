import { GameScore } from '../types/game';

export const calculateScore = (
  matchedPairs: number,
  tilesRevealed: number,
  timeRemaining: number,
  totalServices: number,
  completedGame: boolean
): number => {
  let score = 0;
  
  // Base score for matched pairs (50 points each)
  score += matchedPairs * 50;
  
  // Bonus for completing the game
  if (completedGame) {
    score += 200;
  }
  
  // Time bonus (up to 100 points based on time remaining out of 60 seconds)
  const timeBonus = Math.floor((timeRemaining / 60) * 100);
  score += timeBonus;
  
  // Efficiency bonus (fewer tiles revealed is better)
  const maxPossibleTiles = totalServices * 2;
  const efficiency = 1 - (tilesRevealed / (maxPossibleTiles * 2)); // Penalty for excessive reveals
  const efficiencyBonus = Math.max(0, Math.floor(efficiency * 100));
  score += efficiencyBonus;
  
  return Math.max(0, score);
};

export const getScoreRating = (score: number): { rating: string; color: string } => {
  if (score >= 400) return { rating: 'Outstanding!', color: 'text-purple-600' };
  if (score >= 350) return { rating: 'Excellent!', color: 'text-green-600' };
  if (score >= 300) return { rating: 'Great!', color: 'text-blue-600' };
  if (score >= 250) return { rating: 'Good!', color: 'text-teal-600' };
  if (score >= 200) return { rating: 'Fair', color: 'text-yellow-600' };
  return { rating: 'Keep Practicing!', color: 'text-orange-600' };
};

export const sortLeaderboard = (scores: GameScore[]): GameScore[] => {
  return scores.sort((a, b) => {
    // First sort by score (descending)
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    // If scores are equal, sort by completion status
    if (b.completedGame !== a.completedGame) {
      return b.completedGame ? 1 : -1;
    }
    // If both completed or both didn't, sort by time remaining (more is better)
    if (b.timeRemaining !== a.timeRemaining) {
      return b.timeRemaining - a.timeRemaining;
    }
    // Finally sort by date (more recent first)
    return b.gameDate.localeCompare(a.gameDate);
  });
};