"use client";
import React, { useState } from "react";
import type { FaceData } from "./types";

type Props = {
  face: string;
  currentData: FaceData;
  onClose: () => void;
  onSave: (data: FaceData) => void;
};

const emojis = ["🔥", "💧", "💡", "🌟", "🎩", "🧠", "🌀", "🌈", "⚡️", "❄️"];

export default function FaceEditorModal({ face, currentData, onClose, onSave }: Props) {
  const [color, setColor] = useState(currentData.color);
  const [emoji, setEmoji] = useState(currentData.emoji || "");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96 text-center">
        <h2 className="text-2xl font-semibold mb-4">Edit {face.toUpperCase()} Face</h2>

        <label className="block mb-3">
          <span className="text-sm font-medium text-gray-700">Color</span>
          <input
            type="color"
            className="w-full h-10 mt-1 rounded"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>

        <div className="mb-4">
          <span className="block text-sm font-medium text-gray-700 mb-2">Emoji</span>
          <div className="flex flex-wrap justify-center gap-2">
            {emojis.map((e) => (
              <button
                key={e}
                className={`text-2xl p-2 rounded hover:bg-gray-200 ${emoji === e ? "bg-gray-300" : ""}`}
                onClick={() => setEmoji(e)}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button onClick={onClose} className="text-gray-600">Cancel</button>
          <button onClick={() => onSave({ color, emoji })} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Save</button>
        </div>
      </div>
    </div>
  );
}
