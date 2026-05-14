import type { ChangeKind } from '@/lib/types';
import { changeColor, changeLabel } from '@/lib/utils';

export default function ChangeBadge({ kind }: { kind: ChangeKind }) {
  return <span className={`chip ${changeColor[kind]}`}>{changeLabel[kind]}</span>;
}
