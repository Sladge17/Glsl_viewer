#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}


vec3 draw_axis(in vec2 tf, in vec3 color)
{
	float axis_x = step(abs(tf.x), 0.002);
	float axis_y = step(abs(tf.y), 0.002);
	return (axis_x + axis_y) * color;
}

vec3 draw_rect(in vec2 tf,  in vec2 pivot, in float size, in vec2 scale, in vec3 color)
{
	vec2 abs_pivot = abs((tf - pivot) * rotate2d(16.5)) * (1.0 / scale);
	return step(max(abs_pivot.x, abs_pivot.y), size) * color;
}

vec3 draw_cross(in vec2 tf,  in vec2 pivot, in float size, in float scale, in vec3 color)
{
	vec3 cross_x = draw_rect(tf, pivot, size, vec2(1.0, scale), color);
	vec3 cross_y = draw_rect(tf, pivot, size, vec2(scale, 1.0), color);
	return cross_x + cross_y;
}

vec2 pol2dec(in float angle, in float len)
{
	return vec2(len * cos(angle), len * sin(angle));
}



void main() {
	vec2 tf_world = ((gl_FragCoord.xy / u_resolution) * 2.0 - 1.0);

	vec3 axis_color = vec3(0.0, 1.0, 0.0);
	vec3 axis = draw_axis(tf_world, axis_color);

	gl_FragColor = vec4(axis, 1.0);


	vec3 shape_color = vec3(1.0, 0.0, 0.0);
	// vec3 shape = draw_cross(tf_world, vec2(0.5, 0.5), 0.2, 0.2, shape_color);
	vec3 shape = draw_cross(tf_world, pol2dec(0.50, 0.5), 0.2, 0.2, shape_color);

	// vec3 color = vec3(shape.x, shape.y, 0.0);
	gl_FragColor = vec4(axis + shape, 1.0);


}