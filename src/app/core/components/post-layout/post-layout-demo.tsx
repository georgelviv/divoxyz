import { Post } from '@core/models/core.models';
import { Button } from '@shared/components/button';
import FPSWidget from './fps-widget';
import CanvasImageDownloadWidget from './canvas-image-download-widget';
import { useRef } from 'react';

interface PostLayoutDemoProps {
  demo: JSX.Element;
  isFullScreen: boolean;
  handleFullScreen: () => void;
  post: Post;
}

const PostLayoutDemo = ({
  demo,
  isFullScreen,
  handleFullScreen,
  post
}: PostLayoutDemoProps) => {
  const linkToGithub: string = `${import.meta.env.VITE_GITHUB_LINK}/src/app/posts/${post.id}`;
  const demoWrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div className="h-full">
      <div className="flex justify-end mb-2">
        {post.showFPS && <FPSWidget />}
        {post.showDownloadCanvasImage && (
          <CanvasImageDownloadWidget
            wrapperRef={demoWrapperRef}
            title={post.title}
          />
        )}
        <Button theme="text" icon={'github'} link={linkToGithub} />
        <Button
          theme="text"
          icon={isFullScreen ? 'minimize' : 'expand'}
          onClick={handleFullScreen}
        />
      </div>
      <div className="h-[calc(100%-48px)]" ref={demoWrapperRef}>
        {demo}
      </div>
    </div>
  );
};

PostLayoutDemo.displayName = 'PostLayoutDemo';

export default PostLayoutDemo;
