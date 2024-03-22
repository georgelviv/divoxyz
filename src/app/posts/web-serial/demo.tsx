import { useEffect, useState } from 'react';
import { checkIfWebSerialIsSupported } from './utils';
import classNames from 'classnames';
import { Button } from '@shared/button';

const messageStyle = classNames('text-4xl text-center text-primary');

const Demo = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const [webSerialIsSupported, setWebSerialIsSupported] =
    useState<boolean>(false);

  useEffect(() => {
    setChecked(true);
    setWebSerialIsSupported(checkIfWebSerialIsSupported());
  }, []);

  if (!checked) {
    return <div className={messageStyle}>Web Serial Not checked</div>;
  }

  if (!webSerialIsSupported) {
    return <div className={messageStyle}>Web Serial not supported</div>;
  }

  const handleConnectToUSB = async () => {
    try {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });
      console.log(port);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={messageStyle}>
      <Button onClick={handleConnectToUSB}>Connect to USB</Button>
    </div>
  );
};

Demo.displayName = 'Demo';

export default Demo;
