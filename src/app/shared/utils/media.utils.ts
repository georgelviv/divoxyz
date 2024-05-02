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
