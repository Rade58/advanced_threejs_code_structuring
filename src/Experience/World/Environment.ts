import * as THREE from "three";
import { Experience } from "../Experience";
import type { GLTF } from "three/examples/jsm/Addons.js";
import type { GUI } from "lil-gui";

export class Environment {
  // private static instance: Environment | null = null;

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

  private _debugui: Experience["_debug_ui"];

  public debugFolder: GUI | null = null;
  public debugSettings = {
    intensity: 0.4,
  };

  constructor() {
    //
    this._experience = Experience.getInstance();

    this._resources = this._experience.resources;

    this._scene = this._experience.scene;

    //
    this._debugui = this._experience.debugui;

    if (this._debugui.is_active_hash && this._debugui.gui) {
      this.debugFolder = this._debugui.gui.addFolder("Environment");
    }
    //

    // setup
    this.setSunLight();

    // this._resources.on("file-ready", () => {
    this.setEnvironmentMap();
    this.updateMaterials();
    // });

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
    this._sunLight = new THREE.DirectionalLight(0xffffff, 2);
    // this._sunLight = new THREE.DirectionalLight(0xffffff, 4);
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
      // intensity: 0.4,
      intensity: 0.4,
      // this doesn't exist anymore
      // encoding: THREE.sRGBEncoding
    };

    if (this._environmentMap.texture instanceof THREE.Texture) {
      this._scene.environment = this._environmentMap.texture;
    }

    // debug
    if (this._debugui.is_active_hash && this._debugui.gui && this.debugFolder) {
      this.debugFolder
        .add(this._environmentMap, "intensity")
        .name("envMap.intensity")
        .min(0)
        .max(4)
        .step(0.001)
        .onChange(() => {
          this.updateMaterials();
          console.log("update materials");
        });

      this.debugFolder
        .add(this._sunLight.position, "x")
        .name("sunlight position x")
        .min(-5)
        .max(10)
        .step(0.001);
      /* .onChange(() => {
          this.updateMaterials();
          console.log("update materials");
        }); */

      this.debugFolder
        .add(this._sunLight.position, "y")
        .name("sunlight position y")
        .min(-5)
        .max(10)
        .step(0.001);
      /* .onChange(() => {
          this.updateMaterials();
          console.log("update materials");
        }); */

      this.debugFolder
        .add(this._sunLight.position, "z")
        .name("sunlight position z")
        .min(-5)
        .max(10)
        .step(0.001);
      /* .onChange(() => {
          this.updateMaterials();
          console.log("update materials");
        }); */
    }

    //
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
