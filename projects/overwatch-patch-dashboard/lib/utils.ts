import type { ChangeKind, Role } from '@/lib/types';

export const formatDate = (iso: string): string => {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(
    d.getDate(),
  ).padStart(2, '0')}`;
};

export const roleLabel: Record<Role, string> = {
  tank: '돌격',
  damage: '공격',
  support: '지원',
};

export const roleColor: Record<Role, string> = {
  tank: 'text-blue-300 bg-blue-500/10 border-blue-500/30',
  damage: 'text-orange-300 bg-orange-500/10 border-orange-500/30',
  support: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30',
};

export const changeLabel: Record<ChangeKind, string> = {
  buff: '버프',
  nerf: '너프',
  rework: '리워크',
  neutral: '조정',
};

export const changeColor: Record<ChangeKind, string> = {
  buff: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/40',
  nerf: 'text-rose-300 bg-rose-500/10 border-rose-500/40',
  rework: 'text-purple-300 bg-purple-500/10 border-purple-500/40',
  neutral: 'text-slate-300 bg-slate-500/10 border-slate-500/40',
};

export const classNames = (...cn: Array<string | false | undefined | null>) =>
  cn.filter(Boolean).join(' ');
