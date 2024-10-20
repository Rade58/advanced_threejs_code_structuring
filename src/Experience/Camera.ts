import * as THREE from "three";
import { Experience } from "./Experience";
import type { Sizes } from "./Utils/Sizes";
import { OrbitControls } from "three/examples/jsm/Addons.js";

/**
 * @description Wraper around camera related stuff.
 * Don't instatiate it inside Experience, you'll have infinite loop.
 * This is also a singleton
 */
export class Camera {
  //
  private static instance: Camera | null = null;
  //

  private _experience: Experience;
  // @ts-expect-error has no initializer (I'm intializing with method and ts doesn't like that)
  private _camera: THREE.PerspectiveCamera;
  private _canvas: HTMLCanvasElement;
  private _scene: THREE.Scene;
  private _sizes: Sizes;
  // @ts-expect-error has no initializer (I'm intializing with method and ts doesn't like that)
  private _controls: OrbitControls;

  public static getInstance() {
    if (!Camera.instance) {
      Camera.instance = new Camera();
    }

    return Camera.instance;
  }

  private constructor() {
    //
    this._experience = Experience.getInstance();
    this._canvas = this._experience.canvas;
    this._scene = this._experience.scene;
    this._sizes = this._experience.sizes;

    // setting camera instance
    // -------------------------------------------------------
    this.setCameraInstance();
    // setting controls
    // --------------------------------------------------------

    this.setControls();
    // --------------------------------------------------------

    console.log("Camera instatiated.");
  }

  // -------------------------------

  get experience() {
    return this._experience;
  }
  get canvas() {
    return this._canvas;
  }
  get sizes() {
    return this._sizes;
  }
  get controls() {
    return this._controls;
  }
  //

  // ------
  /**
   * @description getter for threejs instance of your camera
   */
  get camera() {
    return this._camera;
  }

  // ------------------------------------------------------------
  // ------------------------------------------------------------
  /**
   * @description Setting instance from threejs (PerspectiveCamera usually).
   * Don't know where I'm going to use this
   */
  private setCameraInstance(
    options = { fov: 35, near: 0.1, far: 100 },
    coords = { x: 6, y: 4, z: 8 }
  ) {
    this._camera = new THREE.PerspectiveCamera(
      // 35,
      options.fov,
      //
      this._experience.sizes.width / this._experience.sizes.height,
      options.near,
      options.far
    );

    this._camera.position.set(coords.x, coords.y, coords.z);
    this._scene.add(this._camera);
  }
  // ------
  /**
   * @description probably not going to use this one ever
   */
  private setControls() {
    this._controls = new OrbitControls(this._camera, this._canvas);
    this._controls.enableDamping = true;
  }
  // ------------------------------------------------------------
  // ------------------------------------------------------------
  resize() {
    console.log("Resize from camera");
    this._camera.aspect = this._sizes.width / this._sizes.height;
    this._camera.updateProjectionMatrix();
  }
  update() {
    // console.log("camera updated");
    this._controls.update();
  }
}
