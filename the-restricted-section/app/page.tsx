"use client";

import { useState, useEffect } from "react";
import { Howl } from "howler";
import PixelBackground from "./pixel_bg";
import SettingsModal from "./settings_modal";
import DifficultyScreen from "./difficulty";
import DebateScreen from "./debate";

let sound: Howl | null = null;

type Screen = "home" | "difficulty" | "debate";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!sound) {
      sound = new Howl({
        src: ["/bg-music.mp3"],
        loop: true,
        volume: 0.5,
      });
    }

    const startMusic = () => {
      if (sound && !sound.playing()) {
        sound.play();
        setIsPlaying(true);
      }
      window.removeEventListener("click", startMusic);
    };

    window.addEventListener("click", startMusic);
    return () => window.removeEventListener("click", startMusic);
  }, []);

  const handleVolumeChange = (val: number) => {
    setVolume(val);
    sound?.volume(val);
  };

  const handleToggleMusic = () => {
    if (!sound) return;
    if (isPlaying) {
      sound.pause();
    } else {
      sound.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleDifficultySelect = (d: string) => {
    setDifficulty(d);
    setScreen("debate");
  };

  if (screen === "difficulty") {
    return (
      <>
        <PixelBackground />
        {showSettings && (
          <SettingsModal
            onClose={() => setShowSettings(false)}
            volume={volume}
            onVolumeChange={handleVolumeChange}
            isPlaying={isPlaying}
            onToggleMusic={handleToggleMusic}
          />
        )}
        <DifficultyScreen onSelect={handleDifficultySelect} />
      </>
    );
  }

  if (screen === "debate") {
    return (
      <>
        <PixelBackground />
        <DebateScreen
          difficulty={difficulty!}
          onChangeDifficulty={() => setScreen("difficulty")}
          onExit={() => setScreen("home")}
          isPlaying={isPlaying}
          onToggleMusic={handleToggleMusic}
        />
      </>
    );
  }

  return (
    <main className="container">
      <PixelBackground />
      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
          volume={volume}
          onVolumeChange={handleVolumeChange}
          isPlaying={isPlaying}
          onToggleMusic={handleToggleMusic}
        />
      )}
      <div className="title-block">
        <h1 className="title">The Restricted</h1>
        <h1 className="title accent">Section</h1>
        <p className="subtitle">debate. think. defend.</p>
      </div>

      <div className="button-group">
        <button className="btn-play" onClick={() => setScreen("difficulty")}>
          ▶ Play
        </button>
        <button
          className="btn-settings"
          onClick={() => setShowSettings(true)}
        >
          ⚙ Settings
        </button>
      </div>
    </main>
  );
}