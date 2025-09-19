export interface GameStatistics {
  totalGames: number;
  totalQuestions: number;
  correctAnswers: number;
  categoriesPlayed: { [category: string]: { correct: number; total: number } };
  difficultiesPlayed: { [difficulty: string]: { correct: number; total: number } };
  averageTimePerQuestion: number;
  bestStreak: number;
  gamesThisWeek: number;
  lastWeekReset: string;
}

export interface GameData {
  highScore: number;
  currentStreak: number;
  lastPlayedDate: string;
  todayPlayed: boolean;
  statistics: GameStatistics;
}

const STORAGE_KEY = "trivia_game_data";

function getDefaultStatistics(): GameStatistics {
  const today = getTodayString();
  return {
    totalGames: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    categoriesPlayed: {},
    difficultiesPlayed: {},
    averageTimePerQuestion: 0,
    bestStreak: 0,
    gamesThisWeek: 0,
    lastWeekReset: today,
  };
}

export function getGameData(): GameData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      const statistics = data.statistics || getDefaultStatistics();
      
      // Check if we need to reset weekly counter
      const currentWeek = getWeekString();
      if (statistics.lastWeekReset !== currentWeek) {
        statistics.gamesThisWeek = 0;
        statistics.lastWeekReset = currentWeek;
        // Save the updated statistics back to storage
        const updatedData = { ...data, statistics };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
      }
      
      return {
        highScore: data.highScore || 0,
        currentStreak: data.currentStreak || 0,
        lastPlayedDate: data.lastPlayedDate || "",
        todayPlayed: data.lastPlayedDate === getTodayString(),
        statistics,
      };
    }
  } catch (error) {
    console.error("Error reading game data from localStorage:", error);
  }

  return {
    highScore: 0,
    currentStreak: 0,
    lastPlayedDate: "",
    todayPlayed: false,
    statistics: getDefaultStatistics(),
  };
}

export function saveGameData(data: Partial<GameData>): void {
  try {
    const currentData = getGameData();
    const updatedData = { ...currentData, ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  } catch (error) {
    console.error("Error saving game data to localStorage:", error);
  }
}

export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

export function getWeekString(): string {
  const date = new Date();
  const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));
  return startOfWeek.toISOString().split('T')[0];
}

export function updateGameStatistics(
  category: string,
  difficulty: string,
  isCorrect: boolean,
  timeSpent: number
): void {
  const data = getGameData();
  const stats = data.statistics;

  // Update totals
  stats.totalQuestions++;
  if (isCorrect) stats.correctAnswers++;

  // Update category stats
  if (!stats.categoriesPlayed[category]) {
    stats.categoriesPlayed[category] = { correct: 0, total: 0 };
  }
  stats.categoriesPlayed[category].total++;
  if (isCorrect) stats.categoriesPlayed[category].correct++;

  // Update difficulty stats
  if (!stats.difficultiesPlayed[difficulty]) {
    stats.difficultiesPlayed[difficulty] = { correct: 0, total: 0 };
  }
  stats.difficultiesPlayed[difficulty].total++;
  if (isCorrect) stats.difficultiesPlayed[difficulty].correct++;

  // Update average time per question
  const currentAvg = stats.averageTimePerQuestion;
  const currentCount = stats.totalQuestions - 1; // Subtract 1 because we already incremented
  stats.averageTimePerQuestion = 
    currentCount === 0 ? timeSpent : (currentAvg * currentCount + timeSpent) / stats.totalQuestions;

  // Check if we need to reset weekly counter
  const currentWeek = getWeekString();
  if (stats.lastWeekReset !== currentWeek) {
    stats.gamesThisWeek = 0;
    stats.lastWeekReset = currentWeek;
  }

  saveGameData({ statistics: stats });
}

export function updateGameEndStatistics(finalScore: number): void {
  const data = getGameData();
  const stats = data.statistics;
  
  // Update games played
  stats.totalGames++;
  stats.gamesThisWeek++;
  
  // Update best streak
  if (finalScore > stats.bestStreak) {
    stats.bestStreak = finalScore;
  }

  saveGameData({ statistics: stats });
}

export function clearGameData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing game data from localStorage:", error);
  }
}
