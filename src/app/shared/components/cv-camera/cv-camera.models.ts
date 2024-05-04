import cv from '@techstark/opencv-js';

export type CVCameraFrameHandler = (source: cv.Mat, target: cv.Mat) => void;
