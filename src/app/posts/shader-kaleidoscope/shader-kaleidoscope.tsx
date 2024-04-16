import { useCallback } from 'react';
import article from './article.md?raw';
import PostLayout from '@core/components/post-layout/post-layout';
import ShaderKaleidoscopeVisual from './shader-kaleidoscope.visual';
import { WebglSafe } from '@shared/components/webgl-safe';

const ShaderKaleidoscope = () => {
  const getCanvas = useCallback((canvas: HTMLCanvasElement) => {
    new ShaderKaleidoscopeVisual(canvas);
  }, []);

  const demo = (
    <div className="flex items-center h-full">
      <WebglSafe
        checked={getCanvas}
        className="aspect-square max-h-full max-w-full w-full"
      />
    </div>
  );

  return <PostLayout article={article} demo={demo} />;
};

ShaderKaleidoscope.displayName = 'ShaderKaleidoscope';

export default ShaderKaleidoscope;
