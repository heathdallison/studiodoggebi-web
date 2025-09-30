import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', children: [] },  // root stays at '/'
  { path: '**', redirectTo: '' }                   // fallback to '/'
];

