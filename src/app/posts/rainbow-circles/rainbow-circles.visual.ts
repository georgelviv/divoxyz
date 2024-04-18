import { Canva } from '@shared/classes/canva.class';
import { angleToRadians } from '@shared/utils/math.utils';

class Circle {
  private angle: number;
  private color: string;
  private radius: number = 100;
  private direction: number = 1;
  private size: number = 50;

  private x: number;
  private y: number;

  private canva: Canva;

  constructor(angle: number, color: string, canva: Canva) {
    this.angle = angle;
    this.color = color;
    this.canva = canva;
  }

  public update() {
    const angle = angleToRadians(this.angle);
    this.x = this.radius * Math.sin(angle);
    this.y = this.radius * Math.cos(angle);
    this.radius = this.radius + 1 * this.direction;

    if (this.radius > 100 || this.radius < 0) {
      this.direction *= -1;
    }
  }

  public display() {
    this.canva.fill(this.color);
    this.canva.circle(this.x, this.y, this.size);
  }
}

class RainbowCircleVisual {
  private n: number = 12;
  private backgroundColor: string = '#dcdcdc';
  private colors: string[] = ['#ff0000', '#00ff00', '#0000ff'];
  private canva: Canva;

  private circles: Circle[] = [];

  constructor(canvasEl: HTMLCanvasElement) {
    this.canva = new Canva(canvasEl, () => {
      this.init();
      this.draw();
    });
  }

  private init(): void {
    const angle = 360 / this.n;

    this.circles = [];
    this.canva.background(this.backgroundColor);

    for (let i = 0; i < this.n; i++) {
      this.circles.push(new Circle(angle * i, this.colors[i % 3], this.canva));
    }
  }

  private draw(): void {
    this.canva.startAnimation((height: number, width: number) => {
      this.canva.background(this.backgroundColor);
      this.canva.saveState();
      this.canva.blendMode('difference');
      this.canva.translate(width / 2, height / 2);
      this.circles.forEach((c) => {
        c.update();
        c.display();
      });

      this.canva.restoreState();
    });
  }
}

export default RainbowCircleVisual;
