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

  //
  private _resources: Experience["_resources"];
  //

  // @ts-expect-error initialized with method
  private _environmentMap: {
    texture: Experience["_resources"]["_items"][string];
    intensity: number;
    // this doesn't exist anymore I think
    // encoding: THREE.sRGBEncoding;
  };

  public static getInstance() {
    if (!Environment.instance) {
      Environment.instance = new Environment();
    }

    return Environment.instance;
  }

  private constructor() {
    //
    this._experience = Experience.getInstance();

    this._resources = this._experience.resources;

    this._scene = this._experience.scene;

    // setup
    this.setSunLight();

    this._resources.on("file-ready", () => {
      this.setEnvironmentMap();
    });

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
  get resources() {
    return this._resources;
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

  // --------------------------------------------------
  // --------------------------------------------------
  private setEnvironmentMap() {
    console.log("environmentMap Set");
    console.log(this._resources.items);
    this._environmentMap = {
      texture: this._resources.items["environmentMapTexture"],
      intensity: 0.4,
      // this doesn't exist anymore
      // encoding: THREE.sRGBEncoding
    };

    if (this._environmentMap.texture instanceof THREE.Texture) {
      this._scene.environment = this._environmentMap.texture;
    }
  }
}
