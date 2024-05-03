import cv from '@techstark/opencv-js';
import { playVideoMediaStream } from '@shared/utils/media.utils';

class CameraMirrorEffectVisual {
  private canvasEl: HTMLCanvasElement;
  private mediaStream: MediaStream;

  private videoEl: HTMLVideoElement;
  private frameId: number;

  private width: number;
  private height: number;

  private capture: cv.VideoCapture;
  private frameIndex: number = 0;
  private videoTrack: MediaStreamTrack;

  constructor(canvasEl: HTMLCanvasElement, mediaStream: MediaStream) {
    this.canvasEl = canvasEl;
    this.mediaStream = mediaStream;

    this.init();
  }

  public stop(): void {
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
    }
    if (this.videoEl) {
      this.videoEl.pause();
      this.videoEl.remove();
    }
    this.mediaStream.getTracks().forEach((track) => {
      track.stop();
    });
  }

  private async init(): Promise<void> {
    this.videoTrack = this.mediaStream.getVideoTracks()[0];
    this.setDimensions();

    this.videoEl = document.createElement('video');
    this.videoEl.height = this.height;
    this.videoEl.width = this.width;
    await playVideoMediaStream(this.videoEl, this.mediaStream);
    this.applyConstraints();

    this.capture = new cv.VideoCapture(this.videoEl);
    this.renderVideo();
  }

  private applyConstraints(): void {
    const constraints = {
      width: { min: 640, ideal: 1280 },
      height: { min: 480, ideal: 720 },
      advanced: [{ width: 1920, height: 1280 }, { aspectRatio: 1.333 }]
    };

    if (this.mediaStream.active) {
      this.videoTrack.applyConstraints(constraints);
    }
  }

  private setDimensions(): void {
    const settings: MediaTrackSettings = this.videoTrack.getSettings();
    this.width = settings.width;
    this.height = settings.height;

    this.canvasEl.width = this.width;
    this.canvasEl.height = this.height;
  }

  private renderVideo(): void {
    this.frameId = requestAnimationFrame(async () => {
      await this.updateFrame();
      this.renderVideo();
      this.frameIndex++;
    });
  }

  private async updateFrame(): Promise<void> {
    try {
      const sourceMat = new cv.Mat(this.height, this.width, cv.CV_8UC4);
      const grayMat = new cv.Mat(this.height, this.width, cv.CV_8UC4);
      const borderMat = new cv.Mat(this.height, this.width, cv.CV_8UC4);

      const s = new cv.Scalar(255, 0, 0, 255);

      this.capture.read(sourceMat);
      cv.cvtColor(sourceMat, grayMat, cv.COLOR_RGBA2GRAY);
      cv.copyMakeBorder(
        grayMat,
        borderMat,
        this.height / 2,
        this.height / 2,
        this.width / 2,
        this.width / 2,
        cv.BORDER_DEFAULT,
        s
      );
      cv.imshow(this.canvasEl, borderMat);

      sourceMat.delete();
      grayMat.delete();
      borderMat.delete();
    } catch (e) {
      this.stop();
      console.error('error', e);
    }
  }
}

export default CameraMirrorEffectVisual;
