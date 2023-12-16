float noize1d(float value)
{
    return cos(value + cos(value * 90.0) * 100.0) * 0.5 + 0.5;
}


float noize2d(vec2 uv)
{
    return fract(sin(dot(uv, vec2(12.9898,78.233))) * 43758.5453123);
}


float noize2dCustom(vec2 uv, vec2 factor1, float factor2)
{
    return fract(sin(dot(uv, factor1)) * factor2);
}


float noize2dCells(vec2 uv, vec2 count)
{
    return noize2d(floor(uv * count));
}


float noize2dUniform(vec2 uv, float count)
{
    return noize2d(floor(uv * count));
}
