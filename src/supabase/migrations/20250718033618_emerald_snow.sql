/*
  # Create game_scores table

  1. New Tables
    - `game_scores`
      - `id` (uuid, primary key)
      - `player_id` (uuid, foreign key to players)
      - `player_name` (text, denormalized for easy querying)
      - `player_company` (text, denormalized for easy querying)
      - `score` (integer, not null)
      - `tiles_revealed` (integer, not null)
      - `matched_pairs` (integer, not null)
      - `time_remaining` (integer, not null)
      - `completed_game` (boolean, not null)
      - `created_at` (timestamp with timezone, default now())

  2. Security
    - Enable RLS on `game_scores` table
    - Add policies for reading and inserting game scores

  3. Indexes
    - Add index on score for leaderboard queries
    - Add index on created_at for recent games
*/

CREATE TABLE IF NOT EXISTS game_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid NOT NULL REFERENCES players(id),
  player_name text NOT NULL,
  player_company text NOT NULL,
  score integer NOT NULL DEFAULT 0,
  tiles_revealed integer NOT NULL DEFAULT 0,
  matched_pairs integer NOT NULL DEFAULT 0,
  time_remaining integer NOT NULL DEFAULT 0,
  completed_game boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE game_scores ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read game scores
CREATE POLICY "Anyone can read game_scores"
  ON game_scores
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow anyone to insert game scores
CREATE POLICY "Anyone can insert game_scores"
  ON game_scores
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_game_scores_score ON game_scores(score DESC);
CREATE INDEX IF NOT EXISTS idx_game_scores_created_at ON game_scores(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_game_scores_player_id ON game_scores(player_id);