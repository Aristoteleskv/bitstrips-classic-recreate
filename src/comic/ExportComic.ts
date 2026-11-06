/**
 * ExportComic — High-resolution multi-panel comic export
 */

import { Comic } from "../types";
import { ComicRenderer } from "./ComicRenderer";
import { AvatarManager } from "../character/AvatarManager";
import { AssetLibrary } from "../character/AssetLibrary";

export interface ExportOptions {
  scale?: number;
  panelGap?: number;
  background?: string;
  layout?: "horizontal" | "vertical";
  padding?: number;
}

const DEFAULTS: Required<ExportOptions> = {
  scale: 2,
  panelGap: 16,
  background: "#FFFFFF",
  layout: "horizontal",
  padding: 24,
};

export function exportComicToPNG(
  comic: Comic,
  library: AssetLibrary,
  avatarManager: AvatarManager,
  options: ExportOptions = {}
): string {
  const opts = { ...DEFAULTS, ...options };
  const renderer = new ComicRenderer(library, avatarManager);
  const panels = comic.panels;
  if (panels.length === 0) throw new Error("Comic has no panels");

  let totalW: number;
  let totalH: number;

  if (opts.layout === "horizontal") {
    totalW =
      panels.reduce((s, p) => s + p.width, 0) +
      opts.panelGap * (panels.length - 1) +
      opts.padding * 2;
    totalH = Math.max(...panels.map((p) => p.height)) + opts.padding * 2;
  } else {
    totalW = Math.max(...panels.map((p) => p.width)) + opts.padding * 2;
    totalH =
      panels.reduce((s, p) => s + p.height, 0) +
      opts.panelGap * (panels.length - 1) +
      opts.padding * 2;
  }

  const canvas = document.createElement("canvas");
  canvas.width = totalW * opts.scale;
  canvas.height = totalH * opts.scale;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2d context");

  ctx.scale(opts.scale, opts.scale);
  ctx.fillStyle = opts.background;
  ctx.fillRect(0, 0, totalW, totalH);

  let x = opts.padding;
  let y = opts.padding;

  for (const panel of panels) {
    renderer.renderPanel(ctx, panel, x, y);
    if (opts.layout === "horizontal") x += panel.width + opts.panelGap;
    else y += panel.height + opts.panelGap;
  }

  return canvas.toDataURL("image/png");
}

export function downloadComicPNG(
  comic: Comic,
  library: AssetLibrary,
  avatarManager: AvatarManager,
  filename?: string,
  options?: ExportOptions
): void {
  const dataUrl = exportComicToPNG(comic, library, avatarManager, options);
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename || `${comic.title || "tirinha"}.png`;
  a.click();
}

export function exportAvatarToPNG(
  renderFn: (ctx: CanvasRenderingContext2D) => void,
  width = 400,
  height = 600,
  scale = 2
): string {
  const canvas = document.createElement("canvas");
  canvas.width = width * scale;
  canvas.height = height * scale;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2d context");
  ctx.scale(scale, scale);
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);
  renderFn(ctx);
  return canvas.toDataURL("image/png");
}
