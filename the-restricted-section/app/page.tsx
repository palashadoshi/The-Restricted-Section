"use client";

import { useState, useEffect } from "react";
import { Howl } from "howler";
import PixelBackground from "./pixel_bg";
import SettingsModal from "./settings_modal";

let sound: Howl | null = null;

export default function Home() {
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!sound) {
      sound = new Howl({
        src: ["/bg-music.mp3"],
        loop: true,
        volume: 0.5,
      });
      sound.play();
    }
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
        <button className="btn-play">▶ Play</button>
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