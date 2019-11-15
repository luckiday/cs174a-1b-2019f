# Assignment #4

## Due: November 24, 2019 at 11:50pm

### Repository setup:

1. By now you have followed the link to create your assignment repository. You can find the link under Piazza resources. Please use the link once as it will create an repository we will not check for submissions if you use it multiple times. The repository name should look like **a4-githubusername**. Any others will get removed.

2. You should also be sure to share your GitHub username with us via this link if you have not already. https://forms.gle/Yne8PYVbfGp2vj6j9

   * You should also be sure to setup your local git environment and ssh keys to work with GitHub.

3. Once your repository is created you will have a copy of the assignment template in your github repository. Now you can clone the repository onto your local computer using the following command. Be sure do execute this command from the directory you wish to locate your work.

    ```bash
      $ git clone git@github.com:https://github.com/intro-graphics-master-F19/a4-gitusername.git

      ```

4. You can now follow the remaining steps of the assignment.

### Graded Steps

#### Up to 50 points of credit plus 15 points extra credit. There is no partial credit on any individual requirement. Late assignments are penalized 25% per day (no exceptions).

Implement the assignment in clean and understandable code. Each required part must successfully draw and show up onscreen in order to count. If you use code that you found online you must cite it inside your program file otherwise that is plagiarism.

**If any parts are unclear, ask on Piazza.**

#### Point distribution

1. Implement functionality to load two different square images of your choice* into texture maps. You must include whatever files are needed for us to run your code in the "assets" folder of your repository (images, etc) **- 5 points**

   **Remember**, not just any image that you download will work.  Images used for texture maps in WebGL 1.0 must be square and have power of two dimensions (therefore only square images of a few limited sizes like 128x128 and 256x256 are valid).  WebGL 2.0 doesn't have this limitation but it also isn't widely supported on phones yet so we don't use it.

   To load a texture into a `Material`, assign a new value to the `Material` object called `"texture"`.  To assign `"texture"` with the right value, use one of our functions that returns a reference to an image file.  Load your image using the function `get_instance` (which makes sure the program only tries to load the file once even if you request it multiple times), found in class `Webgl_Manager` from `tiny-graphics.js`.  The syntax you'll use is `context.get_instance( "assets/your filename", use_mipMap )` where `use_mipMap` is a boolean that gets passed on to the `Texture` class.  You can read the class `Texture` to see what this boolean does; it determines which built-in WebGL functions are called to set the texture sampling method.  The boolean defaults to `true` if you omit it.  For a sampling method, class `Texture` offers a choice between tri-linear (best) or nearest-neighbor (worst but simple).

   A `Texture`'s color is scaled by the Phong formula's ambient weight.  Make your image match its original colors this time, by setting the ambient `color` to opaque black and the `ambient` coefficient to 1.  (FYI, images with transparent pixels are accounted for in the formula too -- the shape's base color affects the texture's color additively, but the transparencies combine multiplicatively).

