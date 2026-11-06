/**
 * ColorSystem — Bitstrips Classic color & palette system
 */

export type ColorSlot =
  | "skin"
  | "hair"
  | "brow"
  | "iris"
  | "eyeWhite"
  | "lip"
  | "primary"
  | "secondary"
  | "tertiary"
  | "frame"
  | "accent";

export interface Palette {
  id: string;
  name: string;
  colors: Partial<Record<ColorSlot, string>>;
}

export const SKIN_PALETTE: string[] = [
  "#FFF5E6",
  "#F5D0A9",
  "#F1C27D",
  "#E0AC69",
  "#C68642",
  "#A86F3E",
  "#8D5524",
  "#6B3F1D",
  "#4A2C14",
];

export const HAIR_PALETTE: string[] = [
  "#1A1A1A",
  "#2C1E1E",
  "#3B2F2F",
  "#5C3A21",
  "#8B5A2B",
  "#A0522D",
  "#D2B48C",
  "#F5DEB3",
  "#E8D5B7",
  "#C0C0C0",
  "#FFFFFF",
  "#8B0000",
  "#4A0080",
  "#1A5276",
];

export const CLOTHING_PRESETS: Palette[] = [
  { id: "blue_casual", name: "Blue Casual", colors: { primary: "#4A90D9", secondary: "#2E6BB0" } },
  { id: "red_bold", name: "Red Bold", colors: { primary: "#E74C3C", secondary: "#C0392B" } },
  { id: "green_fresh", name: "Green Fresh", colors: { primary: "#27AE60", secondary: "#1E8449" } },
  { id: "purple_night", name: "Purple Night", colors: { primary: "#8E44AD", secondary: "#6C3483" } },
  { id: "orange_fun", name: "Orange Fun", colors: { primary: "#E67E22", secondary: "#D35400" } },
  { id: "black_minimal", name: "Black Minimal", colors: { primary: "#2C3E50", secondary: "#1A252F" } },
  { id: "white_clean", name: "White Clean", colors: { primary: "#FFFFFF", secondary: "#E8E8E8" } },
  { id: "pink_sweet", name: "Pink Sweet", colors: { primary: "#E85A71", secondary: "#C93955" } },
];

export function resolveColor(
  colorSlot: string | undefined,
  instanceOverrides: Record<string, string> | undefined,
  partDefaults: Record<string, string>,
  skinTone: string
): string {
  if (!colorSlot) return "#1a1a1a";
  if (instanceOverrides && instanceOverrides[colorSlot]) return instanceOverrides[colorSlot];
  if (colorSlot === "skin") return skinTone;
  if (partDefaults[colorSlot]) return partDefaults[colorSlot];
  return "#1a1a1a";
}

export function applyPaletteToOverrides(
  existing: Record<string, string> | undefined,
  palette: Palette
): Record<string, string> {
  return { ...(existing || {}), ...palette.colors };
}

export const OUTLINE_COLOR = "#1a1a1a";
export const OUTLINE_WIDTH = 2.6;
