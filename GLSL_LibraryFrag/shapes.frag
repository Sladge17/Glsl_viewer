float shapeLine(vec2 uv)
{
    return step(uv.y, 0.0);
}


float shapeDiagonal(vec2 uv_equal)
{
    return step(uv_equal.x - uv_equal.y, 0.0);
}


float shapeDiagonalInvert(vec2 uv_equal)
{
    return step(uv_equal.x + uv_equal.y, 0.0);
}


float shapeChecker(vec2 uv)
{
    return step(min(uv.x, uv.y), 0.0) - step(max(uv.x, uv.y), 0.0);
}

float shapeCircle(vec2 uv, float size)
{
    return step(length(uv), 0.001 * size);
}


float shapeSquare(vec2 uv, float size)
{
    return step(max(abs(uv.x), abs(uv.y)), 0.001 * size);
}


float shapeCross(vec2 uv, float size)
{
    return step(min(abs(uv.x), abs(uv.y)), 0.001 * size);
}


float shapePolygon(vec2 uv, float size, int sides)
{
    float angle = atan(uv.y, uv.x);
    float slice = DOUBLE_PI / float(sides);
    return step(
        cos(floor(0.5 + angle / slice) * slice - angle) * length(uv),
        0.001 * size
    );
}


float shapePolar(vec2 uv, int sides)
{
    return step(0.0, sin((atan(uv.y, uv.x) * float(sides))));
}


float shapeFunction(float function, float direction)
{
    return step(function, direction);
}
