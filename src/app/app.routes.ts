import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'studiodoggebi', pathMatch: 'full' },
  { path: 'studiodoggebi',  children: [] },
  { path: 'legendarysisters', children: [] },
  { path: '**', redirectTo: 'studiodoggebi' }
];
