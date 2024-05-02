import { ComponentProps, useCallback, useEffect, useState } from 'react';
import { Warning } from '../warning';

interface Props extends ComponentProps<'canvas'> {
  onMediaStream: (mediaStream: MediaStream) => void;
}

const UserMediaSafe = ({ onMediaStream }: Props) => {
  const [errorLabel, setErrorLabel] = useState<string>('');

  const checked = useCallback(async () => {
    let localMediaStream: MediaStream;
    try {
      localMediaStream = await navigator.mediaDevices.getUserMedia({
        video: true
      });
    } catch (e) {
      console.error('not allowed', e);
      setErrorLabel('Permissions denied for User Media');
    }

    if (localMediaStream) {
      onMediaStream(localMediaStream);
    }
  }, [onMediaStream]);

  useEffect(() => {
    if (navigator.mediaDevices?.getUserMedia) {
      checked();
    } else {
      setErrorLabel('User Media is not supported');
    }
  }, [checked, setErrorLabel]);

  return (
    <>
      {errorLabel && (
        <div className="w-full flex relative min-h-10">
          <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
            <Warning>{errorLabel}</Warning>
          </div>
        </div>
      )}
    </>
  );
};

UserMediaSafe.displayName = 'UserMediaSafe';

export default UserMediaSafe;
