import { Button } from '@shared/button';
import classNames from 'classnames';
import { useRef } from 'react';
import Markdown from 'react-markdown';
import './post.scss';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

import 'katex/dist/katex.min.css';

interface Props {
  demo: JSX.Element;
  article: string;
  title: string;
}

const containerClass = classNames(
  'flex flex-col lg:flex-row gap-5 relative h-[calc(100%-60px)] overflow-auto'
);
const colClass = classNames(
  'flex-initial lg:flex-1 lg:overflow-auto p-2 scroll-mt-12'
);
const buttonClass = classNames(
  'lg:hidden flex justify-center sticky pb-2 top-0 bg-background'
);

const Post = ({ demo, article, title }: Props) => {
  const articleRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className={'h-[calc(100%-48px)] overflow-auto'}>
      <h1 className="text-center text-primary text-4xl mb-5">{title}</h1>
      <div className={containerClass}>
        <div className={buttonClass}>
          <Button onClick={handleGoToArticle}>Jump to article</Button>
        </div>
        <div
          ref={demoRef}
          className={classNames(colClass, 'bg-background-secondary')}
        >
          {demo}
        </div>
        <div className={buttonClass}>
          <Button onClick={handleBackToDemo}>Back to demo</Button>
        </div>
        <div className={classNames(colClass, 'pt-0')} ref={articleRef}>
          <Markdown
            className="post"
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

Post.displayName = 'Post';

export default Post;
