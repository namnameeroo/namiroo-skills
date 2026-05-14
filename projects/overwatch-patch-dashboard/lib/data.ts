import { heroes } from '@/data/heroes';
import { patches } from '@/data/patches';
import type { Hero, HeroTrendPoint, Patch, Role } from '@/lib/types';

const byDateDesc = (a: Patch, b: Patch) => (a.date < b.date ? 1 : -1);
const byDateAsc = (a: Patch, b: Patch) => (a.date < b.date ? -1 : 1);

export const getHeroes = (): Hero[] => heroes;

export const getHero = (id: string): Hero | undefined =>
  heroes.find((h) => h.id === id);

export const getPatches = (): Patch[] => [...patches].sort(byDateDesc);

export const getPatch = (id: string): Patch | undefined =>
  patches.find((p) => p.id === id);

export const getRoleOf = (heroId: string): Role | undefined =>
  heroes.find((h) => h.id === heroId)?.role;

export const getHeroTrend = (heroId: string): HeroTrendPoint[] =>
  [...patches]
    .sort(byDateAsc)
    .map((patch) => {
      const entry = patch.heroes.find((h) => h.hero === heroId);
      const counts = { buffs: 0, nerfs: 0, reworks: 0 };
      entry?.changes.forEach((c) => {
        if (c.kind === 'buff') counts.buffs += 1;
        else if (c.kind === 'nerf') counts.nerfs += 1;
        else if (c.kind === 'rework') counts.reworks += 1;
      });
      return {
        patchId: patch.id,
        patchTitle: patch.title,
        date: patch.date,
        buffs: counts.buffs,
        nerfs: counts.nerfs,
        reworks: counts.reworks,
        net: counts.buffs - counts.nerfs,
      };
    });

export const getPatchesForHero = (heroId: string): Patch[] =>
  getPatches().filter((p) => p.heroes.some((h) => h.hero === heroId));
