import { PostLayout } from '@core/components/post-layout';
import article from './article.md?raw';
import { Input } from '@shared/components/input';
import { SyntheticEvent, useCallback, useState } from 'react';
import { Button } from '@shared/components/button';
import TOTPAuthenticationQRCode from './totp-authentication-qrcode';
import { TOTP } from 'totp-generator';

const Demo = () => {
  const [otp, setOtp] = useState<string>('');
  const [secret, setSecret] = useState<string>('supersecret');

  const handleOTP = useCallback((e: SyntheticEvent<HTMLInputElement>) => {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    setOtp(target.value);
    setSecret('11');
  }, []);

  const verifyOtp = useCallback(() => {
    const otp: string = TOTP.generate(secret, { timestamp: Date.now() }).otp;
    console.log(otp);
  }, [secret]);

  return (
    <div>
      <TOTPAuthenticationQRCode />
      <div className="flex justify-between gap-2">
        <Input
          extraClasses="grow"
          value={otp}
          type="number"
          onChange={handleOTP}
          label="OTP"
          id="otp"
        />
        <div className="mt-5">
          <Button onClick={verifyOtp}>Verify</Button>
        </div>
      </div>
    </div>
  );
};

const TOTPAuthentication = () => {
  return <PostLayout article={article} demo={<Demo />} />;
};

TOTPAuthentication.displayName = 'TOTPAuthentication';

export default TOTPAuthentication;
