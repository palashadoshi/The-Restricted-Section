"use client";

import { useEffect, useRef, useState } from "react";

export default function SettingsModal({
  onClose,
  volume,
  onVolumeChange,
  isPlaying,
  onToggleMusic,
}: {
  onClose: () => void;
  volume: number;
  onVolumeChange: (val: number) => void;
  isPlaying: boolean;
  onToggleMusic: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const [sttEnabled, setSttEnabled] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 10);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      color: string;
    }[] = [];

    const colors = ["#c084fc", "#a855f7", "#e879f9", "#ffffff", "#818cf8"];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.floor(Math.random() * 3 + 1) * 3,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.7 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animId: number;

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      for (const p of particles) {
        ctx!.globalAlpha = p.opacity;
        ctx!.fillStyle = p.color;
        ctx!.fillRect(p.x, p.y, p.size, p.size);
        p.y += p.speed;
        if (p.y > canvas!.height) {
          p.y = -p.size;
          p.x = Math.random() * canvas!.width;
        }
      }
      ctx!.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    }

    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className={`modal-overlay ${visible ? "visible" : ""}`}>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 9,
        }}
      />
      <div className="modal-box">
        <div className="modal-header">
          <h2 className="modal-title">⚙ Settings</h2>
          <button className="modal-close" onClick={handleClose}>✕</button>
        </div>

        <div className="modal-row">
          <label className="modal-label">♪ Volume</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="modal-slider"
          />
        </div>

        <div className="modal-row">
          <label className="modal-label">♪ Music</label>
          <button
            className={`modal-toggle ${isPlaying ? "on" : "off"}`}
            onClick={onToggleMusic}
          >
            {isPlaying ? "▐▐ Pause" : "▶ Play"}
          </button>
        </div>

        <div className="modal-row">
          <label className="modal-label">🎤 Speech-to-Text</label>
          <button
            className={`modal-toggle ${sttEnabled ? "on" : "off"}`}
            onClick={() => setSttEnabled(!sttEnabled)}
          >
            {sttEnabled ? "ON" : "OFF"}
          </button>
        </div>
      </div>
    </div>
  );
}