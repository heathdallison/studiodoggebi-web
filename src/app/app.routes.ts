import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', children: [] },  // root stays at '/'
  {
    path: 'article/:slug',
    loadComponent: () => import('./components/article-detail/article-detail.component').then(m => m.ArticleDetailComponent)
  }
  ,
  { path: '**', redirectTo: '' }  // fallback to '/'
];
