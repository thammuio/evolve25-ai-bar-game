import { GameScore, Player, AnalyticsData, DailyStats, CategoryStats, PlayerActivityStats } from '../types/game';
import { clouderaServices } from '../data/clouderaServices';
import { getGameScores, getPlayers } from './database';
import { format, subDays, startOfDay, endOfDay, getHours } from 'date-fns';

export const generateAnalyticsData = async (): Promise<AnalyticsData> => {
  try {
    const [players, scores] = await Promise.all([getPlayers(), getGameScores()]);
    
    return {
      totalPlayers: players.length,
      totalGames: scores.length,
      averageScore: scores.length > 0 ? Math.round(scores.reduce((sum, s) => sum + s.score, 0) / scores.length) : 0,
      completionRate: scores.length > 0 ? Math.round((scores.filter(s => s.completedGame).length / scores.length) * 100) : 0,
      dailyStats: generateDailyStats(players, scores),
      categoryPerformance: generateCategoryStats(scores),
      playerActivity: generatePlayerActivityStats(scores),
      companyStats: generateCompanyStats(players, scores),
      topPerformers: generateTopPerformers(players, scores),
      gameMetrics: generateGameMetrics(scores)
    };
  } catch (error) {
    console.error('Error generating analytics:', error);
    return {
      totalPlayers: 0,
      totalGames: 0,
      averageScore: 0,
      completionRate: 0,
      dailyStats: [],
      categoryPerformance: [],
      playerActivity: [],
      companyStats: [],
      topPerformers: [],
      gameMetrics: {
        averageGameDuration: 0,
        averageTilesRevealed: 0,
        mostDifficultCategory: 'N/A',
        easiestCategory: 'N/A',
        peakPlayTime: 'N/A',
        totalPlayTime: 0
      }
    };
  }
};

const generateDailyStats = (players: Player[], scores: GameScore[]): DailyStats[] => {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), i);
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayStart = startOfDay(date);
    const dayEnd = endOfDay(date);
    
    const dayPlayers = players.filter(p => {
      const playerDate = new Date(p.timestamp);
      return playerDate >= dayStart && playerDate <= dayEnd;
    });
    
    const dayScores = scores.filter(s => {
      const scoreDate = new Date(s.gameDate);
      return scoreDate >= dayStart && scoreDate <= dayEnd;
    });
    
    const correctAnswers = dayScores.reduce((sum, s) => sum + s.matchedPairs, 0);
    const totalPossibleAnswers = dayScores.length * clouderaServices.length;
    const wrongAnswers = Math.max(0, totalPossibleAnswers - correctAnswers);
    
    return {
      date: format(date, 'MMM dd'),
      newPlayers: dayPlayers.length,
      gamesPlayed: dayScores.length,
      correctAnswers,
      wrongAnswers
    };
  }).reverse();
  
  return last7Days;
};

const generateCategoryStats = (scores: GameScore[]): CategoryStats[] => {
  const categories = [...new Set(clouderaServices.map(s => s.category))];
  
  return categories.map(category => {
    const categoryServices = clouderaServices.filter(s => s.category === category);
    const totalPossibleMatches = scores.length * categoryServices.length;
    
    // Estimate correct matches based on completion rate and category size
    const correctMatches = scores.reduce((sum, score) => {
      const categoryMatches = Math.floor((score.matchedPairs / clouderaServices.length) * categoryServices.length);
      return sum + categoryMatches;
    }, 0);
    
    return {
      category,
      correctMatches,
      totalAttempts: totalPossibleMatches,
      accuracy: totalPossibleMatches > 0 ? Math.round((correctMatches / totalPossibleMatches) * 100) : 0
    };
  });
};

