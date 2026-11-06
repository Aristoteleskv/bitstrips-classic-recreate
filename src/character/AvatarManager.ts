/**
 * AvatarManager
 * Handles creation, modification, saving and loading of Bitstrips-style avatars.
 */

import {
  Avatar,
  AvatarParts,
  BodyType,
  Gender,
  PartInstance,
  PartCategory,
} from "../types";

export class AvatarManager {
  private avatars: Map<string, Avatar> = new Map();

  createAvatar(options: {
    name?: string;
    gender?: Gender;
    bodyType?: BodyType;
    skinTone?: string;
  } = {}): Avatar {
    const now = Date.now();
    const id = `avatar_${now}_${Math.random().toString(36).slice(2, 9)}`;

    const avatar: Avatar = {
      id,
      name: options.name || "New Character",
      createdAt: now,
      updatedAt: now,
      bodyType: options.bodyType || "average",
      skinTone: options.skinTone || "#F5D0A9",
      gender: options.gender || "neutral",
      parts: this.createDefaultParts(options.gender || "neutral"),
      defaultExpression: "neutral",
      defaultPose: "standing",
    };

    this.avatars.set(id, avatar);
    return avatar;
  }

  private createDefaultParts(gender: Gender): AvatarParts {
    const base = (partId: string): PartInstance => ({
      partId,
      visible: true,
      scale: 1,
      offsetX: 0,
      offsetY: 0,
      rotation: 0,
    });

    return {
      head: base("head_basic_01"),
      hairFront: base(gender === "female" ? "hair_front_medium_01" : "hair_front_short_01"),
      hairBack: base(gender === "female" ? "hair_back_medium_01" : "hair_back_short_01"),
      eyes: base("eyes_basic_01"),
      eyebrows: base("eyebrows_basic_01"),
      nose: base("nose_basic_01"),
      mouth: base("mouth_neutral_01"),
      ears: base("ears_basic_01"),
      body: base("body_average_01"),
      top: base(gender === "female" ? "top_tshirt_f_01" : "top_tshirt_m_01"),
      bottom: base(gender === "female" ? "bottom_pants_f_01" : "bottom_pants_m_01"),
      shoes: base("shoes_sneakers_01"),
      accessories: [],
    };
  }

  getAvatar(id: string): Avatar | undefined {
    return this.avatars.get(id);
  }

  getAllAvatars(): Avatar[] {
    return Array.from(this.avatars.values());
  }

  setPart(
    avatarId: string,
    category: keyof AvatarParts,
    partInstance: PartInstance
  ): Avatar | null {
    const avatar = this.avatars.get(avatarId);
    if (!avatar) return null;
    if (category === "accessories") return null;
    (avatar.parts as any)[category] = {
      ...partInstance,
      visible: partInstance.visible ?? true,
    };
    avatar.updatedAt = Date.now();
    return avatar;
  }

  addAccessory(avatarId: string, accessory: PartInstance): Avatar | null {
    const avatar = this.avatars.get(avatarId);
    if (!avatar) return null;
    avatar.parts.accessories.push(accessory);
    avatar.updatedAt = Date.now();
    return avatar;
  }

  removeAccessory(avatarId: string, partId: string): Avatar | null {
    const avatar = this.avatars.get(avatarId);
    if (!avatar) return null;
    avatar.parts.accessories = avatar.parts.accessories.filter(
      (a) => a.partId !== partId
    );
    avatar.updatedAt = Date.now();
    return avatar;
  }

  setPartColor(
    avatarId: string,
    category: keyof AvatarParts,
    colorSlot: string,
    color: string
  ): Avatar | null {
    const avatar = this.avatars.get(avatarId);
    if (!avatar) return null;
    if (category === "accessories") return null;
    const part = (avatar.parts as any)[category] as PartInstance;
    if (!part) return null;
    if (!part.colorOverrides) part.colorOverrides = {};
    part.colorOverrides[colorSlot] = color;
    avatar.updatedAt = Date.now();
    return avatar;
  }

  setSkinTone(avatarId: string, skinTone: string): Avatar | null {
    const avatar = this.avatars.get(avatarId);
    if (!avatar) return null;
    avatar.skinTone = skinTone;
    avatar.updatedAt = Date.now();
    return avatar;
  }

  setBodyType(avatarId: string, bodyType: BodyType): Avatar | null {
    const avatar = this.avatars.get(avatarId);
    if (!avatar) return null;
    avatar.bodyType = bodyType;
    avatar.updatedAt = Date.now();
    return avatar;
  }

  setDefaultExpression(avatarId: string, expressionId: string): Avatar | null {
    const avatar = this.avatars.get(avatarId);
    if (!avatar) return null;
    avatar.defaultExpression = expressionId;
    avatar.updatedAt = Date.now();
    return avatar;
  }

  setDefaultPose(avatarId: string, poseId: string): Avatar | null {
    const avatar = this.avatars.get(avatarId);
    if (!avatar) return null;
    avatar.defaultPose = poseId;
    avatar.updatedAt = Date.now();
    return avatar;
  }

  toJSON(avatarId: string): string | null {
    const avatar = this.avatars.get(avatarId);
    if (!avatar) return null;
    return JSON.stringify(avatar, null, 2);
  }

  fromJSON(json: string): Avatar | null {
    try {
      const data = JSON.parse(json) as Avatar;
      this.avatars.set(data.id, data);
      return data;
    } catch (e) {
      console.error("Failed to parse avatar JSON", e);
      return null;
    }
  }

  deleteAvatar(avatarId: string): boolean {
    return this.avatars.delete(avatarId);
  }
}
