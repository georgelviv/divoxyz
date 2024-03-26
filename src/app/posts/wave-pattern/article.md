Animation created based on [youtube tutorial](https://www.youtube.com/watch?v=DNZPyoMBiFw) from Patt Vira channel. This animation gives the impression of the wind blowing the canvas. The canvas is evenly divided into a grid and in each cell there is a circle. Each circle moves in a circle at same radius. In order to determine the position of the circle, the following formulas used to convert from the Polar coordinate system to the Cartesian coordinate system:

```math
y=r \cdot cos(\theta)\\
x=r \cdot sin(\theta)
```

Main trick is to make starting angle for each next circle shifted a bit, which will give this wave pattern effect.
