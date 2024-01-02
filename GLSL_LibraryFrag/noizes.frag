float noize1d(float value)
{
    return cos(value + cos(value * 90.0) * 100.0) * 0.5 + 0.5;
}


float noize2d(vec2 uv)
{
    return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453123);
}


float noize2dCustom(vec2 uv, vec2 factor1, float factor2)
{
    return fract(sin(dot(uv, factor1)) * factor2);
}


float noize2dCells(vec2 uv)
{
    return noize2d(floor(uv));
}


float noize2dValue(vec2 uv, bool smooth_noize)
{
    vec2 int_part = floor(uv);
    vec2 fract_part = fract(uv);
    
    if (smooth_noize)
        fract_part = smoothstep(0.0, 1.0, fract_part);

    float corner_left_buttom = noize2d(int_part);
    float corner_right_buttom = noize2d(int_part + vec2(1.0, 0.0));
    float corner_left_top = noize2d(int_part + vec2(0.0, 1.0));
    float corner_right_top = noize2d(int_part + vec2(1.0, 1.0));

    float noize_bottom = mix(corner_left_buttom, corner_right_buttom, fract_part.x);
    float noize_top = mix(corner_left_top, corner_right_top, fract_part.x);
    return mix(noize_bottom, noize_top, fract_part.y);
}
