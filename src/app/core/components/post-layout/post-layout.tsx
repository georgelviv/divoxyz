import { Button } from '@shared/components/button';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Post } from '@core/models/core.models';
import './post-layout.scss';
import 'katex/dist/katex.min.css';
import { useLoaderData } from 'react-router-dom';
import { DateLabel } from '@shared/components/date-label';
import PostLayoutContent from './post-layout-content';
import PostLayoutDemo from './post-layout-demo';

interface Props {
  demo: JSX.Element;
  article: string;
}

const containerClass = classNames(
  'flex flex-col lg:flex-row gap-5 relative h-[calc(100%-60px)] lg:overflow-auto'
);
const colClass = classNames(
  'flex-initial lg:flex-1 lg:overflow-auto p-2 scroll-mt-12'
);
const buttonClass = classNames(
  'lg:hidden flex justify-center sticky py-2 top-0 bg-background'
);

const PostLayout = ({ demo, article }: Props) => {
  const articleRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const post: Post = useLoaderData() as Post;

  const [isFullScreen, setFullScreen] = useState<boolean>(false);

  useEffect(() => {
    const fullScreenHandler = () => {
      setFullScreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', fullScreenHandler);

    return () => {
      document.removeEventListener('fullScreenHandler', fullScreenHandler);
    };
  }, []);

  const handleBackToDemo = () => {
    if (demoRef.current) {
      demoRef.current.scrollIntoView();
    }
  };

  const handleGoToArticle = () => {
    if (articleRef.current) {
      articleRef.current.scrollIntoView();
    }
  };

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      demoRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className={'lg:h-[calc(100%-48px)'}>
      <div className="mb-5">
        <h1 className="text-center text-primary text-4xl">{post.title}</h1>
        <div className="flex justify-end">
          <DateLabel date={post.date} />
        </div>
      </div>
      <div className={containerClass}>
        <div className={buttonClass}>
          <Button onClick={handleGoToArticle}>Jump to article</Button>
        </div>
        <div
          ref={demoRef}
          style={{ backgroundColor: post.demoBackground }}
          className={classNames(colClass)}
        >
          <PostLayoutDemo
            isFullScreen={isFullScreen}
            demo={demo}
            handleFullScreen={handleFullScreen}
          />
        </div>
        <div className={buttonClass}>
          <Button onClick={handleBackToDemo}>Back to demo</Button>
        </div>
        <div className={classNames(colClass, 'pt-0')} ref={articleRef}>
          <PostLayoutContent article={article} />
        </div>
      </div>
    </div>
  );
};

PostLayout.displayName = 'PostLayout';

export default PostLayout;
