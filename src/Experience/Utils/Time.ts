import { EventEmitter } from "./EventEmitter";

export class Time extends EventEmitter {
  //
  private _start: ReturnType<typeof Date.now> = Date.now();
  private _current: ReturnType<typeof Date.now>;
  private _elapsed: number = 0;
  private _delta: number = 16;
  // I added this
  // might eliminate this (if it prevents smooth animation)
  private _paused: boolean = false;
  //
  constructor() {
    super();
    // Setup
    // this._start = Date.now();
    this._current = this._start;
    // this._elapsed = 0;
    // this._delta = 16; // can create bugs if you se 0 initially

    // I added this
    // this._paused = false; (don't need this since I defined initial value)
    // we should define initial values also for the rest
    // since we are not using constructor parameters here
    //
    window.requestAnimationFrame(() => {
      // might eliminate `if` this (if it prevents smooth animation)
      if (!this._paused) {
        this.tick();
      }
    });

    console.log("Time instatiated.");
  }

  // --------- methods --------
  private tick() {
    // we will call this from constructor initially
    // it is private because we won't allow using it outside of the class
    // console.log("tick");

    // notice now why we didn't define delta to be 0 at the beggining
    // we defined 16 at the beggining

    const currentTime = Date.now();
    this._delta = currentTime - this._current;
    this._current = currentTime;
    this._elapsed = this._current - this._start;

    //
    this.trigger("time-tick");
    //
    window.requestAnimationFrame(() => {
      // console.log(this._current);
      // might eliminate `if` (if it prevents smooth animation)
      if (!this._paused) {
        this.tick();
      }
    });
  }
  // ------- getters ----------
  get start() {
    return this._start;
  }
  get current() {
    return this._current;
  }
  get elapsed() {
    return this._elapsed;
  }
  get delta() {
    return this._delta;
  }
  // -------- methods I added (not the workshop author) ----------
  // I added this specific methods (probably not going to use the ever) but I added the m to pause ticking during development at some time
  // because I don't want to
  pause() {
    this._paused = true;
  }
  unpause() {
    this._paused = false;
  }
}
