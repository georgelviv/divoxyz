Animation created based on [youtube tutorial](https://www.youtube.com/watch?v=DNZPyoMBiFw) from Patt Vira channel. This animation gives the impression of the wind blowing the canvas. The canvas is evenly divided into a grid, and in each cell, there is a circle. Each circle moves in a circular motion at same radius. To determine the position of the circle, the following formulas are used to convert from the Polar coordinate system to the Cartesian coordinate system:

```math
y=r \cdot cos(\theta)\\
x=r \cdot sin(\theta)
```

The main trick is to shift the starting angle for each subsequent circle slightly, which gives this wave pattern effect.
