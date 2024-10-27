import { Experience } from "../Experience";

export class Fox {
  private _experience: Experience;
  private _scene: Experience["_scene"];
  private _resources: Experience["_resources"];

  constructor() {
    this._experience = Experience.getInstance();
    this._resources = this._experience.resources;
    this._scene = this._experience.scene;

    console.log("Fox instatiated");
  }

  //
  //
  get experience() {
    return this._experience;
  }
  get scene() {
    return this._scene;
  }
  get resources() {
    return this._resources;
  }
}
