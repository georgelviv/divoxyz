import { ComponentProps, useEffect, useState } from 'react';
import { Warning } from '../warning';

interface Props extends ComponentProps<'canvas'> {
  checked: () => void;
}

const UserMediaSafe = ({ checked }: Props) => {
  const [userMedialNotSupported, setUserMediaNotSupported] =
    useState<boolean>(false);

  useEffect(() => {
    if (navigator.mediaDevices?.getUserMedia) {
      checked();
    } else {
      setUserMediaNotSupported(true);
    }
  }, [checked]);

  return (
    <>
      {userMedialNotSupported && (
        <div className="w-full flex relative min-h-10">
          <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
            <Warning>User Media is not supported</Warning>
          </div>
        </div>
      )}
    </>
  );
};

UserMediaSafe.displayName = 'UserMediaSafe';

export default UserMediaSafe;
