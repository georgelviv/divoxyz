export class Canva {
  private isActive: boolean = false;
  private animationId: number;

  private canvasEl: HTMLCanvasElement;
  private originalWidth: number;
  private originalHeight: number;
  private width: number;
  private height: number;
  private ctx: CanvasRenderingContext2D;

  constructor(canvasEl: HTMLCanvasElement) {
    this.canvasEl = canvasEl;
    this.originalHeight = canvasEl.height;
    this.originalWidth = canvasEl.width;
    this.ctx = canvasEl.getContext('2d')!;

    this.updateScaleRation();
  }

  public background(color: string): void {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  public startAnimation(resetFn: () => void, draw: () => void): void {
    this.isActive = true;
    this.update(resetFn, draw);
  }

  public stop(): void {
    this.isActive = false;

    cancelAnimationFrame(this.animationId);
  }

  public fill(color: string): void {
    this.ctx.fillStyle = color;
  }

  public stroke(color: string): void {
    this.ctx.strokeStyle = color;
  }

  public circle(x: number, y: number, r: number): void {
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.closePath();
  }

  private update(resetFn: () => void, draw: () => void): void {
    this.animationId = requestAnimationFrame(() => {
      resetFn();
      draw();

      if (this.isActive) {
        this.update(resetFn, draw);
      }
    });
  }

  private updateScaleRation(): void {
    const ratio = window.devicePixelRatio || 1;

    this.width = this.originalWidth * ratio;
    this.canvasEl.width = this.width;

    this.height = this.originalHeight * ratio;
    this.canvasEl.height = this.height;
  }
}
