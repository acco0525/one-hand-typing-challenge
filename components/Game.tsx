import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Hand, Finger, Result } from '../types';
import { LEVELS, ONE_HANDED_FINGER_MAP, ROMAJI_MAPPINGS, KANA_KEYS } from '../constants';
import Keyboard from './Keyboard';
import HandVisual from './HandVisual';

interface GameProps {
  hand: Hand;
  level: number;
  onGameFinish: (result: Omit<Result, 'rank'>) => void;
  onBackToMenu: () => void;
}

const Game: React.FC<GameProps> = ({ hand, level, onGameFinish, onBackToMenu }) => {
  const words = useMemo(() => LEVELS[level - 1], [level]);
  const totalKanaInLevel = useMemo(() => words.join('').length, [words]);
  
  const [wordIndex, setWordIndex] = useState(0);
  const [typedKana, setTypedKana] = useState('');
  const [romajiBuffer, setRomajiBuffer] = useState('');
  const [mistakes, setMistakes] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [targetRomaji, setTargetRomaji] = useState('');
  
  const startTime = useRef<number | null>(null);

  const currentWord = words[wordIndex] || '';
  const remainingKana = currentWord.substring(typedKana.length);

  useEffect(() => {
    if (startTime.current === null) {
      startTime.current = Date.now();
    }
  }, []);

  useEffect(() => {
    // Handle simple alphabet levels
    if (level <= 2) {
      setTargetRomaji(currentWord);
      return;
    }

    // Handle kana levels
    if (!remainingKana) {
      setTargetRomaji('');
      return;
    }

    if (remainingKana.startsWith('っ') || remainingKana.startsWith('ッ')) {
      const nextKanaStr = remainingKana.substring(1);
      const nextKana = KANA_KEYS.find(k => nextKanaStr.startsWith(k));
      if (nextKana) {
        const romaji = ROMAJI_MAPPINGS[nextKana]?.[0];
        if (romaji && !['a', 'i', 'u', 'e', 'o', 'n'].includes(romaji[0])) {
          setTargetRomaji(romaji[0]);
          return;
        }
      }
      setTargetRomaji('');
      return;
    }
    
    const nextKana = KANA_KEYS.find(k => remainingKana.startsWith(k));
    if (nextKana) {
      setTargetRomaji(ROMAJI_MAPPINGS[nextKana][0]);
    } else {
      setTargetRomaji('');
    }
  }, [remainingKana, currentWord, level]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (wordIndex >= words.length) return;

    if (event.key === ' ' || event.key === '/') {
      event.preventDefault();
    }
    
    if (event.key.length > 1) return;
    const key = event.key.toLowerCase();
    
    const finishLevel = () => {
      const endTime = Date.now();
      const timeTaken = (endTime - (startTime.current ?? endTime)) / 1000;
      const totalTyped = totalKanaInLevel + mistakes;
      const accuracy = totalTyped > 0 ? (totalKanaInLevel / totalTyped) * 100 : 100;
      onGameFinish({
        level,
        time: timeTaken,
        accuracy: accuracy,
        total: totalTyped,
        correct: totalKanaInLevel
      });
    };

    // Handle simple alphabet levels (Level 1 & 2)
    if (level <= 2) {
        if (key === currentWord) {
            setFeedback('correct');
            if (wordIndex + 1 >= words.length) {
                finishLevel();
            } else {
                setWordIndex(i => i + 1);
            }
            setTimeout(() => setFeedback(null), 200);
        } else {
            setMistakes(prev => prev + 1);
            setFeedback('incorrect');
            setTimeout(() => setFeedback(null), 200);
        }
        return; // Stop processing for simple levels
    }
    
    // --- Kana logic from here ---
    const newRomajiBuffer = romajiBuffer + key;
    
    // --- Special case: っ ---
    if (remainingKana.startsWith('っ') || remainingKana.startsWith('ッ')) {
      const nextKanaStr = remainingKana.substring(1);
      const nextKana = KANA_KEYS.find(k => nextKanaStr.startsWith(k));
      if (nextKana) {
        const nextRomaji = ROMAJI_MAPPINGS[nextKana][0];
        if (nextRomaji && key === nextRomaji[0] && !['a', 'i', 'u', 'e', 'o', 'n'].includes(key)) {
          const newTyped = typedKana + remainingKana[0];
          setTypedKana(newTyped);
          setFeedback('correct');
          if (newTyped === currentWord) {
            if (wordIndex + 1 >= words.length) {
              finishLevel();
            } else {
              setWordIndex(i => i + 1);
              setTypedKana('');
            }
          }
          setTimeout(() => setFeedback(null), 200);
          return;
        }
      }
    }
    
    // --- Special case: end-of-word ん ---
    if(remainingKana === 'ん' && key === 'n') {
        setTypedKana(currentWord);
        setRomajiBuffer('');
        if (wordIndex + 1 >= words.length) {
          finishLevel();
        } else {
          setWordIndex(i => i + 1);
          setTypedKana('');
        }
        return;
    }

    // --- General case ---
    for (const kana of KANA_KEYS) {
      if (remainingKana.startsWith(kana)) {
        if (ROMAJI_MAPPINGS[kana]?.includes(newRomajiBuffer)) {
          // Exact match
          const newTyped = typedKana + kana;
          setTypedKana(newTyped);
          setRomajiBuffer('');
          setFeedback('correct');

          if (newTyped === currentWord) {
            if (wordIndex + 1 >= words.length) {
              finishLevel();
            } else {
              setWordIndex(i => i + 1);
              setTypedKana('');
            }
          }
          setTimeout(() => setFeedback(null), 200);
          return;
        }
      }
    }

    // --- Partial match check ---
    for (const kana of KANA_KEYS) {
      if (remainingKana.startsWith(kana)) {
        if (ROMAJI_MAPPINGS[kana]?.some(r => r.startsWith(newRomajiBuffer))) {
          setRomajiBuffer(newRomajiBuffer);
          return;
        }
      }
    }

    // --- Incorrect ---
    setMistakes(prev => prev + 1);
    setFeedback('incorrect');
    setRomajiBuffer('');
    setTimeout(() => setFeedback(null), 200);
  }, [
    romajiBuffer, currentWord, typedKana, wordIndex, words,
    remainingKana, onGameFinish, level, mistakes, totalKanaInLevel
  ]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const progress = wordIndex / words.length * 100 + (typedKana.length / currentWord.length) * (100 / words.length);

  const activeKey = targetRomaji ? targetRomaji[romajiBuffer.length] : null;

  const getActiveKeyData = () => {
    if (!activeKey) return null;
    if (activeKey === ' ') return { hand, finger: Finger.Thumb };
    const finger = ONE_HANDED_FINGER_MAP[hand][activeKey];
    return finger ? { hand, finger } : null;
  };
  const keyData = getActiveKeyData();

  let feedbackColor = 'bg-slate-200';
  if (feedback === 'correct') feedbackColor = 'bg-green-300 scale-110';
  if (feedback === 'incorrect') feedbackColor = 'bg-red-300 scale-90';

  return (
    <div className="flex flex-col items-center w-full">
        <div className="w-full flex justify-between items-center mb-4">
            <h2 className="font-display text-2xl text-slate-700">レベル {level}</h2>
            <button onClick={onBackToMenu} className="bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold py-2 px-4 rounded-lg transition-colors">
                メニューにもどる
            </button>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-4 mb-6 shadow-inner">
            <div className="bg-green-500 h-4 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>

        <div className={`w-full p-4 mb-6 text-center rounded-lg transition-all duration-200 ${feedbackColor}`}>
            <p className="font-display text-5xl md:text-6xl text-slate-800 break-all tracking-wider" style={{ minHeight: '80px'}}>
                <span className="text-green-600">{typedKana}</span>
                <span>{remainingKana}</span>
            </p>
            <p className="text-3xl text-slate-600 font-mono h-12" aria-live="polite">
                <span className="text-blue-600 font-bold">{romajiBuffer}</span>
                <span className="opacity-60">{targetRomaji.substring(romajiBuffer.length)}</span>
            </p>
        </div>

        <div className="flex flex-col items-center w-full gap-8 mt-4">
            <div className="w-full md:w-auto">
                <HandVisual hand={hand} activeFinger={keyData?.finger ?? null} />
            </div>
            <div className="w-full">
                <Keyboard hand={hand} activeKey={activeKey} />
            </div>
        </div>
    </div>
  );
};

export default Game;