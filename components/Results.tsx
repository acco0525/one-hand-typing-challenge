import React from 'react';
import { Result } from '../types';
import { LEVELS } from '../constants';

interface ResultsProps {
  result: Result;
  onRetry: () => void;
  onNextLevel: () => void;
  onBackToMenu: () => void;
}

const Results: React.FC<ResultsProps> = ({ result, onRetry, onNextLevel, onBackToMenu }) => {
    const isLastLevel = result.level >= LEVELS.length;

    return (
        <div className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-yellow-50 to-amber-100 rounded-2xl shadow-lg">
            <h2 className="font-display text-4xl text-yellow-600 mb-2">
                {result.accuracy > 95 ? 'すごい！かんぺき！' : 'クリア！'}
            </h2>

            {result.rank && (
                <p className="font-display text-2xl text-amber-600 mt-2 mb-4 animate-bounce">
                    🎉 {result.rank}位にランクインしました！ 🎉
                </p>
            )}

            <p className="text-xl text-slate-600 mb-6">レベル {result.level} のけっか</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-md mb-8">
                <div className="bg-white p-4 rounded-xl shadow-md">
                    <p className="text-lg text-slate-500">かかった時間</p>
                    <p className="font-display text-4xl text-blue-500">{result.time.toFixed(2)}秒</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md">
                    <p className="text-lg text-slate-500">せいこうりつ</p>
                    <p className="font-display text-4xl text-green-500">{result.accuracy.toFixed(2)}%</p>
                </div>
                 <div className="bg-white p-4 rounded-xl shadow-md col-span-1 md:col-span-2">
                    <p className="text-lg text-slate-500">タイプ数</p>
                    <p className="font-display text-3xl text-purple-500">
                        {result.correct} / {result.total}
                    </p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <button 
                    onClick={onRetry} 
                    className="w-full font-display bg-blue-500 text-white text-2xl py-4 rounded-xl shadow-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-200"
                >
                    もういちど
                </button>
                {!isLastLevel && (
                     <button 
                        onClick={onNextLevel} 
                        className="w-full font-display bg-green-500 text-white text-2xl py-4 rounded-xl shadow-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-200"
                    >
                        つぎのレベルへ
                    </button>
                )}
                 <button 
                    onClick={onBackToMenu} 
                    className="w-full font-display bg-slate-400 text-white text-2xl py-4 rounded-xl shadow-lg hover:bg-slate-500 transform hover:scale-105 transition-all duration-200"
                >
                    メニューにもどる
                </button>
            </div>
             {isLastLevel && !result.rank && (
                <p className="font-display text-2xl text-yellow-700 mt-8">🎉 全レベルクリア！おめでとう！ 🎉</p>
            )}
        </div>
    );
};

export default Results;
