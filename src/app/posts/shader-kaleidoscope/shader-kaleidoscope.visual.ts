import vertexShaderSource from './shader-kaleidoscope.vert?raw';
import fragmentShaderSource from './shader-kaleidoscope.frag?raw';

import { WebG } from '@shared/classes/webg.class';
import { ResizeCallback } from '@shared/models/shared.models';
import { Matrix } from '@shared/classes/matrix.class';
import { noise } from '@shared/utils/noise.utils';

class ShaderKaleidoscopeVisual {
  private canvasEl: HTMLCanvasElement;
  private gl: WebGLRenderingContext;
  private program: WebGLProgram;

  private webG: WebG;

  constructor(canvasEl: HTMLCanvasElement) {
    this.canvasEl = canvasEl;

    const resizeCallback: ResizeCallback = ({ height, width }) => {
      this.webG.startAnimation((i: number) => {
        this.draw(width, height, i);
      });
    };

    this.webG = new WebG(this.canvasEl, {
      vertexShaderSource,
      fragmentShaderSource,
      resizeCallback
    });

    this.program = this.webG.getProgram();
    this.gl = this.webG.getGl();
  }

  private draw(width: number, height: number, i: number): void {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.useProgram(this.program);

    this.setPosition(width, height);
    this.setColor(i);
    this.setMatrix(width, height, i);
  }

  private setColor(i: number): void {
    const colorLocation = this.gl.getAttribLocation(this.program, 'a_color');
    const colorBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);

    // prettier-ignore
    const [r1, r2, b1, b2, g1, g2] = [
      noise(1, 1, i / 100), noise(2, 2, i / 100), 
      noise(3, 3, i / 100), noise(4, 4, i / 100), 
      noise(5, 5, i / 100), noise(6, 6, i / 100)
    ];

    // prettier-ignore
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
      r1, b1, g1, 1,
      r1, b1, g1, 1,
      r1, b1, g1, 1,
      r2, b2, g2, 1,
      r2, b2, g2, 1,
      r2, b2, g2, 1
    ]), this.gl.STATIC_DRAW);

    this.gl.enableVertexAttribArray(colorLocation);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);

    this.gl.vertexAttribPointer(colorLocation, 4, this.gl.FLOAT, false, 0, 0);
  }

  private setPosition(width: number, height: number): void {
    const positionLocation = this.gl.getAttribLocation(
      this.program,
      'a_position'
    );

    const positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

    // prettier-ignore
    const trianglePosition = new Matrix([
      [width / 2, 0], 
      [width, height], 
      [0, height]
    ]);

    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      trianglePosition.raw,
      this.gl.STATIC_DRAW
    );

    this.gl.enableVertexAttribArray(positionLocation);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

    this.gl.vertexAttribPointer(
      positionLocation,
      2,
      this.gl.FLOAT,
      false,
      0,
      0
    );
  }

  private setMatrix(width: number, height: number, i: number): void {
    const matrixLocation = this.gl.getUniformLocation(this.program, 'u_matrix');
    const matrix = Matrix.projection(width, height)
      .scale(0.5)
      .rotate(i % 360);
    this.gl.uniformMatrix3fv(matrixLocation, false, matrix.raw);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
  }
}

export default ShaderKaleidoscopeVisual;
