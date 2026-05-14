import Link from 'next/link';
import { notFound } from 'next/navigation';
import PatchChangeTable from '@/components/PatchChangeTable';
import { getHeroes, getPatch, getPatches } from '@/lib/data';
import { formatDate } from '@/lib/utils';

export function generateStaticParams() {
  return getPatches().map((p) => ({ id: p.id }));
}

export default function PatchPage({ params }: { params: { id: string } }) {
  const patch = getPatch(params.id);
  if (!patch) notFound();

  const heroes = getHeroes();
  const totals = patch.heroes.reduce(
    (acc, h) => {
      h.changes.forEach((c) => {
        if (c.kind === 'buff') acc.buffs += 1;
        else if (c.kind === 'nerf') acc.nerfs += 1;
        else if (c.kind === 'rework') acc.reworks += 1;
      });
      return acc;
    },
    { buffs: 0, nerfs: 0, reworks: 0 },
  );

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/"
          className="text-sm text-ow-muted hover:text-white"
        >
          ← 전체 패치
        </Link>
      </div>

      <section className="card p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <div className="text-xs text-ow-muted">
              {formatDate(patch.date)} · v{patch.version}
            </div>
            <h1 className="mt-1 text-2xl font-bold text-white">
              {patch.title}
            </h1>
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
        <p className="mt-4 text-sm leading-relaxed text-slate-300">
          {patch.summary}
        </p>
        {patch.sourceUrl && (
          <a
            href={patch.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center text-xs text-ow-muted underline-offset-2 hover:text-white hover:underline"
          >
            원문 패치노트 ↗
          </a>
        )}
      </section>

      <PatchChangeTable changes={patch.heroes} heroes={heroes} />
    </div>
  );
}
