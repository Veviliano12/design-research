/**
 * 作品墙与分类树使用同一批 124 条已上墙标杆。
 */
import { works, type Work } from './works';

export const WALL_COUNT = works.length;
export const wallWorks: Work[] = works;
export const wallWorkIds: string[] = works.map((w) => w.id);
