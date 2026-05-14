import HeroGrid from '@/components/HeroGrid';
import { getHeroTrend, getHeroes } from '@/lib/data';

export default function HeroesPage() {
  const heroes = getHeroes();
  const trendByHero = Object.fromEntries(
    heroes.map((h) => [h.id, getHeroTrend(h.id)]),
  );

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-white">영웅</h1>
        <p className="text-sm text-ow-muted">
          영웅을 선택하면 패치별 변경 추이 차트와 상세 내역을 볼 수 있습니다.
        </p>
      </header>
      <HeroGrid heroes={heroes} trendByHero={trendByHero} />
    </div>
  );
}
