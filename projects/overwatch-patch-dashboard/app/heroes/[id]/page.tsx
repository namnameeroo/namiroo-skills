import Link from 'next/link';
import { notFound } from 'next/navigation';
import ChangeBadge from '@/components/ChangeBadge';
import HeroChangeChart from '@/components/HeroChangeChart';
import RoleBadge from '@/components/RoleBadge';
import {
  getHero,
  getHeroTrend,
  getHeroes,
  getPatchesForHero,
} from '@/lib/data';
import { formatDate } from '@/lib/utils';

export function generateStaticParams() {
  return getHeroes().map((h) => ({ id: h.id }));
}

export default function HeroPage({ params }: { params: { id: string } }) {
  const hero = getHero(params.id);
  if (!hero) notFound();

  const trend = getHeroTrend(hero.id);
  const patches = getPatchesForHero(hero.id);

  const totals = trend.reduce(
    (acc, t) => {
      acc.buffs += t.buffs;
      acc.nerfs += t.nerfs;
      acc.reworks += t.reworks;
      return acc;
    },
    { buffs: 0, nerfs: 0, reworks: 0 },
  );

  return (
    <div className="space-y-8">
      <div>
        <Link href="/heroes" className="text-sm text-ow-muted hover:text-white">
          ← 영웅 목록
        </Link>
      </div>

      <section className="card flex flex-wrap items-center justify-between gap-4 p-6">
        <div className="flex items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-xl bg-ow-dark/60 text-3xl">
            {hero.icon}
          </span>
          <div>
            <h1 className="text-2xl font-bold text-white">{hero.name}</h1>
            <div className="mt-1">
              <RoleBadge role={hero.role} />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="chip border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
            총 버프 {totals.buffs}
          </span>
          <span className="chip border-rose-500/30 bg-rose-500/10 text-rose-300">
            총 너프 {totals.nerfs}
          </span>
          {totals.reworks > 0 && (
            <span className="chip border-purple-500/30 bg-purple-500/10 text-purple-300">
              리워크 {totals.reworks}
            </span>
          )}
        </div>
      </section>

      <HeroChangeChart trend={trend} />

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-white">패치별 상세</h2>
        {patches.length === 0 && (
          <div className="card p-6 text-sm text-ow-muted">
            기록된 패치가 없습니다.
          </div>
        )}
        {patches.map((patch) => {
          const entry = patch.heroes.find((h) => h.hero === hero.id)!;
          return (
            <article key={patch.id} className="card overflow-hidden">
              <header className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ow-border/60 p-4">
                <div>
                  <div className="text-xs text-ow-muted">
                    {formatDate(patch.date)} · v{patch.version}
                  </div>
                  <Link
                    href={`/patches/${patch.id}`}
                    className="text-base font-semibold text-white hover:text-ow-orange"
                  >
                    {patch.title}
                  </Link>
                </div>
                {entry.summary && (
                  <span className="text-xs text-ow-muted">{entry.summary}</span>
                )}
              </header>
              <ul className="divide-y divide-ow-border/40">
                {entry.changes.map((c, idx) => (
                  <li
                    key={idx}
                    className="grid gap-2 p-4 md:grid-cols-[160px_1fr_auto] md:items-start"
                  >
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
                          {c.before && c.after && (
                            <span className="px-1.5">→</span>
                          )}
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
      </section>
    </div>
  );
}
