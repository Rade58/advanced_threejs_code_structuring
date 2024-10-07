import { Robot } from "./robot";

export class FlyingRobot extends Robot {
  private _wings: number;
  constructor(name: string, legs: number, wings: number) {
    super(name, legs);
    this._wings = wings;
  }

  get wings() {
    return this._wings;
  }

  doFlying() {
    console.log(`Do some flying ${this.name}`);
  }

  // override
  greet() {
    console.log("-----------------------------------------");
    console.log(`Flying greet with ${this._wings} wings`);
    super.greet();
    console.log("-----------------------------------------");
  }
}
