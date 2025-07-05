import React, { useState } from 'react';
import { GameBoard } from './components/GameBoard';
import { PlayerRegistration } from './components/PlayerRegistration';
import { Player } from './types/game';

function App() {
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  const handlePlayerReady = (player: Player) => {
    setCurrentPlayer(player);
  };

  const handleBackToRegistration = () => {
    setCurrentPlayer(null);
  };

  return (
    <div className="min-h-screen">
      {currentPlayer ? (
        <GameBoard 
          player={currentPlayer} 
          onBackToRegistration={handleBackToRegistration}
        />
      ) : (
        <PlayerRegistration onPlayerReady={handlePlayerReady} />
      )}
    </div>
  );
}

export default App;