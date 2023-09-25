#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 uv)
{    
    return smoothstep(0.02, 0.0, abs(uv.y - uv.x));
}

void main()
{
	vec2 uv = gl_FragCoord.xy / u_resolution;
	vec3 back_rgb = vec3(uv.x);
	float line_mask = plot(uv);
	vec3 line_rgb = vec3(0.1176, 0.0, 1.0);

    vec3 rgb = (1.0 - line_mask) * back_rgb + line_mask * line_rgb;

	gl_FragColor = vec4(rgb, 1.0);
}
