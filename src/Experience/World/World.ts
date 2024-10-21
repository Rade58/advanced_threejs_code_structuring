import * as THREE from "three";
import { Experience } from "../Experience";
import { Environment } from "./Environment";

export class World {
  //
  private static instance: World | null = null;
  //

  private _experience: Experience;
  private _scene: Experience["_scene"];

  /**
   * @description instatiate this at the end of the constructor
   */
  private _environment: Environment;

  //

  public static getInstance() {
    if (!World.instance) {
      World.instance = new World();
    }

    return World.instance;
  }

  private constructor() {
    this._experience = Experience.getInstance();
    this._scene = this._experience.scene;

    // ------------- Adding test mesh ----------------
    const testMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      // new THREE.MeshBasicMaterial({ wireframe: true })
      new THREE.MeshStandardMaterial() // visible if light
    );
    this._scene.add(testMesh);
    // -----------------------------------------------

    this._environment = Environment.getInstance();
    console.log("World instatiated.");
  }

  get experience() {
    return this._experience;
  }
  get scene() {
    return this._scene;
  }
  get environment() {
    return this._environment;
  }
}
