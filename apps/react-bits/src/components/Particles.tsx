import { useEffect, useRef } from "react";
import { Renderer, Camera, Geometry, Program, Mesh } from "ogl";

interface ParticlesProps {
  particleCount?: number;
  particleSpread?: number;
  speed?: number;
  particleColors?: string[];
  moveParticlesOnHover?: boolean;
  particleBaseSize?: number;
  sizeRandomness?: number;
  cameraDistance?: number;
  alphaParticles?: boolean;
  className?: string;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255,
      ]
    : [1, 1, 1];
};

export function Particles({
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  particleColors = ["#ffffff", "#ffffff", "#ffffff"],
  moveParticlesOnHover = false,
  particleBaseSize = 100,
  sizeRandomness = 1,
  cameraDistance = 20,
  alphaParticles = false,
  className = "",
}: ParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      depth: false,
      alpha: true,
      antialias: true,
    });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);

    gl.clearColor(0, 0, 0, 0);

    const camera = new Camera(gl, { fov: 15 });
    camera.position.set(0, 0, cameraDistance);

    const resize = () => {
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      camera.perspective({
        aspect: gl.canvas.width / gl.canvas.height,
      });
    };
    window.addEventListener("resize", resize);
    resize();

    const count = particleCount;
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const colorArray = particleColors.map(hexToRgb);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = particleSpread * Math.cbrt(Math.random());

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      randoms[i * 3] = Math.random();
      randoms[i * 3 + 1] = Math.random();
      randoms[i * 3 + 2] = Math.random();

      sizes[i] = Math.random() * sizeRandomness + 0.5;

      const color = colorArray[Math.floor(Math.random() * colorArray.length)];
      colors[i * 3] = color[0];
      colors[i * 3 + 1] = color[1];
      colors[i * 3 + 2] = color[2];
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 3, data: randoms },
      size: { size: 1, data: sizes },
      color: { size: 3, data: colors },
    });

    const program = new Program(gl, {
      vertex: `
        attribute vec3 position;
        attribute vec3 random;
        attribute float size;
        attribute vec3 color;

        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uBaseSize;
        uniform vec2 uMouse;
        uniform float uHover;

        varying vec3 vColor;

        void main() {
          vColor = color;

          vec3 pos = position;
          pos.x += sin(uTime * random.x * 0.5 + random.y * 6.28) * 0.5;
          pos.y += cos(uTime * random.y * 0.5 + random.z * 6.28) * 0.5;
          pos.z += sin(uTime * random.z * 0.5 + random.x * 6.28) * 0.5;

          if (uHover > 0.5) {
            pos.x += uMouse.x * 2.0 * random.x;
            pos.y += uMouse.y * 2.0 * random.y;
          }

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = uBaseSize * size / -mvPosition.z;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragment: `
        precision highp float;

        varying vec3 vColor;
        uniform float uAlpha;

        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;

          float alpha = uAlpha > 0.5 ? smoothstep(0.5, 0.0, d) : 1.0;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      uniforms: {
        uTime: { value: 0 },
        uBaseSize: { value: particleBaseSize },
        uMouse: { value: [0, 0] },
        uHover: { value: moveParticlesOnHover ? 1 : 0 },
        uAlpha: { value: alphaParticles ? 1 : 0 },
      },
      transparent: true,
      depthTest: false,
    });

    const mesh = new Mesh(gl, { mode: gl.POINTS, geometry, program });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    if (moveParticlesOnHover) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    let animationId: number;
    const animate = (t: number) => {
      animationId = requestAnimationFrame(animate);
      program.uniforms.uTime.value = t * 0.001 * speed;
      program.uniforms.uMouse.value = [mouseRef.current.x, mouseRef.current.y];
      renderer.render({ scene: mesh, camera });
    };
    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      if (moveParticlesOnHover) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
      container.removeChild(gl.canvas);
    };
  }, [
    particleCount,
    particleSpread,
    speed,
    particleColors,
    moveParticlesOnHover,
    particleBaseSize,
    sizeRandomness,
    cameraDistance,
    alphaParticles,
  ]);

  return <div ref={containerRef} className={`w-full h-full ${className}`} />;
}
