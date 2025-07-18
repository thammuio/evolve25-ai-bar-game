import { Player, GameScore } from '../types/game';

export const exportPlayersToCSV = async (players: Player[] | Promise<Player[]>): Promise<void> => {
  const resolvedPlayers = await Promise.resolve(players);
  const headers = ['Name', 'Company', 'Registration Date'];
  const csvContent = [
    headers.join(','),
    ...resolvedPlayers.map(player => [
      `"${player.name}"`,
      `"${player.company}"`,
      `"${new Date(player.timestamp).toLocaleString()}"`
    ].join(','))
  ].join('\n');

  downloadCSV(csvContent, 'players-data.csv');
};

export const exportLeaderboardToCSV = async (scores: GameScore[] | Promise<GameScore[]>): Promise<void> => {
  const resolvedScores = await Promise.resolve(scores);
  const headers = [
    'Rank',
    'Player Name', 
    'Company',
    'Score',
    'Matched Pairs',
    'Tiles Revealed',
    'Time Remaining (seconds)',
    'Game Completed',
    'Game Date',
    'Registration Date'
  ];
  
  const csvContent = [
    headers.join(','),
    ...resolvedScores.map((score, index) => [
      index + 1,
      `"${score.player.name}"`,
      `"${score.player.company}"`,
      score.score,
      score.matchedPairs,
      score.tilesRevealed,
      score.timeRemaining,
      score.completedGame ? 'Yes' : 'No',
      `"${new Date(score.gameDate).toLocaleString()}"`,
      `"${new Date(score.player.timestamp).toLocaleString()}"`
    ].join(','))
  ].join('\n');

  downloadCSV(csvContent, 'leaderboard-data.csv');
};

export const exportAllDataToCSV = async (
  players: Player[] | Promise<Player[]>, 
  scores: GameScore[] | Promise<GameScore[]>
): Promise<void> => {
  const [resolvedPlayers, resolvedScores] = await Promise.all([
    Promise.resolve(players),
    Promise.resolve(scores)
  ]);
  
  // Create a comprehensive dataset combining player and score data
  const headers = [
    'Player Name',
    'Company', 
    'Registration Date',
    'Total Games Played',
    'Best Score',
    'Average Score',
    'Games Completed',
    'Last Game Date'
  ];

  const playerStats = resolvedPlayers.map(player => {
    const playerScores = resolvedScores.filter(score => score.player.name === player.name);
    const completedGames = playerScores.filter(score => score.completedGame).length;
    const bestScore = playerScores.length > 0 ? Math.max(...playerScores.map(s => s.score)) : 0;
    const avgScore = playerScores.length > 0 ? 
      Math.round(playerScores.reduce((sum, s) => sum + s.score, 0) / playerScores.length) : 0;
    const lastGameDate = playerScores.length > 0 ? 
      new Date(Math.max(...playerScores.map(s => new Date(s.gameDate).getTime()))) : null;

    return [
      `"${player.name}"`,
      `"${player.company}"`,
      `"${new Date(player.timestamp).toLocaleString()}"`,
      playerScores.length,
      bestScore,
      avgScore,
      completedGames,
      lastGameDate ? `"${lastGameDate.toLocaleString()}"` : 'Never played'
    ].join(',');
  });

  const csvContent = [headers.join(','), ...playerStats].join('\n');
  downloadCSV(csvContent, 'complete-game-data.csv');
};

const downloadCSV = (csvContent: string, filename: string): void => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};