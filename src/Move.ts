import { Condition } from './types/Condition';

export class Move {
  public name: string;
  public type: string;
  public category: 'physical' | 'special' | 'status';
  public power: number;
  public accuracy: number;
  public pp: number;
  public maxPP: number;
  public effect?: {
    condition: Condition;
    affects: 'self' | 'target';
    strength?: number;
    chance?: number;
  };
  public priority: number;
  public critRatio: number;

  constructor(params: {
    name: string;
    type: string;
    category: 'physical' | 'special' | 'status';
    power?: number;
    accuracy?: number;
    pp: number;
    effect?: {
      condition: Condition;
      affects: 'self' | 'target';
      strength?: number;
      chance?: number;
    };
    priority?: number;
    critRatio?: number;
  }) {
    this.name = params.name;
    this.type = params.type;
    this.category = params.category;
    this.power = params.power ?? 0;
    this.accuracy = params.accuracy ?? 1;
    this.pp = params.pp;
    this.maxPP = params.pp;
    this.effect = params.effect
      ? {
          ...params.effect,
          strength: params.effect.strength ?? 1,
          chance: params.effect.chance ?? 1,
        }
      : undefined;
    this.priority = params.priority ?? 0;
    this.critRatio = params.critRatio ?? 1;
  }
}
