import { PostLayout } from '@core/components/post-layout';
import article from './article.md?raw';
import { UserMediaSafe } from '@shared/components/user-media-safe';
import { useCallback } from 'react';

const Demo = () => {
  const checked = useCallback(() => {
    console.log('works!');
  }, []);

  return <UserMediaSafe checked={checked} />;
};

const FaceDetectionWithOpenCv = () => {
  return <PostLayout article={article} demo={<Demo />} />;
};

FaceDetectionWithOpenCv.displayName = 'FaceDetectionWithOpenCv';

export default FaceDetectionWithOpenCv;
