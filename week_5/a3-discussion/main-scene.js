window.Assignment_Three_Scene = window.classes.Assignment_Three_Scene =
    class Assignment_Three_Scene extends Scene_Component {
        constructor(context, control_box)     // The scene begins by requesting the camera, shapes, and materials it will need.
        {
            super(context, control_box);    // First, include a secondary Scene that provides movement controls:
            if (!context.globals.has_controls)
                context.register_scene_component(new Movement_Controls(context, control_box.parentElement.insertCell()));

            context.globals.graphics_state.camera_transform = Mat4.look_at(Vec.of(0, 10, 20), Vec.of(0, 0, 0), Vec.of(0, 1, 0));
            this.initial_camera_location = Mat4.inverse(context.globals.graphics_state.camera_transform);

            const r = context.width / context.height;
            context.globals.graphics_state.projection_transform = Mat4.perspective(Math.PI / 4, r, .1, 1000);

            const shapes = {
                torus: new Torus(15, 15),
                torus2: new (Torus.prototype.make_flat_shaded_version())(15, 15),

                // TODO:  Fill in shapes for sun and planet 1

                sun_1: new (Subdivision_Sphere)(4),
                sun_2: new (Subdivision_Sphere.prototype.make_flat_shaded_version())(2),
                planet1: new (Subdivision_Sphere.prototype.make_flat_shaded_version())(2)
            };
            this.submit_shapes(context, shapes);

            // Make some Material objects available to you:
            this.materials =
                {
                    test: context.get_instance(Phong_Shader).material(Color.of(1, 1, 0, 1), {ambient: .2}),
                    // TODO:  Fill the the materials for sun and planet 1
                    sun: context.get_instance(Phong_Shader).material(Color.of(1, .5, .5, 1), {
                        ambient: 1,
                        // diffusivity: .7,
                        // specular: 1,
                        // gouraud: true,
                    }),
                    planet1: context.get_instance(Phong_Shader).material(Color.of(.9, .9, .9, 1), {
                        ambient: .5,
                        diffusivity: .7,
                        specular: 1,
                        gouraud: true,
                    })
                };

            this.lights = [new Light(Vec.of(0, 0, 0, 1), Color.of(1, 0, 0, 1), 1000)];
            // TODO: Change the light position

            // TODO: Initialize attached function
            this.attached = () => this.initial_camera_location;
        }

        make_control_panel()            // Draw the scene's buttons, setup their actions and keyboard shortcuts, and monitor live measurements.
        {
            this.key_triggered_button("View solar system", ["0"], () => this.attached = () => this.initial_camera_location);
            this.new_line();
            this.key_triggered_button("Attach to planet 1", ["1"], () => this.attached = () => this.planet_1);
        }

        display(graphics_state) {
            graphics_state.lights = this.lights;        // Use the lights stored in this.lights.
            const t = graphics_state.animation_time / 1000;

            // TODO:  Draw the sun

            let transformation_sun = Mat4.identity();
            transformation_sun = transformation_sun.times(Mat4.scale([2, 2, 2]));
            this.shapes.sun_1.draw(graphics_state, transformation_sun, this.materials.sun);

            // TODO: Draw Planet 1

            let transformation_planet = Mat4.identity();
            transformation_planet =
                transformation_planet.times(Mat4.rotation(2 * t, Vec.of(0, 1, 0)));
            transformation_planet =
                transformation_planet.times(Mat4.translation([5, 0, 0]));
            transformation_planet =
                transformation_planet.times(Mat4.rotation(-2 * t, Vec.of(0, 1, 0)));
            transformation_planet =
                transformation_planet.times(Mat4.rotation(t, Vec.of(1, 1, 0)));


            this.shapes.planet1.draw(graphics_state, transformation_planet, this.materials.planet1);

            // TODO: Change to the planet view
            this.planet_1 = transformation_planet;
            let camera_matrix = this.attached();
            console.log(camera_matrix);
            if (camera_matrix === this.initial_camera_location){
                graphics_state.camera_transform = Mat4.inverse(camera_matrix)
                    .map( (x,i) => Vec.from( graphics_state.camera_transform[i] ).mix( x, .5 ) );;
            } else {
                let camera_planet_transformation =
                    Mat4.translation([0,0,-5]).times(Mat4.inverse(camera_matrix));
                graphics_state.camera_transform = camera_planet_transformation
                    .map( (x,i) => Vec.from( graphics_state.camera_transform[i] ).mix( x, .5 ) );
            }


        }
    };