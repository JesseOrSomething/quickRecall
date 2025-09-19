import { create } from "zustand";

interface AudioState {
  backgroundMusic: HTMLAudioElement | null;
  hitSound: HTMLAudioElement | null;
  successSound: HTMLAudioElement | null;
  warningSound: HTMLAudioElement | null;
  hoverSound: HTMLAudioElement | null;
  clickSound: HTMLAudioElement | null;
  correctSound: HTMLAudioElement | null;
  incorrectSound: HTMLAudioElement | null;
  isMuted: boolean;
  
  // Setter functions
  setBackgroundMusic: (music: HTMLAudioElement) => void;
  setHitSound: (sound: HTMLAudioElement) => void;
  setSuccessSound: (sound: HTMLAudioElement) => void;
  setWarningSound: (sound: HTMLAudioElement) => void;
  setHoverSound: (sound: HTMLAudioElement) => void;
  setClickSound: (sound: HTMLAudioElement) => void;
  setCorrectSound: (sound: HTMLAudioElement) => void;
  setIncorrectSound: (sound: HTMLAudioElement) => void;
  
  // Control functions
  toggleMute: () => void;
  startBackgroundMusic: () => void;
  stopBackgroundMusic: () => void;
  playHit: () => void;
  playSuccess: () => void;
  playWarning: () => void;
  playHover: () => void;
  playClick: () => void;
  playCorrect: () => void;
  playIncorrect: () => void;
}

export const useAudio = create<AudioState>((set, get) => ({
  backgroundMusic: null,
  hitSound: null,
  successSound: null,
  warningSound: null,
  hoverSound: null,
  clickSound: null,
  correctSound: null,
  incorrectSound: null,
  isMuted: true, // Start muted by default
  
  setBackgroundMusic: (music) => set({ backgroundMusic: music }),
  setHitSound: (sound) => set({ hitSound: sound }),
  setSuccessSound: (sound) => set({ successSound: sound }),
  setWarningSound: (sound) => set({ warningSound: sound }),
  setHoverSound: (sound) => set({ hoverSound: sound }),
  setClickSound: (sound) => set({ clickSound: sound }),
  setCorrectSound: (sound) => set({ correctSound: sound }),
  setIncorrectSound: (sound) => set({ incorrectSound: sound }),
  
  toggleMute: () => {
    const { isMuted, backgroundMusic } = get();
    const newMutedState = !isMuted;
    
    // Control background music based on mute state
    if (backgroundMusic) {
      if (newMutedState) {
        backgroundMusic.pause();
      } else {
        backgroundMusic.play().catch(error => {
          console.log("Background music play prevented:", error);
        });
      }
    }
    
    // Update the muted state
    set({ isMuted: newMutedState });
    
    // Log the change
    console.log(`Sound ${newMutedState ? 'muted' : 'unmuted'}`);
  },

  startBackgroundMusic: () => {
    const { backgroundMusic, isMuted } = get();
    if (backgroundMusic && !isMuted) {
      backgroundMusic.play().catch(error => {
        console.log("Background music play prevented:", error);
      });
    }
  },

  stopBackgroundMusic: () => {
    const { backgroundMusic } = get();
    if (backgroundMusic) {
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
    }
  },
  
  playHit: () => {
    const { hitSound, isMuted } = get();
    if (hitSound) {
      // If sound is muted, don't play anything
      if (isMuted) {
        console.log("Hit sound skipped (muted)");
        return;
      }
      
      // Clone the sound to allow overlapping playback
      const soundClone = hitSound.cloneNode() as HTMLAudioElement;
      soundClone.volume = 0.3;
      soundClone.play().catch(error => {
        console.log("Hit sound play prevented:", error);
      });
    }
  },
  
  playSuccess: () => {
    const { successSound, isMuted } = get();
    if (successSound) {
      // If sound is muted, don't play anything
      if (isMuted) {
        console.log("Success sound skipped (muted)");
        return;
      }
      
      successSound.currentTime = 0;
      successSound.play().catch(error => {
        console.log("Success sound play prevented:", error);
      });
    }
  },

  playWarning: () => {
    const { warningSound, isMuted } = get();
    if (warningSound) {
      // If sound is muted, don't play anything
      if (isMuted) {
        console.log("Warning sound skipped (muted)");
        return;
      }
      
      // Clone the sound to allow overlapping playback
      const soundClone = warningSound.cloneNode() as HTMLAudioElement;
      soundClone.volume = 0.4;
      soundClone.playbackRate = 1.4; // Higher pitch to differentiate from hit sound
      soundClone.play().catch(error => {
        console.log("Warning sound play prevented:", error);
      });
    }
  },

  playHover: () => {
    const { hoverSound, isMuted } = get();
    if (hoverSound && !isMuted) {
      const soundClone = hoverSound.cloneNode() as HTMLAudioElement;
      soundClone.volume = 0.2; // Lower volume for hover sounds
      soundClone.play().catch(error => {
        console.log("Hover sound play prevented:", error);
      });
    }
  },

  playClick: () => {
    const { clickSound, isMuted } = get();
    if (clickSound && !isMuted) {
      const soundClone = clickSound.cloneNode() as HTMLAudioElement;
      soundClone.volume = 0.3;
      soundClone.play().catch(error => {
        console.log("Click sound play prevented:", error);
      });
    }
  },

  playCorrect: () => {
    const { correctSound, isMuted } = get();
    if (correctSound && !isMuted) {
      correctSound.currentTime = 0;
      correctSound.volume = 0.5;
      correctSound.play().catch(error => {
        console.log("Correct sound play prevented:", error);
      });
    }
  },

  playIncorrect: () => {
    const { incorrectSound, isMuted } = get();
    if (incorrectSound && !isMuted) {
      const soundClone = incorrectSound.cloneNode() as HTMLAudioElement;
      soundClone.volume = 0.4;
      soundClone.play().catch(error => {
        console.log("Incorrect sound play prevented:", error);
      });
    }
  }
}));
