import { PostLayout } from '@core/components/post-layout';
import article from './article.md?raw';
import { Map } from '@shared/components/map';
import { ConnectSerialDevice } from '@shared/components/connect-serial-device';
import { useCallback, useState } from 'react';
import { SerialDevice } from '@shared/components/connect-serial-device/connect-serial-device.models';
import { EMPTY, Subscription, delay, expand, from, map } from 'rxjs';
import { parseNMEA } from './gps-serial-module.utils';

const decoder: TextDecoder = new TextDecoder();

const Demo = () => {
  const [deviceSubscription, setDeviceSubscription] =
    useState<Subscription>(null);
  const [data, setData] = useState<string>('');

  const handleConnect = useCallback(async (device: SerialDevice) => {
    if (deviceSubscription) {
      deviceSubscription.unsubscribe();
    }

    const subscription: Subscription = from(device.reader.read())
      .pipe(
        expand((value) => {
          return !value.done
            ? from(device.reader.read()).pipe(delay(1000))
            : EMPTY;
        }),
        map(({ value }) => {
          return decoder.decode(value);
        })
      )
      .subscribe((d) => {
        setData((i) => i + d);
      });

    setDeviceSubscription(subscription);
  }, []);

  parseNMEA(data);

  const handleDisconnect = useCallback(() => {
    if (deviceSubscription) {
      deviceSubscription.unsubscribe();
    }
  }, [deviceSubscription]);

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
