import { ComponentProps, useEffect, useRef, useState } from 'react';
import { Warning } from '../warning';
import classNames from 'classnames';

interface Props extends ComponentProps<'canvas'> {
  checked: (canvasEl: HTMLCanvasElement) => void;
}

const WebglSafe = ({ checked, className, ...rest }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglNotSupported, setWebglNotSupported] = useState<boolean>(false);

  useEffect(() => {
    if (canvasRef.current.getContext('webgl')) {
      checked(canvasRef.current);
    } else {
      console.log('not works');
      setWebglNotSupported(true);
    }
  }, [checked]);

  const canvasClasses = classNames(className, { hidden: webglNotSupported });

  return (
    <>
      <canvas ref={canvasRef} className={canvasClasses} {...rest} />
      {webglNotSupported && (
        <Warning center={true}>WebGL is not supported</Warning>
      )}
    </>
  );
};

WebglSafe.displayName = 'WebglSafe';

export default WebglSafe;
