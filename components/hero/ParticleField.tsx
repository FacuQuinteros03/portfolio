'use client';

import { useEffect, useRef, type RefObject } from 'react';
import * as THREE from 'three';
import { hueAt } from './hue';

type Props = {
  /** El tramo del hero: de ahí se leen --scroll, --mx y --my. */
  trackRef: RefObject<HTMLElement | null>;
  reduced: boolean;
};

// Tres formas que arman las mismas partículas, en este orden, a medida que se baja.
// 1. Las iniciales FQ · 2. Una red neuronal (capas de nodos y conexiones) · 3. Una nube de datos en clusters.
const LAYERS = [4, 7, 7, 5, 2];
const CLUSTERS = 7;

function rand(seed: number) {
  // Generador fijo: la animación es siempre igual, no cambia en cada carga.
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function gauss(r: () => number) {
  return Math.sqrt(-2 * Math.log(r() + 1e-9)) * Math.cos(2 * Math.PI * r());
}

/** Puntos sobre las letras FQ, dibujadas en un canvas y muestreadas. */
function initialsShape(n: number, font: string, r: () => number) {
  const c = document.createElement('canvas');
  c.width = 640;
  c.height = 320;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `800 290px ${font}`;
  ctx.fillText('FQ', 320, 170);
  const data = ctx.getImageData(0, 0, 640, 320).data;
  const filled: number[] = [];
  for (let y = 0; y < 320; y += 2) {
    for (let x = 0; x < 640; x += 2) {
      if (data[(y * 640 + x) * 4 + 3] > 128) filled.push(x, y);
    }
  }
  const out = new Float32Array(n * 3);
  const pairs = filled.length / 2;
  for (let i = 0; i < n; i++) {
    const k = Math.floor(r() * pairs) * 2;
    out[i * 3] = ((filled[k] + r() * 2) / 640 - 0.5) * 9;
    out[i * 3 + 1] = (0.5 - (filled[k + 1] + r() * 2) / 320) * 4.5;
    out[i * 3 + 2] = (r() - 0.5) * 0.5;
  }
  return out;
}

/** Red neuronal: nodos por capa y partículas a lo largo de las conexiones. */
function networkShape(n: number, r: () => number) {
  const nodes: THREE.Vector3[][] = LAYERS.map((count, l) => {
    const x = (l / (LAYERS.length - 1) - 0.5) * 9.5;
    return Array.from({ length: count }, (_, i) => {
      const y = (count === 1 ? 0 : i / (count - 1) - 0.5) * Math.min(4.6, count * 0.85);
      return new THREE.Vector3(x, y, (r() - 0.5) * 1.6);
    });
  });
  const edges: [THREE.Vector3, THREE.Vector3][] = [];
  for (let l = 0; l < nodes.length - 1; l++) {
    for (const a of nodes[l]) for (const b of nodes[l + 1]) edges.push([a, b]);
  }
  const flat = nodes.flat();
  const out = new Float32Array(n * 3);
  const v = new THREE.Vector3();
  for (let i = 0; i < n; i++) {
    if (r() < 0.55) {
      const c = flat[Math.floor(r() * flat.length)];
      v.set(gauss(r), gauss(r), gauss(r)).multiplyScalar(0.11).add(c);
    } else {
      const [a, b] = edges[Math.floor(r() * edges.length)];
      v.lerpVectors(a, b, r()).add(new THREE.Vector3(gauss(r), gauss(r), gauss(r)).multiplyScalar(0.025));
    }
    v.toArray(out, i * 3);
  }
  const lines = new Float32Array(edges.length * 6);
  edges.forEach(([a, b], i) => {
    a.toArray(lines, i * 6);
    b.toArray(lines, i * 6 + 3);
  });
  return { points: out, lines };
}

/** Nube de datos: clusters sobre una esfera, como un espacio de embeddings. */
function cloudShape(n: number, r: () => number) {
  const centers = Array.from({ length: CLUSTERS }, (_, i) => {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / CLUSTERS);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    return new THREE.Vector3().setFromSphericalCoords(1.8, phi, theta);
  });
  const out = new Float32Array(n * 3);
  const v = new THREE.Vector3();
  for (let i = 0; i < n; i++) {
    if (r() < 0.12) {
      v.setFromSphericalCoords(1.0 + r() * 1.8, Math.acos(2 * r() - 1), r() * Math.PI * 2);
    } else {
      const c = centers[Math.floor(r() * CLUSTERS)];
      v.set(gauss(r), gauss(r), gauss(r)).multiplyScalar(0.3).add(c);
    }
    v.toArray(out, i * 3);
  }
  return out;
}

