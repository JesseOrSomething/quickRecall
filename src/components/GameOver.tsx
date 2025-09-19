import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTrivia } from "../lib/stores/useTrivia";
import { Trophy, Target, Calendar, RotateCcw } from "lucide-react";

export function GameOver() {
  const { score, highScore, currentStreak, todayPlayed, returnToMenu } = useTrivia();
  const isNewHighScore = score === highScore && score > 0;

  return (
    <Card className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-white mb-2">
          Game Over!
        </CardTitle>
        {isNewHighScore && (
          <div className="text-yellow-400 font-semibold text-lg animate-pulse">
            🎉 New High Score! 🎉
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Current Score */}
        <div className="text-center">
          <div className="text-5xl font-bold text-white mb-2">{score}</div>
          <div className="text-white/80">Questions Correct</div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-white/10 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="text-xl font-bold text-white">{highScore}</div>
            <div className="text-xs text-white/60">High Score</div>
          </div>
          
          <div className="text-center p-4 bg-white/10 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-xl font-bold text-white">{currentStreak}</div>
            <div className="text-xs text-white/60">Daily Streak</div>
          </div>
        </div>

        {/* Daily Status */}
        {todayPlayed && (
          <div className="text-center p-3 bg-green-500/20 text-green-300 rounded-lg">
            <div className="font-semibold">Daily Challenge Complete! ✓</div>
            <div className="text-sm">Come back tomorrow to continue your streak</div>
          </div>
        )}

        {/* Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={returnToMenu}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 text-lg"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Play Again
          </Button>
        </div>

        {/* Encouragement */}
        <div className="text-center text-white/80 text-sm">
          {score === 0 && "Don't give up! Every expert was once a beginner."}
          {score > 0 && score < 5 && "Nice start! Keep practicing to improve."}
          {score >= 5 && score < 10 && "Great job! You're getting the hang of it."}
          {score >= 10 && score < 15 && "Excellent work! You're quite knowledgeable."}
          {score >= 15 && "Outstanding! You're a trivia master!"}
        </div>
      </CardContent>
    </Card>
  );
}
