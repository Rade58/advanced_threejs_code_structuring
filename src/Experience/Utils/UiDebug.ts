import GUI from "lil-gui";

const DEBUG_HASH = "#debug";

export class UiDebug {
  private _hash: string;
  private _is_active_hash: boolean = false;

  constructor() {
    //
    console.log("DebugUI instantiated!");

    this._hash = window.location.hash;

    if (this._hash === DEBUG_HASH) {
      this._is_active_hash = true;
    }

    console.log({
      current_hash: this.active_hash,
      is_active: this.is_active_hash,
    });
  }

  //
  get active_hash() {
    return this._hash;
  }
  get is_active_hash() {
    return this._is_active_hash;
  }
}
