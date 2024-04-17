export type ResizeCallback = (values: {
  height: number;
  width: number;
  originalHeight: number;
  originalWidth: number;
  ratio: number;
}) => void;
