import { angleToRadians } from '@shared/utils/math.utils';

export class Matrix {
  private value: number[][];

  constructor(value: number[][]) {
    this.value = value;
  }

  public multiply(bMatrix: Matrix): Matrix {
    const a = this.value;
    const b = bMatrix.value;

    const c = Matrix.empty().value;
    for (let rowI = 0; rowI < this.value.length; rowI++) {
      const row = this.value[rowI];
      for (let colI = 0; colI < row.length; colI++) {
        let sum = 0;
        for (let k = 0; k < a[0].length; k++) {
          sum += a[rowI][k] * b[k][colI];
        }
        c[rowI][colI] = sum;
      }
    }

    return new Matrix(c);
  }

  public scale(...args: [number] | [number, number]): Matrix {
    if (args.length === 2) {
      return this.multiply(Matrix.scale(args[0], args[1]));
    } else {
      return this.multiply(Matrix.scale(args[0], args[0]));
    }
  }

  public rotate(angleInDegrees: number): Matrix {
    return this.multiply(Matrix.rotate(angleInDegrees));
  }

  public static projection(width: number, height: number): Matrix {
    return new Matrix([
      [2 / width, 0, 0],
      [0, -2 / height, 0],
      [-1, 1, 1]
    ]);
  }

  public static identity(): Matrix {
    return new Matrix([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ]);
  }

  public static empty(): Matrix {
    return new Matrix([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]);
  }

  public static scale(sx: number, sy: number): Matrix {
    return new Matrix([
      [sx, 0, 0],
      [0, sy, 0],
      [0, 0, 1]
    ]);
  }

  public static rotate(angleInDegrees: number): Matrix {
    const c = Math.cos(angleToRadians(angleInDegrees));
    const s = Math.sin(angleToRadians(angleInDegrees));

    return new Matrix([
      [c, -s, 0],
      [s, c, 0],
      [0, 0, 1]
    ]);
  }

  public get raw(): Float32Array {
    return new Float32Array(this.value.flat());
  }
}
