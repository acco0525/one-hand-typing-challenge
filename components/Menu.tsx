import React, { useState } from 'react';
import { Hand, Rankings } from '../types';
import { LEVELS } from '../constants';

interface MenuProps {
  onStartGame: (hand: Hand, level: number) => void;
  rankings: Rankings;
}

const Menu: React.FC<MenuProps> = ({ onStartGame, rankings }) => {
  const [hand, setHand] = useState<Hand>(Hand.Right);
  const [level, setLevel] = useState<number>(1);

  const selectedLevelRanking = rankings[level] || [];

  const handButtonClasses = (h: Hand) => 
    `w-full py-4 px-6 rounded-lg text-xl font-bold transition-all duration-200 shadow-md transform hover:scale-105 ${
      hand === h
        ? 'bg-blue-500 text-white ring-4 ring-blue-300'
        : 'bg-white text-blue-500 hover:bg-blue-100'
    }`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartGame(hand, level);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="w-full max-w-lg">
        <h2 className="font-display text-3xl text-slate-700 mb-8">ゲームのせってい</h2>
        <form onSubmit={handleSubmit} className="w-full space-y-8">
          <div>
            <h3 className="text-xl font-bold text-slate-600 mb-4">1. どっちの手でやる？</h3>
            <div className="grid grid-cols-2 gap-4">
              <button type="button" onClick={() => setHand(Hand.Left)} className={handButtonClasses(Hand.Left)}>
                ひだり手
              </button>
              <button type="button" onClick={() => setHand(Hand.Right)} className={handButtonClasses(Hand.Right)}>
                みぎ手
              </button>
            </div>
          </div>

          <div>
              <h3 className="text-xl font-bold text-slate-600 mb-4">2. レベルをえらぼう！</h3>
              <select
                  value={level}
                  onChange={(e) => setLevel(Number(e.target.value))}
                  className="w-full p-4 rounded-lg text-xl font-bold bg-white shadow-md border-2 border-slate-300 focus:ring-4 focus:ring-yellow-300 focus:border-yellow-500 transition"
              >
                  {LEVELS.map((_, index) => (
                  <option key={index} value={index + 1}>
                      レベル {index + 1}
                  </option>
                  ))}
              </select>
          </div>

          <button type="submit" className="w-full font-display bg-yellow-400 text-yellow-900 text-3xl py-4 rounded-xl shadow-lg hover:bg-yellow-500 transform hover:scale-105 transition-all duration-200">
            スタート！
          </button>
        </form>
      </div>

      <div className="mt-12 w-full max-w-lg">
        <h3 className="font-display text-2xl text-slate-700 mb-4">👑 レベル {level} のランキング 👑</h3>
        {selectedLevelRanking.length > 0 ? (
          <ol className="space-y-3">
            {selectedLevelRanking.map((entry, index) => (
              <li key={index} className="flex items-center justify-between p-3 bg-white/80 rounded-lg shadow-sm">
                <span className={`font-bold text-xl w-1/4 text-left ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-slate-400' : 'text-orange-400'}`}>
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'} {index + 1}位
                </span>
                <div className="text-right">
                  <p className="font-bold text-lg text-slate-800">{entry.time.toFixed(2)}秒</p>
                  <p className="text-sm text-slate-500">せいこうりつ: {entry.accuracy.toFixed(1)}%</p>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <div className="text-slate-500 bg-white/50 p-4 rounded-lg">
            <p>まだ記録がありません。</p>
            <p>一番のりを目指そう！</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
