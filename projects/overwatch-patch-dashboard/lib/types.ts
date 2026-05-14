export type Role = 'tank' | 'damage' | 'support';

export type ChangeKind = 'buff' | 'nerf' | 'rework' | 'neutral';

export interface AbilityChange {
  ability: string;
  description: string;
  before?: string;
  after?: string;
  kind: ChangeKind;
}

export interface HeroPatchChange {
  hero: string;
  summary?: string;
  changes: AbilityChange[];
}

export interface Patch {
  id: string;
  version: string;
  title: string;
  date: string;
  source: 'official' | 'community';
  sourceUrl?: string;
  summary: string;
  heroes: HeroPatchChange[];
}

export interface Hero {
  id: string;
  name: string;
  role: Role;
  icon: string;
}

export interface HeroTrendPoint {
  patchId: string;
  patchTitle: string;
  date: string;
  buffs: number;
  nerfs: number;
  reworks: number;
  net: number;
}
