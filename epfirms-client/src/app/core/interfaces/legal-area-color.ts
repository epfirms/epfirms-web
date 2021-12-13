export type TagTextColor =
  | 'text-cyan-800'
  | 'text-teal-800'
  | 'text-sky-800'
  | 'text-orange-800'
  | 'text-violet-800'
  | 'text-fuchsia-800'
  | 'text-rose-800'
  | 'text-emerald-800'
  | 'text-lime-800';
export type TagBackgroundColor =
  | 'bg-cyan-100'
  | 'bg-teal-100'
  | 'bg-sky-100'
  | 'bg-orange-100'
  | 'bg-violet-100'
  | 'bg-fuchsia-100'
  | 'bg-rose-100'
  | 'bg-emerald-100'
  | 'bg-lime-100';

export type TagColor = 'cyan' | 'teal' | 'sky' | 'orange' | 'violet' | 'fuchsia' | 'rose' | 'emerald' | 'lime' | 'gray';

export interface LegalAreaColor {
  name: TagColor;
  textColor: TagTextColor;
  bgColor: TagBackgroundColor;
}
