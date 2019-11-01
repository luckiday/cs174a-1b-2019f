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
            };
            this.submit_shapes(context, shapes);

            // Make some Material objects available to you:
            this.materials =
                {
                    test: context.get_instance(Phong_Shader).material(Color.of(1, 1, 0, 1), {ambient: .2}),

                    // TODO:  Fill the the materials for sun and planet 1
                };

            this.lights = [new Light(Vec.of(5, 10, 10, 1), Color.of(1, 0, 0, 1), 1000)];
            // TODO: Change the light position

            // TODO: Initialize attached function
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

            // TODO: Draw Planet 1

            // TODO: Change to the planet view


            this.shapes.torus2.draw(graphics_state, Mat4.identity(), this.materials.test);

        }
    };