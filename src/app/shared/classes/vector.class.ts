import { polarToCartesian, rand } from '../utils/math.utils';

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

  public divide(magnitude: number): Vector {
    this.x = this.x / magnitude;
    this.y = this.y / magnitude;
    return this;
  }

  public limit(max: number): void {
    const magnitude: number = this.getMagnitude();
    if (magnitude > max ** 2) {
      this.divide(Math.sqrt(magnitude)).multiply(max);
    }
  }

  public getMagnitude(): number {
    return this.x ** 2 + this.y ** 2;
  }

  public copy(): Vector {
    return new Vector(this.x, this.y);
  }
}

export function getVectorFromAngle(
  angle: number,
  magnitude: number = 1
): Vector {
  const [x, y] = polarToCartesian(magnitude, angle);

  return new Vector(x, y);
}
