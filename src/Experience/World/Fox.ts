import * as THREE from "three";
import type { GLTF } from "three/examples/jsm/Addons.js";
import type { GUI } from "lil-gui";

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
    // action: THREE.AnimationAction;
    actions: {
      idle: THREE.AnimationAction;
      walking: THREE.AnimationAction;
      running: THREE.AnimationAction;
    };
  };
  //

  //
  //
  private _debugui: Experience["_debug_ui"];
  //
  // public debugFolder: Record<string, any> = {};
  public debugFolder: GUI | null = null;
  public debugSettings = {
    "animation type": "stop" as "idle" | "running" | "walking" | "stop",
    play: false,
    "current animation": "stop" as "idle" | "running" | "walking" | "stop",
  };
  //

  constructor() {
    this._experience = Experience.getInstance();
    this._resources = this._experience.resources;
    this._scene = this._experience.scene;
    this._time = this._experience.time;

    //
    //
    this._debugui = this._experience.debugui;
    //
    //
    if (this._debugui.is_active_hash && this._debugui.gui) {
      this.debugFolder = this._debugui.gui.addFolder("fox");
    }

    //
    //
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
      // action: mixer.clipAction(this._resource.animations[0]),
      actions: {
        idle: mixer.clipAction(this._resource.animations[0]),
        walking: mixer.clipAction(this._resource.animations[1]),
        running: mixer.clipAction(this._resource.animations[2]),
      },
    };
    // this._animation.action.play();

    // All of this logic is different than how author of the workshop did it
    // especially how he used logic around crossFadeFrom
    // I think he divided logic into few methods
    // Maybe I'm going to do his way too

    if (this._debugui.is_active_hash && this._debugui.gui && this.debugFolder) {
      this.debugFolder
        .add(this.debugSettings, "animation type", {
          idle: "idle",
          running: "running",
          walking: "walking",
          stop: "stop",
        })
        .onChange((type: "idle" | "running" | "walking" | "stop") => {
          console.log(this.debugSettings["current animation"], type);
          if (this.debugSettings["current animation"] !== type) {
            if (
              type === "stop" &&
              this.debugSettings["current animation"] !== "stop"
            ) {
              this._animation.actions[
                this.debugSettings["current animation"]
              ].stop();
              this.debugSettings["current animation"] = "stop";
              return;
            }

            if (type !== "stop") {
              if (this.debugSettings["current animation"] !== "stop") {
                this._animation.actions[type].reset();
                this._animation.actions[type].play();
                this._animation.actions[type].crossFadeFrom(
                  this._animation.actions[
                    this.debugSettings["current animation"]
                  ],
                  3,
                  false
                );
                /* this._animation.actions[this.debugSettings["current animation"]]
                  .stop();
                 */
              } else {
                this._animation.actions[type].reset();
                this._animation.actions[type].play();
                /* this._animation.actions[type].crossFadeFrom(
                  this._animation.actions[
                    this.debugSettings["current animation"]
                  ],
                  1,
                  true
                ); */
              }
              this.debugSettings["current animation"] = type;
            }
          }
        });

      /*  this.debugFolder
        .add(this.debugSettings, "play")
        .name("play/pause")
        .onChange((val: boolean) => {
          if (val) {
            this._animation.actions[
              this.debugSettings["animation type"]
            ].play();
          } else {
            this._animation.actions[
              this.debugSettings["animation type"]
            ].stop();
          }
        }); */
    }
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
  //
  get animation() {
    return this._animation;
  }
  //
}
