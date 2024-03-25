import { Post } from '@core/components/post';
import Demo from './demo';

const WebSerial = () => {
  return <Post title="Web Serial" article={'article'} demo={<Demo />} />;
};

WebSerial.displayName = 'WebSerial';

export default WebSerial;
