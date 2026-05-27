"use client";

import { useState } from "react";

type Message = {
  role: "user" | "ai";
  content: string;
};

type ConfirmAction = "exit" | "reset" | null;

export default function DebateScreen({
  difficulty,
  onChangeDifficulty,
  onExit,
  isPlaying,
  onToggleMusic,
}: {
  difficulty: string;
  onChangeDifficulty: () => void;
  onExit: () => void;
  isPlaying: boolean;
  onToggleMusic: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [showDebateSettings, setShowDebateSettings] = useState(false);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);

  const difficultyColor =
    difficulty === "easy"
      ? "#4ade80"
      : difficulty === "medium"
      ? "#facc15"
      : "#f87171";

  const handleConfirm = () => {
    if (confirmAction === "exit") {
      setShowDebateSettings(false);
      onExit();
    } else if (confirmAction === "reset") {
      setMessages([]);
      setConfirmAction(null);
    }
  };

  return (
    <div className="debate-wrapper">
      <button
        className="corner-settings"
        onClick={() => setShowDebateSettings(true)}
      >
        ⚙
      </button>

      {showDebateSettings && (
        <div className="debate-settings-overlay">
          <div className="debate-settings-box">

            {confirmAction ? (
              <>
                <div className="modal-header">
                  <h2 className="modal-title">
                    {confirmAction === "exit" ? "✕ Exit?" : "⟳ Reset?"}
                  </h2>
                </div>
                <p className="confirm-text">
                  {confirmAction === "exit"
                    ? "Are you sure you want to exit to the home screen?"
                    : "Are you sure you want to reset the debate? A new question will be chosen."}
                </p>
                <div className="confirm-buttons">
                  <button
                    className="debate-settings-btn danger"
                    onClick={handleConfirm}
                  >
                    ✓ Yes
                  </button>
                  <button
                    className="debate-settings-btn"
                    onClick={() => setConfirmAction(null)}
                  >
                    ✕ Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="modal-header">
                  <h2 className="modal-title">⚙ Options</h2>
                  <button
                    className="modal-close"
                    onClick={() => setShowDebateSettings(false)}
                  >
                    ✕
                  </button>
                </div>

                <div className="debate-settings-row">
                  <span className="modal-label">Difficulty</span>
                  <span
                    className="diff-badge"
                    style={{ color: difficultyColor, borderColor: difficultyColor }}
                  >
                    {difficulty.toUpperCase()}
                  </span>
                </div>

                <button
                  className="debate-settings-btn"
                  onClick={() => {
                    setShowDebateSettings(false);
                    onChangeDifficulty();
                  }}
                >
                  ↩ Change Difficulty
                </button>

                <button
                  className="debate-settings-btn"
                  onClick={onToggleMusic}
                >
                  {isPlaying ? "▐▐ Mute Music" : "▶ Unmute Music"}
                </button>

                <button
                  className="debate-settings-btn danger"
                  onClick={() => setConfirmAction("reset")}
                >
                  ⟳ Reset Debate
                </button>

                <button
                  className="debate-settings-btn danger"
                  onClick={() => setConfirmAction("exit")}
                >
                  ✕ Exit to Home
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <div className="question-panel">
        <div className="question-label">Topic</div>
        <div
          className="diff-badge"
          style={{ color: difficultyColor, borderColor: difficultyColor }}
        >
          {difficulty.toUpperCase()}
        </div>
        <div className="question-text">
          Should artificial intelligence be allowed to make legal decisions?
        </div>
        <div className="question-hint">
          Take a position and defend it.
        </div>
      </div>

      <div className="chat-panel">
        <div className="chat-messages">
          {messages.length === 0 && (
            <div className="chat-empty">
              Make your opening argument...
            </div>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              className={`chat-bubble ${m.role === "user" ? "user" : "ai"}`}
            >
              {m.content}
            </div>
          ))}
        </div>

        <div className="chat-input-row">
          <input
            className="chat-input"
            type="text"
            placeholder="Your argument..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && input.trim()) {
                setMessages([...messages, { role: "user", content: input }]);
                setInput("");
              }
            }}
          />
          <button
            className="chat-send"
            onClick={() => {
              if (input.trim()) {
                setMessages([...messages, { role: "user", content: input }]);
                setInput("");
              }
            }}
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
}