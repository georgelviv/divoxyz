import { useEffect, useRef } from 'react';
import article from './article.md?raw';
import PostLayout from '@core/components/post-layout/post-layout';

const ShaderKaleidoscope = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    console.log('111');
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

ShaderKaleidoscope.displayName = 'ShaderKaleidoscope';

export default ShaderKaleidoscope;
