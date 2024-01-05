float noizeSimple(float value)
{
    return cos(value + cos(value * 90.0) * 100.0) * 0.5 + 0.5;
}


float noize1d(vec2 uv, vec2 factor1, float factor2)
{
    return fract(sin(dot(uv, factor1)) * factor2);
}


vec2 noize2d(vec2 uv)
{
    return vec2(
        noize1d(uv, vec2(127.1, 311.7), 43758.5453123),
        noize1d(uv, vec2(269.5, 183.3), 43758.5453123)
    );
}


float noizeCells(vec2 uv)
{
    return noize1d(floor(uv), vec2(12.9898, 78.233), 43758.5453123);
}


float noizeValue(vec2 uv, bool smooth_noize)
{
    vec2 cell_uv = fract(uv);
    if (smooth_noize)
        cell_uv = smoothstep(0.0, 1.0, cell_uv);

    float noize_bottom = mix(
        noizeCells(uv),
        noizeCells(uv + vec2(1.0, 0.0)),
        cell_uv.x
    );
    float noize_top = mix(
        noizeCells(uv + vec2(0.0, 1.0)),
        noizeCells(uv + vec2(1.0, 1.0)),
        cell_uv.x
    );
    return mix(noize_bottom, noize_top, cell_uv.y);
}


float noizePerlin(vec2 uv)
{
    vec2 cell_id = floor(uv);
    vec2 cell_uv = fract(uv);

    vec2 lb_vector = noize2d(cell_id);
    vec2 rb_vector = noize2d(cell_id + vec2(1.0, 0.0));
    vec2 lt_vector = noize2d(cell_id + vec2(0.0, 1.0));
    vec2 rt_vector = noize2d(cell_id + vec2(1.0, 1.0));

    vec2 lb_crd_px = cell_uv;
    vec2 rb_crd_px = cell_uv - vec2(1.0, 0.0);
    vec2 lt_crd_px = cell_uv - vec2(0.0, 1.0);
    vec2 rt_crd_px = cell_uv - vec2(1.0, 1.0);

	return mix(
        mix(dot(lb_vector, lb_crd_px), dot(rb_vector, rb_crd_px), cell_uv.x),
        mix(dot(lt_vector, lt_crd_px), dot(rt_vector, rt_crd_px), cell_uv.x),
        cell_uv.y
    );
}


float noizeBillow(vec2 uv)
{
    return abs(noizePerlin(uv));
}


float noizeVoronoiCore2(vec2 uv, vec2 core1, vec2 core2)
{
    vec2 point[2];
    point[0] = core1;
    point[1] =  core2;

    float m_dist = 1.0;
    for (int i = 0; i < 2; i++)
    {
        float dist = distance(uv, point[i]);
        m_dist = min(m_dist, dist);
    }
    return m_dist;
}
