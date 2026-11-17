import { useEffect, useRef } from 'react'
import india from '@svg-maps/india'

// The India silhouette as a waving tiranga. Raw WebGL: the map outline is a mask texture,
// stripes + Ashoka Chakra are drawn in the fragment shader, and a travelling sine bends it like cloth.
const SHEET = [612, 696]

const VERT = `
attribute vec2 p;
varying vec2 v_uv;
void main() {
  v_uv = vec2(p.x * 0.5 + 0.5, 0.5 - p.y * 0.5);
  gl_Position = vec4(p, 0.0, 1.0);
}`

const FRAG = `
precision mediump float;
uniform sampler2D u_mask;
uniform float u_t;
uniform float u_mix;
uniform float u_amp;
varying vec2 v_uv;

const vec3 SAFFRON = vec3(1.0, 0.6, 0.2);    // #FF9933
const vec3 GREEN = vec3(0.075, 0.533, 0.031); // #138808
const vec3 NAVY = vec3(0.0, 0.0, 0.502);      // #000080
const vec2 SIZE = vec2(612.0, 696.0);

void main() {
  vec2 uv = v_uv;
  // cloth: waves travel away from the hoist (left edge), growing with distance from it
  float hoist = smoothstep(0.0, 0.55, uv.x);
  float ph = uv.x * 9.0 - u_t * 3.0;
  float wave = sin(ph) * 0.65 + sin(uv.x * 17.0 + uv.y * 5.0 - u_t * 4.2) * 0.35;
  vec2 d = uv + vec2(cos(ph) * 0.004, wave * 0.016) * u_amp * hoist;

  float a = texture2D(u_mask, d).r;
  if (a < 0.003) discard;

  // tricolour bands with soft edges
  float aa = 0.004;
  vec3 col = mix(SAFFRON, vec3(1.0), smoothstep(0.3333 - aa, 0.3333 + aa, d.y));
  col = mix(col, GREEN, smoothstep(0.6667 - aa, 0.6667 + aa, d.y));

  // Ashoka Chakra: rim, hub and 24 spokes, 3/4 of the white band's height
  vec2 q = (d - vec2(0.5, 0.5)) * SIZE;
  float r = length(q);
  float R = 0.375 * SIZE.y / 3.0; // radius = 3/8 of the band height
  float ring = 1.0 - smoothstep(4.0, 6.0, abs(r - R));
  float hub = 1.0 - smoothstep(10.0, 12.0, r);
  float ang = atan(q.y, q.x);
  float spoke = (1.0 - smoothstep(1.4, 2.6, abs(sin(ang * 12.0)) * r)) * step(r, R);
  col = mix(col, NAVY, clamp(ring + hub + spoke, 0.0, 1.0));

  // fold lighting from the wave's slope
  col *= 0.9 + 0.18 * cos(ph) * u_amp * hoist;

  gl_FragColor = vec4(col * a, a) * u_mix;
}`

function compile(gl, type, src) {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s))
  return s
}

export default function FlagGL({ active, className = '' }) {
  const ref = useRef(null)
  const ctl = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const gl = canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: true })
    // ponytail: no/failed WebGL → the plain map stays; this effect must never take the page down
    if (!gl || gl.isContextLost()) return
    const prog = gl.createProgram()
    try {
      gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT))
      gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG))
      gl.linkProgram(prog)
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog))
    } catch (err) {
      console.warn('Tiranga shader disabled:', err)
      return
    }
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    // mask: every state path filled white on a 2× canvas
    const mask = document.createElement('canvas')
    mask.width = SHEET[0] * 2
    mask.height = SHEET[1] * 2
    const g = mask.getContext('2d')
    g.scale(2, 2)
    g.fillStyle = '#fff'
    for (const l of india.locations) g.fill(new Path2D(l.path))
    const tex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, mask)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

    const u = Object.fromEntries(['u_t', 'u_mix', 'u_amp'].map((n) => [n, gl.getUniformLocation(prog, n)]))
    const amp = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2)
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // only animate while showing or fading; idle map costs nothing
    const s = { mix: 0, target: 0, raf: 0, t0: performance.now() }
    const draw = () => {
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      if (s.mix < 0.002) return
      gl.uniform1f(u.u_t, (performance.now() - s.t0) / 1000)
      gl.uniform1f(u.u_mix, s.mix)
      gl.uniform1f(u.u_amp, amp)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
    const tick = () => {
      s.mix += (s.target - s.mix) * 0.07
      draw()
      if (s.target === 0 && s.mix < 0.002) { s.mix = 0; draw(); s.raf = 0; return }
      s.raf = requestAnimationFrame(tick)
    }
    ctl.current = (on) => {
      s.target = on ? 1 : 0
      if (!s.raf) s.raf = requestAnimationFrame(tick)
    }

    return () => {
      cancelAnimationFrame(s.raf)
      ro.disconnect()
      gl.deleteTexture(tex)
      gl.deleteBuffer(buf)
      gl.deleteProgram(prog)
      // no loseContext(): StrictMode remounts reuse this canvas, and a lost context can't compile shaders
      ctl.current = null
    }
  }, [])

  useEffect(() => { ctl.current?.(active) }, [active])

  return <canvas ref={ref} className={className} aria-hidden="true" />
}