const generatePlayerActivityStats = (scores: GameScore[]): PlayerActivityStats[] => {
  const hourlyStats = Array.from({ length: 24 }, (_, hour) => {
    const hourScores = scores.filter(s => getHours(new Date(s.gameDate)) === hour);
    const uniquePlayers = new Set(hourScores.map(s => s.player.id)).size;
    const avgScore = hourScores.length > 0 ? 
      Math.round(hourScores.reduce((sum, s) => sum + s.score, 0) / hourScores.length) : 0;
    
    return {
      hour,
      playerCount: uniquePlayers,
      averageScore: avgScore
    };
  });
  
  return hourlyStats;
};

const generateCompanyStats = (players: Player[], scores: GameScore[]): CompanyStats[] => {
  const companies = [...new Set(players.map(p => p.company))];
  
  return companies.map(company => {
    const companyPlayers = players.filter(p => p.company === company);
    const companyScores = scores.filter(s => s.player.company === company);
    
    const totalGames = companyScores.length;
    const completedGames = companyScores.filter(s => s.completedGame).length;
    const averageScore = totalGames > 0 ? 
      Math.round(companyScores.reduce((sum, s) => sum + s.score, 0) / totalGames) : 0;
    const bestScore = totalGames > 0 ? Math.max(...companyScores.map(s => s.score)) : 0;
    const bestPlayer = totalGames > 0 ? 
      companyScores.reduce((best, current) => current.score > best.score ? current : best).player.name : '';
    
    return {
      company,
      playerCount: companyPlayers.length,
      totalGames,
      averageScore,
      completionRate: totalGames > 0 ? Math.round((completedGames / totalGames) * 100) : 0,
      bestScore,
      bestPlayer
    };
  }).sort((a, b) => b.averageScore - a.averageScore);
};

const generateTopPerformers = (players: Player[], scores: GameScore[]): TopPerformerStats[] => {
  const playerStats = players.map(player => {
    const playerScores = scores.filter(s => s.player.name === player.name);
    const totalGames = playerScores.length;
    const completedGames = playerScores.filter(s => s.completedGame).length;
    const bestScore = totalGames > 0 ? Math.max(...playerScores.map(s => s.score)) : 0;
    const averageScore = totalGames > 0 ? 
      Math.round(playerScores.reduce((sum, s) => sum + s.score, 0) / totalGames) : 0;
    
    return {
      name: player.name,
      company: player.company,
      bestScore,
      totalGames,
      averageScore,
      completionRate: totalGames > 0 ? Math.round((completedGames / totalGames) * 100) : 0
    };
  }).filter(p => p.totalGames > 0)
    .sort((a, b) => b.bestScore - a.bestScore)
    .slice(0, 10);
  
  return playerStats;
};

const generateGameMetrics = (scores: GameScore[]): GameMetrics => {
  if (scores.length === 0) {
    return {
      averageGameDuration: 0,
      averageTilesRevealed: 0,
      mostDifficultCategory: 'N/A',
      easiestCategory: 'N/A',
      peakPlayTime: 'N/A',
      totalPlayTime: 0
    };
  }
  
  const averageGameDuration = Math.round(
    scores.reduce((sum, s) => sum + (90 - s.timeRemaining), 0) / scores.length
  );
  
  const averageTilesRevealed = Math.round(
    scores.reduce((sum, s) => sum + s.tilesRevealed, 0) / scores.length
  );
  
  // Find peak play time
  const hourCounts = scores.reduce((acc, score) => {
    const hour = getHours(new Date(score.gameDate));
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);
  
  const peakHour = Object.entries(hourCounts).reduce((peak, [hour, count]) => 
    count > peak.count ? { hour: parseInt(hour), count } : peak
  , { hour: 0, count: 0 });
  
  const totalPlayTime = scores.reduce((sum, s) => sum + (90 - s.timeRemaining), 0);
  
  return {
    averageGameDuration,
    averageTilesRevealed,
    mostDifficultCategory: 'Analytics', // Could be calculated based on match rates
    easiestCategory: 'Core Platform',
    peakPlayTime: `${peakHour.hour}:00`,
    totalPlayTime: Math.round(totalPlayTime / 60) // Convert to minutes
  };
};