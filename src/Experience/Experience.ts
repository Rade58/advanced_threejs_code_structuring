import * as THREE from "three";

import { Sizes } from "./Utils/Sizes";
import { Time } from "./Utils/Time";
import type { Camera } from "./Camera";
import type { Renderer } from "./Renderer";

/**
 * @description Singleton (constructor is private, use getInstance method to instatiate)
 */
export class Experience {
  // Singleton related
  private static instance: Experience | null = null;
  //

  //
  // @ts-expect-error (Singleton doesn't make easy to me that _canvas always needs to be defined)
  private _canvas: HTMLCanvasElement;
  //
  private _sizes: Sizes;
  private _time: Time;
  // --------------------------------
  // Camera is it's own thing
  // It will use Experience singleton instance under the hood
  //  BUT DON'T TRY TO INITIALIZE IT INSIDE CONSTRUCTOR (You will get range error)
  private _camera: Camera | null = null;

  //
  private _renderer: Renderer | null = null;

  //_________________________________
  private _scene: THREE.Scene = new THREE.Scene();
  //_________________________________

  //

  // Singleton related - constructor and getInstance have same
  // parameters
  public static getInstance(canvas?: HTMLCanvasElement | null): Experience {
    if (!Experience.instance) {
      Experience.instance = new Experience(canvas);
    }

    // if there is no canvas element at this point
    // we can throw (this is why I decided to define expected error because I don't want to define _canvas as optional)
    if (!Experience.instance._canvas) {
      throw new Error("Canvas is missing!");
    }

    return Experience.instance;
  }
  // Singleton related - constructor must be private
  private constructor(canvas?: HTMLCanvasElement | null) {
    // global access
    // also means you should only make single instance
    globalThis.experience = this;
    if (canvas) {
      this._canvas = canvas;
    }

    //
    this._sizes = new Sizes();
    this._time = new Time();
    // Camera is it's own thing
    // It will use Experience singleton instance under the hood
    // If I would use this we would exceed call stack (we would have range error)
    // this._camera = new Camera(this._canvas);
    // therfore we will link camera with setter

    this.sizes.on("sizes-resize", () => {
      // console.log("Sizes-Resize event");
      this.resize();
    });

    //
    this.time.on("time-tick", () => {
      // console.log("Time-Tick event");
      this.update();
    });

    console.log("Experience instantiated.");
  }

  // -------------------------------------------------
  // -------------------------------------------------
  private resize() {
    //
    console.log("Resize occurs");
    // const aspect = this.sizes.width / this.sizes.height;
    // console.log({ aspect });
    if (this._camera) {
      // console.log(this._camera);
      this._camera.resize();
    }

    if (this._renderer) {
      this._renderer.resize();
    }
  }
  private update() {
    // console.log("update on time-tick");
    if (this._camera) {
      this._camera.update();
    }
    if (this._renderer) {
      this._renderer.update();
    }
  }
  // -------------------------------------------------
  // -------------------------------------------------

  // ---------- Getters -----------
  get canvas() {
    return this._canvas;
  }
  get sizes() {
    return this._sizes;
  }
  get time() {
    return this._time;
  }
  // -------------------
  get scene() {
    return this._scene;
  }

  // -------------------
  get camera() {
    return this._camera;
  }
  set camera(camera: Camera | null) {
    this._camera = camera;
  }
  get renderer() {
    return this._renderer;
  }
  set renderer(renderer: Renderer | null) {
    this._renderer = renderer;
  }
  // ------------------------------
}
