# Cloudera | Evolve25 New York | AI Bar Game 🧠

A beautiful, interactive memory game featuring Cloudera's comprehensive data platform services. Test your knowledge of big data technologies while having fun!

![Cloudera | Evolve25 New York | AI Bar Game](https://img.shields.io/badge/Game-Memory%20Challenge-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🎮 Live Demo

**Play the game:** [https://cdp-memory-game.netlify.app](https://cdp-memory-game.netlify.app)

> **Note:** The leaderboard is now globally accessible! Your scores will be visible to all players worldwide.
## 🎯 Game Overview

The Cloudera | Evolve25 New York | AI Bar Game is an engaging memory game where players match Cloudera service names with their descriptions. It's designed to help data professionals learn about Cloudera's ecosystem while having fun!

### 🎲 Game Features

- **🕐 Time Challenge**: Complete all matches within 90 seconds
- **🏆 Scoring System**: Comprehensive scoring based on performance
- **🌍 Global Leaderboard**: Compete with players worldwide
- **☁️ Cloud Database**: Persistent data storage with Supabase
- **📱 Responsive Design**: Works perfectly on all devices
- **🎨 Beautiful UI**: Modern, production-ready interface
- **💾 Local Storage**: Persistent player data and scores
- **📊 CSV Export**: Export leaderboard and player data to CSV files

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 18 or higher)
- **npm** or yarn package manager
- **Supabase Account** (for database functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cloudera-memory-challenge
   ```

2. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Create a `.env` file based on `.env.example`
   - Add your Supabase credentials

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up the database**
   The database tables will be created automatically when you first run the application.

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173` to play the game

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Database Setup

The application uses Supabase PostgreSQL database with the following tables:

#### **Players Table**
```sql
CREATE TABLE players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text NOT NULL,
  created_at timestamptz DEFAULT now()
);
```

#### **Game Scores Table**
```sql
CREATE TABLE game_scores (
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
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎮 How to Play

### Registration
1. Enter your **full name**
2. Provide your **company name**

### Gameplay
1. **Start the Game**: Click "Start Game" to begin the 60-second challenge
2. **Flip Tiles**: Click on tiles to reveal Cloudera service names and descriptions
3. **Make Matches**: Match each service name with its corresponding description
4. **Beat the Clock**: Complete all 8 matches within 90 seconds for maximum points
5. **Check Leaderboard**: See how you rank against other players

### Scoring System

| Component | Points | Description |
|-----------|--------|-------------|
| **Matched Pairs** | 50 each | Points for each successful match |
| **Completion Bonus** | 200 | Bonus for completing all matches |
| **Time Bonus** | 0-100 | Based on remaining time (more time = more points) |
| **Efficiency Bonus** | 0-100 | Fewer tile reveals = higher bonus |

### Score Ratings

- **400+ points**: Outstanding! 🌟
- **350-399**: Excellent! ⭐
- **300-349**: Great! 🎯
- **250-299**: Good! 👍
- **200-249**: Fair 👌
- **Below 200**: Keep Practicing! 💪

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - Modern React with hooks
- **TypeScript 5.5.3** - Type-safe development
- **Supabase** - Backend-as-a-Service for database and real-time features
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **Vite 5.4.2** - Fast build tool and dev server

### Development Tools
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### Database & Backend
- **Supabase** - PostgreSQL database with real-time subscriptions
- **Row Level Security** - Secure data access policies
- **Auto-generated APIs** - RESTful and real-time APIs
## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── GameBoard.tsx    # Main game interface
│   ├── GameTile.tsx     # Individual game tiles
│   ├── PlayerRegistration.tsx  # Player signup form
│   ├── Leaderboard.tsx  # Score rankings
│   └── Credits.tsx      # Game credits
├── lib/
│   └── supabase.ts      # Supabase client configuration
├── data/
│   └── clouderaServices.ts  # Cloudera services data
├── types/
│   └── game.ts          # TypeScript type definitions
├── utils/
│   ├── database.ts      # Database operations
│   ├── scoring.ts       # Score calculation logic
│   ├── storage.ts       # Local storage utilities (legacy)
│   └── csvExport.ts     # CSV export functionality
├── supabase/
│   └── migrations/      # Database migration files
├── App.tsx              # Main application component
├── main.tsx            # Application entry point
├── .env.example         # Environment variables template
└── index.css           # Global styles
```

## 🎨 Design Features

### Visual Design
- **Modern Gradient Backgrounds** - Beautiful color transitions
- **Card Flip Animations** - Smooth 3D flip effects
- **Responsive Layout** - Works on mobile, tablet, and desktop
- **Color-Coded Categories** - Each service category has unique colors
- **Micro-interactions** - Hover effects and smooth transitions

### User Experience
- **Progressive Disclosure** - Information revealed contextually
- **Clear Visual Hierarchy** - Easy to scan and understand
- **Accessibility** - Proper contrast ratios and readable fonts
- **Loading States** - Visual feedback during actions
- **Error Handling** - Clear validation messages
- **Data Export** - CSV export functionality for data analysis

## 🏗️ Architecture

### Component Architecture
- **Modular Design** - Each component has a single responsibility
- **Props Interface** - Clear TypeScript interfaces for all props
- **State Management** - Local state with React hooks
- **Event Handling** - Proper event delegation and handling

### Data Flow
1. **Player Registration** → Supabase Database
2. **Game State** → React State Management
3. **Score Calculation** → Utility Functions
4. **Leaderboard** → Supabase Database + Real-time Updates
5. **Data Export** → CSV Generation + Download

### Database Architecture
- **Global Accessibility** - Data stored in cloud database
- **Real-time Updates** - Leaderboard updates automatically
- **Scalable Storage** - No browser storage limitations
- **Data Persistence** - Survives browser clearing and device changes
- **Cross-device Sync** - Access your data from any device
## 📊 Data Export Features

The application includes comprehensive CSV export functionality:

### Export Options
- **Leaderboard Data** - Complete game scores with player details
- **Player Data** - Registration information and timestamps  
- **Complete Dataset** - Combined player stats and game analytics

### CSV Data Fields

**Leaderboard Export:**
- Rank, Player Name, Company, Score
- Matched Pairs, Tiles Revealed, Time Remaining
- Game Completion Status, Game Date, Registration Date

**Player Export:**
- Name, Company, Registration Date

**Complete Data Export:**
- Player analytics including total games, best/average scores
- Game completion statistics and activity tracking

## 🔧 Configuration

### Tailwind CSS
The project uses a custom Tailwind configuration with:
- Custom 3D transform utilities
- Responsive breakpoints
- Custom color schemes
- Animation utilities

### TypeScript
Strict TypeScript configuration with:
- ES2020 target
- Strict type checking
- No unused variables/parameters
- JSX support

## 🌟 Features in Detail

### Player Management
- **Singapore Mobile Validation** - Only accepts valid SG mobile numbers
- **Email Validation** - Proper email format checking
- **Player Persistence** - Remembers returning players
- **Data Normalization** - Consistent mobile number formatting

### Game Mechanics
- **Card Shuffling** - Random card placement each game
- **Match Detection** - Intelligent pairing logic
- **Timer Management** - Precise countdown with visual indicators
- **Game State Tracking** - Complete game state management

### Scoring Algorithm
```typescript
score = (matchedPairs × 50) + completionBonus + timeBonus + efficiencyBonus
```

### Leaderboard System
- **Multi-criteria Sorting** - Score, completion, time, date
- **Persistent Storage** - Scores saved locally
- **Rich Display** - Detailed score breakdown
- **Performance Ratings** - Qualitative score assessment

## 🎯 Cloudera Services Covered

The game features 8 core Cloudera services across different categories:

### Core Platform
- **Apache Hadoop** - Distributed storage and processing framework

### Analytics
- **Apache Spark** - Fast, general-purpose distributed computing
- **Apache Impala** - High-performance SQL engine

### Data Streaming
- **Apache Kafka** - Distributed event streaming platform

### Database
- **Apache HBase** - Distributed, scalable NoSQL database

### Data Warehouse
- **Apache Hive** - Data warehouse software for SQL-like queries

### ML/AI
- **Cloudera Machine Learning** - End-to-end ML platform

### Storage
- **Apache Kudu** - Fast analytics on fast data

## 🚀 Deployment

The application is deployed on Netlify with Supabase as the backend database.

### Deployment URL
**Production:** [https://cdp-memory-game.netlify.app](https://cdp-memory-game.netlify.app)

### Database
**Backend:** Supabase PostgreSQL with global accessibility
### Build Configuration
```json
{
  "build": {
    "command": "npm run build",
    "publish": "dist"
  }
}
```

## 👨‍💻 Developer

**Vikas Srivastava**  
Senior Solutions Architect  
Cloudera

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is created for educational and demonstration purposes.

## 🙏 Acknowledgments

- **Cloudera** - For the comprehensive data platform services
- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide** - For the beautiful icon set

---

**Made with ❤️ for the data community**

*© 2025 - Built with React, TypeScript & Tailwind CSS*