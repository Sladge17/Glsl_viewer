
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float zone_0(in vec2 uv)
{
	return step(uv.x, uv.y);
}

float zone_1(in vec2 uv)
{
	return step(uv.y, uv.x);
}

float zone_2(in vec2 uv)
{
	return step(1.0 - uv.x, uv.y);
}

float zone_3(in vec2 uv)
{
	return step(uv.x, 1.0 - uv.y);
}

float get_index_buffer(in vec2 uv)
{
	float index_buffer = 0.0;
	index_buffer += step(1.0, mod(uv.x, 2.0));
	index_buffer += step(1.0, mod(uv.y, 2.0)) * 2.0;
	return index_buffer;
}


void main() {
	vec2 uv = (gl_FragCoord.xy / u_resolution) * 10.0;
	float index_buffer = get_index_buffer(uv);
	uv = fract(uv);
	
	float pattern = 0.0;
	if (index_buffer == 0.0)
	{
		pattern = zone_2(uv);
	}
	if (index_buffer == 1.0)
	{
		pattern = zone_1(uv);
	}
	if (index_buffer == 2.0)
	{
		pattern = zone_0(uv);
	}
	if (index_buffer == 3.0)
	{
		pattern = zone_3(uv);
	}
	
	gl_FragColor = vec4(pattern, pattern, pattern, 1.0);
}
