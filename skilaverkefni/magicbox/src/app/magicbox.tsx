"use client";

import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  Ref,
} from "react";
import { motion, useAnimation } from "framer-motion";
import type { FaceData, MagicBoxHandle } from "./types";

type Props = {
  onSizeChange?: (size: number) => void;
  onFaceClick?: (face: string) => void;
  faceData: Record<string, FaceData>;
  autoRotate: boolean;
};

const MagicBox = forwardRef<MagicBoxHandle, Props>(
  ({ onSizeChange, onFaceClick, faceData, autoRotate }, ref: Ref<MagicBoxHandle>) => {
    const [size, setSize] = useState(140);
    const [hoveredFace, setHoveredFace] = useState<string | null>(null);
    const controls = useAnimation();

    const half = size / 2;
    const faceTransforms: Record<string, string> = {
      front: `translateZ(${half}px)`,
      back: `rotateY(180deg) translateZ(${half}px)`,
      right: `rotateY(90deg) translateZ(${half}px)`,
      left: `rotateY(-90deg) translateZ(${half}px)`,
      top: `rotateX(90deg) translateZ(${half}px)`,
      bottom: `rotateX(-90deg) translateZ(${half}px)`,
    };

    const rotate = () => {
      controls.start({
        rotateY: 360,
        transition: { repeat: Infinity, duration: 10, ease: "linear" },
      });
    };

    const stopRotate = () => {
      controls.stop();
    };

    useEffect(() => {
      autoRotate ? rotate() : stopRotate();
    }, [autoRotate]);

    const changeColor = () => {
      controls.start({
        scale: [1, 1.2, 1],
        transition: { duration: 0.4 },
      });
    };

    const resize = () => {
      const newSize = Math.floor(Math.random() * 120) + 80;
      setSize(newSize);
      if (onSizeChange) onSizeChange(newSize);
    };

    const wiggle = () => {
      controls.start({
        rotateX: [0, 15, -15, 15, -15, 0],
        rotateY: [0, -10, 10, -10, 10, 0],
        transition: { duration: 1 },
      });
    };

    useImperativeHandle(ref, () => ({
      changeColor,
      resize,
      wiggle,
      rotate,
      stopRotate,
      surprise: () => {
        resize();
        changeColor();
        wiggle();
      },
    }));

    return (
      <div style={{ perspective: 1000 }}>
        <motion.div
          animate={controls}
          style={{
            width: size,
            height: size,
            position: "relative",
            transformStyle: "preserve-3d",
          }}
        >
          {Object.entries(faceTransforms).map(([face, transform]) => {
            const { color, emoji } = faceData[face] || { color: "#ccc", emoji: "" };
            return (
              <div
                key={face}
                onClick={() => onFaceClick?.(face)}
                onMouseEnter={() => setHoveredFace(face)}
                onMouseLeave={() => setHoveredFace(null)}
                style={{
                  position: "absolute",
                  width: size,
                  height: size,
                  background: `linear-gradient(to bottom, ${color}, #1e293b)`,
                  border: "1px solid rgba(0,0,0,0.1)",
                  boxShadow: "inset 0 0 20px rgba(0,0,0,0.3)",
                  transform,
                  color: "#fff",
                  fontSize: size / 3,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                {emoji && <span>{emoji}</span>}
                {hoveredFace === face && (
                  <div
                    style={{
                      position: "absolute",
                      top: -30,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "#000",
                      padding: "4px 8px",
                      fontSize: 12,
                      borderRadius: 6,
                      color: "#fff",
                    }}
                  >
                    {face.toUpperCase()}
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    );
  }
);

export default MagicBox;
