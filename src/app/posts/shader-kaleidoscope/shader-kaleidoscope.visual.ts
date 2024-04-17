import vertexShaderSource from './shader-kaleidoscope.vert?raw';
import fragmentShaderSource from './shader-kaleidoscope.frag?raw';

import { debounce } from '@shared/utils/general.utils';
import { resizeCanvas } from '@shared/utils/canvas.utils';
import { rand } from '@shared/utils/math.utils';

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
    const positionAttributeLocation: number = this.gl.getAttribLocation(
      this.program,
      'a_position'
    );
    const resolutionUniformLocation = this.gl.getUniformLocation(
      this.program,
      'u_resolution'
    );
    const colorUniformLocation = this.gl.getUniformLocation(
      this.program,
      'u_color'
    );

    const positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

    const positions = new Float32Array([
      10, 20, 80, 20, 10, 30, 10, 30, 80, 20, 80, 30
    ]);

    this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);
    this.gl.viewport(0, 0, width, height);

    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    this.gl.useProgram(this.program);
    this.gl.enableVertexAttribArray(positionAttributeLocation);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

    this.gl.vertexAttribPointer(
      positionAttributeLocation,
      2,
      this.gl.FLOAT,
      false,
      0,
      0
    );
    this.gl.uniform2f(resolutionUniformLocation, width, height);

    for (let i = 0; i < 50; i++) {
      this.drawRect({
        x: rand(0, width),
        y: rand(0, height),
        width: rand(0, width),
        height: rand(0, height)
      });

      this.gl.uniform4f(
        colorUniformLocation,
        Math.random(),
        Math.random(),
        Math.random(),
        1
      );
      this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }
  }

  private drawRect({
    x,
    y,
    width,
    height
  }: {
    x: number;
    y: number;
    width: number;
    height: number;
  }): void {
    const x1 = x;
    const x2 = x + width;
    const y1 = y;
    const y2 = y + height;
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
      this.gl.STATIC_DRAW
    );
  }
}

export default ShaderKaleidoscopeVisual;
