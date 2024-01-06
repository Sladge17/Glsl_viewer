#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D u_texture_0;


vec2 normFragCoord()
{
    return gl_FragCoord.xy / u_resolution;
}


float scaningLine(float direction, float scale, float speed)
{
    return cos(floor(float(direction * scale)) - speed);
}


float arrayRadial(float figure, vec2 pivot, int quantity)
{
    float shift_angle = float(360 / quantity);
    float array = figure;
    int n = 0;

    while(n < quantity)
    {
        array += dot(rotation(pivot, grad2rad(float(n) * shift_angle)), vec2(figure));
        n += 1;
    }
    return array;
}


// void main()
// {
//     vec2 uv = normFragCoord();
//     uv.y = 1.0 - uv.y;
//     // gl_FragColor = texture2D(u_texture, uv);
//     // vec3 color = texture2D(u_texture_0, uv).rgb;
//     // gl_FragColor = vec4(color, 1.0);

//     vec3 color_1 = texture2D(u_texture_0, uv).rgb;
//     vec3 color_2 = vec3(1.0, 0.0, 0.0);
//     float mask = uv.x;
//     vec3 color = mix(color_1, color_2, mask);

    
//     gl_FragColor = vec4(color, 1.0);
// }



void main()
{
    vec2 uv = normFragCoord() * 1.0;
    uv.y = 1.0 - uv.y;
    // setAspectRatio(uv, u_resolution);

    // vec3 color = vec3(1.0 - noizePerlin(uv));
    // vec3 color = vec3(1.0 - noizeBillow(uv));
    vec3 color = vec3(noizeVoronoiCore2(uv, vec2(0.83, 0.75), vec2(0.31, 0.26)));

    // gl_FragColor = vec4(color, 1.0);
    gl_FragColor = texture2D(u_texture_0, uv);
}
