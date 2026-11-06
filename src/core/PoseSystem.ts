/**
 * PoseSystem — Limb transforms for classic Bitstrips poses
 */

import { Transform, Pose } from "../types";

export type LimbId =
  | "head"
  | "torso"
  | "leftArm"
  | "rightArm"
  | "leftLeg"
  | "rightLeg";

export const LIMB_ANCHORS: Record<LimbId, { x: number; y: number }> = {
  head: { x: 50, y: 70 },
  torso: { x: 50, y: 160 },
  leftArm: { x: 34, y: 145 },
  rightArm: { x: 66, y: 145 },
  leftLeg: { x: 42, y: 220 },
  rightLeg: { x: 58, y: 220 },
};

export const BUILTIN_POSES: Pose[] = [
  { id: "standing", name: "Standing", bodyTransforms: {} },
  { id: "waving", name: "Waving", bodyTransforms: { rightArm: { rotation: -55, y: -12, x: 4 } } },
  { id: "thinking", name: "Thinking", bodyTransforms: { head: { rotation: 12 }, rightArm: { rotation: -70, y: -28, x: 8 } } },
  { id: "arms_crossed", name: "Arms Crossed", bodyTransforms: { leftArm: { rotation: 25, x: 8, y: 5 }, rightArm: { rotation: -25, x: -8, y: 5 } } },
  { id: "pointing", name: "Pointing", bodyTransforms: { rightArm: { rotation: -20, x: 15, y: -5 } } },
  { id: "shrug", name: "Shrug", bodyTransforms: { leftArm: { rotation: -40, y: -15 }, rightArm: { rotation: 40, y: -15 }, head: { y: 3 } } },
  { id: "running", name: "Running", bodyTransforms: { leftArm: { rotation: 35, y: 5 }, rightArm: { rotation: -35, y: -5 }, leftLeg: { rotation: -20, x: -5 }, rightLeg: { rotation: 20, x: 5 }, torso: { rotation: 5 } } },
  { id: "sitting", name: "Sitting", bodyTransforms: { leftLeg: { rotation: -70, y: -15, x: -5 }, rightLeg: { rotation: -70, y: -15, x: 5 }, torso: { y: 20 }, head: { y: 15 } } },
];

export function applyLimbTransform(
  ctx: CanvasRenderingContext2D,
  limb: LimbId,
  transform: Transform | undefined
): void {
  if (!transform) return;
  const anchor = LIMB_ANCHORS[limb];
  ctx.translate(anchor.x, anchor.y);
  if (transform.rotation) ctx.rotate((transform.rotation * Math.PI) / 180);
  if (transform.scaleX !== undefined || transform.scaleY !== undefined) {
    ctx.scale(transform.scaleX ?? 1, transform.scaleY ?? 1);
  }
  ctx.translate(-anchor.x, -anchor.y);
  if (transform.x || transform.y) ctx.translate(transform.x ?? 0, transform.y ?? 0);
}

export function getPose(id: string): Pose {
  return BUILTIN_POSES.find((p) => p.id === id) || BUILTIN_POSES[0];
}
