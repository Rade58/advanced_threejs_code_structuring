import * as THREE from "three";
import type { GLTF } from "three/examples/jsm/Addons.js";
import { Experience } from "../Experience";

export class Fox {
  private _experience: Experience;
  private _scene: Experience["_scene"];
  private _resources: Experience["_resources"];

  private _resource: GLTF;
  // @ts-expect-error instatiated within method
  private _model: GLTF["scene"];
  //

  constructor() {
    this._experience = Experience.getInstance();
    this._resources = this._experience.resources;
    this._scene = this._experience.scene;

    //
    this._resource = this._resources.items["foxModel"] as GLTF;
    this.setModel();
    //

    console.log("Fox instatiated");
  }

  //
  //
  private setModel() {
    this._model = this._resource.scene;
    //
    // console.log({ model: this._model });
    //
    this._model.scale.set(0.02, 0.02, 0.02);
    this._model.position.set(0, 0.4, 0);
    this._scene.add(this._model);
    //

    this._model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        // child.recShadow = true;
      }
    });
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
  get resource() {
    return this._resource;
  }
  get model() {
    return this._model;
  }
}
