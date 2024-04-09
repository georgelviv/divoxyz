export class Vector {
  public x: number;
  public y: number;

  private id: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.id = rand(0, 10e10);
  }

  public add(v: Vector): void {
    this.x = this.x + v.x;
    this.y = this.y + v.y;
  }

  public multiply(v: number): void {
    this.x = this.x * v;
    this.y = this.y * v;
  }

  public print(): void {
    console.log(`Vector ${this.id}: x=${this.x}, y=${this.y}`);
  }
}

export function angleToRadians(angle: number): number {
  return angle / (180 / Math.PI);
}

export function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function polarToCartesian(
  r: number,
  angle: number
): [x: number, y: number] {
  const x: number = r * Math.cos(angle);
  const y: number = r * Math.sin(angle);

  return [x, y];
}
