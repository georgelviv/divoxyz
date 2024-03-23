import { Canva } from '@shared/utils/canva.utils';
import { angleToRadians } from '@shared/utils/math.utils';

class Cell {
  private x0: number;
  private y0: number;
  private r: number;
  private angle: number;

  private x: number;
  private y: number;
  private canva: Canva;

  constructor({
    x0,
    y0,
    r,
    angle,
    canva
  }: {
    x0: number;
    y0: number;
    r: number;
    angle: number;
    canva: Canva;
  }) {
    this.canva = canva;
    this.x0 = x0;
    this.y0 = y0;
    this.r = r;
    this.angle = angle;
  }

  public update() {
    const angle = angleToRadians(this.angle);
    this.x = this.r * Math.cos(angle);
    this.y = this.r * Math.sin(angle);
    this.angle += 2;
  }

  public display() {
    this.canva.fill('#82B4F5');
    this.canva.stroke('#82B4F5');

    const x = this.x0 + this.x;
    const y = this.y0 + this.y;

    this.canva.circle(x, y, this.r);
  }
}

export class WavePatternVisual {
  private cols: number = 20;
  private rows: number = 20;

  private padding: number = 20;

  private height: number;
  private width: number;

  private grid: Cell[] = [];

  private canva: Canva;

  constructor(canvasEl: HTMLCanvasElement) {
    this.canva = new Canva(canvasEl, this.init.bind(this));

    this.init(canvasEl.height, canvasEl.height);
    this.draw();
  }

  private init(height: number, width: number): void {
    this.height = height;
    this.width = width;

    this.grid = [];
    this.canva.background('#E1EAF7');
    this.renderCells();
  }

  private renderCells(): void {
    const cellWidth = (this.width - this.padding * 2) / this.cols;
    const cellHeight = (this.height - this.padding * 2) / this.rows;
    const r = Math.min(cellWidth / 2, cellHeight / 2) / 2;

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const x0 = this.padding + (cellWidth / 2 + cellWidth * i);
        const y0 = this.padding + (cellHeight / 2 + cellHeight * j);
        const angle = i * 10 + j * 10;
        this.grid.push(new Cell({ x0, y0, r, angle, canva: this.canva }));
      }
    }
  }

  private draw(): void {
    this.canva.startAnimation(
      () => {
        this.canva.background('#E1EAF7');
      },
      () => {
        this.grid.forEach((c) => {
          c.update();
          c.display();
        });
      }
    );
  }
}

export default WavePatternVisual;
