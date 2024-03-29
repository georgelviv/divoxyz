export function angleToRadians(angle: number): number {
  return angle / (180 / Math.PI);
}

export function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
