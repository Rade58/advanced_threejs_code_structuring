import * as THREE from "three";
import { GLTFLoader, type GLTF } from "three/examples/jsm/Addons.js";
import { EventEmitter } from "./EventEmitter";
import { type sourcesType } from "../sources";

export class Resources extends EventEmitter {
  private _sources: sourcesType;

  //
  /**
   * @description loaded resources
   */
  private _items: Record<string, THREE.Texture | THREE.CubeTexture | GLTF> = {};
  /**
   * @description number of sources to be loaded
   */
  private _toLoad: number;
  /**
   * @description number of loaded sources (starts at 0)
   */
  private _loaded: number;
  //
  //
  private _loaders: {
    gltfLoader?: GLTFLoader;
    textureLoader?: THREE.TextureLoader;
    cubeTextureLoader?: THREE.CubeTextureLoader;
  } = {};
  //
  //

  constructor(sources: sourcesType) {
    super();

    // options
    this._sources = sources;
    //
    this._toLoad = this._sources.length;
    this._loaded = 0;
    //

    //
    // setup
    this.setLoaders();
    // console.log(this._sources);

    this.startLoading();

    console.log("Resources instatiated");
  }

  get sources() {
    return this._sources;
  }

  get items() {
    return this._items;
  }
  get toLoad() {
    return this._toLoad;
  }
  get loaded() {
    return this._loaded;
  }

  //
  private setLoaders() {
    console.log("Setting loaders");

    if (!this._loaders) {
      this._loaders = {};
    }

    this._loaders.gltfLoader = new GLTFLoader();
    this._loaders.textureLoader = new THREE.TextureLoader();
    this._loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
  }

  private startLoading() {
    console.log("_start loading_!");
    console.log({ sources: this._sources });

    for (const source of this._sources) {
      if (
        source.type === "gltfModel" &&
        this._loaders.gltfLoader &&
        typeof source.path === "string"
      ) {
        this._loaders.gltfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      }
      if (
        source.type === "cubeTexture" &&
        this._loaders.cubeTextureLoader &&
        typeof source.path !== "string"
      ) {
        this._loaders.cubeTextureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      }
      if (
        source.type === "texture" &&
        this._loaders.textureLoader &&
        typeof source.path === "string"
      ) {
        this._loaders.textureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      }
    }
  }

  // -----------

  private sourceLoaded(
    source: sourcesType[number],
    file: THREE.Texture | THREE.CubeTexture | GLTF
  ) {
    this._items[source.name] = file;
    this._loaded++;
    if (this._loaded === this._toLoad) {
      this.trigger("file-ready");
      console.log("file-ready triggered");
      console.log(this._loaded, this._toLoad, this._items);
    }
  }
}
