float noize(vec2 uv)
{
    return fract(sin(dot(uv, vec2(12.9898,78.233))) * 43758.5453123);
}


float noizeCustom(vec2 uv, vec2 factor1, float factor2)
{
    return fract(sin(dot(uv, factor1)) * factor2);
}


float noizeCells(vec2 uv, vec2 count)
{
    return noize(floor(uv * count));
}


float noizeUniform(vec2 uv, float count)
{
    return noize(floor(uv * count));
}
