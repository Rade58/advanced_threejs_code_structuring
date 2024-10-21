import { Experience } from "../Experience";

export class World {
  //
  private static instance: World | null = null;
  //

  private _experience: Experience;
  private _scene: Experience["_scene"];

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

    console.log("World instatiated.");
  }

  get experience() {
    return this._experience;
  }
  get scene() {
    return this._scene;
  }
}
