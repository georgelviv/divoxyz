import { PostLayout } from '@core/components/post-layout';
import article from './article.md?raw';
import { CVCamera } from '@shared/components/cv-camera';
import { useCallback } from 'react';
import cv from '@techstark/opencv-js';

const Demo = () => {
  const frameHandler = useCallback((source: cv.Mat, target: cv.Mat) => {
    const grayMat = new cv.Mat(source.rows, source.cols, cv.CV_8UC4);
    const s = new cv.Scalar(125, 0, 0, 255);

    const [halfHeight, halfWidth] = [source.rows / 2, source.cols / 2];

    cv.cvtColor(source, grayMat, cv.COLOR_RGBA2GRAY);
    cv.copyMakeBorder(
      grayMat,
      target,
      halfHeight,
      halfHeight,
      halfWidth,
      halfWidth,
      cv.BORDER_DEFAULT,
      s
    );
    grayMat.delete();
  }, []);
  return <CVCamera frameHandler={frameHandler} />;
};

const CameraMirrorEffect = () => {
  return <PostLayout article={article} demo={<Demo />} />;
};

CameraMirrorEffect.displayName = 'CameraMirrorEffect';

export default CameraMirrorEffect;
