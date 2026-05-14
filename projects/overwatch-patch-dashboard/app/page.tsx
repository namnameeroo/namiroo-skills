import PatchTimeline from '@/components/PatchTimeline';
import { getHeroes, getPatches } from '@/lib/data';

export default function HomePage() {
  const patches = getPatches();
  const heroes = getHeroes();

  const heroAdjustments = patches.reduce((acc, p) => acc + p.heroes.length, 0);
  const totalChanges = patches.reduce(
    (acc, p) => acc + p.heroes.reduce((a, h) => a + h.changes.length, 0),
    0,
  );

  return (
    <div className="space-y-10">
      <section className="card overflow-hidden">
        <div className="grid gap-6 p-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <h1 className="text-3xl font-bold leading-tight">
              패치를 한 눈에,
              <br />
              영웅 변화를 추이로.
            </h1>
            <p className="text-sm leading-relaxed text-slate-300">
              오버워치 패치 노트를 영웅 단위로 정리하고, 시즌과 미드시즌에 걸친
              버프/너프 흐름을 한 화면에서 추적합니다. 공식 패치노트와 커뮤니티
              소스를 모두 다룰 수 있도록 데이터 레이어가 분리되어 있습니다.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 md:col-span-1">
            <Stat label="패치" value={patches.length} />
            <Stat label="영웅 조정" value={heroAdjustments} />
            <Stat label="개별 변경" value={totalChanges} />
          </div>
        </div>
      </section>

      <PatchTimeline patches={patches} heroes={heroes} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-ow-border bg-ow-dark/40 p-3 text-center">
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-[11px] tracking-wide text-ow-muted">{label}</div>
    </div>
  );
}
