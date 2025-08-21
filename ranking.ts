import { Rankings, RankEntry, Result } from './types';

const RANKING_KEY = 'typing-challenge-rankings';
const MAX_RANK_ENTRIES = 3;

export const loadRankings = (): Rankings => {
  try {
    const data = localStorage.getItem(RANKING_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error("Failed to load rankings:", error);
    return {};
  }
};

export const saveRankings = (rankings: Rankings) => {
  try {
    localStorage.setItem(RANKING_KEY, JSON.stringify(rankings));
  } catch (error) {
    console.error("Failed to save rankings:", error);
  }
};

export const updateRankings = (result: Omit<Result, 'rank'>, currentRankings: Rankings): { updatedRankings: Rankings, rank: number | undefined } => {
  const { level, time, accuracy } = result;

  const newEntry: RankEntry = {
    time,
    accuracy,
    date: new Date().toISOString(),
  };

  const levelRanking = currentRankings[level] ? [...currentRankings[level]] : [];
  
  levelRanking.push(newEntry);
  
  // Sort by time ascending. If times are equal, sort by accuracy descending.
  levelRanking.sort((a, b) => {
      if (a.time !== b.time) {
          return a.time - b.time;
      }
      return b.accuracy - a.accuracy;
  });

  const updatedLevelRanking = levelRanking.slice(0, MAX_RANK_ENTRIES);
  
  const newRankIndex = updatedLevelRanking.findIndex(entry => entry.date === newEntry.date);
  
  if (newRankIndex === -1) {
    // The new score did not make it into the top 3
    return { updatedRankings: currentRankings, rank: undefined };
  }
  
  const updatedRankings = {
    ...currentRankings,
    [level]: updatedLevelRanking,
  };

  return {
    updatedRankings,
    rank: newRankIndex + 1,
  };
};
