/**
 * Bitstrips Classic Recreate - Main Entry
 */

export * from "./types";
export { AvatarManager } from "./character/AvatarManager";
export { AssetLibrary } from "./character/AssetLibrary";
export { AvatarRenderer } from "./character/AvatarRenderer";
export { ComicManager } from "./comic/ComicManager";
export { ComicRenderer } from "./comic/ComicRenderer";
export { exportComicToPNG, downloadComicPNG, exportAvatarToPNG } from "./comic/ExportComic";
export {
  SKIN_PALETTE,
  HAIR_PALETTE,
  CLOTHING_PRESETS,
  resolveColor,
  applyPaletteToOverrides,
  OUTLINE_COLOR,
  OUTLINE_WIDTH,
} from "./core/ColorSystem";
export type { ColorSlot, Palette } from "./core/ColorSystem";
export {
  serializeAvatar,
  deserializeAvatar,
  serializeComic,
  deserializeComic,
  STORAGE_KEYS,
  SAVE_VERSION,
} from "./core/SaveFormat";
export {
  BUILTIN_POSES,
  LIMB_ANCHORS,
  applyLimbTransform,
  getPose,
} from "./core/PoseSystem";
export type { LimbId } from "./core/PoseSystem";
