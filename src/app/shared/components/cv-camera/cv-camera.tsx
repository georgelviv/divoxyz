import { useEffect, useRef, useState } from 'react';
import CVCameraVisual from './cv-camera.visual';
import { Warning } from '../warning';
import { CVCameraFrameHandler } from './cv-camera.models';

interface Props {
  frameHandler: CVCameraFrameHandler;
}

const CVCamera = ({ frameHandler }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [checked, setChecked] = useState<boolean>(false);
  const [errorLabel, setErrorLabel] = useState<string>('');

  useEffect(() => {
    const visual = new CVCameraVisual(canvasRef.current, frameHandler, () =>
      setErrorLabel('Permissions denied')
    );
    return () => {
      visual.stop();
    };
  }, [checked, setErrorLabel, frameHandler]);

  useEffect(() => {
    if (navigator.mediaDevices?.getUserMedia) {
      setChecked(true);
    } else {
      setErrorLabel('User Media is not supported');
    }
  }, [setChecked, setErrorLabel]);

  return (
    <div className="h-full relative">
      <canvas className="max-h-full h-full max-w-full w-full" ref={canvasRef} />
      {errorLabel && (
        <div className="absolute top-0 w-full h-full flex min-h-20">
          <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
            <Warning>{errorLabel}</Warning>
          </div>
        </div>
      )}
    </div>
  );
};

CVCamera.displayName = 'CVCamera';

export default CVCamera;
