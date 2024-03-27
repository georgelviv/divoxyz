import { Button } from '@shared/button';
import classNames from 'classnames';
import { useRef } from 'react';
import Markdown from 'react-markdown';
import { Post } from '@core/models/core.models';
import './post-layout.scss';
import 'katex/dist/katex.min.css';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { formateISODate } from '@shared/utils/general.utils';

interface Props {
  demo: JSX.Element;
  article: string;
  post: Post;
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

const PostLayout = ({ demo, article, post }: Props) => {
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
          {demo}
        </div>
        <div className={buttonClass}>
          <Button onClick={handleBackToDemo}>Back to demo</Button>
        </div>
        <div className={classNames(colClass, 'pt-0')} ref={articleRef}>
          <Markdown
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
