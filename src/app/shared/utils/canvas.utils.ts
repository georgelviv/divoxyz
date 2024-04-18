import { ResizeCallback } from '@shared/models/shared.models';

export function resizeCanvas(
  canvasEl: HTMLCanvasElement,
  callback: ResizeCallback
): void {
  const resizeObserver = new ResizeObserver((entries) => {
    const { height, width } = entries[0].contentRect;
    if (!height || !width) {
      return;
    }

    const ratio = window.devicePixelRatio || 1;

    const adjustedWidth = width * ratio;
    const adjustedHeight = height * ratio;

    canvasEl.width = adjustedWidth;
    canvasEl.height = adjustedHeight;

    callback({
      width: adjustedWidth,
      height: adjustedHeight,
      originalHeight: height,
      originalWidth: width,
      ratio
    });
  });

  resizeObserver.observe(canvasEl);
}
