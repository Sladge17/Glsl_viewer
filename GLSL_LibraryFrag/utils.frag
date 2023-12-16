void setAspectRatio(inout vec2 uv, vec2 u_resolution)
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


float grad2rad(float angle_grad)
{
    return angle_grad * (PI / 180.0);
}


vec2 dec2pol(vec2 uv)
{
    return vec2(length(uv), atan(uv.y, uv.x));
}


float invert(float value)
{
    return step(value, 0.0);
}
