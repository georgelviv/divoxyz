import { createContext } from 'react';

interface Context {
  secret: string;
  setSecret: React.Dispatch<React.SetStateAction<string>>;
}

const TOTPAuthenticationContext = createContext<Context>(null);

export { TOTPAuthenticationContext };
