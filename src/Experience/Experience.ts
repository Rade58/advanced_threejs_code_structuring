import * as THREE from "three";

import { Sizes } from "./Utils/Sizes";
import { Time } from "./Utils/Time";
import { Camera } from "./Camera";

/**
 * @description Singleton (constructor is private, use getInstance method to instatiate)
 */
export class Experience {
  // Singleton related
  private static instance: Experience | null = null;
  //

  //
  private _canvas: HTMLCanvasElement;
  //
  private _sizes: Sizes;
  private _time: Time;
  // --------------------------------
  private _camera: Camera;
  //_________________________________
  private _scene: THREE.Scene = new THREE.Scene();
  //_________________________________

  // Singleton related - constructor and getInstance have same
  // parameters
  public static getInstance(canvas: HTMLCanvasElement): Experience {
    if (!Experience.instance) {
      Experience.instance = new Experience(canvas);
    }
    return Experience.instance;
  }
  // Singleton related - constructor must be private
  private constructor(canvas: HTMLCanvasElement) {
    console.log("Experience instantiated.");
    // global access
    // also means you should only make single instance
    globalThis.experience = this;

    this._canvas = canvas;
    //
    this._sizes = new Sizes();
    this._time = new Time();
    //
    this._camera = new Camera();
    //

    this.sizes.on("sizes-resize", () => {
      // console.log("Sizes-Resize event");

      this.resize();
    });

    //
    this.time.on("time-tick", () => {
      // console.log("Time-Tick event");
      this.update();
    });
  }

  // --------- methods --------
  resize() {
    //
    // console.log("Resize occurs");
    const aspect = this.sizes.width / this.sizes.height;

    console.log({ aspect });
  }
  update() {
    console.log("update on time-tick");
  }

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
  // ------------------------------
}
