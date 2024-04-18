import vertexShaderSource from './shader-kaleidoscope.vert?raw';
import fragmentShaderSource from './shader-kaleidoscope.frag?raw';

import { WebG } from '@shared/classes/webg.class';

class ShaderKaleidoscopeVisual {
  private canvasEl: HTMLCanvasElement;
  private gl: WebGLRenderingContext;
  private program: WebGLProgram;

  private webG: WebG;

  constructor(canvasEl: HTMLCanvasElement) {
    this.canvasEl = canvasEl;
    this.webG = new WebG(
      this.canvasEl,
      [vertexShaderSource, fragmentShaderSource],
      ({ height, width }) => {
        this.draw(width, height);
      }
    );

    this.program = this.webG.getProgram();
    this.gl = this.webG.getGl();
  }

  private draw(width: number, height: number): void {
    const positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array([width / 2, 0, width, height, 0, height]),
      this.gl.STATIC_DRAW
    );

    const positionLocation = this.gl.getAttribLocation(
      this.program,
      'a_position'
    );
    const matrixLocation = this.gl.getUniformLocation(this.program, 'u_matrix');

    this.gl.viewport(0, 0, width, height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.useProgram(this.program);

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

    const matrix = new Float32Array([
      2 / width,
      0,
      0,
      0,
      -2 / height,
      0,
      -1,
      1,
      1
    ]);
    this.gl.uniformMatrix3fv(matrixLocation, false, matrix);
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
  }
}

export default ShaderKaleidoscopeVisual;
