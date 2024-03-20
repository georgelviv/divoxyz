import { Post } from '@core/components/post';

const WebSerial = () => {
  const article = (
    <div>
      Web serial article
      <div className="h-[1000px]">Long text</div>
      end.
    </div>
  );

  const demo = <div>Web serial demo</div>;
  return <Post article={article} demo={demo} />;
};

WebSerial.displayName = 'WebSerial';

export default WebSerial;
