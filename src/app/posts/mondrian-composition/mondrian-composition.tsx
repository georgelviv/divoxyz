import PostLayout from '@core/components/post-layout/post-layout';
import article from './article.md?raw';
import { useEffect, useRef } from 'react';
import { MondrianCompositionVisual } from './mondrian-composition.visual';

const MondrianComposition = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    new MondrianCompositionVisual(canvasRef.current!);
  }, []);

  const Demo = (
    <div className="flex items-center h-full">
      <canvas
        className="aspect-square max-h-full max-w-full w-full"
        ref={canvasRef}
      />
    </div>
  );

  return <PostLayout article={article} demo={Demo} />;
};

MondrianComposition.displayName = 'MondrianComposition';

export default MondrianComposition;
