import React, { useState, useCallback, useEffect } from 'react';
import { Hand, GameState, Result, Rankings } from './types';
import Menu from './components/Menu';
import Game from './components/Game';
import Results from './components/Results';
import { loadRankings, saveRankings, updateRankings } from './ranking';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Menu);
  const [hand, setHand] = useState<Hand>(Hand.Right);
  const [level, setLevel] = useState<number>(1);
  const [result, setResult] = useState<Result | null>(null);
  const [rankings, setRankings] = useState<Rankings>(loadRankings());

  useEffect(() => {
    saveRankings(rankings);
  }, [rankings]);


  const handleStartGame = useCallback((
    selectedHand: Hand,
    selectedLevel: number
  ) => {
    setHand(selectedHand);
    setLevel(selectedLevel);
    setGameState(GameState.Playing);
  }, []);

  const handleGameFinish = useCallback((gameResult: Omit<Result, 'rank'>) => {
    const { updatedRankings, rank } = updateRankings(gameResult, rankings);
    setRankings(updatedRankings);

    const resultWithRank = { ...gameResult, rank };
    setResult(resultWithRank);
    setGameState(GameState.Finished);
  }, [rankings]);

  const handleRetry = useCallback(() => {
    setGameState(GameState.Playing);
  }, []);

  const handleNextLevel = useCallback(() => {
    setLevel(prevLevel => prevLevel + 1);
    setGameState(GameState.Playing);
  }, []);
  
  const handleBackToMenu = useCallback(() => {
    setGameState(GameState.Menu);
    setResult(null);
  }, []);


  const renderContent = () => {
    switch (gameState) {
      case GameState.Playing:
        return (
          <Game
            hand={hand}
            level={level}
            onGameFinish={handleGameFinish}
            onBackToMenu={handleBackToMenu}
          />
        );
      case GameState.Finished:
        return result && (
          <Results
            result={result}
            onRetry={handleRetry}
            onNextLevel={handleNextLevel}
            onBackToMenu={handleBackToMenu}
          />
        );
      case GameState.Menu:
      default:
        return <Menu onStartGame={handleStartGame} rankings={rankings} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-100 to-green-100">
        <header className="text-center mb-8">
            <h1 className="font-display text-4xl md:text-6xl text-blue-600 drop-shadow-md">
                片手タイピングチャレンジ
            </h1>
            <p className="text-slate-600 mt-2 text-lg">タイピングヒーローをめざそう！</p>
        </header>
        <main className="w-full max-w-6xl mx-auto bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-4 md:p-8">
            {renderContent()}
        </main>
        <footer className="text-center mt-8 text-slate-500">
            <p>&copy; 2024 Typing Challenge for Kids</p>
        </footer>
    </div>
  );
};

export default App;
