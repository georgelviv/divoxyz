import classNames from 'classnames';

interface Props {
  demo: JSX.Element;
  article: JSX.Element;
}

const Post = ({ demo, article }: Props) => {
  const containerClass = classNames('flex gap-5', `h-[calc(100%-68px)]`);

  const colClass = classNames('flex-1 overflow-auto p-2');

  return (
    <div className={containerClass}>
      <div className={classNames(colClass, 'bg-white')}>{demo}</div>
      <div className={colClass}>{article}</div>
    </div>
  );
};

Post.displayName = 'Post';

export default Post;
