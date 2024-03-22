import { useEffect, useState } from 'react';
import { webSerialService } from './web-serial.service';
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
  const [state, setState] = useState<DemoState>({
    check: CheckStatus.initial,
    connection: ConnectionStatus.initial
  });

  useEffect(() => {
    const isSupported = webSerialService.checkIfWebSerialIsSupported();
    const status = isSupported
      ? CheckStatus.supported
      : CheckStatus.notSupported;
    setState({ ...state, check: status });
  }, []);

  const handleConnectToUSB = async () => {
    const isConnected = await webSerialService.init();
    if (!isConnected) {
      setState({ ...state, connection: ConnectionStatus.error });
    }
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

  webSerialService.read();

  return <div className={messageStyle}>Device is connected</div>;
};

Demo.displayName = 'Demo';

export default Demo;
