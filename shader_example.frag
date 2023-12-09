#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;


void setAspectRatio(inout vec2 uv)
{
    if (u_resolution.x == u_resolution.y)
        return;
    
    if (u_resolution.x > u_resolution.y)
    {
        uv.x *= u_resolution.x / u_resolution.y;
        return;
    }
    uv.y *= u_resolution.y / u_resolution.x;
}


vec2 normFragCoord()
{
    return gl_FragCoord.xy / u_resolution;
}

void main()
{
    vec2 uv = normFragCoord() - 0.5;
    setAspectRatio(uv);


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
    vec3 color = vec3(shapePolar(uv, 3));


    gl_FragColor = vec4(color, 1.0);
}
