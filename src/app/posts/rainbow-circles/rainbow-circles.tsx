import PostLayout from '@core/components/post-layout/post-layout';
import article from './article.md?raw';
import { useEffect, useRef } from 'react';
import RainbowCircleVisual from './rainbow-circles.visual';

const RainbowCircles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    new RainbowCircleVisual(canvasRef.current!);
  }, []);

  const demo = (
    <div className="flex items-center h-full">
      <canvas className="aspect-square w-full" ref={canvasRef} />
    </div>
  );

  return <PostLayout article={article} demo={demo} />;
};

RainbowCircles.displayName = 'RainbowCircles';

export default RainbowCircles;
