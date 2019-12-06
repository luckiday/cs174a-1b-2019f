window.Assignment_Four_Scene = window.classes.Assignment_Four_Scene =
    class Assignment_Four_Scene extends Scene_Component {
        constructor(context, control_box)     // The scene begins by requesting the camera, shapes, and materials it will need.
        {
            super(context, control_box);    // First, include a secondary Scene that provides movement controls:
            if (!context.globals.has_controls)
                context.register_scene_component(new Movement_Controls(context, control_box.parentElement.insertCell()));

            context.globals.graphics_state.camera_transform = Mat4.look_at(Vec.of(0, 0, 5), Vec.of(0, 0, 0), Vec.of(0, 1, 0));

            const r = context.width / context.height;
            context.globals.graphics_state.projection_transform = Mat4.perspective(Math.PI / 4, r, .1, 1000);
            this.rows = 70;
            this.columns = 70;
            this.width = 95;  //x
            this.length = 70; //y
            this.height = 20;
            this.Height_Map = [];
            this.time = 1;

            // TODO:  Create two cubes, including one with the default texture coordinates (from 0 to 1), and one with the modified
            //        texture coordinates as required for cube #2.  You can either do this by modifying the cube code or by modifying
            //        a cube instance's texture_coords after it is already created.
            const shapes = {
                box_1: new Cube(),
                axis: new Axis_Arrows(),
                water_1: new Water(),
            };
            shapes.box_1.texture_coords = shapes.box_1.texture_coords.map(v => Vec.of(v[0] * 2, v[1] * 3));

            this.submit_shapes(context, shapes);

            // TODO:  Create the materials required to texture both cubes with the correct images and settings.
            //        Make each Material from the correct shader.  Phong_Shader will work initially, but when
            //        you get to requirements 6 and 7 you will need different ones.
            this.materials =
                {
                    phong: context.get_instance(Phong_Shader).material(Color.of(1, 1, 0, 1)),
                    box_1: context.get_instance(Texture_Rotate).material(
                        Color.of(1, 1, 0, 1), {
                            ambient: 1,
                            texture: context.get_instance("assets/box.png")
                        }
                    ),
                };

            this.lights = [new Light(Vec.of(-5, 5, 5, 1), Color.of(0, 1, 1, 1), 100000)];

            // TODO:  Create any variables that needs to be remembered from frame to frame,
            //  such as for incremental movements over time.
        }

        make_control_panel() {
            // TODO:  Implement requirement #5 using a key_triggered_button that responds to the 'c' key.
        }

        display(graphics_state) {
            graphics_state.lights = this.lights;        // Use the lights stored in this.lights.
            const t = graphics_state.animation_time / 1000, dt = graphics_state.animation_delta_time / 1000;

            // TODO:  Draw the required boxes. Also update their stored matrices.
            let water_trans = Mat4.identity();
            water_trans = water_trans.times(Mat4.rotation(t, Vec.of(1, 1, 0)));
            // this.shapes.axis.draw(graphics_state, Mat4.identity(), this.materials.phong);
            // this.shapes.box_1.draw(graphics_state, Mat4.identity(), this.materials.box_1);
            this.shapes.water_1.positions.forEach((p, i, a) => a[i] = [0, 0, 0]);
            this.shapes.water_1.draw(graphics_state, water_trans, this.materials.phong);
        }
    };


class Texture_Rotate extends Phong_Shader {
    fragment_glsl_code()           // ********* FRAGMENT SHADER *********
    {
        // TODO:  Modify the shader below (right now it's just the same fragment shader as Phong_Shader) for requirement #7.
        return `
        uniform sampler2D texture;
        void main()
        { 
          if( GOURAUD || COLOR_NORMALS )    
          { gl_FragColor = VERTEX_COLOR;    
            return;
          } 
          // Do smooth "Phong" shading unless options like "Gouraud mode" are wanted instead.      
          // Otherwise, we already have final colors to smear (interpolate) across vertices.                                      
          // If we get this far, calculate Smooth "Phong" Shading as opposed to Gouraud Shading.
          // Phong shading is not to be confused with the Phong Reflection Model.               
          // Sample the texture image in the correct place.
          // Compute an initial (ambient) color:
          
          vec4 tex_color = texture2D( texture, f_tex_coord );        
                    
          /* 2D rotation matrix */
          // float theta = animation_time;
          // mat2 r = mat2( cos(theta), sin(theta), -sin(theta), cos(theta));
          // float t = 0.5;
          // vec4 tex_color = texture2D( texture, r * (f_tex_coord.xy - t) + t);
                                                                            
          if( USE_TEXTURE ) 
            gl_FragColor = vec4( ( tex_color.xyz + shapeColor.xyz ) * ambient, 
              shapeColor.w * tex_color.w ); 
          else 
            gl_FragColor = vec4( shapeColor.xyz * ambient, shapeColor.w );
        
          gl_FragColor.xyz += phong_model_lights( N );                     
          // Compute the final color with contributions from lights.
        }
        `;
    }
}

