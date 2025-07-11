# Cloudera Memory Challenge 🧠

A beautiful, interactive memory game featuring Cloudera's comprehensive data platform services. Test your knowledge of big data technologies while having fun!

![Cloudera Memory Challenge](https://img.shields.io/badge/Game-Memory%20Challenge-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🎮 Live Demo

**Play the game:** [https://cdp-memory-game.netlify.app](https://cdp-memory-game.netlify.app)

## 🎯 Game Overview

The Cloudera Memory Challenge is an engaging memory game where players match Cloudera service names with their descriptions. It's designed to help data professionals learn about Cloudera's ecosystem while having fun!

### 🎲 Game Features

- **🕐 Time Challenge**: Complete all matches within 60 seconds
- **🏆 Scoring System**: Comprehensive scoring based on performance
- **📊 Leaderboard**: Compete with other players
- **📱 Responsive Design**: Works perfectly on all devices
- **🎨 Beautiful UI**: Modern, production-ready interface
- **💾 Local Storage**: Persistent player data and scores

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cloudera-memory-challenge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to play the game

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
4. **Beat the Clock**: Complete all 8 matches within 60 seconds for maximum points
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
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **Vite 5.4.2** - Fast build tool and dev server

### Development Tools
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── GameBoard.tsx    # Main game interface
│   ├── GameTile.tsx     # Individual game tiles
│   ├── PlayerRegistration.tsx  # Player signup form
│   ├── Leaderboard.tsx  # Score rankings
│   └── Credits.tsx      # Game credits
├── data/
│   └── clouderaServices.ts  # Cloudera services data
├── types/
│   └── game.ts          # TypeScript type definitions
├── utils/
│   ├── scoring.ts       # Score calculation logic
│   └── storage.ts       # Local storage utilities
├── App.tsx              # Main application component
├── main.tsx            # Application entry point
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

## 🏗️ Architecture

### Component Architecture
- **Modular Design** - Each component has a single responsibility
- **Props Interface** - Clear TypeScript interfaces for all props
- **State Management** - Local state with React hooks
- **Event Handling** - Proper event delegation and handling

### Data Flow
1. **Player Registration** → Local Storage
2. **Game State** → React State Management
3. **Score Calculation** → Utility Functions
4. **Leaderboard** → Local Storage + Sorting

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

The application is deployed on Netlify with automatic builds from the main branch.

### Deployment URL
**Production:** [https://cdp-memory-game.netlify.app](https://cdp-memory-game.netlify.app)

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