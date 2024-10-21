import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { EventEmitter } from "./EventEmitter";
import { type sourcesType } from "../sources";

export class Resources extends EventEmitter {
  private _sources: sourcesType;

  //
  /**
   * @description loaded resources
   */
  private _items = {};
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
}
