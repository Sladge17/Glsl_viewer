float curveLine(vec2 uv, float width)
{
    return step(abs(uv.y), 0.001 * width);
}


float curveDiagonal(vec2 uv_equal, float width)
{
    return step(abs(uv_equal.x - uv_equal.y), 0.001 * width);
}


float curveDiagonalInvert(vec2 uv_equal, float width)
{
    return step(abs(uv_equal.x + uv_equal.y), 0.001 * width);
}


float curveCircle(vec2 uv, float size, float width)
{
    return step(abs(length(uv) - 0.001 * size), 0.001 * width);
}


float curveSquare(vec2 uv, float size, float width)
{
    return step(abs(max(abs(uv.x), abs(uv.y)) - 0.001 * size), 0.001 * width);
}


float curveCross(vec2 uv, float size, float width)
{
    return step(abs(min(abs(uv.x), abs(uv.y)) - 0.001 * size), 0.001 * width);
}


float curveFunction(float function, float direction, float border, float width)
{
    float border_down = function - border / 2.0;
    float border_up = function + border / 2.0;
    return step(
        abs(smoothstep(border_down, border_up, direction) - 0.5), 0.001 * width
    );
}
