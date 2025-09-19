import { useEffect } from "react";
import { Game } from "./components/Game";
import { useAudio } from "./lib/stores/useAudio";
import "@fontsource/inter";

function App() {
  const { 
    setBackgroundMusic, 
    setHitSound, 
    setSuccessSound, 
    setWarningSound,
    setHoverSound,
    setClickSound,
    setCorrectSound,
    setIncorrectSound,
    startBackgroundMusic
  } = useAudio();

  // Initialize audio on app start
  useEffect(() => {
    // Set up background music
    const bgMusic = new Audio("/sounds/background.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.3;
    setBackgroundMusic(bgMusic);

    // Set up sound effects (existing)
    const hitSfx = new Audio("/sounds/hit.mp3");
    const successSfx = new Audio("/sounds/success.mp3");
    const warningSfx = new Audio("/sounds/hit.mp3"); // Use hit sound for warning (higher pitch)
    setHitSound(hitSfx);
    setSuccessSound(successSfx);
    setWarningSound(warningSfx);

    // Set up new sound effects
    // Note: Replace these file paths with your actual sound files
    const hoverSfx = new Audio("/sounds/hover.mp3"); // Replace with your hover sound file
    const clickSfx = new Audio("/sounds/click.mp3"); // Replace with your click sound file
    const correctSfx = new Audio("/sounds/correct.mp3"); // Replace with your correct answer sound file
    const incorrectSfx = new Audio("/sounds/incorrect.mp3"); // Replace with your incorrect answer sound file
    
    // Use existing sounds as fallbacks if new files don't exist
    hoverSfx.onerror = () => {
      console.log("Hover sound not found, using success sound as fallback");
      setHoverSound(successSfx);
    };
    clickSfx.onerror = () => {
      console.log("Click sound not found, using success sound as fallback");
      setClickSound(successSfx);
    };
    correctSfx.onerror = () => {
      console.log("Correct sound not found, using success sound as fallback");
      setCorrectSound(successSfx);
    };
    incorrectSfx.onerror = () => {
      console.log("Incorrect sound not found, using hit sound as fallback");
      setIncorrectSound(hitSfx);
    };

    setHoverSound(hoverSfx);
    setClickSound(clickSfx);
    setCorrectSound(correctSfx);
    setIncorrectSound(incorrectSfx);

    // Start background music after a short delay to ensure user interaction
    setTimeout(() => {
      startBackgroundMusic();
    }, 1000);
  }, [
    setBackgroundMusic, 
    setHitSound, 
    setSuccessSound, 
    setWarningSound,
    setHoverSound,
    setClickSound,
    setCorrectSound,
    setIncorrectSound,
    startBackgroundMusic
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <Game />
    </div>
  );
}

export default App;
