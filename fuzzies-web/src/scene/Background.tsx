import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Background: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Scene + camera
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    // Gradient background quad
    const gradientGeo = new THREE.PlaneGeometry(2, 2);
    const gradientMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        void main() {
          vec3 top    = vec3(0.53, 0.42, 0.85);  // soft purple
          vec3 bottom = vec3(0.85, 0.68, 0.95);  // light lavender-pink
          gl_FragColor = vec4(mix(bottom, top, vUv.y), 1.0);
        }
      `,
      depthWrite: false,
    });
    const gradientMesh = new THREE.Mesh(gradientGeo, gradientMat);
    gradientMesh.renderOrder = -1;
    scene.add(gradientMesh);

    // Sparkle particles
    const PARTICLE_COUNT = 60;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities: number[] = [];
    const phases: number[] = [];
    const sizes = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 2;   // x: -1 to 1
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2;   // y: -1 to 1
      positions[i * 3 + 2] = 0;
      velocities.push(0.0008 + Math.random() * 0.0012);     // upward speed
      phases.push(Math.random() * Math.PI * 2);
      sizes[i] = 3 + Math.random() * 6;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMat = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        varying float vAlpha;
        uniform float uTime;
        uniform float uPhases[60];
        void main() {
          vAlpha = 0.4 + 0.6 * abs(sin(uTime * 1.2 + uPhases[gl_VertexID % 60]));
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        void main() {
          vec2 uv = gl_PointCoord - vec2(0.5);
          float d = length(uv);
          if (d > 0.5) discard;
          float glow = 1.0 - smoothstep(0.0, 0.5, d);
          gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha * glow * 0.8);
        }
      `,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uPhases: { value: phases },
      },
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    let animId: number;
    let time = 0;
    const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.016;
      particleMat.uniforms.uTime.value = time;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        posAttr.array[i * 3 + 1] += velocities[i];
        // Horizontal gentle drift
        (posAttr.array as Float32Array)[i * 3] += Math.sin(time * 0.5 + phases[i]) * 0.0002;
        // Wrap at top
        if ((posAttr.array as Float32Array)[i * 3 + 1] > 1.1) {
          (posAttr.array as Float32Array)[i * 3 + 1] = -1.1;
          (posAttr.array as Float32Array)[i * 3] = (Math.random() - 0.5) * 2;
        }
      }
      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!mount) return;
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
      }}
    />
  );
};
