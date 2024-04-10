This demo made based on [video tutorial](https://www.youtube.com/watch?v=BjoM9oKOAKY) from **The Coding Train**.

200 **particles** with random positions are driven by an invisible **force field**. Particles and the force field are expressed as **Vectors**.

```math
\vec{v}
```

In mathematics and physics, a vector is a quantity that has both magnitude (size or length) and direction. Vectors are often represented graphically as arrows, where the length of the arrow corresponds to the magnitude of the vector and the direction of the arrow indicates the direction of the vector.

The whole canvas is divided into small, invisible cells. Each cell has its own vector, with the angle of each vector defined by a **3D Perlin Noise function** with a fixed magnitude of 1. The _X_ and _Y_ coordinates are determined by the column and row numbers, while _Z_ slightly changes over time. This defines **force field**.

After the force field is defined, **particles** are scattered over the canvas. These particles are then accelerated by the value of the closest force field vector. With each frame, a line is drawn from the particle's previous position to its new position with a certain opacity, resulting in the creation of a flow field animation.
