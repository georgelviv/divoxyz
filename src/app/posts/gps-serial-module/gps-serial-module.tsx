import PostLayout from '@core/components/post-layout/post-layout';
import article from './article.md?raw';
import { Map } from '@shared/components/map';
import { ConnectSerialDevice } from '@shared/components/connect-serial-device';
import { useCallback } from 'react';

const Demo = () => {
  const handleConnect = useCallback(() => {
    console.log('connect handler');
  }, []);

  const handleDisconnect = useCallback(() => {
    console.log('disconnect handler');
  }, []);

  return (
    <div className="aspect-square max-h-full max-w-full w-full relative">
      <Map />
      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        <ConnectSerialDevice
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
        />
      </div>
    </div>
  );
};

const GPSSerialModule = () => {
  return <PostLayout article={article} demo={<Demo />} />;
};

GPSSerialModule.displayName = 'GPSSerialModule';

export default GPSSerialModule;
