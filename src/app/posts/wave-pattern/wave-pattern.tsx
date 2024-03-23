import { Post } from '@core/components/post';
import { useEffect, useRef } from 'react';
import { WavePatternVisual } from './wave-pattern.visual';

let isInitiated: boolean = false;

const WavePattern = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isInitiated) {
      return;
    }
    isInitiated = true;
    new WavePatternVisual(canvasRef.current!);
  }, []);

  const article = <div>Wave pattern article</div>;
  const demo = (
    <div className="flex items-center h-full">
      <canvas className="aspect-square w-full" ref={canvasRef} />
    </div>
  );

  return <Post article={article} demo={demo} />;
};

WavePattern.displayName = 'WavePattern';

export default WavePattern;
