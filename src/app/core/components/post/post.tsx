import { Button } from '@shared/button';
import classNames from 'classnames';
import { useRef } from 'react';

interface Props {
  demo: JSX.Element;
  article: JSX.Element;
}

const containerClass = classNames(
  'flex flex-col lg:flex-row gap-5 overflow-auto relative',
  `h-[calc(100%-68px)]`
);
const colClass = classNames(
  'flex-initial lg:flex-1 lg:overflow-auto p-2 scroll-mt-12'
);
const buttonClass = classNames(
  'lg:hidden flex justify-center sticky top-0 bg-background'
);

const Post = ({ demo, article }: Props) => {
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
      <div className={colClass} ref={articleRef}>
        {article}
      </div>
    </div>
  );
};

Post.displayName = 'Post';

export default Post;
