import Demo from './demo';
import article from './article.md?raw';
import PostLayout from '@core/components/post-layout/post-layout';

const WebSerial = () => {
  return <PostLayout article={article} demo={<Demo />} />;
};

WebSerial.displayName = 'WebSerial';

export default WebSerial;
