import * as THREE from "three";
import { Experience } from "./Experience";
import { Camera } from "./Camera";

export class Renderer {
  private static instance: Renderer | null = null;

  // @ts-expect-error has no initializer (I'm intializing with method and ts doesn't like that)
  private _ins: THREE.WebGLRenderer;

  private _experience: Experience;

  //
  //
  private _canvas: Experience["_canvas"];
  private _sizes: Experience["_sizes"];
  private _scene: Experience["_scene"];
  private _camera: Camera;

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
    this._camera = Camera.getInstance();
    this._canvas = this._experience.canvas;
    this._scene = this._experience.scene;
    this._sizes = this._experience.sizes;

    this.setWebGlRenderer();

    console.log("Renderer instatiated.");
  }
  // ------------------------------------------------
  // ------------------------------------------------
  private setWebGlRenderer() {
    // console.log(this._canvas);

    this._ins = new THREE.WebGLRenderer({
      canvas: this._canvas,
      antialias: true,
      // alpha: true,
    });
    //
    // this._ins.setClearColor(0xffffff);
    this._ins.toneMapping = THREE.CineonToneMapping;
    this._ins.toneMappingExposure = 1.75;
    this._ins.shadowMap.enabled = true;
    this._ins.shadowMap.type = THREE.PCFSoftShadowMap;
    this._ins.setSize(this._sizes.width, this._sizes.height);
    this._ins.setPixelRatio(Math.min(this._sizes.pixelRatio, 2));
    // these one don't exist anymore
    // this._ins.physicalCorrectLight = true;
    // also this one doesn't exist
    // this._ins.outputEncoding = sRGBEncoding;
    // maybe this one is its replacement
    this._ins.outputColorSpace = THREE.SRGBColorSpace;
    //

    this._ins.render(this._scene, this._camera.ins);
  }

  // ------------------------------- -----------------
  // ------
  /**
   * @description getter for threejs instance of your renderer
   */
  get ins() {
    return this._ins;
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
  // -------------------------------------------------
  // -------------------------------------------------
  resize() {
    console.log("renderer resize");
    this._ins.setSize(this._sizes.width, this._sizes.height);
    this._ins.setPixelRatio(Math.min(this._sizes.pixelRatio, 2));
  }
  update() {
    this._ins.render(this._scene, this._camera.ins);
  }
}
