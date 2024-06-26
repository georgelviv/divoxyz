import { ResizeCallback } from '@shared/models/shared.models';
import { resizeCanvas } from '../utils/canvas.utils';
import { debounce } from '../utils/general.utils';

type DrawCallback = (height: number, width: number) => void;

export class Canva {
  private isActive: boolean = false;
  private animationId: number;

  private canvasEl: HTMLCanvasElement;
  private originalWidth: number;
  private originalHeight: number;
  private width: number;
  private height: number;
  private ctx: CanvasRenderingContext2D;

  private resizeCallback: ResizeCallback;

  constructor(canvasEl: HTMLCanvasElement, resizeCallback: ResizeCallback) {
    this.canvasEl = canvasEl;
    this.originalHeight = canvasEl.height;
    this.originalWidth = canvasEl.width;
    this.resizeCallback = debounce(resizeCallback, 100);

    this.ctx = canvasEl.getContext('2d')!;

    resizeCanvas(this.canvasEl, (values) => {
      this.originalHeight = values.originalHeight;
      this.originalWidth = values.originalWidth;
      this.height = values.height;
      this.width = values.width;

      this.ctx.scale(values.ratio, values.ratio);

      this.resizeCallback(values);
    });
  }

  public background(color: string): void {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  public startAnimation(draw: DrawCallback): void {
    this.stopAnimation();

    this.isActive = true;
    this.update(draw);
  }

  public clear(): void {
    this.ctx.clearRect(0, 0, this.originalWidth, this.originalHeight);
  }

  public stopAnimation(): void {
    this.isActive = false;

    cancelAnimationFrame(this.animationId);
  }

  public fill(color: string): void {
    this.ctx.fillStyle = color;
  }

  public stroke(color: string, alpha?: number): void {
    this.ctx.strokeStyle = color;
    if (alpha) {
      this.ctx.globalAlpha = alpha;
    }
  }

  public strokeWidth(size: number): void {
    this.ctx.lineWidth = size;
  }

  public font(font: string): void {
    this.ctx.font = font;
  }

  public text(text: string, x: number, y: number): void {
    this.ctx.beginPath();
    this.ctx.fillText(text, x, y);
    this.ctx.closePath();
  }

  public circle(x: number, y: number, r: number): void {
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
  }

  public saveState(): void {
    this.ctx.save();
  }

  public restoreState(): void {
    this.ctx.restore();
  }

  public translate(x: number, y: number): void {
    this.ctx.translate(x, y);
  }

  public rect({
    x,
    y,
    width,
    height,
    stroke
  }: {
    x: number;
    y: number;
    width: number;
    height: number;
    stroke?: boolean;
  }): void {
    this.ctx.beginPath();
    this.ctx.rect(x, y, width, height);
    this.ctx.fill();
    if (stroke) {
      this.ctx.stroke();
    }
    this.ctx.closePath();
  }

  public blendMode(mode: GlobalCompositeOperation): void {
    this.ctx.globalCompositeOperation = mode;
  }

  public line(x1: number, y1: number, x2: number, y2: number): void {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  private update(draw: DrawCallback): void {
    this.animationId = requestAnimationFrame(() => {
      draw(this.originalHeight, this.originalWidth);

      if (this.isActive) {
        this.update(draw);
      }
    }) as unknown as number;
  }
}
