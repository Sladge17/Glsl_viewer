import pygame as pg
import moderngl as mgl
import numpy as np
# import time
from math import sin
import os


def init_display(display, resolution):

    # set opengl attr
    display.gl_set_attribute(pg.GL_CONTEXT_MAJOR_VERSION, 3)
    display.gl_set_attribute(pg.GL_CONTEXT_MINOR_VERSION, 3)
    display.gl_set_attribute(pg.GL_CONTEXT_PROFILE_MASK, pg.GL_CONTEXT_PROFILE_CORE)

    # create opengl context
    display.set_mode(resolution, flags=pg.OPENGL | pg.DOUBLEBUF)


def init_vbo(ctx):
    vertex_data = np.array(
        [(-1, 1), (-1, -1), (1, -1), (-1, 1), (1, -1), (1, 1)],
        dtype=np.float32,
    )
    vbo = ctx.buffer(vertex_data)
    
    vertex_shader =\
    """
    #version 330 core

    layout (location = 0) in vec2 in_position;

    void main() {
        gl_Position = vec4(in_position, 0.0, 1.0);
    }
    """
    return vbo, vertex_shader


def get_glsl_library(path_glsl_library):
    glsl_library = ""
    for source in os.listdir(path_glsl_library):
        with open(os.path.join(path_glsl_library, source)) as file:
            glsl_library += file.read()
    return glsl_library  


def check_ivent():
    for event in pg.event.get():
        if (event.type == pg.KEYDOWN and event.key == pg.K_ESCAPE):
            return True
        return False
    

def release_program(vbo, shader_program, vao):
    vbo.release()
    shader_program.release()
    vao.release()
    pg.quit()


def main(resolution, glsl_library, glsl_shader):
    pg.init()
    init_display(pg.display, resolution)

    # detect and use existing opengl context
    ctx = mgl.create_context()    
    vbo, vertex_shader = init_vbo(ctx)

    glsl_library = get_glsl_library(glsl_library)
    
    # need wrap to function!!!!!!!!!
    texture = pg.image.load("Tim_Braid.png").convert()
    texture = ctx.texture(
        size=texture.get_size(),
        components=3,
        data=pg.image.tostring(texture, 'RGB'),
    )
        
    u_time = 0
    while True:
        if check_ivent():
            break
        
        with open(glsl_shader) as file:
            fragment_shader = glsl_library + file.read()
        
        try:
            shader_program = ctx.program(
                vertex_shader=vertex_shader,
                fragment_shader=fragment_shader,
            )
        except:
            continue
                   
        try:
            shader_program['u_resolution'] = resolution
        except KeyError:
            pass
        
        try:
            shader_program['u_time'] = u_time
            u_time += 1e-2
        except KeyError:
            pass

        try:
            shader_program['u_texture_0'] = 0
            texture.use()
        except KeyError:
            pass

        vao = ctx.vertex_array(shader_program, [(vbo, '2f', 'in_position')])
        vao.render()
        pg.display.flip()
        shader_program.release()
        vao.release()

    release_program(vbo, shader_program, vao)


if __name__ == "__main__":
    window_width = int(os.environ['WINDOW_WIDTH'])
    window_height = int(os.environ['WINDOW_HEIGHT'])
    glsl_library = os.environ['GLSL_LIBRARY']
    glsl_shader = os.environ['GLSL_SHADER']

    main((window_width, window_height), glsl_library, glsl_shader)

    # while True:
    #     print((time.time() - int(time.time())) * 100)
