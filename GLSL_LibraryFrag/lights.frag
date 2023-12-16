float lightCircle(vec2 uv, float inner_radius, float hardness)
{
    return inner_radius / (length(uv) + 0.0) - hardness;
}
