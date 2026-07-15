import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../ThemeContext';
import { CACHE_KEY, VS, FS } from './shaders';

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const cacheKey = `${CACHE_KEY}-${theme}`;
  const [cached, setCached] = useState<string | null>(() => {
    try { return localStorage.getItem(cacheKey); } catch { return null; }
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    function createShader(type: number, source: string) {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      return shader;
    }

    const program = gl.createProgram();
    if (!program) return;
    const vertexShader = createShader(gl.VERTEX_SHADER, VS);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, FS);

    if (!vertexShader || !fragmentShader) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1, -1, -1, -1, 1, 1, -1, 1]), gl.STATIC_DRAW);

    const ap = gl.getAttribLocation(program, 'p');
    const ur = gl.getUniformLocation(program, 'u_resolution');
    const ut = gl.getUniformLocation(program, 'u_time');
    const uth = gl.getUniformLocation(program, 'u_theme');
    const t0 = Date.now();

    let animationId: number;
    let frames = 0;

    function draw() {
      if (!canvas || !gl) return;
      if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.vertexAttribPointer(ap, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(ap);
      gl.uniform2f(ur, canvas.width, canvas.height);
      gl.uniform1f(ut, (Date.now() - t0) / 1000);
      gl.uniform1f(uth, theme === 'dark' ? 1.0 : 0.0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      frames++;
      if (frames === 5) {
        const data = canvas.toDataURL('image/png');
        try { localStorage.setItem(cacheKey, data); } catch {}
        setCached(data);
      }

      animationId = requestAnimationFrame(draw);
    }

    draw();

    function handleVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animationId = requestAnimationFrame(draw);
      }
    }
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [theme, cacheKey]);

  return (
    <canvas
      ref={canvasRef}
      id="c"
      className="fixed inset-0 w-full h-full z-0 transition-opacity duration-500"
      style={{
        background: cached ? `url(${cached}) center / cover no-repeat var(--bg-base)` : 'var(--bg-base)',
      }}
    />
  );
}
