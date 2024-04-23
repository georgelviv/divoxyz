import { PostLayout } from '@core/components/post-layout';
import article from './article.md?raw';
import { Input } from '@shared/components/input';
import { SyntheticEvent, useCallback, useState } from 'react';

const Demo = () => {
  const [appName, setAppName] = useState<string>('Dyvoxyz');

  const handleAppName = useCallback((e: SyntheticEvent<HTMLInputElement>) => {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    setAppName(target.value);
  }, []);

  return (
    <div className="flex justify-between">
      <Input placeholder="App Name" value={appName} onChange={handleAppName} />
      <Input placeholder="Secret" />
    </div>
  );
};

const TOTPAuthentication = () => {
  return <PostLayout article={article} demo={<Demo />} />;
};

TOTPAuthentication.displayName = 'TOTPAuthentication';

export default TOTPAuthentication;
