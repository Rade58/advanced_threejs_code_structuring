// import * as THREE from "three";
import { Experience } from "../Experience";
import { Environment } from "./Environment";
import { Floor } from "./Floor";
import { Fox } from "./Fox";

export class World {
  //
  private static instance: World | null = null;
  //

  private _experience: Experience;
  private _scene: Experience["_scene"];

  private _resources: Experience["_resources"];

  /**
   * @description instatiate this at the end of the constructor
   */
  // @ts-expect-error using method to instatiate
  private _environment: Environment;

  //

  // @ts-expect-error using method to instatiate
  private _floor: Floor;
  //
  // @ts-expect-error using method to instatiate
  private _fox: Fox;

  public static getInstance() {
    if (!World.instance) {
      World.instance = new World();
    }

    return World.instance;
  }

  private constructor() {
    this._experience = Experience.getInstance();

    this._resources = this._experience.resources;

    this._scene = this._experience.scene;

    // ------------- Adding test mesh ----------------
    // -----------------------------------------------
    // -----------------------------------------------

    /* const testMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      // new THREE.MeshBasicMaterial({ wireframe: true })
      new THREE.MeshStandardMaterial() // visible if light
    ); */
    // this._scene.add(testMesh);
    // -----------------------------------------------
    // -----------------------------------------------
    // -----------------------------------------------
    // listening to 'file-ready' event
    this._resources.on("file-ready", () => {
      console.log("resources are ready");
      // setup
      //
      // -----------------------------------------------
      // if you put these after you add environment
      // environment map won't apply so we do it beforehand
      this._floor = new Floor();
      this._fox = new Fox();

      // -----------------------------------------------

      //
      this._environment = new Environment();
    });
    // -----------------------------------------------
    // -----------------------------------------------

    // as you see above, instead of here
    // we instatiated environment in event handler above
    // this._environment = Environment.getInstance();
    //
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
  // --------------------------------------------------
  // --------------------------------------------------
  // --------------------------------------------------
  // --------------------------------------------------
  get floor() {
    return this._floor;
  }
  get fox() {
    return this._fox;
  }
}
