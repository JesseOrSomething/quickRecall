import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useTrivia } from "../lib/stores/useTrivia";
import { useAudio } from "../lib/stores/useAudio";
import { 
  BarChart, 
  TrendingUp, 
  Trophy, 
  Clock, 
  Target, 
  Calendar,
  ArrowLeft
} from "lucide-react";

export function Statistics() {
  const { statistics, returnToMenu } = useTrivia();
  const { playClick, playHover } = useAudio();

  const accuracyRate = statistics.totalQuestions > 0 
    ? (statistics.correctAnswers / statistics.totalQuestions) * 100 
    : 0;

  const getCategoryStats = () => {
    return Object.entries(statistics.categoriesPlayed)
      .map(([category, stats]) => ({
        category,
        accuracy: stats.total > 0 ? (stats.correct / stats.total) * 100 : 0,
        total: stats.total,
        correct: stats.correct
      }))
      .sort((a, b) => b.total - a.total);
  };

  const getDifficultyStats = () => {
    return Object.entries(statistics.difficultiesPlayed)
      .map(([difficulty, stats]) => ({
        difficulty,
        accuracy: stats.total > 0 ? (stats.correct / stats.total) * 100 : 0,
        total: stats.total,
        correct: stats.correct
      }))
      .sort((a, b) => ["Easy", "Medium", "Hard"].indexOf(a.difficulty) - ["Easy", "Medium", "Hard"].indexOf(b.difficulty));
  };

  const categoryStats = getCategoryStats();
  const difficultyStats = getDifficultyStats();

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">📊 Game Statistics</h1>
          <p className="text-white/70">Your trivia performance breakdown</p>
        </div>
        <Button 
          onClick={() => {
            playClick();
            returnToMenu();
          }}
          onMouseEnter={() => playHover()}
          className="bg-white/20 hover:bg-white/30 text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Menu
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{statistics.totalGames}</div>
            <div className="text-white/60 text-sm">Games Played</div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{accuracyRate.toFixed(1)}%</div>
            <div className="text-white/60 text-sm">Accuracy Rate</div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">
              {statistics.averageTimePerQuestion.toFixed(1)}s
            </div>
            <div className="text-white/60 text-sm">Avg. Time</div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{statistics.bestStreak}</div>
            <div className="text-white/60 text-sm">Best Score</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Performance */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart className="w-5 h-5" />
              Category Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {categoryStats.length > 0 ? categoryStats.map((category) => (
              <div key={category.category} className="space-y-2">
                <div className="flex justify-between text-white">
                  <span className="text-sm font-medium">{category.category}</span>
                  <span className="text-sm">
                    {category.correct}/{category.total} ({category.accuracy.toFixed(1)}%)
                  </span>
                </div>
                <Progress 
                  value={category.accuracy} 
                  className="h-2 bg-white/20" 
                />
              </div>
            )) : (
              <div className="text-white/60 text-center py-4">
                No category data yet. Play some games to see your performance!
              </div>
            )}
          </CardContent>
        </Card>

        {/* Difficulty Performance */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Difficulty Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {difficultyStats.length > 0 ? difficultyStats.map((difficulty) => (
              <div key={difficulty.difficulty} className="space-y-2">
                <div className="flex justify-between text-white">
                  <span className="text-sm font-medium flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      difficulty.difficulty === 'Easy' ? 'bg-green-400' :
                      difficulty.difficulty === 'Medium' ? 'bg-yellow-400' :
                      'bg-red-400'
                    }`}></span>
                    {difficulty.difficulty}
                  </span>
                  <span className="text-sm">
                    {difficulty.correct}/{difficulty.total} ({difficulty.accuracy.toFixed(1)}%)
                  </span>
                </div>
                <Progress 
                  value={difficulty.accuracy} 
                  className="h-2 bg-white/20"
                />
              </div>
            )) : (
              <div className="text-white/60 text-center py-4">
                No difficulty data yet. Play some games to see your performance!
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Weekly Activity */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            This Week's Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white">{statistics.gamesThisWeek}</div>
              <div className="text-white/60 text-sm">Games This Week</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{statistics.totalQuestions}</div>
              <div className="text-white/60 text-sm">Total Questions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{statistics.correctAnswers}</div>
              <div className="text-white/60 text-sm">Correct Answers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {statistics.totalQuestions > 0 ? 
                  ((statistics.correctAnswers / statistics.totalQuestions) * 100).toFixed(1) : 0}%
              </div>
              <div className="text-white/60 text-sm">Overall Accuracy</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}