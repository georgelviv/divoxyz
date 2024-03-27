import { useEffect, useRef } from 'react';
import { WavePatternVisual } from './wave-pattern.visual';
import article from './article.md?raw';
import { useLoaderData } from 'react-router-dom';
import PostLayout from '@core/components/post-layout/post-layout';
import { Post } from '@core/models/core.models';

const WavePattern = () => {
  const canvasRef = useRef(null);
  const post: Post = useLoaderData() as Post;

  useEffect(() => {
    new WavePatternVisual(canvasRef.current!);
  }, []);

  const demo = (
    <div className="flex items-center h-full">
      <canvas className="aspect-square w-full" ref={canvasRef} />
    </div>
  );

  return <PostLayout post={post} article={article} demo={demo} />;
};

WavePattern.displayName = 'WavePattern';

export default WavePattern;
