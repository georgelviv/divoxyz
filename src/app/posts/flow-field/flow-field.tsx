import { PostLayout } from '@core/components/post-layout';
import article from './article.md?raw';
import { useEffect, useRef } from 'react';
import FlowFieldVisual from './flow-field.visual';

const FlowField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    new FlowFieldVisual(canvasRef.current!);
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

FlowField.displayName = 'FlowField';

export default FlowField;
