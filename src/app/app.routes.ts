import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'legendarysisters', pathMatch: 'full' },
  { path: 'legendarysisters', children: [] },
  { path: 'studiodoggebi',  children: [] },
  { path: '**', redirectTo: '' }
];
