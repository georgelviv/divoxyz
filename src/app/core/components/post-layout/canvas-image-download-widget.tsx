import { Button } from '@shared/components/button';
import { downloadCanvasAsImage } from '@shared/utils/media.utils';
import { useCallback } from 'react';

interface Props {
  wrapperRef: React.MutableRefObject<HTMLDivElement>;
  title: string;
}

const CanvasImageDownloadWidget = ({ wrapperRef, title }: Props) => {
  const handleDownload = useCallback(() => {
    const canvasEl: HTMLCanvasElement =
      wrapperRef.current.querySelector('canvas');
    const imageName: string = title.split(' ').join('_').toLowerCase() + '.png';
    downloadCanvasAsImage(imageName, canvasEl);
  }, [title, wrapperRef]);

  return <Button theme="text" icon={'download'} onClick={handleDownload} />;
};

CanvasImageDownloadWidget.displayName = 'CanvasImageDownloadWidget';

export default CanvasImageDownloadWidget;
