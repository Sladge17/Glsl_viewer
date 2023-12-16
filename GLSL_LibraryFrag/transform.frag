vec2 moving(vec2 uv, vec2 shift)
{
    return uv - shift;
}

vec2 rotation(vec2 uv, float angle_rad)
{
    return mat2(cos(angle_rad), -sin(angle_rad),
                sin(angle_rad), cos(angle_rad)) * uv;
}
