import * as THREE from "three";
import { Experience } from "./Experience";
import type { Sizes } from "./Utils/Sizes";
import type { Camera } from "./Camera";

export class Renderer {
  private static instance: Renderer | null = null;

  private _experience: Experience;
  //
  private _canvas: HTMLCanvasElement;
  private _sizes: Sizes;
  private _scene: THREE.Scene;
  private _camera: Camera | null;

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
    this._camera = this._experience.camera;
    this._canvas = this._experience.canvas;
    this._scene = this._experience.scene;
    this._sizes = this._experience.sizes;
  }
  // ------------------------------------------------
  // ------------------------------------------------

  // -----------------------
  get experience() {
    return this._experience;
  }
  get camera() {
    return this._camera;
  }
  get canvas() {
    return this._canvas;
  }
  get scene() {
    return this._scene;
  }
  get sizes() {
    return this._sizes;
  }
}
