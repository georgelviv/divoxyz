import { useEffect, useRef } from 'react';
import { WavePatternVisual } from './wave-pattern.visual';
import article from './article.md?raw';
import PostLayout from '@core/components/post-layout/post-layout';

const WavePattern = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    new WavePatternVisual(canvasRef.current!);
  }, []);

  const demo = (
    <div className="flex items-center h-full">
      <canvas
        className="aspect-square max-h-full max-w-full w-full"
        ref={canvasRef}
      />
    </div>
  );

  return <PostLayout article={article} demo={demo} />;
};

WavePattern.displayName = 'WavePattern';

export default WavePattern;
