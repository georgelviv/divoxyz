import { Post } from '@core/components/post';
import Demo from './demo';
import article from './article.md?raw';

const WebSerial = () => {
  return <Post title="Web Serial" article={article} demo={<Demo />} />;
};

WebSerial.displayName = 'WebSerial';

export default WebSerial;
