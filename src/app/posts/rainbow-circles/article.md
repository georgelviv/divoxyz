Animation created based on [youtube tutorial](https://www.youtube.com/watch?v=QLhqlrRx-nE) from Patt Vira channel. Main trick to get this animation is to use **blend mode**.
In digital imaging and graphic design, a blend mode is a feature that determines how two layers or objects in an image are blended or combined together. Each pixel of the top layer interacts with the corresponding pixel of the bottom layer based on the chosen blend mode, resulting in various visual effects.

In HTML5 Canvas, the [globalCompositeOperation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation) property is used to set the blending mode, also known as the composite operation, for drawing shapes and images onto the canvas. This property determines how newly drawn shapes or images are composited with the existing content on the canvas. In this particular animation `difference` value is used (subtracts the bottom layer from the top layer — or the other way round — to always get a positive value).

To apply a blend mode only to particular shapes in HTML5 Canvas, the [save()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save) and [restore()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore) methods of the canvas context `ctx` need to be applied. These methods allow to save and restore the current state of the canvas context, including transformation matrix, clipping region, and global composite operation (blend mode).

> [!NOTE]
> Be aware running this demo will significantly slow down performance due of usage globalCompositeOperation
