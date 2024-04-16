import vertexShaderSource from './shader-kaleidoscope.vert?raw';
import fragmentShaderSource from './shader-kaleidoscope.frag?raw';

import { debounce } from '@shared/utils/general.utils';

class ShaderKaleidoscopeVisual {
  private canvasEl: HTMLCanvasElement;
  private gl: WebGLRenderingContext;
  private program: WebGLProgram;

  private height: number;
  private width: number;

  private originalWidth: number;
  private originalHeight: number;

  constructor(canvasEl: HTMLCanvasElement) {
    this.canvasEl = canvasEl;
    this.init();
    const resizeCallback = debounce((width: number, height: number) => {
      console.log(width, height);
      this.draw(width, height);
    }, 100);
    this.handleResize(resizeCallback);
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
    this.gl.uniform2f(resolutionUniformLocation, this.width, this.height);

    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
  }

  private handleResize(
    resizeCallback: (width: number, height: number) => void
  ): void {
    this.originalHeight = this.canvasEl.height;
    this.originalWidth = this.canvasEl.width;
    this.updateScaleRatio();

    const resizeObserver = new ResizeObserver((entries) => {
      const { height, width } = entries[0].contentRect;
      if (!height || !width) {
        return;
      }

      this.originalWidth = width;
      this.originalHeight = height;

      this.updateScaleRatio();
      resizeCallback(this.originalWidth, this.originalHeight);
    });

    resizeObserver.observe(this.canvasEl);
  }

  private updateScaleRatio(): void {
    const ratio = window.devicePixelRatio || 1;

    this.width = this.originalWidth * ratio;
    this.canvasEl.width = this.width;

    this.height = this.originalHeight * ratio;
    this.canvasEl.height = this.height;
  }
}

export default ShaderKaleidoscopeVisual;
