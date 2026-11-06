/**
 * ComicManager
 * Handles creation and management of Bitstrips-style comics (panels + elements).
 */

import { Comic, Panel, PanelElement, BalloonType } from "../types";

export class ComicManager {
  private comics: Map<string, Comic> = new Map();

  createComic(title = "Nova Tirinha"): Comic {
    const now = Date.now();
    const comic: Comic = {
      id: `comic_${now}`,
      title,
      panels: [this.createPanel()],
      createdAt: now,
      updatedAt: now,
    };
    this.comics.set(comic.id, comic);
    return comic;
  }

  createPanel(width = 400, height = 300): Panel {
    return {
      id: `panel_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      width,
      height,
      background: "#FFFFFF",
      elements: [],
    };
  }

  getComic(id: string): Comic | undefined {
    return this.comics.get(id);
  }

  getAllComics(): Comic[] {
    return Array.from(this.comics.values());
  }

  addPanel(comicId: string, width = 400, height = 300): Panel | null {
    const comic = this.comics.get(comicId);
    if (!comic) return null;
    if (comic.panels.length >= 6) return null;

    const panel = this.createPanel(width, height);
    comic.panels.push(panel);
    comic.updatedAt = Date.now();
    return panel;
  }

  removePanel(comicId: string, panelId: string): boolean {
    const comic = this.comics.get(comicId);
    if (!comic) return false;
    const idx = comic.panels.findIndex((p) => p.id === panelId);
    if (idx === -1) return false;
    comic.panels.splice(idx, 1);
    comic.updatedAt = Date.now();
    return true;
  }

  addCharacterToPanel(
    comicId: string,
    panelId: string,
    avatarId: string,
    x = 100,
    y = 40,
    scale = 0.9,
    expressionId = "neutral"
  ): PanelElement | null {
    const panel = this.findPanel(comicId, panelId);
    if (!panel) return null;

    const element: PanelElement = {
      id: `el_${Date.now()}`,
      type: "character",
      x,
      y,
      scale,
      rotation: 0,
      zIndex: 10,
      avatarId,
      expressionId,
      poseId: "standing",
    };

    panel.elements.push(element);
    this.touch(comicId);
    return element;
  }

  addBalloonToPanel(
    comicId: string,
    panelId: string,
    text: string,
    balloonType: BalloonType = "speech",
    x = 200,
    y = 30
  ): PanelElement | null {
    const panel = this.findPanel(comicId, panelId);
    if (!panel) return null;

    const element: PanelElement = {
      id: `el_${Date.now()}`,
      type: "textBalloon",
      x,
      y,
      scale: 1,
      rotation: 0,
      zIndex: 50,
      balloonType,
      text,
      tailDirection: 220,
    };

    panel.elements.push(element);
    this.touch(comicId);
    return element;
  }

  updateElement(
    comicId: string,
    panelId: string,
    elementId: string,
    updates: Partial<PanelElement>
  ): PanelElement | null {
    const panel = this.findPanel(comicId, panelId);
    if (!panel) return null;
    const el = panel.elements.find((e) => e.id === elementId);
    if (!el) return null;
    Object.assign(el, updates);
    this.touch(comicId);
    return el;
  }

  removeElement(comicId: string, panelId: string, elementId: string): boolean {
    const panel = this.findPanel(comicId, panelId);
    if (!panel) return false;
    const idx = panel.elements.findIndex((e) => e.id === elementId);
    if (idx === -1) return false;
    panel.elements.splice(idx, 1);
    this.touch(comicId);
    return true;
  }

  toJSON(comicId: string): string | null {
    const comic = this.comics.get(comicId);
    if (!comic) return null;
    return JSON.stringify(comic, null, 2);
  }

  fromJSON(json: string): Comic | null {
    try {
      const data = JSON.parse(json) as Comic;
      this.comics.set(data.id, data);
      return data;
    } catch {
      return null;
    }
  }

  private findPanel(comicId: string, panelId: string): Panel | null {
    const comic = this.comics.get(comicId);
    if (!comic) return null;
    return comic.panels.find((p) => p.id === panelId) || null;
  }

  private touch(comicId: string): void {
    const comic = this.comics.get(comicId);
    if (comic) comic.updatedAt = Date.now();
  }
}
