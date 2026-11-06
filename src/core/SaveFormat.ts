/**
 * SaveFormat — Official JSON schemas for Bitstrips Classic Recreate
 */

import { Avatar, Comic } from "../types";

export const SAVE_VERSION = "1.0.0";

export interface AvatarSaveFile {
  format: "bitstrips-avatar";
  version: string;
  exportedAt: string;
  avatar: Avatar;
}

export function serializeAvatar(avatar: Avatar): string {
  const file: AvatarSaveFile = {
    format: "bitstrips-avatar",
    version: SAVE_VERSION,
    exportedAt: new Date().toISOString(),
    avatar,
  };
  return JSON.stringify(file, null, 2);
}

export function deserializeAvatar(json: string): Avatar | null {
  try {
    const data = JSON.parse(json);
    if (data.format === "bitstrips-avatar" && data.avatar) return data.avatar as Avatar;
    if (data.id && data.parts) return data as Avatar;
    return null;
  } catch {
    return null;
  }
}

export interface ComicSaveFile {
  format: "bitstrips-comic";
  version: string;
  exportedAt: string;
  comic: Comic;
  avatars?: Avatar[];
}

export function serializeComic(comic: Comic, avatars?: Avatar[]): string {
  const file: ComicSaveFile = {
    format: "bitstrips-comic",
    version: SAVE_VERSION,
    exportedAt: new Date().toISOString(),
    comic,
    avatars,
  };
  return JSON.stringify(file, null, 2);
}

export function deserializeComic(
  json: string
): { comic: Comic; avatars?: Avatar[] } | null {
  try {
    const data = JSON.parse(json);
    if (data.format === "bitstrips-comic" && data.comic) {
      return { comic: data.comic, avatars: data.avatars };
    }
    if (data.panels) return { comic: data as Comic };
    return null;
  } catch {
    return null;
  }
}

export const STORAGE_KEYS = {
  avatar: "bitstrips_avatar_v1",
  comic: "bitstrips_comic_v1",
  settings: "bitstrips_settings_v1",
} as const;
