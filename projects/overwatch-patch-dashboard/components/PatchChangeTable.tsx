'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import ChangeBadge from '@/components/ChangeBadge';
import RoleBadge from '@/components/RoleBadge';
import type { ChangeKind, Hero, HeroPatchChange, Role } from '@/lib/types';

type Props = {
  changes: HeroPatchChange[];
  heroes: Hero[];
};

type KindFilter = 'all' | ChangeKind;
type RoleFilter = 'all' | Role;

export default function PatchChangeTable({ changes, heroes }: Props) {
  const heroById = useMemo(
    () => new Map(heroes.map((h) => [h.id, h])),
    [heroes],
  );
  const [kind, setKind] = useState<KindFilter>('all');
  const [role, setRole] = useState<RoleFilter>('all');
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return changes.filter((entry) => {
      const hero = heroById.get(entry.hero);
      if (!hero) return false;
      if (role !== 'all' && hero.role !== role) return false;
      if (kind !== 'all' && !entry.changes.some((c) => c.kind === kind)) return false;
      if (!q) return true;
      const hay = [
        hero.name,
        entry.summary ?? '',
        ...entry.changes.flatMap((c) => [c.ability, c.description]),
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [changes, heroById, role, kind, query]);

  return (
    <div className="space-y-4">
      <div className="card flex flex-col gap-3 p-4 md:flex-row md:items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="영웅 또는 스킬 검색"
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
        <div className="flex flex-wrap gap-2 text-xs">
          {(
            [
              ['all', '변경 전체'],
              ['buff', '버프'],
              ['nerf', '너프'],
              ['rework', '리워크'],
            ] as Array<[KindFilter, string]>
          ).map(([k, l]) => (
            <button
              key={k}
              type="button"
              onClick={() => setKind(k)}
              className={`btn ${
                kind === k ? 'border-ow-orange/60 text-ow-orange' : ''
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {rows.length === 0 && (
        <div className="card p-6 text-center text-sm text-ow-muted">
          조건에 맞는 변경이 없습니다.
        </div>
      )}

      <div className="space-y-3">
        {rows.map((entry) => {
          const hero = heroById.get(entry.hero)!;
          return (
            <article key={entry.hero} className="card overflow-hidden">
              <header className="flex flex-wrap items-center justify-between gap-3 border-b border-ow-border/60 p-4">
                <Link
                  href={`/heroes/${hero.id}`}
                  className="flex items-center gap-3 hover:text-white"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-ow-dark/60 text-lg">
                    {hero.icon}
                  </span>
                  <span>
                    <span className="block text-base font-semibold text-white">
                      {hero.name}
                    </span>
                    {entry.summary && (
                      <span className="block text-xs text-ow-muted">
                        {entry.summary}
                      </span>
                    )}
                  </span>
                </Link>
                <RoleBadge role={hero.role} />
              </header>
              <ul className="divide-y divide-ow-border/40">
                {entry.changes.map((c, idx) => (
                  <li key={idx} className="grid gap-2 p-4 md:grid-cols-[160px_1fr_auto] md:items-start">
                    <div className="text-sm font-semibold text-white">
                      {c.ability}
                    </div>
                    <div className="space-y-1 text-sm text-slate-300">
                      <div>{c.description}</div>
                      {(c.before || c.after) && (
                        <div className="text-xs text-ow-muted">
                          {c.before && (
                            <span className="line-through decoration-rose-400/60">
                              {c.before}
                            </span>
                          )}
                          {c.before && c.after && <span className="px-1.5">→</span>}
                          {c.after && (
                            <span className="text-emerald-300">{c.after}</span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="md:text-right">
                      <ChangeBadge kind={c.kind} />
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </div>
  );
}
