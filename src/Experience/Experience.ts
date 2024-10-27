import * as THREE from "three";

import { Sizes } from "./Utils/Sizes";
import { Time } from "./Utils/Time";
import type { Camera } from "./Camera";
import type { Renderer } from "./Renderer";
import { World } from "./World/World";
// import { Environment } from "./World/Environment";
import { Resources } from "./Utils/Resources";
import { sources } from "./sources";
import { UiDebug } from "./Utils/UiDebug";

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
  //_________________________________
  private _scene: THREE.Scene = new THREE.Scene();
  //_________________________________
  //
  private _resources: Resources = new Resources(sources);
  // --------------------------------
  // Camera is it's own thing
  // It will use Experience singleton instance under the hood
  //  BUT DON'T TRY TO INITIALIZE IT INSIDE CONSTRUCTOR (You will get range error)
  private _camera: Camera | null = null;
  private _renderer: Renderer | null = null;
  private _world: World | null = null;
  // private _environment: Environment | null = null;
  //
  // ---------------------------------------------------------
  // ---------------------------------------------------------
  private _debug_ui: UiDebug;

  // ---------------------------------------------------------
  // ---------------------------------------------------------

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

    // ----------------------------------
    // ----------------------------------
    this._debug_ui = new UiDebug();
    // ----------------------------------
    // ----------------------------------

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
    // make sure that you first update
    // camera and then renderer to awoid some bugs
    if (this._camera) {
      this._camera.update();
    }
    if (this._renderer) {
      this._renderer.update();
    }
    if (this._world) {
      this._world.update();
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
  get resources() {
    return this._resources;
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
  get world() {
    return this._world;
  }
  set world(world: World | null) {
    this._world = world;
  }
  /* get environment() {
    return this._environment;
  }
  set environment(environment: Environment | null) {
    this._environment = environment;
  } */
  // ------------------------------
}
