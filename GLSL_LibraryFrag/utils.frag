const float PI = 3.14159265359;

float grad2rad(float angle_grad)
{
    return angle_grad * (PI / 180.0);
}


float invert(float value)
{
    return step(value, 0.0);
}
