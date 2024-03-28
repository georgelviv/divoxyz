import PostLayout from '@core/components/post-layout/post-layout';
import article from './article.md?raw';
import { useEffect, useRef } from 'react';
import RainbowCircleVisual from './rainbow-circles.visual';

let isRendered = false;

const RainbowCircles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isRendered) {
      return;
    }
    new RainbowCircleVisual(canvasRef.current!);
    isRendered = true;
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
