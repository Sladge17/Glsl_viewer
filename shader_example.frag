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
    vec2 uv = normFragCoord();
    // setAspectRatio(uv, u_resolution);

    vec3 color = vec3(noize2d(sin(uv + u_time / 10000.0)));


    // vec3 color = vec3(noize1d(u_time));
    // vec3 color = vec3(0.5 + u_time);

    // vec3 color = vec3(lightCircle(uv, 0.05, 0.0));

    // float mask = lightCircle(uv, 0.01, 0.0);
    // float mask = arrayRadial(lightCircle(moving(uv, vec2(0.2, 0.0)), 0.01, 0.0), vec2(0.0), 5);

    
    // int quantity = 5;
    // float angle = float(360 / quantity);
    
    // int n = 0;
    // float mask = 0.0;
    // while (n < quantity)
    // {
    //     mask += lightCircle(moving(rotation(uv, grad2rad(float(n) * angle)), vec2(0.0, 0.2)), 0.01, 0.0);
    //     n += 1;
    // }

    // vec3 color = vec3(mask);



    // uv.y *= 4.0;
    // uv.y -= 2.0;
    // vec3 color = vec3(invert(shapeLine(rotation(uv, grad2rad(u_time)))));
    // vec3 color = vec3(shapeCross(rotation(uv, grad2rad(0.0)), 1.0));
    // vec3 color = vec3((shapeCircle(rotation(uv, grad2rad(0.0)), 100.0)));
    // vec3 color = vec3(shapeRectangle(uv, 100.0));

    // vec3 color = vec3(curveCircle(uv, 50.0, 1.0));
    // vec3 color = vec3(curveFunction(sin(uv.x * 10.0), (gl_FragCoord.xy / u_resolution).y) * 10.0 - 5.0);
    // vec3 color = vec3(curveSquare(uv, 50.0, 1.0));

    // vec3 color = vec3(curveCross(rotation(uv, grad2rad(45.0)), 100.0, 10.0));
    // vec3 color = vec3(curveFunction(sin(uv.x), uv.y, 4.0, 1.0));

    // vec3 color = vec3(shapeDiagonal(uv));

    // vec3 color = vec3(curveDiagonalInvert(uv, 100.0));

    // vec3 color = vec3(sin(length(uv * 10.0) - u_time));

    // vec3 color = vec3(invert(1.0));

    // vec3 color = vec3(uv.x);

    // vec3 color = vec3(step(min(uv.x, uv.y), 0.0) - step(max(uv.x, uv.y), 0.0));
    // vec3 color = vec3((shapeChecker(uv - 0.5)));
    // vec3 color = vec3(shapePolygon(uv, 100.0, 6));

    // vec3 color = vec3((sin(atan(uv.y, uv.x) * 5.0)));
    // vec3 color = vec3(shapePolar(uv, 3));


    gl_FragColor = vec4(color, 1.0);
}
