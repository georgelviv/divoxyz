import { Canva } from '@shared/utils/canva.utils';
import { polarToCartesian, rand } from '@shared/utils/math.utils';
import { noise } from '@shared/utils/noise.utils';
import { Vector, getVectorFromAngle } from '@shared/utils/vector.utils';

class Particle {
  private position: Vector;
  private previousPosition: Vector;

  private velocity: Vector = new Vector(0, 0);
  private acceleration: Vector = new Vector(0, 0);
  private maxSpeed: number = 4;

  private width: number;
  private height: number;
  private scale: number;

  private cols: number;
  private canva: Canva;

  constructor({
    canva,
    height,
    width,
    scale
  }: {
    canva: Canva;
    height: number;
    width: number;
    scale: number;
  }) {
    this.canva = canva;

    this.height = height;
    this.width = width;

    this.scale = scale;
    this.cols = this.width / this.scale;
    this.position = new Vector(rand(1, width - 1), rand(1, height - 1));
    this.previousPosition = this.position.copy();
  }

  public update(): void {
    this.previousPosition = this.position.copy();

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.multiply(0);

    this.edges();
  }

  public applyForce(force: Vector): void {
    this.acceleration.add(force);
  }

  public show(): void {
    this.canva.stroke('#d90947', 0.05);
    this.canva.line(
      this.position.x,
      this.position.y,
      this.previousPosition.x,
      this.previousPosition.y
    );
  }

  private edges(): void {
    if (this.position.x >= this.width) {
      this.position.x = 1;
      this.previousPosition = this.position.copy();
    }
    if (this.position.x <= 0) {
      this.position.x = this.width - 1;
      this.previousPosition = this.position.copy();
    }
    if (this.position.y >= this.height) {
      this.position.y = 1;
      this.previousPosition = this.position.copy();
    }
    if (this.position.y <= 0) {
      this.position.y = this.height - 1;
      this.previousPosition = this.position.copy();
    }
  }

  public follow(flowField: Vector[]): void {
    const index: number = this.getCurrentIndex();
    if (flowField[index]) {
      this.applyForce(flowField[index]);
    } else {
      console.error(
        'no force :(',
        `cols=${this.cols}`,
        `height=${this.height}`,
        `width=${this.width}`,
        `currentCol=${Math.floor(this.position.x / this.scale)}`,
        `currentRow=${Math.floor(this.position.y / this.scale)}`,
        `length=${flowField.length}, index${index}, x=${this.position.x}, y=${this.position.y}`
      );
    }
  }

  private getCurrentIndex(): number {
    const currentCol: number = Math.floor(this.position.x / this.scale);
    const currentRow: number = Math.floor(this.position.y / this.scale);
    return currentCol + currentRow * this.cols;
  }
}

class FlowFieldVisual {
  private canva: Canva;

  private scale: number = 10;
  private sc: number = 0.1;

  private particlesCount: number = 200;
  private showField: boolean = false;

  private particles: Particle[] = [];
  private flowField: Vector[] = [];

  constructor(canvasEl: HTMLCanvasElement) {
    this.canva = new Canva(canvasEl, (height, width) => {
      const [paddingLeft, adjustedWidth] = this.getPaddingAndSide(width);
      const [paddingTop, adjustedHeight] = this.getPaddingAndSide(height);

      this.flowField = [];
      this.generateParticles(adjustedHeight, adjustedWidth);

      this.canva.saveState();
      this.canva.translate(paddingLeft, paddingTop);
      this.draw(adjustedHeight, adjustedWidth);
      this.canva.restoreState();
    });
  }

  private draw(height: number, width: number): void {
    let z: number = 0;

    this.canva.startAnimation(() => {
      this.updateField(height, width, z);

      this.particles.forEach((p) => {
        p.follow(this.flowField);
        p.update();
        p.show();
      });

      z += 0.005;
    });
  }

  private updateField(height: number, width: number, z: number): void {
    const cols: number = width / this.scale;
    const rows: number = height / this.scale;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const index: number = col + row * cols;
        const angle: number =
          noise(row * this.sc, col * this.sc, z) * Math.PI * 4;
        this.flowField[index] = getVectorFromAngle(angle, 1);

        if (this.showField) {
          this.drawField(row, col, angle);
        }
      }
    }
  }

  private drawField(row: number, col: number, angle: number): void {
    this.canva.saveState();
    this.canva.translate(row * this.scale, col * this.scale);

    this.canva.stroke('black', 0.1);
    const [x, y] = polarToCartesian(this.scale, angle);

    this.canva.line(0, 0, x, y);
    this.canva.restoreState();
  }

  private getPaddingAndSide(size: number): [padding: number, side: number] {
    const padding: number =
      (size - Math.floor(size / this.scale) * this.scale) / 2;
    return [padding, size - padding * 2];
  }

  private generateParticles(height: number, width: number): void {
    this.particles = [];

    for (let i = 0; i < this.particlesCount; i++) {
      const p: Particle = new Particle({
        canva: this.canva,
        height,
        width,
        scale: this.scale
      });
      this.particles.push(p);
    }
  }
}

export default FlowFieldVisual;
