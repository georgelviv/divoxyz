import vertexShaderSource from './shader-kaleidoscope.vert?raw';
import fragmentShaderSource from './shader-kaleidoscope.frag?raw';

import { debounce } from '@shared/utils/general.utils';
import { resizeCanvas } from '@shared/utils/canvas.utils';

class ShaderKaleidoscopeVisual {
  private canvasEl: HTMLCanvasElement;
  private gl: WebGLRenderingContext;
  private program: WebGLProgram;

  constructor(canvasEl: HTMLCanvasElement) {
    this.canvasEl = canvasEl;
    this.init();
    const resizeCallback = debounce((width: number, height: number) => {
      this.draw(width, height);
    }, 100);

    resizeCanvas(this.canvasEl, ({ width, height }) => {
      resizeCallback(width, height);
    });
  }

  private createShader(type: number, source: string): WebGLShader {
    const shader: WebGLShader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    const success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }
    console.log(this.gl.getShaderInfoLog(shader));
    this.gl.deleteShader(shader);
  }

  private createProgram(
    vertexShader: WebGLShader,
    fragmentShader: WebGLShader
  ): WebGLProgram {
    const program: WebGLProgram = this.gl.createProgram();
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);

    const success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
    if (success) {
      return program;
    }

    console.log(this.gl.getProgramInfoLog(program));
    this.gl.deleteProgram(program);
  }

  private init(): void {
    this.gl = this.canvasEl.getContext('webgl');
    const vertexShader = this.createShader(
      this.gl.VERTEX_SHADER,
      vertexShaderSource
    );
    const fragmentShader = this.createShader(
      this.gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );

    this.program = this.createProgram(vertexShader, fragmentShader);
  }

  private draw(width: number, height: number): void {
    const positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array([width / 2, 0, width, height, 0, height]),
      this.gl.STATIC_DRAW
    );

    this.animate(width, height);
  }

  private drawScene(width: number, height: number): void {
    const positionBuffer = this.gl.createBuffer();
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

  private animate(): void {
    this.animationId = requestAnimationFrame(() => {});
  }
}

export default ShaderKaleidoscopeVisual;
