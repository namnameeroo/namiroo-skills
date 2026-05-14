'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import RoleBadge from '@/components/RoleBadge';
import type { Hero, HeroTrendPoint, Role } from '@/lib/types';

type Props = {
  heroes: Hero[];
  trendByHero: Record<string, HeroTrendPoint[]>;
};

type RoleFilter = 'all' | Role;

export default function HeroGrid({ heroes, trendByHero }: Props) {
  const [role, setRole] = useState<RoleFilter>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return heroes.filter((h) => {
      if (role !== 'all' && h.role !== role) return false;
      if (!q) return true;
      return h.name.toLowerCase().includes(q) || h.id.includes(q);
    });
  }, [heroes, role, query]);

  return (
    <div className="space-y-5">
      <div className="card flex flex-col gap-3 p-4 md:flex-row md:items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="영웅 이름 검색"
          className="flex-1 rounded-lg border border-ow-border bg-ow-dark/40 px-3 py-2 text-sm placeholder:text-ow-muted focus:border-ow-orange focus:outline-none"
        />
        <div className="flex flex-wrap gap-2 text-xs">
          {(
            [
              ['all', '전체'],
              ['tank', '돌격'],
              ['damage', '공격'],
              ['support', '지원'],
            ] as Array<[RoleFilter, string]>
          ).map(([k, l]) => (
            <button
              key={k}
              type="button"
              onClick={() => setRole(k)}
              className={`btn ${
                role === k ? 'border-ow-orange/60 text-ow-orange' : ''
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((hero) => {
          const trend = trendByHero[hero.id] ?? [];
          const totals = trend.reduce(
            (acc, t) => {
              acc.buffs += t.buffs;
              acc.nerfs += t.nerfs;
              return acc;
            },
            { buffs: 0, nerfs: 0 },
          );
          return (
            <Link
              key={hero.id}
              href={`/heroes/${hero.id}`}
              className="card group p-4 transition hover:border-ow-orange/40"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-ow-dark/60 text-xl">
                  {hero.icon}
                </span>
                <div>
                  <div className="text-base font-semibold text-white group-hover:text-ow-orange">
                    {hero.name}
                  </div>
                  <div className="mt-0.5">
                    <RoleBadge role={hero.role} />
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-[11px]">
                <span className="chip border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                  버프 {totals.buffs}
                </span>
                <span className="chip border-rose-500/30 bg-rose-500/10 text-rose-300">
                  너프 {totals.nerfs}
                </span>
              </div>
            </Link>
          );
        })}
        {filtered.length === 0 && (
          <div className="card col-span-full p-6 text-center text-sm text-ow-muted">
            조건에 맞는 영웅이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
