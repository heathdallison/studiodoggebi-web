import { Routes } from '@angular/router';

function brandFromHost(): 'legendarysisters' | 'studiodoggebi' | 'basicherostuff' {
  const h = typeof window !== 'undefined' ? window.location.host : '';
  if (h.includes('legendarysisters')) return 'legendarysisters';
  if (h.includes('basicherostuff'))   return 'basicherostuff';
  return 'studiodoggebi';
}

export const routes: Routes = [
  { path: '', redirectTo: brandFromHost(), pathMatch: 'full' },
  { path: 'legendarysisters', children: [] },
  { path: 'studiodoggebi',    children: [] },
  { path: 'basicherostuff',   children: [] },
  { path: '**', redirectTo: brandFromHost() }
];

