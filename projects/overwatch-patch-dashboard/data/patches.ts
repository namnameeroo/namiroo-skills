import type { Patch } from '@/lib/types';

export const patches: Patch[] = [
  {
    id: 'patch-2026-05-06',
    version: '2026.05.06',
    title: '시즌 15 미드시즌 패치',
    date: '2026-05-06',
    source: 'official',
    sourceUrl: 'https://overwatch.blizzard.com/ko-kr/news/patch-notes/',
    summary: '탱커 지속력 하향, 서포터 처치 기여 보정, 일부 돌격 영웅 후속타 강화.',
    heroes: [
      {
        hero: 'mauga',
        summary: '돌진 의존도 낮추고 폭탄 무력화 빈도 감소.',
        changes: [
          {
            ability: '돌진',
            description: '재사용 대기시간이 늘어 라인 압박 빈도를 줄였습니다.',
            before: '재사용 대기시간 8초',
            after: '재사용 대기시간 9.5초',
            kind: 'nerf',
          },
          {
            ability: '심장 폭발',
            description: '치명적인 화력이 줄도록 명중 시 회복량이 감소합니다.',
            before: '명중 시 자기 회복 50%',
            after: '명중 시 자기 회복 40%',
            kind: 'nerf',
          },
        ],
      },
      {
        hero: 'reinhardt',
        summary: '돌진 캔슬 후 후속 압박 강화.',
        changes: [
          {
            ability: '돌진',
            description: '돌진 종료 후 무기 전환 경직이 줄었습니다.',
            after: '돌진 종료 경직 0.4s → 0.2s',
            kind: 'buff',
          },
          {
            ability: '대지 분쇄',
            description: '효과 범위가 살짝 늘어났습니다.',
            before: '반경 10m',
            after: '반경 11m',
            kind: 'buff',
          },
        ],
      },
      {
        hero: 'sojourn',
        summary: '레일건 충전 효율 미세 조정.',
        changes: [
          {
            ability: '레일건',
            description: '주 사격 명중 시 충전량이 약간 증가합니다.',
            before: '명중 당 7% 충전',
            after: '명중 당 8% 충전',
            kind: 'buff',
          },
        ],
      },
      {
        hero: 'mercy',
        summary: '데미지 부스트 의존도 감소.',
        changes: [
          {
            ability: '카두세우스 스태프',
            description: '데미지 부스트 수치가 하향됩니다.',
            before: '+30%',
            after: '+25%',
            kind: 'nerf',
          },
          {
            ability: '천사 강림',
            description: '경직 종료 후 비행 속도가 살짝 빨라집니다.',
            after: '비행 속도 17m/s → 18m/s',
            kind: 'buff',
          },
        ],
      },
      {
        hero: 'kiriko',
        summary: '쿠나이 처치 기여 조정.',
        changes: [
          {
            ability: '쿠나이',
            description: '치명타 배율이 살짝 낮아졌습니다.',
            before: '치명타 배율 2.0x',
            after: '치명타 배율 1.9x',
            kind: 'nerf',
          },
        ],
      },
      {
        hero: 'juno',
        summary: '글라이드 부스트 시간 증가.',
        changes: [
          {
            ability: '글라이드 부스트',
            description: '활공 지속시간이 늘어 기동성이 향상됩니다.',
            before: '지속 4s',
            after: '지속 5s',
            kind: 'buff',
          },
        ],
      },
    ],
  },
  {
    id: 'patch-2026-04-08',
    version: '2026.04.08',
    title: '시즌 15 시작 패치',
    date: '2026-04-08',
    source: 'official',
    sourceUrl: 'https://overwatch.blizzard.com/ko-kr/news/patch-notes/',
    summary: '시즌 15 시작과 함께 신규 영웅 미공개 + 광범위한 균형 조정.',
    heroes: [
      {
        hero: 'tracer',
        summary: '딜 사이클 회복.',
        changes: [
          {
            ability: '쌍권총',
            description: '근거리 명중률 보정으로 평균 DPS가 약간 상승합니다.',
            before: '한 발당 6 데미지',
            after: '한 발당 6.5 데미지',
            kind: 'buff',
          },
        ],
      },
      {
        hero: 'venture',
        summary: '굴착기 콤보 너프.',
        changes: [
          {
            ability: '굴착기',
            description: '땅속 이동 거리 감소.',
            before: '최대 이동거리 9m',
            after: '최대 이동거리 8m',
            kind: 'nerf',
          },
          {
            ability: '평사포',
            description: '주 사격 폭발 반경이 줄었습니다.',
            before: '폭발 반경 1.6m',
            after: '폭발 반경 1.4m',
            kind: 'nerf',
          },
        ],
      },
      {
        hero: 'dva',
        summary: '디펜스 매트릭스 회복 속도 미세 조정.',
        changes: [
          {
            ability: '디펜스 매트릭스',
            description: '재충전 속도가 약간 빨라졌습니다.',
            before: '12.5%/s',
            after: '13.5%/s',
            kind: 'buff',
          },
        ],
      },
      {
        hero: 'sigma',
        summary: '리워크 - 운동 흡수 메커닉 변경.',
        changes: [
          {
            ability: '운동 에너지 흡수',
            description: '흡수한 에너지가 임시 방어막으로 전환됩니다(기존 영구 방어막 → 7초 임시).',
            kind: 'rework',
          },
          {
            ability: '초질량',
            description: '낙하 데미지 비율이 줄어듭니다.',
            before: '낙하 시 50/100',
            after: '낙하 시 40/80',
            kind: 'nerf',
          },
        ],
      },
      {
        hero: 'ana',
        summary: '수면총 회복 너프 보정.',
        changes: [
          {
            ability: '수면총',
            description: '수면 지속시간이 살짝 줄었습니다.',
            before: '지속 5s',
            after: '지속 4.5s',
            kind: 'nerf',
          },
        ],
      },
      {
        hero: 'genji',
        summary: '튕겨내기 후딜 감소.',
        changes: [
          {
            ability: '튕겨내기',
            description: '튕겨내기 종료 후 무기 전환 딜레이가 감소합니다.',
            before: '0.5s',
            after: '0.3s',
            kind: 'buff',
          },
        ],
      },
    ],
  },
  {
    id: 'patch-2026-02-25',
    version: '2026.02.25',
    title: '시즌 14 미드시즌 패치',
    date: '2026-02-25',
    source: 'community',
    sourceUrl: 'https://overwatch.fandom.com/wiki/Patch_notes',
    summary: '서포터-탱커 듀오 메타 완화. 일부 딜러 기동성 강화.',
    heroes: [
      {
        hero: 'kiriko',
        summary: '보호의 부적 사용성 강화.',
        changes: [
          {
            ability: '보호의 부적',
            description: '재사용 대기시간이 줄었습니다.',
            before: '14s',
            after: '12s',
            kind: 'buff',
          },
        ],
      },
      {
        hero: 'mauga',
        summary: '오버워치 1 시절 메타 회상 후 너프.',
        changes: [
          {
            ability: '심장 폭발',
            description: '몸통 명중 시 회복 변환 비율이 감소합니다.',
            before: '60%',
            after: '50%',
            kind: 'nerf',
          },
        ],
      },
      {
        hero: 'tracer',
        summary: '리콜 쿨다운 단축.',
        changes: [
          {
            ability: '리콜',
            description: '재사용 대기시간이 줄었습니다.',
            before: '12s',
            after: '11s',
            kind: 'buff',
          },
        ],
      },
      {
        hero: 'juno',
        summary: '메디블래스터 명중률 보정.',
        changes: [
          {
            ability: '메디블래스터',
            description: '체공 시 명중 보정이 강화됩니다.',
            kind: 'buff',
          },
          {
            ability: '환각 어뢰',
            description: '효과 범위가 줄었습니다.',
            before: '반경 6m',
            after: '반경 5m',
            kind: 'nerf',
          },
        ],
      },
    ],
  },
  {
    id: 'patch-2026-01-21',
    version: '2026.01.21',
    title: '시즌 14 시작 패치',
    date: '2026-01-21',
    source: 'official',
    sourceUrl: 'https://overwatch.blizzard.com/ko-kr/news/patch-notes/',
    summary: '시즌 14 시작. 신규 맵과 함께 대규모 영웅 조정.',
    heroes: [
      {
        hero: 'reinhardt',
        summary: '대지 분쇄 리워크.',
        changes: [
          {
            ability: '대지 분쇄',
            description: '지속시간/범위가 조정되고, 적중 시 잠시 이동속도 감소 효과 추가.',
            kind: 'rework',
          },
        ],
      },
      {
        hero: 'sigma',
        summary: '범용성 강화.',
        changes: [
          {
            ability: '초질량',
            description: '공중 부양 시간이 늘었습니다.',
            before: '2s',
            after: '2.5s',
            kind: 'buff',
          },
        ],
      },
      {
        hero: 'mercy',
        summary: '치유 보정 조정.',
        changes: [
          {
            ability: '카두세우스 스태프',
            description: '치유량이 약간 증가합니다.',
            before: '55/s',
            after: '60/s',
            kind: 'buff',
          },
        ],
      },
      {
        hero: 'sojourn',
        summary: '레일건 너프.',
        changes: [
          {
            ability: '레일건',
            description: '최대 충전 데미지가 감소합니다.',
            before: '130',
            after: '120',
            kind: 'nerf',
          },
        ],
      },
      {
        hero: 'venture',
        summary: '신규 영웅 출시 후 첫 조정.',
        changes: [
          {
            ability: '평사포',
            description: '폭발 반경이 늘어 명중 안정성이 향상됩니다.',
            before: '1.3m',
            after: '1.5m',
            kind: 'buff',
          },
        ],
      },
    ],
  },
  {
    id: 'patch-2025-11-25',
    version: '2025.11.25',
    title: '시즌 13 미드시즌 패치',
    date: '2025-11-25',
    source: 'official',
    sourceUrl: 'https://overwatch.blizzard.com/ko-kr/news/patch-notes/',
    summary: '서포터 생존력 너프, 일부 돌격 영웅 상향.',
    heroes: [
      {
        hero: 'ana',
        summary: '바이오틱 수류탄 너프.',
        changes: [
          {
            ability: '바이오틱 수류탄',
            description: '치유 차단 지속이 줄었습니다.',
            before: '4s',
            after: '3s',
            kind: 'nerf',
          },
        ],
      },
      {
        hero: 'dva',
        summary: '돌진 강화.',
        changes: [
          {
            ability: '부스터',
            description: '재사용 대기시간이 살짝 감소합니다.',
            before: '5s',
            after: '4.5s',
            kind: 'buff',
          },
        ],
      },
      {
        hero: 'genji',
        summary: '용검 폭발력 조정.',
        changes: [
          {
            ability: '용검',
            description: '지속시간이 줄었습니다.',
            before: '8s',
            after: '7s',
            kind: 'nerf',
          },
        ],
      },
      {
        hero: 'mercy',
        summary: '발키리 회복 효율 미세 상향.',
        changes: [
          {
            ability: '발키리',
            description: '체인 사거리가 증가합니다.',
            before: '15m',
            after: '17m',
            kind: 'buff',
          },
        ],
      },
    ],
  },
  {
    id: 'patch-2025-10-14',
    version: '2025.10.14',
    title: '시즌 13 시작 패치',
    date: '2025-10-14',
    source: 'official',
    sourceUrl: 'https://overwatch.blizzard.com/ko-kr/news/patch-notes/',
    summary: '시즌 13 시작. 광범위한 범위 조정과 함께 메타 리셋.',
    heroes: [
      {
        hero: 'tracer',
        summary: '펄스 폭탄 사용성 보정.',
        changes: [
          {
            ability: '펄스 폭탄',
            description: '부착 판정 거리가 미세하게 증가합니다.',
            before: '0.5m',
            after: '0.6m',
            kind: 'buff',
          },
        ],
      },
      {
        hero: 'mauga',
        summary: '신규 영웅 등장 후 균형 조정.',
        changes: [
          {
            ability: '오버드라이브',
            description: '지속시간이 감소합니다.',
            before: '5s',
            after: '4s',
            kind: 'nerf',
          },
          {
            ability: '돌진',
            description: '접촉 데미지가 늘었습니다.',
            before: '30',
            after: '40',
            kind: 'buff',
          },
        ],
      },
      {
        hero: 'kiriko',
        summary: '치유의 부적 회복량 너프.',
        changes: [
          {
            ability: '치유의 부적',
            description: '평균 치유량이 약간 감소합니다.',
            before: '45',
            after: '40',
            kind: 'nerf',
          },
        ],
      },
      {
        hero: 'sojourn',
        summary: '레일건 차지 속도 보정.',
        changes: [
          {
            ability: '레일건',
            description: '주 사격 명중 시 차지 보정.',
            kind: 'buff',
          },
        ],
      },
      {
        hero: 'reinhardt',
        summary: '차징 후 보정 강화.',
        changes: [
          {
            ability: '돌진',
            description: '벽 충돌 시 자기 피해가 감소합니다.',
            before: '50',
            after: '35',
            kind: 'buff',
          },
        ],
      },
      {
        hero: 'juno',
        summary: '신규 영웅 첫 균형 조정.',
        changes: [
          {
            ability: '환각 어뢰',
            description: '공속 버프 지속이 늘었습니다.',
            before: '4s',
            after: '5s',
            kind: 'buff',
          },
        ],
      },
    ],
  },
];