2. Apply the entire first texture image onto each face of a cube (cube #1) that has dimensions 2x2x2. The texture coordinates should range from (0,1) in both the s and t dimensions. Filtering should be set to use nearest neighbor. **– 10 points**

3. Create a second cube (cube #2) with dimension 2x2x2 where the second texture image is applied to each face but is zoomed out by 50% (the image should shrink; the whole image will appear four times, once in each corner). Enable Mip Mapping for the zoomed texture using tri-linear filtering **- 10 points**

4. Position both cubes side by side within the view of your starting camera view:  Place the camera 5 units back from the origin. Both cubes should have a dimension of 2x2x2. Place the center of cube #1 at (-2,0,0) and the center of cube #2 at (2,0,0). Use a perspective projection.  As you move the camera nearer or farther away, along the z-axis, from the cubes we should see the effect of the texture filtering as the textures get smaller or larger.  For the cube that uses poor sampling, the image should show grainy, flashing static noise at the pixel level **- 5 points**

5. Use the key ‘c’ (with our usual web buttons) to start and stop the rotation both cubes. The cube #1 should rotate around its own X-axis at a rate of 30 rpm. Cube #2 should rotate around its own Y-axis at a rate of 20 rpm. The cubes should not jump to a different angle when they start and stop **- 10 points**

6. Use continuous scrolling the texture map on cube #2. Translate the texture varying the s texture coordinate by 2 texture units per second, causing it to slide along the box faces.  Reset the texture coordinates passed into the GLSL's `texture2D` call periodically so they do not continue to grow forever, which could cause the interpolated values to lose needed decimal precision **- 5 points**

   To code this part, fill in class `Texture_Scroll_X` which will be a modification of `Phong_Shader`, overwriting its `fragment_glsl_code` function to give it new fragment shader code.  Use that shader instead of `Phong_Shader` for cube #1.  

   Note 1: In the fragment shader, the varying "`f_tex_coord`" stores the vec2 of pre-interpolated texture coordinates.

   Note 2: The variable `animation_time` is already passed all the way through into the fragment shader for you.

   Warning:  When coding in GLSL, integer literals like "2" cannot be used most of the time.  Use floats instead by ending your number in a decimal.  Also, you'll have to describe PI for it since there is no built-in constant.  You can make a 4x4 matrix of any form using the `mat4()` constructor, where the matrix is in *column-major* order (the first four entries are the first column, etc).

7. Rotate the texture map itself on all faces of cube #1 around the center of each face at a rate of 15 rpm.  As with #6, prevent the rotation angle from growing excessively as `animation_time` grows **- 5 points**

   To code this part, fill in class `Texture_Rotate` which will be a modification of `Phong_Shader`, overwriting its `fragment_glsl_code` function to give it new fragment shader code.  Use that shader instead of `Phong_Shader` for cube #2.

#### Extra Credit: Each can be attempted individually. There is no partial credit on any individual extra credit.

1. Design the most complex custom polygonal shape you can.  It should be non-planar and preferably a closed volume.  Display it 2 units beneath the origin at a size that does not interfere with the boxes.  Use Phong lighting and color it so we can notice it.  Take advantage of automation in the code that generates your custom Shape **- 5 points**

   Automation can include:
     - For loops (or other code flow control, such as conditionals or in the case of subdivision surfaces, recursion)
     - The use of matrix transforms on points and normal vectors (if M is multiplied onto a point, remember that `M.inverse().transposed()` must be multiplied onto the normal to have the correct effect)
     - The `insert_transformed_copy_into()` function built into the `Shape` class, which allows you to build compound shapes.   

   Tip:  Our Shape class neatly provides the ability to compound multiple defined shapes together into a single combined vertex array.  Vertex arrays with tons of triangles in them don't take that much longer to draw than simple shapes, compared to the high cost of issuing individual `draw()` calls across the high-latency GPU data bus to draw several simple vertex arrays.   Class `Shape`’s compounding feature can thus speed up performance considerably and let you fit more complex shapes (made up of smaller sub-shapes) onscreen at once without slowdown.

   This practice also eliminates a lot of duplicated code you would normally need to provide when trying to pack complex multi-part shapes into a single performance friendly buffer. You can perform a single `insert_transformed_copy_into()` call in any Shape definition to insert other defined shapes into the current array, at custom affine transform offsets. Positions and normal vectors are automatically adjusted by the affine transform during insertion.  Call `insert_transformed_copy_into()` on the source shape's prototype, and for the first argument pass in the destination shape object.  To discover what that means, observe the examples of it being called in the file `dependencies.js`.  The second argument is an array of parameters to pass into the source shape's constructor.  The third argument is the desired transform offset of the shape you are inserting.

2. Be warned: Attempting this part will require work in all of `Phong_Shader`'s functions, and we have not tried it out ourselves yet to make sure it is feasible.

   Make a new Shader similar to `Phong_Shader` that accepts a second `Texture` object, and use it convincingly for bump mapping.  The texture image and bump image should be substantially different from one another.  Include both files in your assets folder.

   If you attempt this part, create a third cube 2 units above the origin and make sure that its movement and choice of images makes the bump mapping effect as obvious as possible.  We should be able to see the light shine off the bumps to reveal the designs of your bump image, regardless of the designs in your texture image **- 10 points**

   If you attempt this, it will be helpful to know how variables reach the shader programs from our JavaScript library.  All GLSL variables you declare in your shader program are automatically detected by our class `Graphics_Addresses` (from `tiny-graphics.js)`.  A `Graphics_Addresses` object (called "`gpu`" in your `Phong_Shader` code) fills itself with data members with the same name as the GLSL variables plus "`_loc`", since they are pointers to the locations in GPU memory where the program variables are.  You can send JavaScript values to the various `_loc` variables by mimicking the example code found in method `update_GPU()` of `Phong_Shader`.  FYI, this gpu object is kept with the Material because the Shape class also has a use for it.  When `draw()` is called, the pointers it keeps to your shader's attribute variables are matched up to your correct memory buffers for your array data (`positions`, `normals`, etc).

   This tutorial might help you add a second texture sampler to your shader::

   https://webglfundamentals.org/webgl/lessons/webgl-2-textures.html

   You will probably need new WebGL commands from that tutorial that don't appear in the library, such as `gl.activeTexture()` and `gl.uniform1i()`.  Presently, the default value of zero for a uniform seems to be how our default `Sampler2D` for texturing is selected.

### Submitting Assignment 4 on GitHub:

1. Once you are finished working it is time to 'commit' your work to your remote repository on GitHub. You will also want to do this periodically while you are working to make a backup of your work and to make your final submission. We will keep the process very simple by just 'committing' the master branch of your local repository into the remote repository on GitHub.

2. The first step is to add any new files into the repository so they can be tracked.

    ```bash
      $ git add *
      ```

3. Then we commit any new and or changed files to the repository. The text after the -m is for you to describe what is included in this commit to the repository.

    ```bash
      $ git commit -m "Description of what I did"
      ```

4. Finally, we need to push these changes up to our remote repository on GitHub. This is a very important step! Without it you are not copying your work back to GitHub and we will not be able to see it if you forget.

    ```bash
      $ git push origin master
      ```

5. You can repeat these commands as often as you feel the need as your work on your assignment. However, again, you must always make a final push to GitHub when you are finished in order to submit your work. We will make a clone of all of the assignment repositories at the deadline. That implies two things. First, make your final push to GitHub ahead of time and second, any pushes you make after the deadline will not be seen by us.
