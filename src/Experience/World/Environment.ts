import { Experience } from "../Experience";

export class Environment {
  private static instance: Environment | null = null;

  //
  private _experience: Experience;
  //
  private _scene: Experience["_scene"];

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

    console.log("Environment instatiated");
  }

  // ------------------------------------------------
  get experience() {
    return this._experience;
  }
  get scene() {
    return this._scene;
  }
}
