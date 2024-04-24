import { PostLayout } from '@core/components/post-layout';
import article from './article.md?raw';

const Demo = () => {
  return <div>Demo</div>;
};

const FaceDetectionWithOpenCv = () => {
  return <PostLayout article={article} demo={<Demo />} />;
};

FaceDetectionWithOpenCv.displayName = 'FaceDetectionWithOpenCv';

export default FaceDetectionWithOpenCv;
