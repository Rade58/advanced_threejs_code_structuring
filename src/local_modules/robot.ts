export class Robot {
  private _name: string = "Paully";
  private _legs: number;
  constructor(name: string, legs: number) {
    this._name = name;
    this._legs = legs;
  }

  greet() {
    console.log(`Hello ${this._name}. How are you.`);
  }

  get name() {
    return this._name;
  }

  get legs() {
    return this._legs;
  }
}
