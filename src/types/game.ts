export interface Player {
  id: string;
  name: string;
  company: string;
  mobile: string;
  email: string;
  timestamp: number;
}

export interface GameScore {
  id: string;
  player: Player;
  score: number;
  tilesRevealed: number;
  matchedPairs: number;
  timeRemaining: number;
  completedGame: boolean;
  gameDate: string;
}

export interface ClouderaService {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface GameCard {
  id: string;
  service: ClouderaService;
  type: 'name' | 'description';
  isFlipped: boolean;
  isMatched: false;
}