import { Canva } from '@shared/utils/canva.utils';
import { polarToCartesian } from '@shared/utils/math.utils';
import { noise } from '@shared/utils/noise.utils';

class FlowFieldVisual {
  private canva: Canva;

  private scale: number = 10;
  private sc: number = 0.1;

  constructor(canvasEl: HTMLCanvasElement) {
    this.canva = new Canva(canvasEl, (height, width) => {
      const paddingLeft: number = this.getPadding(height);
      const paddingTop: number = this.getPadding(width);

      this.canva.saveState();
      this.canva.translate(paddingLeft, paddingTop);
      this.draw(height, width);
      this.canva.restoreState();
    });
  }

  private draw(height: number, width: number): void {
    let z: number = 0;
    this.canva.startAnimation(() => {
      this.canva.background('#ffffff');
      const cols: number = height / this.scale;
      const rows: number = width / this.scale;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          this.canva.saveState();
          this.canva.translate(row * this.scale, col * this.scale);

          const angle: number =
            noise(row * this.sc, col * this.sc, z) * Math.PI * 2;
          const [x, y] = polarToCartesian(this.scale, angle);

          this.canva.line(0, 0, x, y);
          this.canva.restoreState();
        }
      }

      z += 0.01;
    });
  }

  private getPadding(size: number): number {
    return (size - Math.floor(size / this.scale) * this.scale) / 2;
  }
}

export default FlowFieldVisual;
