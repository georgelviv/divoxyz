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
    this.splitRecursively({
      x: 0,
      y: 0,
      h: height,
      w: width,
      depth: 3,
      splitHistory: []
    });
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

  private splitRecursively({
    x,
    y,
    h,
    w,
    depth,
    splitHistory
  }: {
    x: number;
    y: number;
    h: number;
    w: number;
    depth: number;
    splitHistory: number[];
  }): void {
    if (w <= this.actualSize || h <= this.actualSize || depth < 0) {
      this.drawRect(x, y, h, w);
      return;
    }

    let isHorizontalSplit: number = rand(0, 1);
    if (splitHistory.length > 2) {
      const latest: number = splitHistory.at(-1);
      const similarInRow: boolean = splitHistory
        .slice(-2, -1)
        .every((el) => el === latest);
      if (similarInRow) {
        isHorizontalSplit = latest === 0 ? 1 : 0;
      }
    }

    splitHistory.push(isHorizontalSplit);

    if (isHorizontalSplit === 0) {
      const grids = h / this.actualSize;
      const splitSize: number = rand(1, grids - 1);
      const height: number = splitSize * this.actualSize;
      this.splitRecursively({
        x,
        y,
        h: height,
        w,
        depth: depth - 1,
        splitHistory: [...splitHistory]
      });
      this.splitRecursively({
        x,
        y: y + height,
        h: h - height,
        w,
        depth: depth - 1,
        splitHistory: [...splitHistory]
      });
    } else {
      const grids = w / this.actualSize;
      const splitSize: number = rand(1, grids - 1);
      const width: number = splitSize * this.actualSize;
      this.splitRecursively({
        x,
        y,
        h,
        w: width,
        depth: depth - 1,
        splitHistory: [...splitHistory]
      });
      this.splitRecursively({
        x: x + width,
        y,
        h,
        w: w - width,
        depth: depth - 1,
        splitHistory: [...splitHistory]
      });
    }
  }

  private adjustSize(height: number): void {
    const steps = height / this.basicSize;
    this.actualSize = height / Math.ceil(steps);
  }
}

export { MondrianCompositionVisual };
