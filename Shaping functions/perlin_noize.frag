
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;



float get_noize(in vec2 uv)
{
	return fract(sin(dot(uv.xy, vec2(234.0, 12.0))) * 45363.0);
}

float get_perlin_noize(in vec2 int_part, in vec2 fract_part)
{
    float a = get_noize(int_part);
    float b = get_noize(int_part + vec2(1.0, 0.0));
    float c = get_noize(int_part + vec2(0.0, 1.0));
    float d = get_noize(int_part + vec2(1.0, 1.0));

	float noize_x1 = mix(a, b, fract_part.x);
	float noize_x2 = mix(c, d, fract_part.x);
	return mix(noize_x1, noize_x2, fract_part.y);
}


vec2 get_noize_2D(in vec2 uv)
{
	uv = vec2( dot(uv, vec2(127.1, 311.7)),
              dot(uv, vec2(269.5, 183.3)));
	return  2.0 * fract(sin(uv) * 43758.5453123) - 1.0;
}

float get_gradient_noize(in vec2 int_part, in vec2 fract_part)
{
    vec2 a_int_part = get_noize_2D(int_part);
    vec2 b_int_part = get_noize_2D(int_part + vec2(1.0, 0.0));
    vec2 c_int_part = get_noize_2D(int_part + vec2(0.0, 1.0));
    vec2 d_int_part = get_noize_2D(int_part + vec2(1.0, 1.0));

    vec2 a_fract_part = fract_part;
    vec2 b_fract_part = fract_part - vec2(1.0, 0.0);
    vec2 c_fract_part = fract_part - vec2(0.0, 1.0);
    vec2 d_fract_part = fract_part - vec2(1.0, 1.0);

	float noize_x1 = mix(dot(a_int_part, a_fract_part), dot(b_int_part, b_fract_part), fract_part.x);
	float noize_x2 = mix(dot(c_int_part, c_fract_part), dot(d_int_part, d_fract_part), fract_part.x);
	return mix(noize_x1, noize_x2, fract_part.y);
}


void main() {
	vec2 uv = (gl_FragCoord.xy / u_resolution) * 10.0;
	vec2 i = floor(uv);
	vec2 j = fract(uv);

	float noize = get_gradient_noize(i, j);
	gl_FragColor = vec4(noize, noize, noize, 1.0);
}
