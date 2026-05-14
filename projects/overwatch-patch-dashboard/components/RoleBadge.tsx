import type { Role } from '@/lib/types';
import { roleColor, roleLabel } from '@/lib/utils';

export default function RoleBadge({ role }: { role: Role }) {
  return <span className={`chip ${roleColor[role]}`}>{roleLabel[role]}</span>;
}
