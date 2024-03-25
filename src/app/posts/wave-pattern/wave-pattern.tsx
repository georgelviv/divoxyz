import { Post } from '@core/components/post';
import { useEffect, useRef } from 'react';
import { WavePatternVisual } from './wave-pattern.visual';
import article from './article.md?raw';

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

  const demo = (
    <div className="flex items-center h-full">
      <canvas className="aspect-square w-full" ref={canvasRef} />
    </div>
  );

  return <Post title="Wave Pattern" article={article} demo={demo} />;
};

WavePattern.displayName = 'WavePattern';

export default WavePattern;
