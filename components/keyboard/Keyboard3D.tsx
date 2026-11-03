'use client';

import { useEffect, useRef, type RefObject } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { hueAt } from './hue';
import { ROWS, ROW_UNITS } from './layout';

type Props = {
  /** El tramo del hero: de ahí se leen --scroll, --mx y --my, que mueven la cámara. */
  trackRef: RefObject<HTMLElement | null>;
  typed: string;
  pressed: string | null;
  done: boolean;
  reduced: boolean;
  /** Si el navegador no puede con WebGL, el hero vuelve al teclado en CSS. */
  onFail: () => void;
};

// Medidas en "unidades de tecla" (1 = 19 mm, el paso de un teclado real).
const GAP = 0.09;
const CAP_HEIGHT = 0.42;
const PRESS_DEPTH = 0.2;
const CASE_PAD = 0.38;
const KB_WIDTH = ROW_UNITS + CASE_PAD * 2;
const KB_DEPTH = ROWS.length + CASE_PAD * 2;

const KEY_COLOR = new THREE.Color('#f6f8fb');
const LEGEND_COLOR = new THREE.Color('#5a6375');
const CASE_COLOR = new THREE.Color('#e4e8ef');

type KeyObj = {
  id: string;
  group: THREE.Group;
  cap: THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>;
  legend: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  glow: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  color: THREE.Color;
  /** Color de la letra prendida: más oscuro, para que se lea sobre la tecla blanca. */
  ink: THREE.Color;
  pos: number;
  press: number;
  light: number;
};

/** Tecla con volumen: caja de bordes redondeados, un poco más angosta arriba que abajo. */
function keycapGeometry(w: number) {
  const geo = new RoundedBoxGeometry(w - GAP, CAP_HEIGHT, 1 - GAP, 4, 0.11);
  // Se achica la cara de arriba (0,06 de cada lado) para que tenga la forma de una tecla de verdad.
  const p = geo.attributes.position;
  const sx = 0.12 / (w - GAP);
  const sz = 0.12 / (1 - GAP);
  for (let i = 0; i < p.count; i++) {
    const t = (p.getY(i) + CAP_HEIGHT / 2) / CAP_HEIGHT;
    p.setX(i, p.getX(i) * (1 - t * sx));
    p.setZ(i, p.getZ(i) * (1 - t * sz));
  }
  geo.computeVertexNormals();
  geo.translate(0, CAP_HEIGHT / 2, 0);
  return geo;
}

function radialTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.45, 'rgba(255,255,255,0.45)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** La letra se dibuja en blanco; el color lo pone el material (gris apagada, celeste/azul prendida). */
function legendTexture(label: string, w: number, font: string) {
  const ppu = 256;
  const c = document.createElement('canvas');
  c.width = Math.round(ppu * (w - GAP - 0.2));
  c.height = Math.round(ppu * (1 - GAP - 0.2));
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#fff';
  ctx.textBaseline = 'top';
  const small = label.length > 1;
  ctx.font = `${small ? 600 : 700} ${small ? 46 : 96}px ${font}`;
  ctx.fillText(label, small ? 14 : 22, small ? 16 : 10);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return { tex, width: w - GAP - 0.2, depth: 1 - GAP - 0.2 };
}

/** three.js no lee `hsl(200 90% 40%)` (sin comas): los colores de las luces se arman con setHSL. */
function hsl(h: number, sat: number, light: number) {
  return new THREE.Color().setHSL(h / 360, sat, light, THREE.SRGBColorSpace);
}

function readVar(el: HTMLElement | null, name: string, fallback: number) {
  const v = el ? parseFloat(el.style.getPropertyValue(name)) : NaN;
  return Number.isFinite(v) ? v : fallback;
}

