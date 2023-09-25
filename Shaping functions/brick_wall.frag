
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


vec2 uv_scale(in vec2 uv, in vec2 scale)
{
	return vec2(uv * scale);
}

vec2 uv_shift(inout vec2 uv, in float shift)
{
	uv.x -= step(1.0, mod(uv.y, 2.0)) * shift;
	return uv;
}

vec3 draw_rect(in vec2 uv, in float scale, in float x_factor, in vec3 color)
{
	vec2 tf_rect = abs(uv - 0.5);
	float shape = step(max(tf_rect.x - x_factor, tf_rect.y), scale);
	return shape * color;
}

void main() {
	vec2 uv = gl_FragCoord.xy / u_resolution;
	uv = uv_scale(uv, vec2(3.0, 10.0));
	uv = uv_shift(uv, 0.5);
	uv = fract(uv);
	vec3 rect = draw_rect(uv, 0.4, 0.06, vec3(0.7804, 0.0784, 0.0784));


	gl_FragColor = vec4(rect, 1.0);

}
