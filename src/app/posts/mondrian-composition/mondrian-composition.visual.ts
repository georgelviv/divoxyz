import { Canva } from '@shared/utils/canva.utils';
import { rand } from '@shared/utils/math.utils';

class MondrianCompositionVisual {
  private canva: Canva;
  private basicSize: number = 40;
  private actualSize: number;

  private colors: string[] = [
    '#fff001',
    '#ff0101',
    '#0101fd',
    '#f9f9f9',
    '#eae2b7'
  ];
  private currentColorI: number = 0;

  private splitHistory: number[] = [];
  private strokeColor: string = '#30303a';

  constructor(canvasEl: HTMLCanvasElement) {
    this.canva = new Canva(canvasEl, (height: number, width: number) => {
      this.init(height, width);
    });
  }

  private init(height: number, width: number): void {
    this.canva.background('#ffffff');

    this.adjustSize(height);

    this.drawRect(0, 0, height, width);
    this.splitRecursively(0, 0, height, width, 3);
  }

  private drawRect(x: number, y: number, h: number, w: number): void {
    const fillColor: string =
      this.colors[(this.currentColorI % this.colors.length) - 1];
    this.currentColorI++;
    this.canva.fill(fillColor);
    this.canva.strokeWidth(5);
    this.canva.stroke(this.strokeColor);
    this.canva.rect({ x, y, width: w, height: h, stroke: true });
  }

  private splitRecursively(
    x: number,
    y: number,
    h: number,
    w: number,
    depth: number
  ): void {
    if (w <= this.actualSize || h <= this.actualSize || depth < 0) {
      this.drawRect(x, y, h, w);
      return;
    }

    let isHorizontalSplit: number = rand(0, 1);
    if (this.splitHistory.length > 2) {
      const latest: number = this.splitHistory.at(-1);
      const similarInRow: boolean = this.splitHistory
        .slice(-2, -1)
        .every((el) => el === latest);
      if (similarInRow) {
        isHorizontalSplit = latest === 0 ? 1 : 0;
      }
    }

    this.splitHistory.push(isHorizontalSplit);

    if (isHorizontalSplit === 0) {
      const grids = h / this.actualSize;
      const splitSize: number = rand(1, grids - 1);
      const height: number = splitSize * this.actualSize;
      this.splitRecursively(x, y, height, w, depth - 1);
      this.splitRecursively(x, y + height, h - height, w, depth - 1);
    } else {
      const grids = w / this.actualSize;
      const splitSize: number = rand(1, grids - 1);
      const width: number = splitSize * this.actualSize;
      this.splitRecursively(x, y, h, width, depth - 1);
      this.splitRecursively(x + width, y, h, w - width, depth - 1);
    }
  }

  private adjustSize(height: number): void {
    const steps = height / this.basicSize;
    this.actualSize = height / Math.ceil(steps);
  }
}

export { MondrianCompositionVisual };
