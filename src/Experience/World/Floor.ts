import * as THREE from "three";
import { Experience } from "../Experience";

export class Floor {
  private _experience: Experience;
  private _scene: Experience["_scene"];
  private _resources: Experience["_resources"];
  //
  // @ts-expect-error instatiation through method
  private _geometry: THREE.CircleGeometry;
  // @ts-expect-error instatiation through method
  private _material: THREE.MeshStandardMaterial;
  // @ts-expect-error instatiation through method
  private _mesh: THREE.Mesh;

  //
  // Author of the worksop put textures object
  // He just had color and normal
  // but I downloaded different texture with more images
  // @ts-expect-error instatiation through method
  private _textures: {
    ao: THREE.Texture;
    color: THREE.Texture;
    metal: THREE.Texture;
    normal: THREE.Texture;
    rough: THREE.Texture;
    disp: THREE.Texture;
  };
  //

  constructor() {
    this._experience = Experience.getInstance();
    this._scene = this._experience.scene;
    this._resources = this._experience.resources;

    this.setGeometry();
    this.setMaterial();
    this.setTextures()
      .then(() => {
        return this.customizeTextures();
      })
      .then(() => {
        return this.applyTextures();
      })
      .then(() => {
        this.setMesh();
      });

    console.log("Floor instatiated!");
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
    this._geometry = new THREE.CircleGeometry(10, 65);
  }
  setMaterial() {
    this._material = new THREE.MeshStandardMaterial();
  }

  // ------------------------------------------------------------
  // author of the workshop only defined one method called setTextures
  // but I decided to devide them into three methods
  // setTextures, customizeTextures, applyTextures

  /**
   * @description I decided to use promises in here
   * just for me it is more readable
   */
  setTextures() {
    return new Promise((resolve, reject) => {
      // this._resources.on("file-ready", () => { // we did this in World class
      const items = this._resources.items;

      if (
        /* items["groundColorTexture"] &&
        items["groundNormalGLTexture"] &&
        items["groundAOTexture"] &&
        items["groundRoughTexture"] &&
        items["groundDispTexture"] &&
        items["groundMetalTexture"] &&
         */
        items["groundAOTexture"] instanceof THREE.Texture &&
        items["groundColorTexture"] instanceof THREE.Texture &&
        items["groundMetalTexture"] instanceof THREE.Texture &&
        items["groundNormalTexture"] instanceof THREE.Texture &&
        items["groundRoughTexture"] instanceof THREE.Texture &&
        items["groundDispTexture"] instanceof THREE.Texture
      ) {
        this._textures = {
          ao: items["groundAOTexture"],
          color: items["groundColorTexture"],
          metal: items["groundMetalTexture"],
          normal: items["groundNormalTexture"],
          rough: items["groundRoughTexture"],
          disp: items["groundDispTexture"],
        };

        resolve({ ok: true });
      } else {
        reject({ err: "Problem with loading resources" });
      }
      // });
    });
  }

  customizeTextures() {
    if (this._textures) {
      // doesn't work anymore
      // this._texture.color.encoding = THREE.sRGBEncoding

      this._textures.color.repeat.set(1.5, 1.5);
      this._textures.color.wrapS = THREE.RepeatWrapping;
      this._textures.color.wrapT = THREE.RepeatWrapping;

      this._textures.normal.repeat.set(1.5, 1.5);
      this._textures.normal.wrapS = THREE.RepeatWrapping;
      this._textures.normal.wrapT = THREE.RepeatWrapping;
    }

    return Promise.resolve();
  }

  applyTextures() {
    this._material.aoMap = this._textures.ao;
    this._material.map = this._textures.color;
    this._material.metalnessMap = this._textures.metal;
    this._material.normalMap = this._textures.normal;
    this._material.roughnessMap = this._textures.rough;
    this._material.displacementMap = this._textures.disp;

    return Promise.resolve();
  }

  setMesh() {
    this._mesh = new THREE.Mesh(this._geometry, this._material);

    this._mesh.rotation.x = -Math.PI / 2;

    this._scene.add(this._mesh);
  }
}
