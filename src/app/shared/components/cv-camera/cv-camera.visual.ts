import cv from '@techstark/opencv-js';
import { playVideoMediaStream } from '../../utils/media.utils';
import { CVCameraFrameHandler } from './cv-camera.models';

type OnPermissionDenied = (err: any) => void;

class CVCameraVisual {
  private canvasEl: HTMLCanvasElement;
  private mediaStream: MediaStream;

  private videoEl: HTMLVideoElement;
  private frameId: number;

  private width: number;
  private height: number;

  private capture: cv.VideoCapture;
  private frameIndex: number = 0;
  private videoTrack: MediaStreamTrack;

  private frameHandler: CVCameraFrameHandler;
  private onPermissionDenied: OnPermissionDenied;

  constructor(
    canvasEl: HTMLCanvasElement,
    frameHandler: CVCameraFrameHandler,
    onPermissionDenied: OnPermissionDenied
  ) {
    this.canvasEl = canvasEl;
    this.frameHandler = frameHandler;
    this.onPermissionDenied = onPermissionDenied;

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
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  }

  private async init(): Promise<void> {
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true
      });
    } catch (e) {
      if (this.onPermissionDenied) {
        this.onPermissionDenied(e);
        return;
      }
    }

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
      const targetMat = new cv.Mat(this.height, this.width, cv.CV_8UC4);
      this.capture.read(sourceMat);

      if (this.frameHandler) {
        this.frameHandler(sourceMat, targetMat);
      } else {
        sourceMat.copyTo(targetMat);
      }

      cv.imshow(this.canvasEl, targetMat);

      sourceMat.delete();
      targetMat.delete();
    } catch (e) {
      this.stop();
      console.error('error', e);
    }
  }
}

export default CVCameraVisual;
