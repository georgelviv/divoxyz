import { Button } from '@shared/components/button';
import { Input } from '@shared/components/input';
import { SyntheticEvent, useCallback, useContext, useState } from 'react';
import { TOTP } from 'totp-generator';
import { TOTPAuthenticationContext } from './totp-authentication.context';

enum OTPStatus {
  initial,
  valid,
  invalid
}

const TOTPAuthenticationVerify = () => {
  const { secret } = useContext(TOTPAuthenticationContext);
  const [userOTP, setUserOTP] = useState<string>('');
  const [valid, setValid] = useState<OTPStatus>(OTPStatus.initial);

  const handleOTP = useCallback((e: SyntheticEvent<HTMLInputElement>) => {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    setUserOTP(target.value);
  }, []);

  const verifyOtp = useCallback(() => {
    const otp: string = TOTP.generate(secret, { timestamp: Date.now() }).otp;
    if (!userOTP) {
      setValid(OTPStatus.initial);
    } else {
      const isValid = userOTP === otp;
      setValid(isValid ? OTPStatus.valid : OTPStatus.invalid);
    }
  }, [secret, userOTP]);

  let inputHint = '';

  if (valid === OTPStatus.valid) {
    inputHint = 'OTP is valid';
  } else if (valid === OTPStatus.invalid) {
    inputHint = 'OTP is invalid';
  }

  return (
    <div className="flex justify-between gap-2">
      <Input
        extraClasses="grow"
        value={userOTP}
        type="number"
        onChange={handleOTP}
        label="OTP"
        id="otp"
        hasError={valid === OTPStatus.invalid}
      >
        {inputHint}
      </Input>
      <div className="mt-5">
        <Button onClick={verifyOtp}>Verify</Button>
      </div>
    </div>
  );
};

TOTPAuthenticationVerify.displayName = 'TOTPAuthenticationVerify';

export default TOTPAuthenticationVerify;
