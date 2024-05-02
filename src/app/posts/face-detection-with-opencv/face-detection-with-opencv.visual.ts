import cv from '@techstark/opencv-js';
import { playVideoMediaStream } from '@shared/utils/media.utils';

class FaceDetectionWithOpenCVVisual {
  private canvasEl: HTMLCanvasElement;
  private mediaStream: MediaStream;

  private videoEl: HTMLVideoElement;
  private frameId: number;
  private ctx: CanvasRenderingContext2D;

  private width: number;
  private height: number;

  private capture: cv.VideoCapture;
  private mat: cv.Mat;

  constructor(canvasEl: HTMLCanvasElement, mediaStream: MediaStream) {
    this.canvasEl = canvasEl;
    this.mediaStream = mediaStream;

    this.init();
  }

  public stop(): void {
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
    }
    this.videoEl.pause();
    this.videoEl.remove();
    this.mediaStream.getTracks().forEach((track) => {
      track.stop();
    });
  }

  private async init(): Promise<void> {
    this.ctx = this.canvasEl.getContext('2d', { willReadFrequently: true });
    this.setDimensions();
    this.videoEl = document.createElement('video');
    this.videoEl.height = this.height;
    this.videoEl.width = this.width;
    await playVideoMediaStream(this.videoEl, this.mediaStream);

    this.capture = new cv.VideoCapture(this.videoEl);
    this.mat = new cv.Mat(this.height, this.width, cv.CV_8UC4);
    this.renderVideo();
  }

  private setDimensions(): void {
    const settings: MediaTrackSettings = this.mediaStream
      .getVideoTracks()[0]
      .getSettings();
    this.width = settings.width;
    this.height = settings.height;

    this.canvasEl.width = this.width;
    this.canvasEl.height = this.height;
  }

  private renderVideo(): void {
    this.frameId = requestAnimationFrame(async () => {
      await this.updateFrame();
      this.renderVideo();
    });
  }

  private async updateFrame(): Promise<void> {
    try {
      this.capture.read(this.mat);
      cv.imshow(this.canvasEl, this.mat);
    } catch (e) {
      console.error('error', e);
    }
  }
}

export default FaceDetectionWithOpenCVVisual;
