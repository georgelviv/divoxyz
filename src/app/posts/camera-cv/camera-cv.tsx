import { PostLayout } from '@core/components/post-layout';
import article from './article.md?raw';
import { CVCamera } from '@shared/components/cv-camera';
import { useCallback, useEffect, useRef, useState } from 'react';
import cv from '@techstark/opencv-js';
import imgUrl from './img.jpg';

const Demo = () => {
  const canvasRef = useRef(null);
  const [imgEl, setImgEl] = useState<HTMLImageElement>(null);
  useEffect(() => {
    console.log(canvasRef.current);
    // if (sizes) {
    //   const imgEl = new Image(sizes.width, sizes.height);
    //   imgEl.src = imgUrl;
    //   imgEl.onload = () => {
    //     setImgEl(imgEl);
    //   }
    // }
  }, [setImgEl]);

  const frameHandler = useCallback(
    (source: cv.Mat, target: cv.Mat) => {
      if (imgEl) {
        const mask = new cv.Mat();

        const img = cv.imread(imgEl);
        imgEl.src = imgUrl;
        cv.add(source, img, target, mask, -1);

        mask.delete();
        img.delete();
      } else {
        source.copyTo(target);
      }
    },
    [imgEl]
  );
  return <CVCamera frameHandler={frameHandler} ref={canvasRef} />;
};

const CameraCV = () => {
  return <PostLayout article={article} demo={<Demo />} />;
};

CameraCV.displayName = 'CameraCV';

export default CameraCV;
