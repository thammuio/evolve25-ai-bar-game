import { Player, GameScore } from '../types/game';

const PLAYERS_KEY = 'cloudera-game-players';
const SCORES_KEY = 'cloudera-game-scores';

export const savePlayer = (player: Player): void => {
  const players = getPlayers();
  const existingIndex = players.findIndex(p => p.mobile === player.mobile);
  
  if (existingIndex >= 0) {
    players[existingIndex] = player;
  } else {
    players.push(player);
  }
  
  localStorage.setItem(PLAYERS_KEY, JSON.stringify(players));
};

export const getPlayers = (): Player[] => {
  const stored = localStorage.getItem(PLAYERS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const getPlayerByMobile = (mobile: string): Player | null => {
  const players = getPlayers();
  return players.find(p => p.mobile === mobile) || null;
};

export const saveGameScore = (score: GameScore): void => {
  const scores = getGameScores();
  scores.push(score);
  localStorage.setItem(SCORES_KEY, JSON.stringify(scores));
};

export const getGameScores = (): GameScore[] => {
  const stored = localStorage.getItem(SCORES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const clearAllData = (): void => {
  localStorage.removeItem(PLAYERS_KEY);
  localStorage.removeItem(SCORES_KEY);
};