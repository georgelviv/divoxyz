export function playVideoMediaStream(
  videoEl: HTMLVideoElement,
  mediaStream: MediaStream
): Promise<boolean> {
  return new Promise((resolve) => {
    videoEl.srcObject = mediaStream;
    videoEl
      .play()
      .then(() => {
        resolve(true);
      })
      .catch((err: any) => {
        const errString: string = err.toString();
        const pauseErrorMsg: string =
          'AbortError: The play() request was interrupted by a call to pause().';
        const errorWithPause: boolean = errString.startsWith(pauseErrorMsg);
        if (!errorWithPause) {
          console.error('Error to play video', err);
        }
        resolve(false);
      });
  });
}

export function downloadCanvasAsImage(
  fileName: string,
  canvasEl: HTMLCanvasElement
): void {
  const link = document.createElement('a');
  link.download = fileName;
  link.href = canvasEl.toDataURL();
  link.click();
}
