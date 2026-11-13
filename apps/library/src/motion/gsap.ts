import { gsap } from 'gsap';

export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

const reducedQuery = window.matchMedia(REDUCED_MOTION);

/** 每帧或每次转场前读取，偏好变化后立即生效。 */
export const prefersReducedMotion = () => reducedQuery.matches;

export { gsap };
