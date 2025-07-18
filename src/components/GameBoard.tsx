import React, { useState, useEffect } from 'react';
import { ClouderaService, GameCard, Player, GameScore } from '../types/game';
import { clouderaServices } from '../data/clouderaServices';
import { GameTile } from './GameTile';
import { Leaderboard } from './Leaderboard';
import { Credits } from './Credits';
import { Shuffle, RotateCcw, Trophy, Timer, Target, User, Award, Info, Download } from 'lucide-react';
import { calculateScore, getScoreRating, sortLeaderboard } from '../utils/scoring';
import { saveGameScore, getGameScores, getPlayers } from '../utils/storage';
import { exportLeaderboardToCSV, exportPlayersToCSV, exportAllDataToCSV } from '../utils/csvExport';

interface GameBoardProps {
  player: Player;
  onBackToRegistration: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ player, onBackToRegistration }) => {
  const [cards, setCards] = useState<GameCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<GameCard[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [tilesRevealed, setTilesRevealed] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60); // 1 minute
  const [gameStarted, setGameStarted] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showCredits, setShowCredits] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const initializeGame = () => {
    const gameCards: GameCard[] = [];
    
    clouderaServices.forEach(service => {
      gameCards.push({
        id: `${service.id}-name`,
        service,
        type: 'name',
        isFlipped: false,
        isMatched: false
      });
      gameCards.push({
        id: `${service.id}-description`,
        service,
        type: 'description',
        isFlipped: false,
        isMatched: false
      });
    });

    // Shuffle cards
    const shuffledCards = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setTilesRevealed(0);
    setGameComplete(false);
    setGameOver(false);
    setTimeRemaining(60); // 1 minute
    setGameStarted(true);
    setFinalScore(0);
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && !gameComplete && !gameOver && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameComplete, gameOver, timeRemaining]);

  // Handle card matching logic
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;

      if (first.service.id === second.service.id && first.type !== second.type) {
        // Match found
        setTimeout(() => {
          setMatchedPairs(prev => [...prev, first.service.id]);
          setCards(prev => prev.map(card => 
            card.service.id === first.service.id 
              ? { ...card, isMatched: true, isFlipped: true }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            flippedCards.some(flipped => flipped.id === card.id)
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1500);
      }
    }
  }, [flippedCards]);

  // Check for game completion
  useEffect(() => {
    if (matchedPairs.length === clouderaServices.length && gameStarted) {
      setGameComplete(true);
    }
  }, [matchedPairs, gameStarted]);

  // Save score when game ends
  useEffect(() => {
    if ((gameComplete || gameOver) && gameStarted) {
      const score = calculateScore(
        matchedPairs.length,
        tilesRevealed,
        timeRemaining,
        clouderaServices.length,
        gameComplete
      );
      
      setFinalScore(score);

      const gameScore: GameScore = {
        id: Date.now().toString(),
        player,
        score,
        tilesRevealed,
        matchedPairs: matchedPairs.length,
        timeRemaining,
        completedGame: gameComplete,
        gameDate: new Date().toISOString()
      };

      saveGameScore(gameScore);
    }
  }, [gameComplete, gameOver, gameStarted, matchedPairs.length, tilesRevealed, timeRemaining, player]);

  const handleCardClick = (clickedCard: GameCard) => {
    if (flippedCards.length >= 2 || clickedCard.isFlipped || clickedCard.isMatched || gameOver || gameComplete) {
      return;
    }

    setTilesRevealed(prev => prev + 1);
    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);
    setCards(prev => prev.map(card => 
      card.id === clickedCard.id 
        ? { ...card, isFlipped: true }
        : card
    ));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getLeaderboardScores = () => {
    return sortLeaderboard(getGameScores());
  };

  const getTimeColor = () => {
    if (timeRemaining > 30) return 'text-green-600';
    if (timeRemaining > 15) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleNewGame = () => {
    // Redirect to login page for new game
    onBackToRegistration();
  };

  const handleExportLeaderboard = () => {
    const scores = getLeaderboardScores();
    exportLeaderboardToCSV(scores);
    setShowExportMenu(false);
  };

  const handleExportPlayers = () => {
    const players = getPlayers();
    exportPlayersToCSV(players);
    setShowExportMenu(false);
  };

  const handleExportAllData = () => {
    const players = getPlayers();
    const scores = getLeaderboardScores();
    exportAllDataToCSV(players, scores);
    setShowExportMenu(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Cloudera Memory Challenge
          </h1>
          <div className="flex items-center justify-center gap-2 text-slate-600">
            <User size={16} />
            <span className="font-medium">{player.name}</span>
            <span className="text-slate-400">•</span>
            <span>{player.company}</span>
          </div>
        </div>

        {/* Game Stats */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <div className={`bg-white rounded-lg shadow-md p-4 flex items-center gap-2 ${timeRemaining <= 15 ? 'ring-2 ring-red-200' : ''}`}>
            <Timer className={getTimeColor()} size={20} />
            <span className={`font-bold ${getTimeColor()}`}>
              {formatTime(timeRemaining)}
            </span>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span className="text-slate-700 font-medium">Tiles: {tilesRevealed}</span>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-2">
            <Target className="text-green-600" size={20} />
            <span className="text-slate-700 font-medium">
              Matches: {matchedPairs.length}/{clouderaServices.length}
            </span>
          </div>
          {(gameComplete || gameOver) && (
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md p-4 flex items-center gap-2">
              <Trophy size={20} />
              <span className="font-bold">Score: {finalScore}</span>
            </div>
          )}
        </div>

        {/* Game Complete/Over Modal */}
        {(gameComplete || gameOver) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
              {gameComplete ? (
                <>
                  <Trophy className="text-yellow-500 mx-auto mb-4" size={48} />
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Congratulations!
                  </h2>
                  <p className="text-slate-600 mb-4">
                    You completed the challenge!
                  </p>
                </>
              ) : (
                <>
                  <Timer className="text-red-500 mx-auto mb-4" size={48} />
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Time's Up!
                  </h2>
                  <p className="text-slate-600 mb-4">
                    Good effort! Try again to improve your score.
                  </p>
                </>
              )}
              
              <div className="space-y-2 mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg">
                  <p className="text-lg font-bold">Final Score: {finalScore}</p>
                </div>
                <p className="text-slate-700">
                  <strong>Matches:</strong> {matchedPairs.length}/{clouderaServices.length}
                </p>
                <p className="text-slate-700">
                  <strong>Tiles Revealed:</strong> {tilesRevealed}
                </p>
                <p className="text-slate-700">
                  <strong>Time Remaining:</strong> {formatTime(timeRemaining)}
                </p>
                <p className={`font-semibold ${getScoreRating(finalScore).color}`}>
                  {getScoreRating(finalScore).rating}
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleNewGame}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
                >
                  New Game
                </button>
                <button
                  onClick={() => setShowLeaderboard(true)}
                  className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white px-4 py-3 rounded-lg hover:from-green-700 hover:to-teal-700 transition-all duration-200 font-medium flex items-center justify-center gap-2"
                >
                  <Award size={16} />
                  Leaderboard
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {!gameStarted && (
            <button
              onClick={initializeGame}
              className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-teal-700 transition-all duration-200 flex items-center gap-2 font-medium"
            >
              <Shuffle size={20} />
              Start Game
            </button>
          )}
          
          {gameStarted && (
            <button
              onClick={handleNewGame}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 font-medium"
            >
              <RotateCcw size={20} />
              New Game
            </button>
          )}
          
          <button
            onClick={() => setShowLeaderboard(true)}
            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 flex items-center gap-2 font-medium"
          >
            <Award size={20} />
            Leaderboard
          </button>
          
          <button
            onClick={() => setShowCredits(true)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 font-medium"
          >
            <Info size={20} />
            Credits
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-all duration-200 flex items-center gap-2 font-medium"
            >
              <Download size={20} />
              Export Data
            </button>
            
            {showExportMenu && (
              <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-slate-200 py-2 min-w-48 z-10">
                <button
                  onClick={handleExportLeaderboard}
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                >
                  <Trophy size={16} />
                  Export Leaderboard
                </button>
                <button
                  onClick={handleExportPlayers}
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                >
                  <User size={16} />
                  Export Players
                </button>
                <button
                  onClick={handleExportAllData}
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                >
                  <Download size={16} />
                  Export All Data
                </button>
              </div>
            )}
          </div>
          
          <button
            onClick={onBackToRegistration}
            className="bg-gradient-to-r from-slate-600 to-slate-700 text-white px-6 py-3 rounded-lg hover:from-slate-700 hover:to-slate-800 transition-all duration-200 font-medium"
          >
            Change Player
          </button>
        </div>

        {/* Game Board */}
        {gameStarted && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-8">
            {cards.map(card => (
              <GameTile
                key={card.id}
                service={card.service}
                isFlipped={card.isFlipped}
                isMatched={card.isMatched}
                onClick={() => handleCardClick(card)}
                type={card.type}
                disabled={flippedCards.length >= 2 || gameOver || gameComplete}
              />
            ))}
          </div>
        )}

        {/* Instructions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Game Rules & Scoring</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">How to Play:</h4>
              <ul className="text-slate-600 space-y-1 text-sm">
                <li>• Click tiles to reveal Cloudera service names and descriptions</li>
                <li>• Match each service name with its description</li>
                <li>• Complete all matches within 1 minute</li>
                <li>• Each service has a unique color based on its category</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700 mb-2">Scoring System:</h4>
              <ul className="text-slate-600 space-y-1 text-sm">
                <li>• 50 points per matched pair</li>
                <li>• 200 bonus points for completing the game</li>
                <li>• Time bonus: up to 100 points for remaining time</li>
                <li>• Efficiency bonus: fewer tile reveals = higher score</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Leaderboard Modal */}
        {showLeaderboard && (
          <Leaderboard
            scores={getLeaderboardScores()}
            onClose={() => setShowLeaderboard(false)}
          />
        )}

        {/* Credits Modal */}
        {showCredits && (
          <Credits onClose={() => setShowCredits(false)} />
        )}

        {/* Click outside to close export menu */}
        {showExportMenu && (
          <div 
            className="fixed inset-0 z-5" 
            onClick={() => setShowExportMenu(false)}
          />
        )}
      </div>
    </div>
  );
};