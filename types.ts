export enum Hand {
  Left = 'left',
  Right = 'right',
}

export enum GameState {
  Menu = 'menu',
  Playing = 'playing',
  Finished = 'finished',
}

export enum Finger {
  Pinky = 'pinky',
  Ring = 'ring',
  Middle = 'middle',
  Index = 'index',
  Thumb = 'thumb',
}

export interface KeyData {
  hand: Hand;
  finger: Finger;
}

export interface Result {
    level: number;
    time: number;
    accuracy: number;
    total: number;
    correct: number;
    rank?: number;
}

export interface RankEntry {
  time: number;
  accuracy: number;
  date: string;
}

export interface Rankings {
  [level: number]: RankEntry[];
}
