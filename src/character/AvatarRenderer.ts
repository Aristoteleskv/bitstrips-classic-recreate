/**
 * AvatarRenderer
 * Renders a Bitstrips-style avatar onto a Canvas 2D context.
 * Follows the classic layer order strictly.
 */

import {
  Avatar,
  Part,
  PartInstance,
  PartCategory,
  CLASSIC_RENDER_ORDER,
} from "../types";
import { AssetLibrary } from "./AssetLibrary";

export class AvatarRenderer {
  private library: AssetLibrary;

  constructor(library: AssetLibrary) {
    this.library = library;
  }

  render(
    ctx: CanvasRenderingContext2D,
    avatar: Avatar,
    options: {
      x?: number;
      y?: number;
      scale?: number;
      expressionId?: string;
      poseId?: string;
    } = {}
  ): void {
    const scale = options.scale ?? 1;
    const offsetX = options.x ?? 0;
    const offsetY = options.y ?? 0;
    const expressionId = options.expressionId ?? avatar.defaultExpression;

    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.scale(scale, scale);

    const skinTone = avatar.skinTone;

    for (const category of CLASSIC_RENDER_ORDER) {
      this.renderCategory(ctx, avatar, category, expressionId, skinTone);
    }

    for (const acc of avatar.parts.accessories) {
      this.renderPartInstance(ctx, acc, skinTone);
    }

    ctx.restore();
  }

  private renderCategory(
    ctx: CanvasRenderingContext2D,
    avatar: Avatar,
    category: PartCategory,
    expressionId: string,
    skinTone: string
  ): void {
    let partInstance: PartInstance | undefined;

    if (category === "mouth" || category === "eyes" || category === "eyebrows") {
      const expression = this.library.getExpression(expressionId);
      if (expression) {
        if (category === "mouth" && expression.mouthPartId) {
          partInstance = { partId: expression.mouthPartId, visible: true };
        } else if (category === "eyes" && expression.eyePartId) {
          partInstance = { partId: expression.eyePartId, visible: true };
        } else if (category === "eyebrows" && expression.eyebrowPartId) {
          partInstance = { partId: expression.eyebrowPartId, visible: true };
        }
      }
    }

    if (!partInstance) {
      const key = category as keyof typeof avatar.parts;
      const value = avatar.parts[key];
      if (Array.isArray(value)) return;
      partInstance = value as PartInstance | undefined;
    }

    if (!partInstance || partInstance.visible === false) return;
    this.renderPartInstance(ctx, partInstance, skinTone);
  }

  private renderPartInstance(
    ctx: CanvasRenderingContext2D,
    instance: PartInstance,
    skinTone: string
  ): void {
    const part = this.library.getPart(instance.partId);
    if (!part) return;

    ctx.save();

    if (instance.offsetX || instance.offsetY) {
      ctx.translate(instance.offsetX || 0, instance.offsetY || 0);
    }
    if (instance.rotation) {
      ctx.rotate((instance.rotation * Math.PI) / 180);
    }
    if (instance.scale && instance.scale !== 1) {
      ctx.scale(instance.scale, instance.scale);
    }

    for (const layer of part.layers) {
      this.drawLayer(ctx, part, layer, instance, skinTone);
    }

    ctx.restore();
  }

  private drawLayer(
    ctx: CanvasRenderingContext2D,
    part: Part,
    layer: any,
    instance: PartInstance,
    skinTone: string
  ): void {
    let color = "#000000";

    if (layer.colorSlot) {
      if (instance.colorOverrides && instance.colorOverrides[layer.colorSlot]) {
        color = instance.colorOverrides[layer.colorSlot];
      } else if (part.defaultColors[layer.colorSlot]) {
        color = part.defaultColors[layer.colorSlot];
      }
      if (layer.colorSlot === "skin") {
        color = skinTone;
      }
    }

    ctx.globalAlpha = layer.opacity ?? 1;
    if (layer.blendMode) {
      ctx.globalCompositeOperation = layer.blendMode;
    }

    if (layer.type === "shape" && layer.pathData) {
      const path = new Path2D(layer.pathData);
      ctx.fillStyle = color;
      ctx.fill(path);
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = 2.5;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.stroke(path);
    }
  }

  getBounds(scale = 1): { width: number; height: number } {
    return {
      width: 100 * scale,
      height: 300 * scale,
    };
  }
}
