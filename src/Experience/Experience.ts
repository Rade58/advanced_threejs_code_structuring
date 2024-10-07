import { Sizes } from "./Utils/Sizes";
import { Time } from "./Utils/Time";

export class Experience {
  private _canvas: HTMLCanvasElement;
  //
  private _sizes: Sizes;
  private _time: Time;
  //

  constructor(canvas: HTMLCanvasElement) {
    console.log("Experience instantiated.");
    // global access
    // also means you should only make single instance
    globalThis.experience = this;

    this._canvas = canvas;
    //
    this._sizes = new Sizes();
    this._time = new Time();
    //

    this.sizes.on("sizes-resize", () => {
      // console.log("Sizes-Resize event");

      this.resize();
    });

    //
    this.time.on("time-tick", () => {
      // console.log("Time-Tick event");
      this.update();
    });
  }

  // --------- methods --------
  resize() {
    //
    // console.log("Resize occurs");
    const aspect = this.sizes.width / this.sizes.height;

    console.log({ aspect });
  }
  update() {
    console.log("update on time-tick");
  }

  // ---------- Getters -----------
  get canvas() {
    return this._canvas;
  }
  get sizes() {
    return this._sizes;
  }
  get time() {
    return this._time;
  }

  // ------------------------------
}
