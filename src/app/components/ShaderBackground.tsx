// src/app/components/ShaderBackground.tsx
"use client";
import { useRef, useEffect } from "react";

export default function ShaderBackground() {
  const glCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = glCanvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    // Vertex shader (simple passthrough)
    const vert = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = (position + 1.0) * 0.5;
        gl_Position = vec4(position, 0, 1);
      }
    `;
    // Fragment shader (minimal, bold, morphing shapes, with color and gray levels)
    const frag = `
      precision mediump float;
      varying vec2 vUv;
      uniform float u_time;
      // Simple 2D random
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }
      // Minimal value noise
      float valueNoise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }
      void main() {
        // Large scale, slow morphing
        float n = valueNoise(vUv * 3.0 + vec2(u_time * 0.12, u_time * 0.09));
        float n2 = valueNoise(vUv * 2.0 - vec2(u_time * 0.08, u_time * 0.13));
        float shape = max(n, n2); // combine shapes
        // Make mask threshold higher for more black (less shapes)
        float mask = smoothstep(0.55, 0.75, shape);
        // Center mask: 1.0 in center, 0.0 at edges, smooth falloff
        vec2 center = vUv - 0.5;
        float dist = length(center) * 1.0; // mask is now much wider
        float centerMask = 1.0 - smoothstep(0.35, 0.5, dist); // softer fade out towards edges
        // Multiply shape mask by center mask to "desolve" at edges
        mask *= centerMask;
        // Color: animate hue for the white part, keep black for the rest
        float hue = 0.6 + 0.4 * sin(u_time * 0.1 + vUv.x * 2.0);
        float sat = 0.7;
        float val = 1.0;
        // HSV to RGB
        vec3 k = vec3(1.0, 2.0/3.0, 1.0/3.0);
        vec3 p = abs(fract(vec3(hue) + k) * 6.0 - 3.0);
        vec3 rgb = val * mix(vec3(1.0), clamp(p - 1.0, 0.0, 1.0), sat);
        // Blend color with black based on mask (mask is 0..1, so gray is possible)
        vec3 finalColor = mix(vec3(0.0), rgb, mask);
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;
    function compile(type: number, src: string) {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }
    const vs = compile(gl.VERTEX_SHADER, vert);
    const fs = compile(gl.FRAGMENT_SHADER, frag);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // Fullscreen quad
    const pos = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pos);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uTime = gl.getUniformLocation(prog, "u_time");

    // Resize canvas to fit parent
    function resize() {
      const w = canvas.parentElement?.clientWidth || window.innerWidth;
      const h = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
    resize();
    window.addEventListener("resize", resize);

    let running = true;
    function render(t: number) {
      if (!running) return;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTime, t * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
    return () => {
      running = false;
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={glCanvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ display: "block" }}
      aria-hidden="true"
    />
  );
}
