'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { Hero, Patch } from '@/lib/types';
import { formatDate } from '@/lib/utils';

type Props = {
  patches: Patch[];
  heroes: Hero[];
};

type SourceFilter = 'all' | 'official' | 'community';

export default function PatchTimeline({ patches, heroes }: Props) {
  const [query, setQuery] = useState('');
  const [source, setSource] = useState<SourceFilter>('all');

  const heroNameById = useMemo(
    () => new Map(heroes.map((h) => [h.id, h.name])),
    [heroes],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return patches.filter((p) => {
      if (source !== 'all' && p.source !== source) return false;
      if (!q) return true;
      const hay = [
        p.title,
        p.summary,
        p.version,
        ...p.heroes.flatMap((h) => [
          heroNameById.get(h.hero) ?? h.hero,
          h.summary ?? '',
          ...h.changes.flatMap((c) => [c.ability, c.description]),
        ]),
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [patches, query, source, heroNameById]);

  return (
    <section className="space-y-6">
      <div className="card flex flex-col gap-3 p-4 md:flex-row md:items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="영웅, 스킬, 키워드 검색 (예: 트레이서, 레일건, 너프)"
          className="flex-1 rounded-lg border border-ow-border bg-ow-dark/40 px-3 py-2 text-sm placeholder:text-ow-muted focus:border-ow-orange focus:outline-none"
        />
        <div className="flex items-center gap-2 text-sm">
          {(
            [
              ['all', '전체'],
              ['official', '공식'],
              ['community', '커뮤니티'],
            ] as Array<[SourceFilter, string]>
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setSource(key)}
              className={`btn ${
                source === key
                  ? 'border-ow-orange/60 bg-ow-orange/10 text-ow-orange'
                  : ''
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <ol className="relative space-y-4 pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-ow-border">
        {filtered.length === 0 && (
          <li className="card p-6 text-sm text-ow-muted">
            조건에 맞는 패치가 없습니다.
          </li>
        )}
        {filtered.map((patch) => {
          const totals = patch.heroes.reduce(
            (acc, hero) => {
              hero.changes.forEach((c) => {
                if (c.kind === 'buff') acc.buffs += 1;
                else if (c.kind === 'nerf') acc.nerfs += 1;
                else if (c.kind === 'rework') acc.reworks += 1;
              });
              return acc;
            },
            { buffs: 0, nerfs: 0, reworks: 0 },
          );

          return (
            <li key={patch.id} className="relative">
              <span className="absolute -left-[18px] top-5 inline-block h-3 w-3 rounded-full border-2 border-ow-orange bg-ow-dark" />
              <Link
                href={`/patches/${patch.id}`}
                className="card block p-5 transition hover:border-ow-orange/40"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <div className="text-xs text-ow-muted">
                      {formatDate(patch.date)} · v{patch.version}
                    </div>
                    <h3 className="mt-0.5 text-lg font-semibold text-white">
                      {patch.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="chip border-ow-border bg-ow-dark/40 text-ow-muted">
                      {patch.source === 'official' ? '공식' : '커뮤니티'}
                    </span>
                    <span className="chip border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                      버프 {totals.buffs}
                    </span>
                    <span className="chip border-rose-500/30 bg-rose-500/10 text-rose-300">
                      너프 {totals.nerfs}
                    </span>
                    {totals.reworks > 0 && (
                      <span className="chip border-purple-500/30 bg-purple-500/10 text-purple-300">
                        리워크 {totals.reworks}
                      </span>
                    )}
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {patch.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {patch.heroes.slice(0, 8).map((h) => (
                    <span
                      key={h.hero}
                      className="chip border-ow-border bg-ow-dark/40 text-slate-300"
                    >
                      {heroNameById.get(h.hero) ?? h.hero}
                    </span>
                  ))}
                  {patch.heroes.length > 8 && (
                    <span className="chip border-ow-border bg-ow-dark/40 text-ow-muted">
                      +{patch.heroes.length - 8}
                    </span>
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
