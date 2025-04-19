"use client";
import React, { useRef, useState, useEffect } from "react";
import MagicBox from "./magicbox";
import FaceEditorModal from "./FaceEditorModal";
import { fetchAIColorPalette } from "./colormind";
import { triggerSparkle } from "./confetti";
import { MagicBoxHandle, FaceData } from "./types";

import {
  Palette,
  Ruler,
  RotateCw,
  Sparkles,
  Zap,
} from "lucide-react";
import { motion, useAnimation } from "framer-motion";

const tailwindColors = [
  "#ef4444", "#3b82f6", "#10b981",
  "#eab308", "#8b5cf6", "#ec4899",
  "#6366f1", "#14b8a6", "#f97316",
];

function getRandomColor() {
  return tailwindColors[Math.floor(Math.random() * tailwindColors.length)];
}

const defaultFaces: Record<string, FaceData> = {
  front: { color: "#3b82f6", emoji: "🔥" },
  back: { color: "#10b981", emoji: "🌊" },
  right: { color: "#f59e0b", emoji: "🍊" },
  left: { color: "#8b5cf6", emoji: "🎩" },
  top: { color: "#ec4899", emoji: "💡" },
  bottom: { color: "#f43f5e", emoji: "🧠" },
};

export default function MagicBoxParent() {
  const boxRef = useRef<MagicBoxHandle>(null);
  const [faceData, setFaceData] = useState(defaultFaces);
  const [activeFace, setActiveFace] = useState<string | null>(null);
  const [autoRotate, setAutoRotate] = useState(false);
  const [boxSize, setBoxSize] = useState(140);

  const titleControls = useAnimation();

  function handleRandomColor() {
    const newData = { ...faceData };
    Object.keys(newData).forEach((face) => {
      newData[face].color = getRandomColor();
    });
    setFaceData(newData);
    triggerSparkle();
  }

  async function suggestPalette() {
    try {
      const palette = await fetchAIColorPalette();
      const newData = { ...faceData };
      Object.keys(newData).forEach((face, idx) => {
        newData[face].color = palette[idx % palette.length];
      });
      setFaceData(newData);
    } catch (err) {
      console.warn("⚠️ Failed to fetch AI palette:", err);
    }
  }

  const updateFace = (face: string, data: FaceData) => {
    setFaceData((prev) => ({ ...prev, [face]: data }));
  };


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "r") boxRef.current?.resize();
      if (e.key === "c") handleRandomColor();
      if (e.key === "w") boxRef.current?.wiggle();

      titleControls.start({
        textShadow: "0 0 16px rgba(255,255,255,0.7)",
        transition: { duration: 0.2 },
      }).then(() => {
        titleControls.start({ textShadow: "none", transition: { duration: 0.3 } });
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [faceData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-slate-200 flex flex-col items-center justify-center px-6">
   
      <motion.h1
        initial={{ opacity: 0, y: -30, scale: 0.95 }}
        animate={titleControls}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        whileHover={{ rotate: [0, 3, -3, 3, 0], transition: { duration: 1 } }}
      className="text-9xl md:text-[12rem] font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-pink-500 to-rose-500 drop-shadow-xl animate-pulse"
        style={{ marginBottom: `${boxSize / 2}px` }}
      >
        Magic Box 3D
      </motion.h1>

      {/* 🧊 The Cube */}
      <MagicBox
        ref={boxRef}
        faceData={faceData}
        onFaceClick={(face) => setActiveFace(face)}
        onSizeChange={(size) => setBoxSize(size)}
        autoRotate={autoRotate}
      />

      {/* 🧪 Buttons */}
      <div
        className="mt-10 flex flex-wrap justify-center items-center gap-10"
        style={{ paddingTop: `${boxSize / 2}px` }}
      >
        <button onClick={handleRandomColor} className="magic-btn">
          <Palette className="w-5 h-5" /> Change
        </button>
        <button
          onClick={() => {
            boxRef.current?.resize();
            triggerSparkle();
          }}
          className="magic-btn"
        >
          <Ruler className="w-5 h-5" /> Resize
        </button>
        <button
          onClick={() => {
            boxRef.current?.wiggle();
            triggerSparkle();
          }}
          className="magic-btn"
        >
          <RotateCw className="w-5 h-5" /> Wiggle
        </button>
        <button
          onClick={() => boxRef.current?.surprise()}
          className="magic-btn"
        >
          <Zap className="w-5 h-5" /> Surprise
        </button>
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className="magic-btn"
        >
          <Sparkles className="w-5 h-5" /> {autoRotate ? "Stop" : "Auto-Rotate"}
        </button>
        <button onClick={suggestPalette} className="magic-btn">
          🎨 AI Palette
        </button>
      </div>

      {/* 🎨 Face Editor Modal */}
      {activeFace && (
        <FaceEditorModal
          face={activeFace}
          currentData={faceData[activeFace]}
          onClose={() => setActiveFace(null)}
          onSave={(data) => {
            updateFace(activeFace, data);
            setActiveFace(null);
          }}
        />
      )}
    </div>
  );
}
