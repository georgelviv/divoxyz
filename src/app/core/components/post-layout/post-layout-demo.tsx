import { Post } from '@core/models/core.models';
import { Button } from '@shared/components/button';

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

  return (
    <div className="h-full">
      <div className="flex justify-end mb-2">
        <Button theme="text" icon={'github'} link={linkToGithub} />
        <Button
          theme="text"
          icon={isFullScreen ? 'minimize' : 'expand'}
          onClick={handleFullScreen}
        />
      </div>
      <div className="h-[calc(100%-48px)]">{demo}</div>
    </div>
  );
};

PostLayoutDemo.displayName = 'PostLayoutDemo';

export default PostLayoutDemo;
