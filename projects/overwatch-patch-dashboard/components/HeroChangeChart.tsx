'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { HeroTrendPoint } from '@/lib/types';
import { formatDate } from '@/lib/utils';

type Props = {
  trend: HeroTrendPoint[];
};

export default function HeroChangeChart({ trend }: Props) {
  const data = trend.map((p) => ({
    ...p,
    label: formatDate(p.date).slice(2),
  }));

  return (
    <div className="card p-4">
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="text-sm font-semibold text-white">
          패치별 변경 추이
        </h3>
        <span className="text-[11px] text-ow-muted">버프 / 너프 / 순변화</span>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer>
          <ComposedChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
            <CartesianGrid stroke="#1f2a3d" vertical={false} />
            <XAxis
              dataKey="label"
              stroke="#6b7a93"
              tick={{ fontSize: 11 }}
            />
            <YAxis
              stroke="#6b7a93"
              tick={{ fontSize: 11 }}
              allowDecimals={false}
            />
            <Tooltip
              cursor={{ fill: 'rgba(255,255,255,0.04)' }}
              contentStyle={{
                background: '#0b0f17',
                border: '1px solid #1f2a3d',
                borderRadius: 8,
                fontSize: 12,
              }}
              labelFormatter={(_, payload) =>
                payload?.[0]?.payload?.patchTitle ?? ''
              }
            />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="buffs" name="버프" fill="#22c55e" radius={[4, 4, 0, 0]} />
            <Bar dataKey="nerfs" name="너프" fill="#ef4444" radius={[4, 4, 0, 0]} />
            <Line
              type="monotone"
              dataKey="net"
              name="순변화"
              stroke="#f99e1a"
              strokeWidth={2}
              dot={{ r: 3, fill: '#f99e1a' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
