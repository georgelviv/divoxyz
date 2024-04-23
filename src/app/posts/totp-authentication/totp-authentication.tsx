import { PostLayout } from '@core/components/post-layout';
import article from './article.md?raw';
import TOTPAuthenticationQRCode from './totp-authentication-qrcode';
import TOTPAuthenticationVerify from './totp-authentication-verify';
import { TOTPAuthenticationContext } from './totp-authentication.context';
import { useState } from 'react';

const Demo = () => {
  const [secret, setSecret] = useState<string>('supersecret');

  return (
    <TOTPAuthenticationContext.Provider value={{ secret, setSecret }}>
      <TOTPAuthenticationQRCode />
      <TOTPAuthenticationVerify />
    </TOTPAuthenticationContext.Provider>
  );
};

const TOTPAuthentication = () => {
  return <PostLayout article={article} demo={<Demo />} />;
};

TOTPAuthentication.displayName = 'TOTPAuthentication';

export default TOTPAuthentication;
