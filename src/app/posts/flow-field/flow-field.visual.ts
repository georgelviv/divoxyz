import { Canva } from '@shared/utils/canva.utils';
import { polarToCartesian, rand } from '@shared/utils/math.utils';
import { noise } from '@shared/utils/noise.utils';
import { Vector, getVectorFromAngle } from '@shared/utils/vector.utils';

class Particle {
  private position: Vector;
  private velocity: Vector = new Vector(0, 0);
  private acceleration: Vector = new Vector(0, 0);
  private maxSpeed: number = 4;

  private width: number;
  private height: number;
  private scale: number;

  private cols: number;
  private canva: Canva;

  constructor(canva: Canva, height: number, width: number, scale: number) {
    this.canva = canva;

    this.height = height;
    this.width = width;
    this.scale = scale;
    this.cols = this.height / this.scale;
    this.position = new Vector(rand(0, height), rand(0, width));
  }

  public update(): void {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.multiply(0);
  }

  public applyForce(force: Vector): void {
    this.acceleration.add(force);
  }

  public show(): void {
    this.canva.stroke('red', 0.1);
    this.canva.circle(this.position.x, this.position.y, 1);
  }

  public edges(): void {
    if (this.position.x > this.width) {
      this.position.x = 0;
    }
    if (this.position.x < 0) {
      this.position.x = this.width;
    }
    if (this.position.y > this.height) {
      this.position.y = 0;
    }
    if (this.position.y < 0) {
      this.position.y = this.height;
    }
  }

  public follow(flowField: Vector[]): void {
    const currentCol: number = Math.floor(this.position.x / this.scale);
    const currentRow: number = Math.floor(this.position.y / this.scale);
    const index: number = currentCol + currentRow * this.cols;

    this.applyForce(flowField[index]);
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
      const paddingLeft: number = this.getPadding(height);
      const paddingTop: number = this.getPadding(width);

      this.flowField = [];
      this.generateParticles(height, width);

      this.canva.saveState();
      this.canva.translate(paddingLeft, paddingTop);
      this.draw(height, width);
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
        p.edges();
      });

      z += 0.0003;
    });
  }

  private updateField(height: number, width: number, z: number): void {
    const cols: number = height / this.scale;
    const rows: number = width / this.scale;

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

  private getPadding(size: number): number {
    return (size - Math.floor(size / this.scale) * this.scale) / 2;
  }

  private generateParticles(height: number, width: number): void {
    this.particles = [];

    for (let i = 0; i < this.particlesCount; i++) {
      const p: Particle = new Particle(this.canva, height, width, this.scale);
      this.particles.push(p);
    }
  }
}

export default FlowFieldVisual;
