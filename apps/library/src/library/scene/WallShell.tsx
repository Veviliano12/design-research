/** 凹墙的连续表面：语言牌和案例都嵌在这面上，件少时也能看出墙还在。 */
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { CASE_BLOCK_H, CASE_RADIUS, LANG_BLOCK_H, LANG_RADIUS } from './layout';
import type { BlendState, YawState } from './LibraryScene';

const vertex = /* glsl */ `
varying vec3 vPos;
void main() {
  vPos = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragment = /* glsl */ `
uniform float uOpacity;
varying vec3 vPos;
void main() {
  float ang = atan(vPos.x, -vPos.z);
  float edge = smoothstep(1.05, 0.55, abs(ang));
  float vert = smoothstep(0.52, 0.28, abs(vPos.y));
  float center = 1.0 - smoothstep(0.0, 0.85, abs(ang));
  float shade = 0.10 + center * 0.08;
  float alpha = uOpacity * edge * vert;
  if (alpha < 0.01) discard;
  gl_FragColor = vec4(vec3(shade), alpha);
}
`;

export function WallShell({
  blend,
  langYaw,
  caseYaw,
}: {
  blend: BlendState;
  langYaw: YawState;
  caseYaw: YawState;
}) {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        depthWrite: false,
        side: THREE.BackSide,
        uniforms: { uOpacity: { value: 0.92 } },
        toneMapped: false,
      }),
    [],
  );
  const mesh = useRef<THREE.Mesh>(null);
  const geom = useMemo(() => new THREE.CylinderGeometry(1, 1, 1, 96, 1, true), []);

  useFrame(() => {
    const b = blend.value;
    const radius = THREE.MathUtils.lerp(LANG_RADIUS, CASE_RADIUS, b) + 0.12;
    const height = THREE.MathUtils.lerp(LANG_BLOCK_H + 1.1, CASE_BLOCK_H + 0.9, b);
    const m = mesh.current;
    if (m) {
      m.scale.set(radius, height, radius);
      m.rotation.y = THREE.MathUtils.lerp(langYaw.value, caseYaw.value, b);
    }
    mat.uniforms.uOpacity!.value = 0.9;
  });

  return <mesh ref={mesh} geometry={geom} material={mat} position={[0, 0, 0]} />;
}
