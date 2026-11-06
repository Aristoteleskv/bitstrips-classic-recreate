/**
 * AssetLibrary — Expanded classic Bitstrips-style parts
 */
import { Part, Expression, Pose, PartCategory, BodyType } from "../types";

export class AssetLibrary {
  private parts: Map<string, Part> = new Map();
  private expressions: Map<string, Expression> = new Map();
  private poses: Map<string, Pose> = new Map();

  constructor() {
    this.seedClassicAssets();
  }

  getPart(id: string): Part | undefined {
    return this.parts.get(id);
  }

  getPartsByCategory(category: PartCategory): Part[] {
    return Array.from(this.parts.values()).filter((p) => p.category === category);
  }

  getAllParts(): Part[] {
    return Array.from(this.parts.values());
  }

  registerPart(part: Part): void {
    this.parts.set(part.id, part);
  }

  getExpression(id: string): Expression | undefined {
    return this.expressions.get(id);
  }

  getAllExpressions(): Expression[] {
    return Array.from(this.expressions.values());
  }

  getPose(id: string): Pose | undefined {
    return this.poses.get(id);
  }

  getAllPoses(): Pose[] {
    return Array.from(this.poses.values());
  }

  private seedClassicAssets(): void {
    const R = (
      id: string,
      category: PartCategory,
      name: string,
      layers: any[],
      defaultColors: Record<string, string>,
      colorSlots: string[],
      zIndex: number
    ) =>
      this.registerPart({
        id,
        category,
        name,
        tags: [],
        layers,
        defaultColors,
        colorSlots,
        zIndex,
      });

    // Head
    R("head_basic_01", "head", "Basic Head", [
      {
        id: "head_base",
        type: "shape",
        pathData:
          "M50,8 C22,8 6,35 6,68 C6,105 22,138 50,138 C78,138 94,105 94,68 C94,35 78,8 50,8 Z",
        colorSlot: "skin",
      },
    ], { skin: "#F5D0A9" }, ["skin"], 60);

    // Hair fronts
    R("hair_front_short_01", "hairFront", "Short", [
      { id: "hf", type: "shape", pathData: "M18,38 C25,18 40,10 50,10 C60,10 75,18 82,38 L78,52 C65,32 35,32 22,52 Z", colorSlot: "hair" },
    ], { hair: "#2C1E1E" }, ["hair"], 90);
    R("hair_front_medium_01", "hairFront", "Medium", [
      { id: "hf", type: "shape", pathData: "M14,42 C22,15 38,6 52,8 C68,6 82,18 88,42 L84,62 C70,28 40,28 16,58 Z", colorSlot: "hair" },
    ], { hair: "#5C3A21" }, ["hair"], 90);
    R("hair_front_long_01", "hairFront", "Long", [
      { id: "hf", type: "shape", pathData: "M12,40 C20,12 38,4 50,5 C65,4 82,15 90,42 L86,70 C72,30 35,28 14,65 Z", colorSlot: "hair" },
    ], { hair: "#3B2F2F" }, ["hair"], 90);
    R("hair_front_spiky_01", "hairFront", "Spiky", [
      { id: "hf", type: "shape", pathData: "M20,50 L25,20 L35,45 L45,12 L55,45 L65,15 L75,45 L82,25 L85,50 L78,58 C65,35 35,35 22,58 Z", colorSlot: "hair" },
    ], { hair: "#1A1A1A" }, ["hair"], 90);
    R("hair_front_curly_01", "hairFront", "Curly", [
      { id: "hf", type: "shape", pathData: "M15,55 C10,30 25,8 50,8 C75,8 90,30 85,55 C78,40 60,25 50,25 C40,25 22,40 15,55 Z", colorSlot: "hair" },
    ], { hair: "#2C1A0E" }, ["hair"], 90);

    // Hair backs
    R("hair_back_short_01", "hairBack", "Short Back", [
      { id: "hb", type: "shape", pathData: "M16,48 C25,25 40,18 50,18 C60,18 75,25 84,48 L80,78 C65,55 35,55 20,78 Z", colorSlot: "hair" },
    ], { hair: "#2C1E1E" }, ["hair"], 10);
    R("hair_back_medium_01", "hairBack", "Medium Back", [
      { id: "hb", type: "shape", pathData: "M10,45 C20,18 38,10 50,10 C62,10 80,18 90,45 L88,100 C70,70 30,70 12,100 Z", colorSlot: "hair" },
    ], { hair: "#5C3A21" }, ["hair"], 10);
    R("hair_back_long_01", "hairBack", "Long Back", [
      { id: "hb", type: "shape", pathData: "M8,42 C18,15 38,6 50,6 C64,6 84,16 92,42 L95,130 C75,95 25,95 5,130 Z", colorSlot: "hair" },
    ], { hair: "#3B2F2F" }, ["hair"], 10);
    R("hair_back_spiky_01", "hairBack", "Spiky Back", [
      { id: "hb", type: "shape", pathData: "M18,48 L22,22 L32,42 L42,15 L52,40 L62,18 L72,42 L80,25 L85,50 L80,75 C65,55 35,55 20,75 Z", colorSlot: "hair" },
    ], { hair: "#1A1A1A" }, ["hair"], 10);
    R("hair_back_curly_01", "hairBack", "Curly Back", [
      { id: "hb", type: "shape", pathData: "M12,50 C8,25 25,5 50,5 C75,5 92,25 88,50 C95,70 85,95 70,100 C55,90 45,90 30,100 C15,95 5,70 12,50 Z", colorSlot: "hair" },
    ], { hair: "#2C1A0E" }, ["hair"], 10);

    // Eyes
    R("eyes_basic_01", "eyes", "Basic Eyes", [
      { id: "ewl", type: "shape", pathData: "M28,58 C28,50 36,46 44,50 C48,53 48,63 44,66 C36,70 28,66 28,58 Z", colorSlot: "eyeWhite" },
      { id: "ewr", type: "shape", pathData: "M56,58 C56,50 64,46 72,50 C76,53 76,63 72,66 C64,70 56,66 56,58 Z", colorSlot: "eyeWhite" },
      { id: "pl", type: "shape", pathData: "M36,58 A5,5.5 0 1,1 36.1,58 Z", colorSlot: "iris" },
      { id: "pr", type: "shape", pathData: "M64,58 A5,5.5 0 1,1 64.1,58 Z", colorSlot: "iris" },
    ], { eyeWhite: "#FFFFFF", iris: "#3D2914" }, ["eyeWhite", "iris"], 70);

    R("eyes_big_01", "eyes", "Big Eyes", [
      { id: "ewl", type: "shape", pathData: "M26,56 C26,46 36,40 46,46 C52,50 52,64 46,68 C36,74 26,68 26,56 Z", colorSlot: "eyeWhite" },
      { id: "ewr", type: "shape", pathData: "M54,56 C54,46 64,40 74,46 C80,50 80,64 74,68 C64,74 54,68 54,56 Z", colorSlot: "eyeWhite" },
      { id: "pl", type: "shape", pathData: "M36,56 A6,6.5 0 1,1 36.1,56 Z", colorSlot: "iris" },
      { id: "pr", type: "shape", pathData: "M64,56 A6,6.5 0 1,1 64.1,56 Z", colorSlot: "iris" },
    ], { eyeWhite: "#FFFFFF", iris: "#2A5A8A" }, ["eyeWhite", "iris"], 70);

    // Eyebrows
    R("eyebrows_basic_01", "eyebrows", "Basic", [
      { id: "bl", type: "shape", pathData: "M26,46 Q38,40 48,46", colorSlot: "brow" },
      { id: "br", type: "shape", pathData: "M52,46 Q62,40 74,46", colorSlot: "brow" },
    ], { brow: "#2C1E1E" }, ["brow"], 75);
    R("eyebrows_angry_01", "eyebrows", "Angry", [
      { id: "bl", type: "shape", pathData: "M26,48 Q38,42 48,50", colorSlot: "brow" },
      { id: "br", type: "shape", pathData: "M52,50 Q62,42 74,48", colorSlot: "brow" },
    ], { brow: "#2C1E1E" }, ["brow"], 75);

    // Nose
    R("nose_basic_01", "nose", "Basic", [
      { id: "n", type: "shape", pathData: "M47,72 Q52,82 57,72", colorSlot: "skin" },
    ], { skin: "#F5D0A9" }, ["skin"], 72);

    // Mouths
    R("mouth_neutral_01", "mouth", "Neutral", [{ id: "m", type: "shape", pathData: "M38,98 Q50,102 62,98", colorSlot: "lip" }], { lip: "#C27A7A" }, ["lip"], 73);
    R("mouth_smile_01", "mouth", "Smile", [{ id: "m", type: "shape", pathData: "M36,95 Q50,112 64,95", colorSlot: "lip" }], { lip: "#C27A7A" }, ["lip"], 73);
    R("mouth_grin_01", "mouth", "Grin", [{ id: "m", type: "shape", pathData: "M34,94 Q50,118 66,94 L64,98 Q50,112 36,98 Z", colorSlot: "lip" }], { lip: "#C27A7A" }, ["lip"], 73);
    R("mouth_sad_01", "mouth", "Sad", [{ id: "m", type: "shape", pathData: "M38,105 Q50,95 62,105", colorSlot: "lip" }], { lip: "#C27A7A" }, ["lip"], 73);
    R("mouth_open_01", "mouth", "Open", [{ id: "m", type: "shape", pathData: "M42,95 Q50,115 58,95 Q50,108 42,95 Z", colorSlot: "lip" }], { lip: "#C27A7A" }, ["lip"], 73);

    // Ears
    R("ears_basic_01", "ears", "Basic", [
      { id: "el", type: "shape", pathData: "M8,68 C2,75 2,88 10,92 C14,80 12,72 8,68 Z", colorSlot: "skin" },
      { id: "er", type: "shape", pathData: "M92,68 C98,75 98,88 90,92 C86,80 88,72 92,68 Z", colorSlot: "skin" },
    ], { skin: "#F5D0A9" }, ["skin"], 55);

    // Body
    R("body_average_01", "body", "Average", [
      { id: "t", type: "shape", pathData: "M34,138 L66,138 L72,225 L28,225 Z", colorSlot: "skin" },
    ], { skin: "#F5D0A9" }, ["skin"], 20);

    // Tops
    R("top_tshirt_m_01", "top", "T-Shirt", [{ id: "s", type: "shape", pathData: "M28,138 L72,138 L78,210 L22,210 Z", colorSlot: "primary" }], { primary: "#4A90D9" }, ["primary"], 30);
    R("top_hoodie_01", "top", "Hoodie", [
      { id: "hb", type: "shape", pathData: "M26,138 L74,138 L80,215 L20,215 Z", colorSlot: "primary" },
      { id: "hh", type: "shape", pathData: "M30,138 Q50,155 70,138 L65,150 Q50,160 35,150 Z", colorSlot: "secondary" },
    ], { primary: "#2C3E50", secondary: "#34495E" }, ["primary", "secondary"], 30);
    R("top_shirt_collar_01", "top", "Collared Shirt", [
      { id: "s", type: "shape", pathData: "M28,138 L72,138 L76,212 L24,212 Z", colorSlot: "primary" },
      { id: "c", type: "shape", pathData: "M32,138 L50,152 L68,138 L62,148 L50,158 L38,148 Z", colorSlot: "secondary" },
    ], { primary: "#FFFFFF", secondary: "#E8E8E8" }, ["primary", "secondary"], 30);
    R("top_dress_01", "top", "Dress", [{ id: "d", type: "shape", pathData: "M30,138 L70,138 L82,250 L18,250 Z", colorSlot: "primary" }], { primary: "#E85A71" }, ["primary"], 30);

    // Bottoms
    R("bottom_pants_01", "bottom", "Pants", [{ id: "p", type: "shape", pathData: "M28,210 L72,210 L74,285 L54,285 L50,240 L46,285 L26,285 Z", colorSlot: "primary" }], { primary: "#2C3E50" }, ["primary"], 25);
    R("bottom_jeans_01", "bottom", "Jeans", [{ id: "p", type: "shape", pathData: "M28,210 L72,210 L75,288 L53,288 L50,245 L47,288 L25,288 Z", colorSlot: "primary" }], { primary: "#3B5998" }, ["primary"], 25);
    R("bottom_skirt_01", "bottom", "Skirt", [{ id: "p", type: "shape", pathData: "M28,210 L72,210 L80,265 L20,265 Z", colorSlot: "primary" }], { primary: "#9B59B6" }, ["primary"], 25);

    // Shoes
    R("shoes_sneakers_01", "shoes", "Sneakers", [
      { id: "sl", type: "shape", pathData: "M26,285 L48,285 L50,300 L24,300 Z", colorSlot: "primary" },
      { id: "sr", type: "shape", pathData: "M52,285 L74,285 L76,300 L50,300 Z", colorSlot: "primary" },
    ], { primary: "#FFFFFF" }, ["primary"], 22);

    // Accessories
    R("glasses_round_01", "glasses", "Round Glasses", [
      { id: "ll", type: "shape", pathData: "M30,58 A10,9 0 1,1 30.1,58 Z", colorSlot: "frame" },
      { id: "lr", type: "shape", pathData: "M70,58 A10,9 0 1,1 70.1,58 Z", colorSlot: "frame" },
      { id: "br", type: "shape", pathData: "M40,58 L60,58", colorSlot: "frame" },
    ], { frame: "#1A1A1A" }, ["frame"], 95);
    R("glasses_rect_01", "glasses", "Rect Glasses", [
      { id: "ll", type: "shape", pathData: "M26,50 L44,50 L44,66 L26,66 Z", colorSlot: "frame" },
      { id: "lr", type: "shape", pathData: "M56,50 L74,50 L74,66 L56,66 Z", colorSlot: "frame" },
      { id: "br", type: "shape", pathData: "M44,58 L56,58", colorSlot: "frame" },
    ], { frame: "#222222" }, ["frame"], 95);
    R("hat_cap_01", "hat", "Cap", [
      { id: "ct", type: "shape", pathData: "M20,40 Q50,8 80,40 L78,50 Q50,25 22,50 Z", colorSlot: "primary" },
      { id: "cb", type: "shape", pathData: "M15,48 L85,48 L88,55 L12,55 Z", colorSlot: "secondary" },
    ], { primary: "#E74C3C", secondary: "#C0392B" }, ["primary", "secondary"], 100);
    R("hat_beanie_01", "hat", "Beanie", [
      { id: "b", type: "shape", pathData: "M18,45 Q50,5 82,45 L78,58 Q50,30 22,58 Z", colorSlot: "primary" },
    ], { primary: "#8E44AD" }, ["primary"], 100);

    // Expressions
    this.expressions.set("neutral", { id: "neutral", name: "Neutral", mouthPartId: "mouth_neutral_01" });
    this.expressions.set("happy", { id: "happy", name: "Happy", mouthPartId: "mouth_smile_01" });
    this.expressions.set("grin", { id: "grin", name: "Grin", mouthPartId: "mouth_grin_01" });
    this.expressions.set("sad", { id: "sad", name: "Sad", mouthPartId: "mouth_sad_01" });
    this.expressions.set("surprised", { id: "surprised", name: "Surprised", mouthPartId: "mouth_open_01", eyePartId: "eyes_big_01" });
    this.expressions.set("angry", { id: "angry", name: "Angry", mouthPartId: "mouth_neutral_01", eyebrowPartId: "eyebrows_angry_01" });

    // Poses
    this.poses.set("standing", { id: "standing", name: "Standing", bodyTransforms: {} });
    this.poses.set("waving", { id: "waving", name: "Waving", bodyTransforms: { rightArm: { rotation: -40, y: -8 } } });
  }
}