export default function Keyboard3D({ trackRef, typed, pressed, done, reduced, onFail }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  // El bucle de dibujo lee siempre los últimos valores sin reiniciar la escena.
  const state = useRef({ typed, pressed, done, reduced });
  useEffect(() => {
    state.current = { typed, pressed, done, reduced };
  }, [typed, pressed, done, reduced]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      onFail();
      return;
    }

    const small = window.matchMedia('(max-width: 767px)').matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.92;
    renderer.shadowMap.enabled = !small;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 2, 0.1, 200);

    scene.add(new THREE.HemisphereLight('#dfe9ff', '#0a0b10', 1.1));
    const key = new THREE.DirectionalLight('#ffffff', 2.4);
    key.position.set(-6, 14, 9);
    key.castShadow = !small;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.left = -10;
    key.shadow.camera.right = 10;
    key.shadow.camera.top = 6;
    key.shadow.camera.bottom = -6;
    key.shadow.radius = 4;
    key.shadow.bias = -0.0005;
    scene.add(key);
    const rim = new THREE.DirectionalLight('#5aa8ff', 1.2);
    rim.position.set(8, 4, -10);
    scene.add(rim);

    const kb = new THREE.Group();
    scene.add(kb);

    // Carcasa
    const caseMesh = new THREE.Mesh(
      new RoundedBoxGeometry(KB_WIDTH, 0.7, KB_DEPTH, 6, 0.3),
      new THREE.MeshStandardMaterial({ color: CASE_COLOR, roughness: 0.42, metalness: 0.05 }),
    );
    caseMesh.position.y = -0.35;
    caseMesh.receiveShadow = true;
    kb.add(caseMesh);

    // Placa hundida donde van las teclas
    const plate = new THREE.Mesh(
      new THREE.PlaneGeometry(ROW_UNITS + 0.12, ROWS.length + 0.12),
      new THREE.MeshStandardMaterial({ color: '#9ea7b6', roughness: 0.85 }),
    );
    plate.rotation.x = -Math.PI / 2;
    plate.position.y = 0.002;
    plate.receiveShadow = true;
    kb.add(plate);

    // Tira de luz en el canto de adelante: se llena de izquierda a derecha con lo escrito.
    const stripCanvas = document.createElement('canvas');
    stripCanvas.width = 512;
    stripCanvas.height = 4;
    const sctx = stripCanvas.getContext('2d')!;
    const sg = sctx.createLinearGradient(0, 0, 512, 0);
    sg.addColorStop(0, `hsl(${hueAt(0)} 95% 62%)`);
    sg.addColorStop(1, `hsl(${hueAt(1)} 95% 66%)`);
    sctx.fillStyle = sg;
    sctx.fillRect(0, 0, 512, 4);
    const stripTex = new THREE.CanvasTexture(stripCanvas);
    stripTex.colorSpace = THREE.SRGBColorSpace;
    const stripLen = KB_WIDTH - 1.2;
    const strip = new THREE.Mesh(
      new THREE.PlaneGeometry(stripLen, 0.07),
      new THREE.MeshBasicMaterial({ map: stripTex, toneMapped: false }),
    );
    strip.position.set(0, -0.4, KB_DEPTH / 2 + 0.003);
    kb.add(strip);

    // Reflejo de color sobre la "mesa", crece con lo escrito.
    const glowTex = radialTexture();
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(KB_WIDTH * 1.1, KB_DEPTH * 1.5),
      new THREE.MeshBasicMaterial({
        map: glowTex,
        color: hsl(hueAt(0.5), 0.95, 0.55),
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.72;
    kb.add(floor);

    // Teclas
    const font = getComputedStyle(document.body).fontFamily || 'sans-serif';
    const geoCache = new Map<number, THREE.BufferGeometry>();
    const keys: KeyObj[] = [];
    const disposables: { dispose: () => void }[] = [stripTex, glowTex];

    ROWS.forEach((row, r) => {
      let x = 0;
      row.forEach((k) => {
        const w = k.w ?? 1;
        const center = (x + w / 2) / ROW_UNITS;
        const hue = hueAt(center);
        let geo = geoCache.get(w);
        if (!geo) {
          geo = keycapGeometry(w);
          geoCache.set(w, geo);
        }
        const group = new THREE.Group();
        group.position.set(x + w / 2 - ROW_UNITS / 2, 0, r + 0.5 - ROWS.length / 2);
        x += w;

        const cap = new THREE.Mesh(
          geo,
          new THREE.MeshStandardMaterial({ color: KEY_COLOR, roughness: 0.5, emissive: new THREE.Color(0), emissiveIntensity: 1 }),
        );
        cap.castShadow = !small;
        cap.receiveShadow = !small;
        group.add(cap);

        const lg = legendTexture(k.label, w, font);
        const legend = new THREE.Mesh(
          new THREE.PlaneGeometry(lg.width, lg.depth),
          new THREE.MeshBasicMaterial({ map: lg.tex, color: LEGEND_COLOR.clone(), transparent: true, toneMapped: false }),
        );
        legend.rotation.x = -Math.PI / 2;
        legend.position.y = CAP_HEIGHT + 0.004;
        group.add(legend);

        const glow = new THREE.Mesh(
          new THREE.PlaneGeometry(w + 0.7, 1.7),
          new THREE.MeshBasicMaterial({
            map: glowTex,
            color: hsl(hue, 0.95, 0.58),
            transparent: true,
            opacity: 0,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            toneMapped: false,
          }),
        );
        glow.rotation.x = -Math.PI / 2;
        glow.position.y = 0.012;
        group.add(glow);

        kb.add(group);
        disposables.push(lg.tex, legend.geometry, legend.material, glow.geometry, glow.material, cap.material);
        keys.push({
          id: k.id,
          group,
          cap,
          legend,
          glow,
          color: hsl(hue, 0.95, 0.52),
          ink: hsl(hue, 0.9, 0.4),
          pos: center,
          press: 0,
          light: 0,
        });
      });
    });

    // Cámara: arranca baja y girada, termina de frente y más alta. Encuadre según el ancho.
    const target = new THREE.Vector3(0, 0, 0.2);
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
    const tmp = new THREE.Color();

    const tick = (now?: number) => {
      frame = requestAnimationFrame(tick);
      timer.update(now);
      if (!visible) return;
      const dt = Math.min(timer.getDelta(), 0.05);
      const t = timer.getElapsed();
      const { typed: tp, pressed: pr, done: dn, reduced: rd } = state.current;
      const track = trackRef.current;
      const p = rd ? 1 : readVar(track, '--scroll', 1);
      const mx = rd ? 0 : readVar(track, '--mx', 0);
      const my = rd ? 0 : readVar(track, '--my', 0);
      const typedFrac = rd ? 1 : readVar(track, '--typed', 1);

      // En pantallas angostas se encuadra el centro del teclado: teclas más grandes y legibles.
      const visibleWidth = aspect < 1.3 ? 11.5 : KB_WIDTH * 1.08;
      const vfov = THREE.MathUtils.degToRad(camera.fov);
      const hfov = 2 * Math.atan(Math.tan(vfov / 2) * aspect);
      const dist = Math.max(visibleWidth / 2 / Math.tan(hfov / 2), (KB_DEPTH * 1.25) / 2 / Math.tan(vfov / 2));
      const ease = p * p * (3 - 2 * p);
      const elev = THREE.MathUtils.degToRad(24 + 30 * ease - my * 4);
      const azim = THREE.MathUtils.degToRad(-30 * (1 - ease) + mx * 7);
      const d = dist * (1.12 - 0.12 * ease);
      camera.position.set(
        target.x + d * Math.cos(elev) * Math.sin(azim),
        target.y + d * Math.sin(elev),
        target.z + d * Math.cos(elev) * Math.cos(azim),
      );
      camera.lookAt(target);

      kb.position.y = dn && !rd ? Math.sin(t * 1.05) * 0.08 : 0;

      const lit = new Set(tp.toUpperCase());
      for (const k of keys) {
        const isLit = lit.has(k.id);
        const isPressed = pr === k.id;
        k.press += ((isPressed ? 1 : 0) - k.press) * Math.min(1, dt * (isPressed ? 28 : 12));
        // Con el nombre completo, una ola de luz recorre el teclado de izquierda a derecha.
        const wave = dn && !rd ? Math.max(0, Math.sin((t - k.pos * 1.4) * 1.75)) ** 6 : 0;
        const goal = Math.min(1, (isLit ? 0.85 : dn ? 0.2 : 0) + wave * 0.6 + k.press * 0.4);
        k.light += (goal - k.light) * Math.min(1, dt * 8);

        k.group.position.y = -k.press * PRESS_DEPTH;
        k.glow.material.opacity = k.light;
        k.cap.material.emissive.copy(k.color).multiplyScalar(k.light * 0.28);
        k.legend.material.color.copy(LEGEND_COLOR).lerp(tmp.copy(k.ink), Math.min(1, k.light * 2));
      }

      strip.scale.x = Math.max(0.0001, typedFrac);
      strip.position.x = (-stripLen / 2) * (1 - typedFrac);
      stripTex.repeat.x = Math.max(0.0001, typedFrac);
      floor.material.opacity = 0.03 + typedFrac * 0.16;

      renderer.render(scene, camera);
    };

    document.fonts.ready.then(() => {
      // Las texturas de las letras se dibujaron antes de que cargue la fuente: se redibujan.
      const all = ROWS.flat();
      for (const k of keys) {
        const def = all.find((x) => x.id === k.id);
        if (!def) continue;
        const lg = legendTexture(def.label, def.w ?? 1, getComputedStyle(document.body).fontFamily || font);
        k.legend.material.map?.dispose();
        k.legend.material.map = lg.tex;
        k.legend.material.needsUpdate = true;
        disposables.push(lg.tex);
      }
    });
    tick();

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      geoCache.forEach((g) => g.dispose());
      disposables.forEach((d) => d.dispose());
      caseMesh.geometry.dispose();
      caseMesh.material.dispose();
      plate.geometry.dispose();
      plate.material.dispose();
      strip.geometry.dispose();
      strip.material.dispose();
      floor.geometry.dispose();
      floor.material.dispose();
      timer.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [trackRef, onFail]);

  // Los costados se funden con el fondo: en el celular el teclado se recorta y así no hay un corte seco.
  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="size-full [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]"
    />
  );
}
