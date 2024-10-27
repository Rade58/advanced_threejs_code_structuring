import * as THREE from "three";
import type { GLTF } from "three/examples/jsm/Addons.js";
import { Experience } from "../Experience";

export class Fox {
  private _experience: Experience;
  private _scene: Experience["_scene"];
  private _resources: Experience["_resources"];
  private _time: Experience["_time"];

  private _resource: GLTF;
  // @ts-expect-error instatiated within method
  private _model: GLTF["scene"];
  //
  // @ts-expect-error instatiated within method
  private _animation: {
    mixer: THREE.AnimationMixer;
    action: THREE.AnimationAction;
  };
  //

  constructor() {
    this._experience = Experience.getInstance();
    this._resources = this._experience.resources;
    this._scene = this._experience.scene;
    this._time = this._experience.time;

    //
    this._resource = this._resources.items["foxModel"] as GLTF;
    this.setModel();
    this.setAnimation();
    //

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
  setAnimation() {
    //
    console.log("setting animation");

    const mixer = new THREE.AnimationMixer(this._model);
    this._animation = {
      mixer,
      action: mixer.clipAction(this._resource.animations[0]),
    };

    this._animation.action.play();
  }

  //
  update() {
    // console.log("updating the fox");

    this._animation.mixer.update(this._time.delta * 0.001);
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
  get resource() {
    return this._resource;
  }
  get model() {
    return this._model;
  }
}
