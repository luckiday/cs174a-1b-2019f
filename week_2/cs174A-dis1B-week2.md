
# CS-174A Discussion 1B, Week 2

@ Yunqi Guo

@ DODD 161 / Friday / 12:00pm-1:50pm

@ https://github.com/luckiday/cs174a-1b-2019f   (Short link: https://bit.ly/32Zt3sg)

# Outline

- Transformations
  - Shearing
  - Reflection
- Make animation with tiny-graphics.js

# Transformation

- Shearing
- Reflection

## Shear

$$x’ = x + \mathrm{Sh}_{x}^{y} y + \mathrm{Sh}_{x}^{z} z$$

$$y' = \mathrm{Sh}_{y}^{x}x + y +\mathrm{Sh}_{y}^{z}z$$

$$z' = \mathrm{Sh}_{z}^{x}x + \mathrm{Sh}_{z}^{y}y + z$$

$$
\left(
\begin{array}{c}
 x' \\
 y' \\
 z' \\
 1 \\
\end{array}
\right)=\left(
\begin{array}{cccc}
 1 & \mathrm{Sh}_{x}^{y} y & \mathrm{Sh}_{x}^{z} & 0 \\
 \mathrm{Sh}_{y}^{x} & 1 & \mathrm{Sh}_{y}^{z} & 0 \\
 \mathrm{Sh}_{z}^{x} & \mathrm{Sh}_{z}^{y}y & 1 & 0 \\
 0 & 0 & 0 & 1 \\
\end{array}
\right) \left(
\begin{array}{c}
 x \\
 y \\
 z \\
 1 \\
\end{array}
\right)
$$

## Reflection
To reflect a point through a plane 
$ax + by + cz = 0$ 
(which goes through the origin), if the L2 norm of $a, b $ and $c$ is unity, the transformation matrix can be expressed as:


$$
\left(
\begin{array}{c}
 x' \\
 y' \\
 z' \\
 1 \\
\end{array}
\right)=\left(
\begin{array}{cccc}
 1-2a^2 & -2ab & -2ac & 0 \\
 -2ab & 1-2b^2 & -2bc & 0 \\
 -2ac & -2bc & 1 - 2c^2 & 0 \\
 0 & 0 & 0 & 1 \\
\end{array}
\right) \left(
\begin{array}{c}
 x \\
 y \\
 z \\
 1 \\
\end{array}
\right)
$$


# Make animation with tiny-graphics.js

- Draw a graph with outline
- Draw multiple shapes
- Animation
