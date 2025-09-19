import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Timer } from "./Timer";
import { useTrivia } from "../lib/stores/useTrivia";
import { useAudio } from "../lib/stores/useAudio";

export function GamePlay() {
  const { 
    currentQuestion, 
    score, 
    answerQuestion, 
    endGame,
    getNextQuestion 
  } = useTrivia();
  
  const { playHit, playSuccess, playWarning, playCorrect, playIncorrect, playClick, playHover } = useAudio();
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(20);
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect' | null, message: string }>({ type: null, message: "" });
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();
  const warnedRef = useRef(false);

  // Focus input on mount and question change
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentQuestion]);

  // Timer logic
  useEffect(() => {
    setTimeLeft(20);
    setFeedback({ type: null, message: "" });
    warnedRef.current = false;
    
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        
        // Play warning sound at 5 seconds remaining (only once)
        if (prev === 6 && !warnedRef.current) {
          playWarning();
          warnedRef.current = true;
        }
        
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentQuestion]);

  const handleTimeUp = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    playIncorrect();
    endGame();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const isCorrect = answerQuestion(answer.trim());
    
    if (isCorrect) {
      playCorrect();
      setFeedback({ type: 'correct', message: "Correct! ✓" });
    } else {
      playIncorrect();
      setFeedback({ type: 'incorrect', message: `Incorrect. Answer: ${currentQuestion?.answer}` });
    }

    setAnswer("");
    
    // Show feedback briefly, then continue or end game
    setTimeout(() => {
      if (isCorrect) {
        getNextQuestion();
      } else {
        endGame();
      }
    }, 1500);
  };

  if (!currentQuestion) {
    return (
      <Card className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-8 text-center">
          <div className="text-white text-xl">Loading question...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-md border-white/20 transform transition-all duration-300 hover:scale-[1.02]">
      <CardContent className="p-8 space-y-6">
        {/* Score and Timer */}
        <div className="flex justify-between items-center">
          <div className="text-white">
            <span className="text-lg font-semibold">Score: </span>
            <span className="text-2xl font-bold text-yellow-400">{score}</span>
          </div>
          <Timer timeLeft={timeLeft} maxTime={20} />
        </div>

        {/* Question */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            {currentQuestion.question}
          </h2>
          <div className="flex justify-center gap-4 text-white/60 text-sm">
            <span>Category: {currentQuestion.category}</span>
            <span>•</span>
            <span>Difficulty: {currentQuestion.difficulty}</span>
          </div>
        </div>

        {/* Feedback */}
        {feedback.type && (
          <div className={`text-center p-4 rounded-lg transform transition-all duration-500 ${
            feedback.type === 'correct' 
              ? 'bg-green-500/20 text-green-300 animate-pulse scale-105' 
              : 'bg-red-500/20 text-red-300 animate-bounce'
          }`}>
            <div className="font-semibold text-lg">
              {feedback.type === 'correct' && '🎉 '}
              {feedback.message}
              {feedback.type === 'incorrect' && ' 😔'}
            </div>
          </div>
        )}

        {/* Answer Input */}
        {!feedback.type && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              ref={inputRef}
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer..."
              className="w-full text-lg p-4 bg-white/20 border-white/30 text-white placeholder-white/50 focus:border-white/50"
              disabled={timeLeft === 0}
            />
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 text-lg"
              disabled={!answer.trim() || timeLeft === 0}
              onMouseEnter={() => playHover()}
              onClick={() => playClick()}
            >
              Submit Answer
            </Button>
          </form>
        )}

        {/* Instructions */}
        <div className="text-center text-white/60 text-sm">
          Press Enter to submit your answer
        </div>
      </CardContent>
    </Card>
  );
}
