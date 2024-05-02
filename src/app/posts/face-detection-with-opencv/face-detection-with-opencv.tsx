import { PostLayout } from '@core/components/post-layout';
import article from './article.md?raw';
import { UserMediaSafe } from '@shared/components/user-media-safe';
import { useCallback, useState } from 'react';
import CanvasVideo from './canvas-video';

const Demo = () => {
  const [mediaStream, setMediaStream] = useState<MediaStream>(null);
  const onMediaStream = useCallback((stream: MediaStream) => {
    setMediaStream(stream);
  }, []);

  return (
    <div>
      {mediaStream && <CanvasVideo mediaStream={mediaStream} />}
      <UserMediaSafe onMediaStream={onMediaStream} />
    </div>
  );
};

const FaceDetectionWithOpenCv = () => {
  return <PostLayout article={article} demo={<Demo />} />;
};

FaceDetectionWithOpenCv.displayName = 'FaceDetectionWithOpenCv';

export default FaceDetectionWithOpenCv;
