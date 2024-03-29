import { Button } from '@shared/components/button';

interface PostLayoutDemoProps {
  demo: JSX.Element;
  isFullScreen: boolean;
  handleFullScreen: () => void;
}

const PostLayoutDemo = ({
  demo,
  isFullScreen,
  handleFullScreen
}: PostLayoutDemoProps) => {
  return (
    <div>
      <div className="flex justify-end">
        <Button
          theme="text"
          icon={isFullScreen ? 'minimize' : 'expand'}
          onClick={handleFullScreen}
        />
      </div>
      <div className="h-[calc(100%-40px)]">{demo}</div>
    </div>
  );
};

PostLayoutDemo.displayName = 'PostLayoutDemo';

export default PostLayoutDemo;
