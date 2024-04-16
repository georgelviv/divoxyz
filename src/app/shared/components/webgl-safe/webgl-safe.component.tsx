import { ComponentProps, useEffect, useRef, useState } from 'react';
import { Warning } from '../warning';

interface Props extends ComponentProps<'canvas'> {
  checked: (canvasEl: HTMLCanvasElement) => void;
}

const WebglSafe = ({ checked, ...rest }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglNotSupported, setWebglNotSupported] = useState<boolean>(false);

  useEffect(() => {
    if (canvasRef.current.getContext('webgl')) {
      checked(canvasRef.current);
    } else {
      console.log('not works');
      setWebglNotSupported(true);
    }
  }, []);

  return (
    <>
      <canvas ref={canvasRef} {...rest} />
      {webglNotSupported && (
        <div className="w-full flex relative">
          <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
            <Warning>WebGL is not supported</Warning>
          </div>
        </div>
      )}
    </>
  );
};

WebglSafe.displayName = 'WebglSafe';

export default WebglSafe;
