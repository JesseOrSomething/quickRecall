import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { questions, type Question } from "../questions";
import { 
  getGameData, 
  saveGameData, 
  getTodayString, 
  updateGameStatistics, 
  updateGameEndStatistics, 
  type GameStatistics 
} from "../storage";

export type GamePhase = "menu" | "playing" | "gameOver" | "statistics";
export type Difficulty = "Easy" | "Medium" | "Hard";

interface GameSettings {
  difficulty: Difficulty | "All";
  category: string | "All";
}

interface TriviaState {
  // Game state
  gamePhase: GamePhase;
  currentQuestion: Question | null;
  score: number;
  highScore: number;
  currentStreak: number;
  todayPlayed: boolean;
  usedQuestions: Set<number>;
  gameSettings: GameSettings;
  statistics: GameStatistics;
  questionStartTime: number;

  // Actions
  startGame: () => void;
  endGame: () => void;
  returnToMenu: () => void;
  viewStatistics: () => void;
  getNextQuestion: () => void;
  answerQuestion: (answer: string) => boolean;
  initializeDaily: () => void;
  updateGameSettings: (settings: Partial<GameSettings>) => void;
  getAvailableCategories: () => string[];
}

export const useTrivia = create<TriviaState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    gamePhase: "menu",
    currentQuestion: null,
    score: 0,
    highScore: 0,
    currentStreak: 0,
    todayPlayed: false,
    usedQuestions: new Set(),
    gameSettings: {
      difficulty: "All",
      category: "All"
    },
    statistics: {
      totalGames: 0,
      totalQuestions: 0,
      correctAnswers: 0,
      categoriesPlayed: {},
      difficultiesPlayed: {},
      averageTimePerQuestion: 0,
      bestStreak: 0,
      gamesThisWeek: 0,
      lastWeekReset: "",
    },
    questionStartTime: 0,

    startGame: () => {
      set(() => ({
        gamePhase: "playing",
        score: 0,
        usedQuestions: new Set(),
        questionStartTime: Date.now(), // Initialize timing for first question
      }));
      get().getNextQuestion();
    },

    endGame: () => {
      const { score, highScore, currentStreak } = get();
      const today = getTodayString();
      const gameData = getGameData();

      // Update high score
      const newHighScore = Math.max(score, highScore);
      
      // Update daily streak
      let newStreak = currentStreak;
      if (!gameData.todayPlayed) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toISOString().split('T')[0];
        
        if (gameData.lastPlayedDate === yesterdayString) {
          newStreak = currentStreak + 1;
        } else if (gameData.lastPlayedDate !== today) {
          newStreak = 1; // Reset streak if missed days
        }
      }

      // Update game end statistics
      updateGameEndStatistics(score);
      const updatedData = getGameData();

      // Save updated data
      saveGameData({
        highScore: newHighScore,
        currentStreak: newStreak,
        lastPlayedDate: today,
        todayPlayed: true,
      });

      set(() => ({
        gamePhase: "gameOver",
        highScore: newHighScore,
        currentStreak: newStreak,
        todayPlayed: true,
        statistics: updatedData.statistics,
      }));
    },

    returnToMenu: () => {
      set(() => ({
        gamePhase: "menu",
        currentQuestion: null,
      }));
    },

    viewStatistics: () => {
      // Refresh statistics from storage to ensure latest data
      const gameData = getGameData();
      set(() => ({
        gamePhase: "statistics",
        statistics: gameData.statistics,
      }));
    },

    getNextQuestion: () => {
      const { usedQuestions, gameSettings } = get();
      
      // Filter questions based on game settings
      let filteredQuestions = questions;
      
      if (gameSettings.difficulty !== "All") {
        filteredQuestions = filteredQuestions.filter(q => q.difficulty === gameSettings.difficulty);
      }
      
      if (gameSettings.category !== "All") {
        filteredQuestions = filteredQuestions.filter(q => q.category === gameSettings.category);
      }
      
      // Get available questions from filtered set
      const availableQuestions = filteredQuestions.filter((question) => {
        const originalIndex = questions.indexOf(question);
        return !usedQuestions.has(originalIndex);
      });
      
      if (availableQuestions.length === 0) {
        // If all filtered questions used, reset and pick from filtered questions
        if (filteredQuestions.length === 0) {
          // If no questions match the filter, fall back to all questions
          const randomIndex = Math.floor(Math.random() * questions.length);
          set((state) => ({
            currentQuestion: questions[randomIndex],
            usedQuestions: new Set([randomIndex]),
            questionStartTime: Date.now(),
          }));
        } else {
          const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
          const selectedQuestion = filteredQuestions[randomIndex];
          const originalIndex = questions.indexOf(selectedQuestion);
          set((state) => ({
            currentQuestion: selectedQuestion,
            usedQuestions: new Set([originalIndex]),
            questionStartTime: Date.now(),
          }));
        }
      } else {
        // Pick a random available question from filtered set
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        const selectedQuestion = availableQuestions[randomIndex];
        const originalIndex = questions.indexOf(selectedQuestion);
        
        set((state) => ({
          currentQuestion: selectedQuestion,
          usedQuestions: new Set([...Array.from(state.usedQuestions), originalIndex]),
          questionStartTime: Date.now(),
        }));
      }
    },

    answerQuestion: (answer: string) => {
      const { currentQuestion, score, questionStartTime } = get();
      if (!currentQuestion) return false;

      const userAnswer = answer.toLowerCase().trim();
      const correctAnswers = Array.isArray(currentQuestion.answer) 
        ? currentQuestion.answer.map(a => a.toLowerCase().trim())
        : [currentQuestion.answer.toLowerCase().trim()];

      const isCorrect = correctAnswers.some(correctAnswer => {
        // Exact match
        if (userAnswer === correctAnswer) return true;
        
        // Partial match for longer answers (at least 3 characters)
        if (correctAnswer.length >= 3 && correctAnswer.includes(userAnswer)) return true;
        if (userAnswer.length >= 3 && userAnswer.includes(correctAnswer)) return true;
        
        return false;
      });

      // Track statistics
      const timeSpent = (Date.now() - questionStartTime) / 1000; // Convert to seconds
      updateGameStatistics(
        currentQuestion.category,
        currentQuestion.difficulty,
        isCorrect,
        timeSpent
      );

      // Update local statistics to keep UI in sync
      const updatedGameData = getGameData();
      
      if (isCorrect) {
        set(() => ({ 
          score: score + 1,
          statistics: updatedGameData.statistics,
        }));
        return true;
      }

      set(() => ({ 
        statistics: updatedGameData.statistics,
      }));
      return false;
    },

    initializeDaily: () => {
      const gameData = getGameData();
      const today = getTodayString();
      
      set(() => ({
        highScore: gameData.highScore,
        currentStreak: gameData.currentStreak,
        todayPlayed: gameData.lastPlayedDate === today,
        statistics: gameData.statistics,
      }));
    },

    updateGameSettings: (settings: Partial<GameSettings>) => {
      set((state) => ({
        gameSettings: { ...state.gameSettings, ...settings },
      }));
    },

    getAvailableCategories: () => {
      const categories = Array.from(new Set(questions.map(q => q.category)));
      return categories.sort();
    },
  }))
);
