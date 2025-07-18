import { supabase } from '../lib/supabase';
import { Player, GameScore } from '../types/game';

// Player operations
export const savePlayer = async (player: Omit<Player, 'id' | 'timestamp'>): Promise<Player> => {
  try {
    // Check if player exists by name
    const { data: existingPlayer } = await supabase
      .from('players')
      .select('*')
      .eq('name', player.name)
      .single();

    if (existingPlayer) {
      // Update existing player
      const { data, error } = await supabase
        .from('players')
        .update({
          company: player.company
        })
        .eq('id', existingPlayer.id)
        .select()
        .single();

      if (error) throw error;

      return {
        id: data.id,
        name: data.name,
        company: data.company,
        timestamp: new Date(data.created_at).getTime()
      };
    } else {
      // Create new player
      const { data, error } = await supabase
        .from('players')
        .insert({
          name: player.name,
          company: player.company
        })
        .select()
        .single();

      if (error) throw error;

      return {
        id: data.id,
        name: data.name,
        company: data.company,
        timestamp: new Date(data.created_at).getTime()
      };
    }
  } catch (error) {
    console.error('Error saving player:', error);
    throw new Error('Failed to save player data');
  }
};

export const getPlayers = async (): Promise<Player[]> => {
  try {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(player => ({
      id: player.id,
      name: player.name,
      company: player.company,
      timestamp: new Date(player.created_at).getTime()
    }));
  } catch (error) {
    console.error('Error fetching players:', error);
    return [];
  }
};

export const getPlayerByName = async (name: string): Promise<Player | null> => {
  try {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('name', name)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        return null;
      }
      throw error;
    }

    return {
      id: data.id,
      name: data.name,
      company: data.company,
      timestamp: new Date(data.created_at).getTime()
    };
  } catch (error) {
    console.error('Error fetching player by name:', error);
    return null;
  }
};

// Game score operations
export const saveGameScore = async (gameScore: Omit<GameScore, 'id' | 'gameDate'>): Promise<void> => {
  try {
    const { error } = await supabase
      .from('game_scores')
      .insert({
        player_id: gameScore.player.id,
        player_name: gameScore.player.name,
        player_company: gameScore.player.company,
        score: gameScore.score,
        tiles_revealed: gameScore.tilesRevealed,
        matched_pairs: gameScore.matchedPairs,
        time_remaining: gameScore.timeRemaining,
        completed_game: gameScore.completedGame
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error saving game score:', error);
    throw new Error('Failed to save game score');
  }
};

export const getGameScores = async (): Promise<GameScore[]> => {
  try {
    const { data, error } = await supabase
      .from('game_scores')
      .select('*')
      .order('score', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(score => ({
      id: score.id,
      player: {
        id: score.player_id,
        name: score.player_name,
        company: score.player_company,
        timestamp: 0 // Not needed for display
      },
      score: score.score,
      tilesRevealed: score.tiles_revealed,
      matchedPairs: score.matched_pairs,
      timeRemaining: score.time_remaining,
      completedGame: score.completed_game,
      gameDate: score.created_at
    }));
  } catch (error) {
    console.error('Error fetching game scores:', error);
    return [];
  }
};

// Clear all data (for admin purposes)
export const clearAllData = async (): Promise<void> => {
  try {
    // Delete all game scores first (due to foreign key constraint)
    await supabase.from('game_scores').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    // Then delete all players
    await supabase.from('players').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  } catch (error) {
    console.error('Error clearing data:', error);
    throw new Error('Failed to clear data');
  }
};

// Get leaderboard with enhanced statistics
export const getLeaderboardStats = async () => {
  try {
    const { data, error } = await supabase
      .from('game_scores')
      .select(`
        *,
        players!inner(name, company, created_at)
      `)
      .order('score', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error fetching leaderboard stats:', error);
    return [];
  }
};