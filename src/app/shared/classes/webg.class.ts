import { ResizeCallback } from '@shared/models/shared.models';
import { debounce } from '../utils/general.utils';
import { resizeCanvas } from '../utils/canvas.utils';

type Shaders = [vertexShaderSource: string, fragmentShaderSource: string];

export class WebG {
  private canvasEl: HTMLCanvasElement;
  private gl: WebGLRenderingContext;
  private program: WebGLProgram;

  private resizeCallback: ResizeCallback;

  constructor(
    canvasEl: HTMLCanvasElement,
    [vertexShaderSource, fragmentShaderSource]: Shaders,
    resizeCallback: ResizeCallback
  ) {
    this.canvasEl = canvasEl;

    console.log(canvasEl);

    this.resizeCallback = debounce(resizeCallback, 100);

    resizeCanvas(this.canvasEl, (values) => {
      this.resizeCallback(values);
    });

    this.init(vertexShaderSource, fragmentShaderSource);
  }

  public getProgram(): WebGLProgram {
    return this.program;
  }

  public getGl(): WebGLRenderingContext {
    return this.gl;
  }

  private init(vertexShaderSource: string, fragmentShaderSource: string): void {
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
}
