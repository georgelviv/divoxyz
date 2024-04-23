import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import qrCode from 'qrcode';
import { Input } from '@shared/components/input';

const getOtPath = (appName: string, secret: string): string => {
  return `otpauth://totp/${appName}?secret=${secret}`;
};

const TOTPAuthenticationQRCode = () => {
  const [appName, setAppName] = useState<string>('Dyvoxyz');
  const [secret, setSecret] = useState<string>('supersecret');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleAppName = useCallback((e: SyntheticEvent<HTMLInputElement>) => {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    setAppName(target.value);
  }, []);

  const handleSecret = useCallback((e: SyntheticEvent<HTMLInputElement>) => {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    setSecret(target.value);
  }, []);

  useEffect(() => {
    const qrCodeText: string = getOtPath(appName, secret);
    qrCode.toCanvas(canvasRef.current, qrCodeText, (error: any) => {
      if (error) {
        console.error('Error to generate qr code', error);
      }
    });
  }, [secret, appName]);

  return (
    <div>
      <div className="flex justify-between gap-2">
        <Input
          value={appName}
          label="App Name"
          onChange={handleAppName}
          id="appName"
        />
        <Input
          label="Secret"
          value={secret}
          onChange={handleSecret}
          id="secret"
        />
      </div>
      <div className="flex justify-center">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

TOTPAuthenticationQRCode.displayName = 'TOTPAuthenticationQRCode';

export default TOTPAuthenticationQRCode;