const vertexShader = /* glsl */ `
  uniform float uP;
  uniform float uTime;
  uniform float uSize;
  attribute vec3 aA;
  attribute vec3 aB;
  attribute vec3 aC;
  attribute float aRand;
  varying float vX;
  varying float vRand;

  void main() {
    // Cada partícula arranca un poco antes o después que las demás: el cambio de forma se siente orgánico.
    float d = aRand * 0.22;
    float t1 = smoothstep(0.04 + d, 0.36 + d, uP);
    float t2 = smoothstep(0.56 + d, 0.86 + d, uP);
    vec3 pos = mix(mix(aA, aB, t1), aC, t2);
    pos += 0.035 * vec3(
      sin(uTime * 0.9 + aRand * 40.0),
      cos(uTime * 0.7 + aRand * 31.0),
      sin(uTime * 0.6 + aRand * 17.0)
    );
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.55 + aRand * 0.9) / -mv.z;
    vX = pos.x;
    vRand = aRand;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uC1;
  uniform vec3 uC2;
  varying float vX;
  varying float vRand;

  void main() {
    float r = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.05, r);
    if (a < 0.01) discard;
    // De celeste a la izquierda a azul eléctrico a la derecha, como el resto de la página.
    vec3 c = mix(uC1, uC2, smoothstep(-4.5, 4.5, vX));
    c += 0.35 * smoothstep(0.25, 0.0, r);
    gl_FragColor = vec4(c, a * (0.55 + 0.45 * vRand));
    #include <colorspace_fragment>
  }
`;

function readVar(el: HTMLElement | null, name: string, fallback: number) {
  const v = el ? parseFloat(el.style.getPropertyValue(name)) : NaN;
  return Number.isFinite(v) ? v : fallback;
}

export default function ParticleField({ trackRef, reduced }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const reducedRef = useRef(reduced);
  useEffect(() => {
    reducedRef.current = reduced;
  }, [reduced]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
    } catch {
      return;
    }
    const small = window.matchMedia('(max-width: 767px)').matches;
    const dpr = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(dpr);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 2, 0.1, 100);
    const group = new THREE.Group();
    scene.add(group);

    const n = small ? 3200 : 6500;
    const r = rand(7);
    const font = getComputedStyle(document.body).fontFamily || 'sans-serif';
    const net = networkShape(n, r);
    const rnd = new Float32Array(n);
    for (let i = 0; i < n; i++) rnd[i] = r();

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    geo.setAttribute('aA', new THREE.BufferAttribute(initialsShape(n, font, r), 3));
    geo.setAttribute('aB', new THREE.BufferAttribute(net.points, 3));
    geo.setAttribute('aC', new THREE.BufferAttribute(cloudShape(n, r), 3));
    geo.setAttribute('aRand', new THREE.BufferAttribute(rnd, 1));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 8);

    const c1 = new THREE.Color().setHSL(hueAt(0) / 360, 0.95, 0.62, THREE.SRGBColorSpace);
    const c2 = new THREE.Color().setHSL(hueAt(1) / 360, 0.95, 0.62, THREE.SRGBColorSpace);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uP: { value: 0 },
        uTime: { value: 0 },
        uSize: { value: (small ? 46 : 58) * dpr },
        uC1: { value: c1 },
        uC2: { value: c2 },
      },
    });
    const points = new THREE.Points(geo, material);
    group.add(points);

    // Las conexiones de la red se ven solo mientras las partículas forman la red.
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(net.lines, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: new THREE.Color().setHSL(hueAt(0.5) / 360, 0.9, 0.6, THREE.SRGBColorSpace),
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    group.add(lines);

    let aspect = 2;
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host;
      if (!w || !h) return;
      aspect = w / h;
      renderer.setSize(w, h, false);
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(host);

    const timer = new THREE.Timer();
    let frame = 0;
    const smooth = { p: 0, mx: 0, my: 0 };

    const tick = (now?: number) => {
      frame = requestAnimationFrame(tick);
      timer.update(now);
      if (!visible) return;
      const rd = reducedRef.current;
      const dt = Math.min(timer.getDelta(), 0.05);
      const t = rd ? 0 : timer.getElapsed();
      const track = trackRef.current;
      // Con "reducir movimiento" queda quieta la red neuronal.
      const p = rd ? 0.46 : readVar(track, '--scroll', 0);
      const k = Math.min(1, dt * 6);
      smooth.p += (p - smooth.p) * k;
      smooth.mx += ((rd ? 0 : readVar(track, '--mx', 0)) - smooth.mx) * k;
      smooth.my += ((rd ? 0 : readVar(track, '--my', 0)) - smooth.my) * k;

      // Encuadre: que entre el ancho de las formas; en pantallas angostas también el alto.
      const vfov = THREE.MathUtils.degToRad(camera.fov);
      const hfov = 2 * Math.atan(Math.tan(vfov / 2) * aspect);
      const dist = Math.max(10.5 / 2 / Math.tan(hfov / 2), 5.6 / 2 / Math.tan(vfov / 2));
      camera.position.set(0, 0, dist);
      camera.lookAt(0, 0, 0);

      const cloud = THREE.MathUtils.smoothstep(smooth.p, 0.6, 0.95);
      group.rotation.y = smooth.mx * 0.35 + (smooth.p - 0.4) * 0.5 + cloud * t * 0.12;
      group.rotation.x = -smooth.my * 0.2 + cloud * 0.25;

      material.uniforms.uP.value = smooth.p;
      material.uniforms.uTime.value = t;
      const netShown = THREE.MathUtils.smoothstep(smooth.p, 0.2, 0.42) * (1 - THREE.MathUtils.smoothstep(smooth.p, 0.56, 0.72));
      lineMat.opacity = netShown * 0.22;

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      timer.dispose();
      geo.dispose();
      material.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [trackRef]);

  // Bordes fundidos: si alguna forma se acerca al límite del recuadro, se desvanece en vez de cortarse.
  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="size-full [mask-image:radial-gradient(ellipse_at_center,black_62%,transparent_100%)]"
    />
  );
}
