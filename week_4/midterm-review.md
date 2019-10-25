# CS174A – Introduction to Computer Graphics  MIDTERM STUDY GUIDE

 

## General Instructions

1.   Only students registered in the course may take this exam

2.   Exam is closed book, closed notes, closed electronics including calculators

3.   Unless explicitly specified, you don’t have to multiple matrices

4.   No points are deducted for wrong answers

5.   I will NOT ask anything that I’ve not covered in class

6.   Midterm carries 100 points

 

## Chapter 1: Graphics Systems and Models

*   What are the 4 elements of computer graphics?
*   Examples of procedural animation: physics-based, behavioral
*   Difference between random scan (calligraphic) and raster output devices
*   Difference between interlaced and non-interlaced devices
*   Difference between single and double buffering
    *   Single buffer does not have depth concept
    *   
*   Memory space needed by a frame buffer
*   Max time to read pixel from memory at a certain refresh rate
*   1.8 - 1.11

 

## Points and Vectors

* Vector operations, properties, inverse, etc.

* Find new point based on initial point and direction of vectors

* Dot products, special cases

* Cross products

* Parametric equations of line and triangle (barycentric coordinates)

  *   Line:

  ![](/Users/yunqiguo/Document/TA_CS174A/cs174a-1b-2019f/week_4/figure/lineplane1.gif)

  
  
  $$
  \overrightarrow{r}= \overrightarrow{r_0}+t\overrightarrow{v}
  $$
  
  - Trangle: 
  
* What is the diff between affine combinations and convex combination of points?
  * An affine combination is a linear combination of a vector, where the sum of the coffecients is 1. 
  * A convex combination is a linear combination of a vector where the sum of the coeffecients is 1 and every coeffecient is non-negative.
* Find point on an edge based on different values of α1 and α2; which is affine, which is convex?

 

## Chapter 2.4.1: Polygons

*   What is tessellation and triangulation? Difference between them

*   Provide the full index structure of a simple polyhedron

*   Two problems with concave polygons: finding outward normals and determining if a point is inside or outside a polygon

*   Give 3 reasons why triangles are preferred polys in graphics hardware

*   2.11-2.14, 2.18-2.19

 

## Chapter 4: Transformations

*   Properties of affine combinations

*   Properties of rigid body transformations

*   Translation, scaling, rotation, shear matrices

*   Prove using 2D HMs that scale followed by translation is not the same as translation followed by scaling; in what particular situation will they be same

*   Prove using HMs that 2 consecutive transformations are commutative or associative

*   How to rotate a point about a random point?

*   How to rotate about a random vector, using sequence of rotations or changes of basis/frames?

 

## Chapter 5: Viewing & HSR

*   What parameters are needed to form eye/camera matrix?

*   What params are needed to form pers proj matrix?

*   Transformations from projection matrices to normalized forms

*   Transformation from normalized coordinates to viewport: W2V mapping

*   What is back face culling? How do you do this in world space, in eye space and in perspective space?

*   Z-buffer algorithm

 

## Geometric Calculations

*   Point in polygon test for convex/concave polys: semi-infinite ray, angle summation

*   Normal vector calculations: 3 consecutive CCW vertices, summation method

*   Plane equations: 3 points in a plane, surface normal + distance from origin

*   On-line test

*   Edge-edge intersections

*   Collinearity test