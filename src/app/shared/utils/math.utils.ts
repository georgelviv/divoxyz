export function angleToRadians(angle: number): number {
  return angle / (180 / Math.PI);
}

export function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function polarToCartesian(
  r: number,
  angle: number
): [x: number, y: number] {
  const x: number = r * Math.cos(angle);
  const y: number = r * Math.sin(angle);

  return [x, y];
}
