import * as THREE from "three";
import { Experience } from "../Experience";
import type { GLTF } from "three/examples/jsm/Addons.js";

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
      this.updateMaterials();
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
    // console.log(this._resources.items);
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
  // ------
  /**
   * @description Using this to make sure envMap did apply on our material
   * Aparently there is a bug where env map doesn't work so we
   * need to use `needsUpdate`
   * in my case envMap aplication on material worked for me without this method
   * but I used this method anyway
   */
  updateMaterials() {
    this._scene.traverse((child) => {
      if (
        child instanceof THREE.Mesh &&
        child.material instanceof THREE.MeshStandardMaterial &&
        this._environmentMap.texture instanceof THREE.Texture
      ) {
        child.material.envMap = this._environmentMap.texture;
        child.material.envMapIntensity = this._environmentMap.intensity;
        child.material.needsUpdate = true;
        console.log("material updated", { child });
      }
    });
  }

  //
  updateEnvMap(options?: {
    texture?: THREE.Texture | THREE.CubeTexture | GLTF;
    intensity: number;
  }) {
    if (!options) return;

    if (options.texture) {
      this._environmentMap.texture = options.texture;
    }

    if (options.intensity) {
      this._environmentMap.intensity = options.intensity;
    }

    this.updateMaterials();
  }
}
