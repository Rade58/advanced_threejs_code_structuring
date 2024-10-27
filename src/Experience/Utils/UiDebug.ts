import GUI from "lil-gui";

const DEBUG_HASH = "#debug";

/**
 * @description Singleton of our debug ui
 */
export class UiDebug {
  private static instance: UiDebug | null;

  private _hash: string;
  private _is_active_hash: boolean = false;

  private _gui: GUI | null = null;

  public static getInstance() {
    if (!UiDebug.instance) {
      UiDebug.instance = new UiDebug();
    }

    return UiDebug.instance;
  }

  private constructor() {
    //
    console.log("DebugUI instantiated!");

    this._hash = window.location.hash;

    if (this._hash === DEBUG_HASH) {
      this._is_active_hash = true;
    }

    if (this._is_active_hash) {
      this._gui = new GUI({});
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
  get gui() {
    return this._gui;
  }
}
