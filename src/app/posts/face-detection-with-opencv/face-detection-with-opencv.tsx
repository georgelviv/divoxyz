import { PostLayout } from '@core/components/post-layout';
import article from './article.md?raw';
import { UserMediaSafe } from '@shared/components/user-media-safe';
import { useCallback, useState } from 'react';
import { Warning } from '@shared/components/warning';

const Demo = () => {
  const [notAllowed, setNotAllowed] = useState<boolean>(false);
  const checked = useCallback(async () => {
    try {
      const localMediaStream = await navigator.mediaDevices.getUserMedia({
        video: true
      });
      console.log(localMediaStream);
    } catch (e) {
      console.error('not allowed', e);
      setNotAllowed(true);
    }
  }, []);

  return (
    <div className="h-24">
      {notAllowed && <Warning center={true}>Camera Permissions denied</Warning>}
      <UserMediaSafe checked={checked} />
    </div>
  );
};

const FaceDetectionWithOpenCv = () => {
  return <PostLayout article={article} demo={<Demo />} />;
};

FaceDetectionWithOpenCv.displayName = 'FaceDetectionWithOpenCv';

export default FaceDetectionWithOpenCv;
