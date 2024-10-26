import { Experience } from "../Experience";

export class Floor {
  private _experience: Experience;
  private _scene: Experience["_scene"];
  private _resources: Experience["_resources"];

  constructor() {
    this._experience = Experience.getInstance();
    this._scene = this._experience.scene;
    this._resources = this._experience.resources;

    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();

    console.log("Floor instatiated");
  }

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

  //
  //
  setGeometry() {
    //
  }
  setTextures() {
    //
  }
  setMaterial() {
    //
  }
  setMesh() {
    //
  }
}
