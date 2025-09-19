import { useEffect } from "react";
import { GameMenu } from "./GameMenu";
import { GamePlay } from "./GamePlay";
import { GameOver } from "./GameOver";
import { Statistics } from "./Statistics";
import { useTrivia } from "../lib/stores/useTrivia";
import { useAudio } from "../lib/stores/useAudio";

export function Game() {
  const { gamePhase, initializeDaily } = useTrivia();
  const { isMuted, toggleMute } = useAudio();

  useEffect(() => {
    // Initialize daily streak on app load
    initializeDaily();
  }, [initializeDaily]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sound toggle button */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={toggleMute}
          className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </button>
      </div>

      {/* Game content */}
      <div className="flex-1 flex items-center justify-center p-4">
        {gamePhase === "menu" && <GameMenu />}
        {gamePhase === "playing" && <GamePlay />}
        {gamePhase === "gameOver" && <GameOver />}
        {gamePhase === "statistics" && <Statistics />}
      </div>
    </div>
  );
}
