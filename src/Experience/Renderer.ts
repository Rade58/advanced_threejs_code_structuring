import { Experience } from "./Experience";

export class Renderer {
  private static instance: Renderer | null = null;

  private _experience: Experience;

  // ------------------------------------------------
  // ------------------------------------------------

  public static getInstance() {
    if (!Renderer.instance) {
      Renderer.instance = new Renderer();
    }

    return Renderer.instance;
  }

  private constructor() {
    this._experience = Experience.getInstance();
  }
  // ------------------------------------------------
  // ------------------------------------------------

  // -----------------------
  get experience() {
    return this._experience;
  }
}
