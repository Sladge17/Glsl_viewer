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
    vec2 uv_cell = fract(uv);
    if (smooth_noize)
        uv_cell = smoothstep(0.0, 1.0, uv_cell);

    float noize_bottom = mix(
        noize2dCells(uv),
        noize2dCells(uv + vec2(1.0, 0.0)),
        uv_cell.x
    );
    float noize_top = mix(
        noize2dCells(uv + vec2(0.0, 1.0)),
        noize2dCells(uv + vec2(1.0, 1.0)),
        uv_cell.x
    );
    return mix(noize_bottom, noize_top, uv_cell.y);
}
