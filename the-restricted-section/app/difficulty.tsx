"use client";

import { useState } from "react";

const difficulties = [
  {
    id: "easy",
    label: "Easy",
    desc: "Straightforward topics. AI argues gently.",
    color: "#4ade80",
  },
  {
    id: "medium",
    label: "Medium",
    desc: "Nuanced topics. AI pushes back harder.",
    color: "#facc15",
  },
  {
    id: "hard",
    label: "Hard",
    desc: "Complex topics. AI will challenge everything.",
    color: "#f87171",
  },
];

export default function DifficultyScreen({
  onSelect,
}: {
  onSelect: (difficulty: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <main className="container">
      <div className="diff-block">
        <h2 className="diff-header">Choose Your Difficulty</h2>
        <div className="diff-pills">
          {difficulties.map((d) => (
            <button
              key={d.id}
              className={`diff-pill ${selected === d.id ? "selected" : ""}`}
              style={
                selected === d.id
                  ? { borderColor: d.color, color: d.color }
                  : {}
              }
              onClick={() => setSelected(d.id)}
            >
              <span className="diff-pill-label">{d.label}</span>
              <span className="diff-pill-desc">{d.desc}</span>
            </button>
          ))}
        </div>
        <button
          className="btn-play"
          disabled={!selected}
          onClick={() => selected && onSelect(selected)}
          style={{ opacity: selected ? 1 : 0.4 }}
        >
          ▶ Enter
        </button>
      </div>
    </main>
  );
}