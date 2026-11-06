/**
 * Bitstrips Classic - Core Type Definitions
 * Faithful recreation of the original modular character system (2008-2016)
 */

// ======================
// BASIC TYPES
// ======================

export type BodyType = "slim" | "average" | "heavy" | "muscular";
export type Gender = "male" | "female" | "neutral";

export type PartCategory =
  | "head"
  | "hairFront"
  | "hairBack"
  | "eyes"
  | "eyebrows"
  | "nose"
  | "mouth"
  | "ears"
  | "facialHair"
  | "body"
  | "top"
  | "bottom"
  | "shoes"
  | "outerwear"
  | "glasses"
  | "hat"
  | "earrings"
  | "necklace"
  | "other";

export type BalloonType = "speech" | "thought" | "shout" | "whisper";

// ======================
// TRANSFORM & RENDERING
// ======================

export interface Transform {
  x?: number;
  y?: number;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
}

export interface PartLayer {
  id: string;
  type: "shape" | "image";
  pathData?: string;
  imageUrl?: string;
  colorSlot?: string;
  opacity?: number;
  blendMode?: GlobalCompositeOperation;
}

// ======================
// PART SYSTEM
// ======================

export interface Part {
  id: string;
  category: PartCategory;
  name: string;
  tags: string[];
  layers: PartLayer[];
  defaultColors: Record<string, string>;
  colorSlots: string[];
  compatibleBodyTypes?: BodyType[];
  zIndex: number;
}

export interface PartInstance {
  partId: string;
  colorOverrides?: Record<string, string>;
  scale?: number;
  offsetX?: number;
  offsetY?: number;
  rotation?: number;
  visible?: boolean;
}

// ======================
// EXPRESSION & POSE
// ======================

export interface Expression {
  id: string;
  name: string;
  eyePartId?: string;
  eyebrowPartId?: string;
  mouthPartId?: string;
  transforms?: Record<string, Transform>;
}

export interface Pose {
  id: string;
  name: string;
  bodyTransforms: {
    head?: Transform;
    torso?: Transform;
    leftArm?: Transform;
    rightArm?: Transform;
    leftLeg?: Transform;
    rightLeg?: Transform;
  };
}

// ======================
// AVATAR
// ======================

export interface AvatarParts {
  head: PartInstance;
  hairFront: PartInstance;
  hairBack: PartInstance;
  eyes: PartInstance;
  eyebrows: PartInstance;
  nose: PartInstance;
  mouth: PartInstance;
  ears: PartInstance;
  facialHair?: PartInstance;
  body: PartInstance;
  top: PartInstance;
  bottom: PartInstance;
  shoes: PartInstance;
  outerwear?: PartInstance;
  accessories: PartInstance[];
}

export interface Avatar {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  bodyType: BodyType;
  skinTone: string;
  gender: Gender;
  parts: AvatarParts;
  defaultExpression: string;
  defaultPose: string;
}

// ======================
// COMIC SYSTEM
// ======================

export interface PanelElement {
  id: string;
  type: "character" | "prop" | "textBalloon" | "image";
  x: number;
  y: number;
  scale: number;
  rotation: number;
  zIndex: number;
  avatarId?: string;
  expressionId?: string;
  poseId?: string;
  balloonType?: BalloonType;
  text?: string;
  tailDirection?: number;
  assetId?: string;
  imageUrl?: string;
}

export interface Panel {
  id: string;
  width: number;
  height: number;
  background?: string;
  elements: PanelElement[];
}

export interface Comic {
  id: string;
  title?: string;
  panels: Panel[];
  createdAt: number;
  updatedAt: number;
}

// ======================
// RENDER ORDER
// ======================

export const CLASSIC_RENDER_ORDER: PartCategory[] = [
  "hairBack",
  "body",
  "bottom",
  "top",
  "outerwear",
  "head",
  "ears",
  "facialHair",
  "eyes",
  "eyebrows",
  "nose",
  "mouth",
  "hairFront",
  "glasses",
  "hat",
  "earrings",
  "necklace",
  "other",
];
