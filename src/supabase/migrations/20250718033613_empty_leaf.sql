/*
  # Create players table

  1. New Tables
    - `players`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `company` (text, not null)
      - `created_at` (timestamp with timezone, default now())

  2. Security
    - Enable RLS on `players` table
    - Add policy for anyone to read and insert player data
*/

CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read player data
CREATE POLICY "Anyone can read players"
  ON players
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow anyone to insert new players
CREATE POLICY "Anyone can insert players"
  ON players
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anyone to update players (for returning players)
CREATE POLICY "Anyone can update players"
  ON players
  FOR UPDATE
  TO anon, authenticated
  USING (true);