import { EventEmitter } from "./EventEmitter";

export class Sizes extends EventEmitter {
  private _width: number;
  private _height: number;
  private _pixelRatio: number;
  constructor() {
    super();
    console.log("Sizes instatiated.");
    //
    // Setup
    this._width = window.innerWidth;
    this._height = window.innerHeight;
    this._pixelRatio = Math.min(window.devicePixelRatio, 2);

    // resize event
    //
    window.addEventListener("resize", (e) => {
      // console.log("Sizes: 'resizing'");
      this._width = window.innerWidth;
      this._height = window.innerHeight;
      this._pixelRatio = Math.min(window.devicePixelRatio, 2);

      // console.log(this._width, this._height, this._pixelRatio);

      this.trigger("sizes-resize");
    });
  }
  // --------- methods --------

  // ------- getters ----------
  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  get pixelRatio() {
    return this._pixelRatio;
  }
  // ------------------------
}
