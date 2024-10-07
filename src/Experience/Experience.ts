import { Sizes } from "./Utils/Sizes";

export class Experience {
  private _canvas: HTMLCanvasElement;
  private _sizes: Sizes;

  constructor(canvas: HTMLCanvasElement) {
    console.log("Experience instantiated.");
    // global access
    // also means you should only make single instance
    globalThis.experience = this;

    this._canvas = canvas;
    this._sizes = new Sizes();

    this.sizes.on("sizes-resize", () => {
      console.log("Sizes: 'resizing'");
    });
  }

  // ---------- Getters -----------
  get canvas() {
    return this._canvas;
  }
  get sizes() {
    return this._sizes;
  }

  // ------------------------------
}
