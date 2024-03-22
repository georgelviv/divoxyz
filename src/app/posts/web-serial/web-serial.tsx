import { Post } from '@core/components/post';
import Demo from './demo';

const WebSerial = () => {
  const article = (
    <div>
      Web serial article
      <div className="h-[1000px]">Long text</div>
      end.
    </div>
  );

  return <Post article={article} demo={<Demo />} />;
};

WebSerial.displayName = 'WebSerial';

export default WebSerial;
