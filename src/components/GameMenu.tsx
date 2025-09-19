import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTrivia } from "../lib/stores/useTrivia";
import { useAudio } from "../lib/stores/useAudio";
import { Trophy, Zap, Calendar, Settings, BarChart } from "lucide-react";

export function GameMenu() {
  const { 
    startGame, 
    highScore, 
    currentStreak, 
    todayPlayed, 
    gameSettings,
    updateGameSettings,
    getAvailableCategories,
    viewStatistics 
  } = useTrivia();

  const { playClick, playHover } = useAudio();

  const categories = getAvailableCategories();
  const difficulties = ["Easy", "Medium", "Hard"];

  return (
    <Card className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-white mb-2">
          ⚡ 20 Seconds or Less
        </CardTitle>
        <p className="text-white/80 text-sm">
          Answer trivia questions as fast as you can!
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Trophy className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="text-xl font-bold text-white">{highScore}</div>
            <div className="text-xs text-white/60">High Score</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Zap className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-xl font-bold text-white">{currentStreak}</div>
            <div className="text-xs text-white/60">Daily Streak</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Calendar className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-xl font-bold text-white">
              {todayPlayed ? "✓" : "○"}
            </div>
            <div className="text-xs text-white/60">Today</div>
          </div>
        </div>

        {/* Game Mode Selection */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white font-semibold">
            <Settings className="w-4 h-4" />
            <span>Game Mode</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {/* Difficulty Selection */}
            <div>
              <label className="text-white/80 text-sm mb-2 block">Difficulty</label>
              <Select
                value={gameSettings.difficulty}
                onValueChange={(value) => updateGameSettings({ difficulty: value as any })}
              >
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="All">All Levels</SelectItem>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category Selection */}
            <div>
              <label className="text-white/80 text-sm mb-2 block">Category</label>
              <Select
                value={gameSettings.category}
                onValueChange={(value) => updateGameSettings({ category: value })}
              >
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700 max-h-48">
                  <SelectItem value="All">All Topics</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Current Selection Display */}
          <div className="text-center">
            <div className="text-white/60 text-sm">
              Playing: {gameSettings.difficulty} • {gameSettings.category}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={() => {
              playClick();
              startGame();
            }}
            onMouseEnter={() => playHover()}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 text-lg transition-all duration-200 transform hover:scale-105"
          >
            Start Game
          </Button>
          
          <Button 
            onClick={() => {
              playClick();
              viewStatistics();
            }}
            onMouseEnter={() => playHover()}
            variant="outline"
            className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20 font-semibold py-3 transition-all duration-200"
          >
            <BarChart className="w-5 h-5 mr-2" />
            View Statistics
          </Button>
        </div>

        {/* Instructions */}
        <div className="text-center space-y-2">
          <h3 className="text-white font-semibold">How to Play:</h3>
          <ul className="text-white/80 text-sm space-y-1">
            <li>• Answer open-ended trivia questions</li>
            <li>• You have 20 seconds per question</li>
            <li>• Keep going until time runs out</li>
            <li>• Beat your high score!</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
