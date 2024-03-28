import { Button } from '@shared/button';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import Markdown from 'react-markdown';
import { Post } from '@core/models/core.models';
import './post-layout.scss';
import 'katex/dist/katex.min.css';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { formateISODate } from '@shared/utils/general.utils';
import { useLoaderData } from 'react-router-dom';

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

function LinkRenderer(props: {
  href?: string;
  children: JSX.Element | string;
}) {
  return (
    <a href={props.href} target="_blank" rel="noreferrer">
      {props.children}
    </a>
  );
}

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
          <time dateTime={post.date} className="text-sm text-secondary">
            {formateISODate(post.date)}
          </time>
        </div>
      </div>
      <div className={containerClass}>
        <div className={buttonClass}>
          <Button onClick={handleGoToArticle}>Jump to article</Button>
        </div>
        <div
          ref={demoRef}
          className={classNames(colClass, 'bg-background-secondary')}
        >
          <div className="flex justify-end">
            <Button
              theme="text"
              icon={isFullScreen ? 'minimize' : 'expand'}
              onClick={handleFullScreen}
            />
          </div>
          <div className="h-[calc(100%-40px)]">{demo}</div>
        </div>
        <div className={buttonClass}>
          <Button onClick={handleBackToDemo}>Back to demo</Button>
        </div>
        <div className={classNames(colClass, 'pt-0')} ref={articleRef}>
          <Markdown
            components={{ a: LinkRenderer }}
            className="post-layout"
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {article}
          </Markdown>
        </div>
      </div>
    </div>
  );
};

PostLayout.displayName = 'PostLayout';

export default PostLayout;
