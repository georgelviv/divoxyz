import { Canva } from '@shared/classes/canva.class';
import { noise } from '@shared/utils/noise.utils';

class LabyrinthLikePatternVisual {
  private canva: Canva;
  private stepSize: number = 20;
  private rez: number = 0.015;

  constructor(canvasEl: HTMLCanvasElement) {
    this.canva = new Canva(canvasEl, ({ originalHeight, originalWidth }) => {
      this.init(originalHeight, originalWidth);
    });
  }

  private init(height: number, width: number): void {
    this.canva.background('#adefda');

    console.log(height, width);

    for (let x = 0; x < width; x += this.stepSize) {
      for (let y = 0; y < height; y += this.stepSize) {
        if (noise(x * this.rez, y * this.rez, 0) > 0.5) {
          this.canva.line(x, y, x + this.stepSize, y + this.stepSize);
        } else {
          this.canva.line(x + this.stepSize, y, x, y + this.stepSize);
        }
      }
    }
  }
}

export default LabyrinthLikePatternVisual;
