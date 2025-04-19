export type FaceData = {
    color: string;
    emoji?: string;
  };
  
  export type MagicBoxHandle = {
    resize: () => void;
    wiggle: () => void;
    rotate: () => void;
    stopRotate: () => void;
    surprise: () => void;
  };