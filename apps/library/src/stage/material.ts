/**
 * 作品材质：圆角、亮度（景深变暗）、统一饱和度、速度形变与 RGB 色差、聚焦切换过渡。
 * 形变和色差的强度由 uStrength 控制，静止时为 0，此时片元直接采样原纹理，输出与原图一致；
 * uSat 缺省为 1，只有质量分布页把它降到约 0.15。
 */
import * as THREE from 'three';
import { thumbCanvas, type Work } from './works';

const vertex = /* glsl */ `
uniform float uStrength;
uniform vec2 uDir;
uniform vec2 uSize;
varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 p = position;
  // 加速度形变：沿运动方向弯折，前缘滞后，中心最远
  float along = dot(uv - 0.5, uDir);
  float bow = 1.0 - 4.0 * along * along;
  p.z -= uStrength * bow * 0.12 * max(uSize.x, uSize.y);
  // position 为 1×1 平面的局部坐标，xy 偏移按比例计
  p.xy -= uDir * uStrength * bow * 0.05;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`;

const fragment = /* glsl */ `
uniform sampler2D uMap;
uniform sampler2D uPrev;
uniform float uProgress;
uniform float uOpacity;
uniform float uDim;
uniform float uMute;
uniform float uSat;
uniform float uStrength;
uniform vec2 uDir;
uniform vec2 uSize;
uniform float uRadius;
uniform float uOutline;
varying vec2 vUv;

float roundedBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

vec3 sampleShifted(sampler2D tex, vec2 uv) {
  if (uStrength <= 0.0) return texture2D(tex, uv).rgb;
  vec2 off = uDir * uStrength * 0.02;
  return vec3(texture2D(tex, uv + off).r, texture2D(tex, uv).g, texture2D(tex, uv - off).b);
}

void main() {
  vec2 px = (vUv - 0.5) * uSize;
  float d = roundedBox(px, uSize * 0.5, uRadius);
  float edge = 1.0 - smoothstep(-0.5, 0.5, d);
  if (edge <= 0.0) discard;

  vec3 col = sampleShifted(uMap, vUv);
  if (uProgress < 1.0) {
    // 聚焦切换：斜向推进的波前，旧作品被推开、新作品从波前后显出
    float front = uProgress * 1.6 - 0.3;
    float x = (vUv.x * 0.7 + (1.0 - vUv.y) * 0.3);
    float m = smoothstep(front - 0.12, front + 0.12, x);
    float wave = sin(clamp((x - front) * 10.0, -3.1416, 3.1416)) * (1.0 - uProgress) * uProgress;
    vec2 push = vec2(0.035, -0.02) * wave;
    vec3 next = texture2D(uMap, vUv - push * (1.0 - m)).rgb;
    vec3 prev = texture2D(uPrev, vUv + push * m).rgb;
    col = mix(next, prev, m);
  }
  // 章节要求的统一饱和度：uSat 为 1 时不影响原图，质量分布页降到约 0.15
  col = mix(vec3(dot(col, vec3(0.2126, 0.7152, 0.0722))), col, clamp(uSat, 0.0, 1.0));
  // 远景去饱和并略压暗；uMute 为 0 时不影响原图
  col = mix(col, vec3(dot(col, vec3(0.2126, 0.7152, 0.0722))), uMute * 0.7);
  col *= 1.0 - uMute * 0.25;
  col *= uDim;
  // 名单当前作品的白色描边：内缘 3px 白线，内侧 1px 暗线，在浅色作品上也能分辨；uOutline 为 0 时不影响原图
  if (uOutline > 0.0) {
    float ring = smoothstep(-4.0, -3.0, d);
    float inner = smoothstep(-5.0, -4.0, d) * (1.0 - ring);
    col = mix(col, col * 0.35, inner * uOutline);
    col = mix(col, vec3(1.0), ring * uOutline);
  }
  gl_FragColor = vec4(col, uOpacity * edge);
}
`;

export function createWorkMaterial(map: THREE.Texture): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    toneMapped: false,
    uniforms: {
      uMap: { value: map },
      uPrev: { value: map },
      uProgress: { value: 1 },
      uOpacity: { value: 1 },
      uDim: { value: 1 },
      uMute: { value: 0 },
      uSat: { value: 1 },
      uStrength: { value: 0 },
      uDir: { value: new THREE.Vector2(1, 0) },
      uSize: { value: new THREE.Vector2(1, 1) },
      uRadius: { value: 8 },
      uOutline: { value: 0 },
    },
  });
}

// ---------- 纹理 ----------

const textures = new Map<string, THREE.Texture>();

/**
 * 作品纹理：来自 thumbCanvas（真实截图或图片缺失时的中性底板），开启 mipmap 与各向异性过滤。
 * 色彩空间设为 NoColorSpace，配合 Canvas 的 flat 与 linear，纹理颜色原样输出，不做色调映射和 sRGB 转换。
 * 缩略图只在 thumbReady 为真后才取纹理；截图较晚就绪时也走同一条路径。
 */
export function workTexture(w: Work, width: number, anisotropy: number): THREE.Texture {
  const key = `${w.id}@${width}`;
  let tex = textures.get(key);
  if (tex) return tex;
  tex = new THREE.CanvasTexture(thumbCanvas(w, width));
  tex.colorSpace = THREE.NoColorSpace;
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.anisotropy = anisotropy;
  textures.set(key, tex);
  return tex;
}

/** 缩略图尚未生成时的待加载纹理：1×1 暗色，作品此时完全透明，不会被看到。 */
export const PENDING_TEX = (() => {
  const t = new THREE.DataTexture(new Uint8Array([14, 15, 17, 255]), 1, 1);
  t.colorSpace = THREE.NoColorSpace;
  t.needsUpdate = true;
  return t;
})();

/** 常态纹理宽度；聚焦或放大时换成与屏幕像素相当的高清纹理。 */
export const BASE_TEX = 1024;

/** 在焦平面上停稳时，纹理宽度取设备像素宽度，纹素与像素一一对应，无需缩放采样。 */
export function hiresWidth(displayW: number, dpr: number): number {
  return Math.min(4096, Math.round(displayW * dpr));
}
