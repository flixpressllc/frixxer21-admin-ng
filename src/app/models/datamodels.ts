import { Entity } from './generalmodels';

export type RenderingComponentType = 'ticker' | 'multi' | 'videoplayer'; // temporary!

export interface RectAreaDef {
  id: string;
  renderingComponentType: RenderingComponentType;
  width: number;
  height: number;
  x: number;
  y: number;
  z?: number;
}

export interface Transition {
  type: string;
  imageUrl: string;
  videoUrl: string;
  swapAtTimeInMs: number;
  durationInMs: number;
}

export interface Background {
  type: string;
  url: string;
}

export interface BlockDef {
  transition: Transition;
  background: Background;
  durationInMinutes: number;
  rectAreaDefs: RectAreaDef[];
}

export interface BlockDefEntity extends Entity {
  name: string;
  blockDef: BlockDef;
}

