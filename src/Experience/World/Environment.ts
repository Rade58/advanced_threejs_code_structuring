import * as THREE from "three";
import { Experience } from "../Experience";

export class Environment {
  private static instance: Environment | null = null;

  //
  private _experience: Experience;
  //
  private _scene: Experience["_scene"];
  // -------------------------------------------------
  // @ts-expect-error inatialization with method setSunLight in constructor
  private _sunLight: THREE.DirectionalLight;
  //

  public static getInstance() {
    if (!Environment.instance) {
      Environment.instance = new Environment();
    }

    return Environment.instance;
  }

  private constructor() {
    //
    this._experience = Experience.getInstance();
    this._scene = this._experience.scene;

    // setup
    this.setSunLight();
    //

    console.log("Environment instatiated");
  }

  // ------------------------------------------------
  get experience() {
    return this._experience;
  }
  get scene() {
    return this._scene;
  }

  // setup method
  private setSunLight() {
    this._sunLight = new THREE.DirectionalLight(0xffffff, 4);
    this._sunLight.castShadow = true;
    this._sunLight.shadow.camera.far = 15;
    this._sunLight.shadow.mapSize.set(1024, 1024);
    this._sunLight.shadow.normalBias = 0.05;
    this._sunLight.position.set(3.5, 2, -1.25);

    this._scene.add(this._sunLight);

    console.log("Sunlight set");
  }
}
