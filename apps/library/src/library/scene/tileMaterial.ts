/** 展墙作品材质：圆角、角度明暗、强调色细描边。尺寸按世界单位。 */
import * as THREE from 'three';

const vertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragment = /* glsl */ `
uniform sampler2D uMap;
uniform float uOpacity;
uniform float uDim;
uniform float uMute;
uniform float uTitleProtect;
uniform vec2 uSize;
uniform float uRadius;
uniform float uOutline;
uniform vec3 uOutlineColor;
varying vec2 vUv;

float roundedBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

void main() {
  vec2 px = (vUv - 0.5) * uSize;
  float d = roundedBox(px, uSize * 0.5, uRadius);
  float aa = max(fwidth(d), 0.0015);
  float edge = 1.0 - smoothstep(-aa, aa, d);
  if (edge <= 0.0) discard;

  vec3 col = texture2D(uMap, vUv).rgb;
  // Title band sits at the bottom of the plate (flipY canvas). Protect labels
  // from the body dim so unselected category names stay typographic; also drop
  // title alpha when protect is low so labels never sit on the catalog type.
  float titleBand = 1.0 - smoothstep(0.22, 0.34, vUv.y);
  float titleAmt = uTitleProtect * titleBand;
  float muteF = uMute * (1.0 - titleAmt);
  col = mix(col, vec3(dot(col, vec3(0.2126, 0.7152, 0.0722))), muteF * 0.75);
  col *= 1.0 - muteF * 0.22;
  float titleDim = mix(uDim, 1.0, 0.84);
  col *= mix(uDim, titleDim, titleAmt);

  if (uOutline > 0.0) {
    float w = 0.012;
    float ring = smoothstep(-w - aa, -w, d) * (1.0 - smoothstep(-aa * 0.5, aa, d));
    col = mix(col, uOutlineColor, ring * uOutline * 0.7);
  }

  float alpha = uOpacity * edge * mix(1.0, uTitleProtect, titleBand);
  gl_FragColor = vec4(col, alpha);
}
`;

export function createTileMaterial(map: THREE.Texture): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    toneMapped: false,
    depthWrite: true,
    depthTest: true,
    uniforms: {
      uMap: { value: map },
      uOpacity: { value: 1 },
      uDim: { value: 1 },
      uMute: { value: 0 },
      uTitleProtect: { value: 0 },
      uSize: { value: new THREE.Vector2(1, 1) },
      uRadius: { value: 0.045 },
      uOutline: { value: 0 },
      uOutlineColor: { value: new THREE.Color('#3EC8FF') },
    },
  });
}
