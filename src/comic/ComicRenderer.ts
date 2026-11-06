/**
 * ComicRenderer
 * Renders panels, characters and speech balloons in classic Bitstrips style.
 */

import { Comic, Panel, PanelElement, BalloonType } from "../types";
import { AvatarRenderer } from "../character/AvatarRenderer";
import { AvatarManager } from "../character/AvatarManager";
import { AssetLibrary } from "../character/AssetLibrary";

export class ComicRenderer {
  private avatarRenderer: AvatarRenderer;
  private avatarManager: AvatarManager;

  constructor(library: AssetLibrary, avatarManager: AvatarManager) {
    this.avatarRenderer = new AvatarRenderer(library);
    this.avatarManager = avatarManager;
  }

  renderComic(
    ctx: CanvasRenderingContext2D,
    comic: Comic,
    options: { panelGap?: number; startX?: number; startY?: number } = {}
  ): void {
    const gap = options.panelGap ?? 12;
    let x = options.startX ?? 20;
    const y = options.startY ?? 20;

    for (const panel of comic.panels) {
      this.renderPanel(ctx, panel, x, y);
      x += panel.width + gap;
    }
  }

  renderPanel(
    ctx: CanvasRenderingContext2D,
    panel: Panel,
    offsetX = 0,
    offsetY = 0
  ): void {
    ctx.save();
    ctx.translate(offsetX, offsetY);

    ctx.fillStyle = panel.background || "#FFFFFF";
    ctx.fillRect(0, 0, panel.width, panel.height);

    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, panel.width - 4, panel.height - 4);

    const sorted = [...panel.elements].sort((a, b) => a.zIndex - b.zIndex);

    for (const el of sorted) {
      if (el.type === "character") {
        this.renderCharacter(ctx, el);
      } else if (el.type === "textBalloon") {
        this.renderBalloon(ctx, el);
      }
    }

    ctx.restore();
  }

  private renderCharacter(ctx: CanvasRenderingContext2D, el: PanelElement): void {
    if (!el.avatarId) return;
    const avatar = this.avatarManager.getAvatar(el.avatarId);
    if (!avatar) return;

    this.avatarRenderer.render(ctx, avatar, {
      x: el.x,
      y: el.y,
      scale: el.scale,
      expressionId: el.expressionId,
      poseId: el.poseId,
    });
  }

  private renderBalloon(ctx: CanvasRenderingContext2D, el: PanelElement): void {
    const text = el.text || "";
    const type: BalloonType = el.balloonType || "speech";

    ctx.save();
    ctx.translate(el.x, el.y);
    if (el.scale !== 1) ctx.scale(el.scale, el.scale);

    ctx.font =
      "bold 16px 'Comic Sans MS', 'Chalkboard SE', 'Arial Rounded MT Bold', sans-serif";
    const metrics = ctx.measureText(text);
    const textWidth = Math.max(metrics.width, 40);
    const paddingX = 16;
    const paddingY = 12;
    const balloonW = textWidth + paddingX * 2;
    const balloonH = 28 + paddingY;
    const radius = 14;

    ctx.beginPath();
    if (type === "shout") {
      this.burstRect(ctx, 0, 0, balloonW, balloonH);
    } else {
      this.roundRect(ctx, 0, 0, balloonW, balloonH, radius);
    }

    ctx.fillStyle = type === "whisper" ? "#F0F0F0" : "#FFFFFF";
    ctx.fill();
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = type === "shout" ? 3 : 2.5;
    ctx.stroke();

    if (type === "speech" || type === "shout" || type === "whisper") {
      this.drawTail(ctx, balloonW, balloonH, el.tailDirection || 220);
    } else if (type === "thought") {
      this.drawThoughtBubbles(ctx, balloonW, balloonH);
    }

    ctx.fillStyle = "#1a1a1a";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, balloonW / 2, balloonH / 2);

    ctx.restore();
  }

  private roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ): void {
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  private burstRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number
  ): void {
    const spikes = 12;
    const cx = x + w / 2;
    const cy = y + h / 2;
    const rx = w / 2 + 6;
    const ry = h / 2 + 6;

    ctx.moveTo(cx + rx, cy);
    for (let i = 0; i < spikes; i++) {
      const angle = (i / spikes) * Math.PI * 2;
      const r = i % 2 === 0 ? 1 : 0.75;
      ctx.lineTo(cx + Math.cos(angle) * rx * r, cy + Math.sin(angle) * ry * r);
    }
    ctx.closePath();
  }

  private drawTail(
    ctx: CanvasRenderingContext2D,
    balloonW: number,
    balloonH: number,
    angleDeg: number
  ): void {
    const angle = (angleDeg * Math.PI) / 180;
    const startX = balloonW * 0.35;
    const startY = balloonH;
    const len = 22;

    ctx.beginPath();
    ctx.moveTo(startX - 8, startY - 2);
    ctx.lineTo(startX + Math.cos(angle) * len, startY + Math.sin(angle) * len);
    ctx.lineTo(startX + 8, startY - 2);
    ctx.closePath();

    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = 2.5;
    ctx.stroke();
  }

  private drawThoughtBubbles(
    ctx: CanvasRenderingContext2D,
    balloonW: number,
    balloonH: number
  ): void {
    const positions = [
      { x: balloonW * 0.3, y: balloonH + 10, r: 6 },
      { x: balloonW * 0.22, y: balloonH + 22, r: 4 },
      { x: balloonW * 0.15, y: balloonH + 32, r: 2.5 },
    ];

    for (const b of positions) {
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }
}
