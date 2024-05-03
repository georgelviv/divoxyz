import { useEffect, useRef } from 'react';
import CameraMirrorEffectVisual from './camera-mirror-effect.visual';

interface Props {
  mediaStream: MediaStream;
}

const CanvasVideo = ({ mediaStream }: Props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const visual = new CameraMirrorEffectVisual(canvasRef.current, mediaStream);
    return () => {
      visual.stop();
    };
  }, [mediaStream]);

  return (
    <div className="flex items-center h-full">
      <canvas className="max-h-full max-w-full w-full" ref={canvasRef} />
    </div>
  );
};

CanvasVideo.displayName = 'CanvasVideo';

export default CanvasVideo;
