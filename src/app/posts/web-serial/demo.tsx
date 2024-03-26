import { useEffect, useState } from 'react';
import { WebSerialDevice } from './web-serial.device';
import classNames from 'classnames';
import { Button } from '@shared/button';

const messageStyle = classNames('text-4xl text-center text-primary');

enum ConnectionStatus {
  initial,
  connecting,
  error,
  connected
}

enum CheckStatus {
  initial,
  supported,
  notSupported
}

interface DemoState {
  check: CheckStatus;
  connection: ConnectionStatus;
  isReading: boolean;
  readData: string;
}

const CheckStatusLabel = ({ checkStatus }: { checkStatus: CheckStatus }) => {
  if (checkStatus === CheckStatus.initial) {
    return (
      <div className={messageStyle}>Checking if Web Serial is supported</div>
    );
  }

  if (checkStatus === CheckStatus.notSupported) {
    return <div className={messageStyle}>Web Serial not supported</div>;
  }

  return '';
};

const Demo = () => {
  const [webSerialDevice, setWebSerialDevice] = useState<WebSerialDevice>(null);
  const [state, setState] = useState<DemoState>({
    check: CheckStatus.initial,
    connection: ConnectionStatus.initial,
    isReading: false,
    readData: ''
  });

  useEffect(() => {
    setWebSerialDevice(new WebSerialDevice());
  }, []);

  useEffect(() => {
    if (!webSerialDevice) {
      return;
    }
    const isSupported = webSerialDevice.checkIfWebSerialIsSupported();
    const status = isSupported
      ? CheckStatus.supported
      : CheckStatus.notSupported;

    const subscription = webSerialDevice.getData$().subscribe((d) => {
      setState((currentState: DemoState) => {
        const readData: string = currentState.readData + d;
        return {
          ...currentState,
          readData
        };
      });
    });

    setState({ ...state, check: status });

    return () => {
      subscription.unsubscribe();
      webSerialDevice.closePort();
    };
  }, [webSerialDevice]);

  const handleConnectToUSB = async () => {
    const isConnected = await webSerialDevice.connect();
    const connectionState = isConnected
      ? ConnectionStatus.connected
      : ConnectionStatus.error;

    setState({ ...state, connection: connectionState });
  };

  const handleReadingToggle = async () => {
    const isReading: boolean = !state.isReading;

    if (isReading) {
      webSerialDevice.startReading();
    } else {
      webSerialDevice.stopReading();
    }

    setState({ ...state, isReading });
  };

  if (state.check !== CheckStatus.supported) {
    return <CheckStatusLabel checkStatus={state.check} />;
  }

  if (
    [ConnectionStatus.initial, ConnectionStatus.error].includes(
      state.connection
    )
  ) {
    return (
      <div className={messageStyle}>
        {state.connection === ConnectionStatus.error && (
          <div>Try again to connect</div>
        )}
        <Button onClick={handleConnectToUSB}>Connect to port</Button>
      </div>
    );
  }

  return (
    <div className="flex gap-5 justify-center flex-col">
      <div className={messageStyle}>Device is connected</div>
      <div className="flex justify-center">
        <Button onClick={handleReadingToggle}>
          {state.isReading ? 'Stop Reading' : 'Start Reading'}
        </Button>
      </div>
      <div className="h-96 overflow-auto">{state.readData}</div>
    </div>
  );
};

Demo.displayName = 'Demo';

export default Demo;
