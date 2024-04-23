import {
  SyntheticEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import qrCode from 'qrcode';
import { Input } from '@shared/components/input';
import { TOTPAuthenticationContext } from './totp-authentication.context';

const getOtPath = (appName: string, secret: string): string => {
  return `otpauth://totp/${appName}?secret=${secret}`;
};

const TOTPAuthenticationQRCode = () => {
  const [appName, setAppName] = useState<string>('Dyvoxyz');
  const { secret, setSecret } = useContext(TOTPAuthenticationContext);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleAppName = useCallback((e: SyntheticEvent<HTMLInputElement>) => {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    setAppName(target.value);
  }, []);

  const handleSecret = useCallback(
    (e: SyntheticEvent<HTMLInputElement>) => {
      const target: HTMLInputElement = e.target as HTMLInputElement;
      setSecret(target.value);
    },
    [setSecret]
  );

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
      <div className="flex justify-between gap-2 flex-col lg:flex-row">
        <Input
          value={appName}
          extraClasses="flex-grow"
          label="App Name"
          onChange={handleAppName}
          id="appName"
        />
        <Input
          label="Secret"
          extraClasses="flex-grow"
          value={secret}
          onChange={handleSecret}
          id="secret"
        />
      </div>
      <div className="flex justify-center">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

TOTPAuthenticationQRCode.displayName = 'TOTPAuthenticationQRCode';

export default TOTPAuthenticationQRCode;
