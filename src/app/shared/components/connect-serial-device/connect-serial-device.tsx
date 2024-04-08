import {
  WebSerialDevice,
  WebSerialDeviceConnectResponse,
  WebSerialDeviceConnectStatus
} from './connect-serial.device.utils';
import { useEffect, useState } from 'react';
import { Button } from '../button';
import { Warning } from '../warning';
import { SerialDevice } from './connect-serial-device.models';

interface ConnectSerialDeviceProps {
  onConnect: (device: SerialDevice) => void;
  onDisconnect: () => void;
}

const ConnectSerialDevice = ({
  onConnect,
  onDisconnect
}: ConnectSerialDeviceProps) => {
  const [webSerialDevice, setWebSerialDevice] = useState<WebSerialDevice>(null);
  const [connectStatus, setConnectStatus] =
    useState<WebSerialDeviceConnectStatus>(null);

  useEffect(() => {
    const device = new WebSerialDevice();

    setWebSerialDevice(device);
  }, []);

  useEffect(() => {
    if (!webSerialDevice) {
      return;
    }
    const disconnectSubscription = webSerialDevice
      .getDisconnected$()
      .subscribe(() => {
        setConnectStatus(WebSerialDeviceConnectStatus.disconnected);
        onDisconnect();
      });

    return () => {
      disconnectSubscription.unsubscribe();
    };
  }, [webSerialDevice, onDisconnect]);

  const handleConnect = async () => {
    const response: WebSerialDeviceConnectResponse =
      await webSerialDevice.connect();
    setConnectStatus(response.status);
    if (response.status === WebSerialDeviceConnectStatus.connected) {
      onConnect(response.device);
    }
  };

  let content;

  if (connectStatus === WebSerialDeviceConnectStatus.connected) {
    return '';
  }

  if (webSerialDevice) {
    const isSupported: boolean = webSerialDevice.checkIfWebSerialIsSupported();
    if (isSupported) {
      const connectButton = (
        <Button onClick={handleConnect} icon="usb">
          Connect to GPS module
        </Button>
      );
      let additionalInfo = '';

      if (connectStatus === WebSerialDeviceConnectStatus.notSelected) {
        additionalInfo = 'Device is not selected';
      } else if (
        connectStatus === WebSerialDeviceConnectStatus.errorToConnect
      ) {
        additionalInfo = 'Error to connect';
      } else if (connectStatus === WebSerialDeviceConnectStatus.disconnected) {
        additionalInfo = 'Device was disconnected';
      }

      if (additionalInfo) {
        content = (
          <div className="bg-background p-2 rounded-md">
            <div className="text-primary text-center mb-2">
              {additionalInfo}
            </div>
            {connectButton}
          </div>
        );
      } else {
        content = connectButton;
      }
    } else {
      content = <Warning>WebSerial is not supported</Warning>;
    }
  }

  return content;
};

ConnectSerialDevice.displayName = 'ConnectSerialDevice';

export default ConnectSerialDevice;
