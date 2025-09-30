import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/article-grid/article-grid.component').then(m => m.ArticleGridComponent)
  },
  {
    path: 'article/:slug',
    loadComponent: () =>
      import('./components/article-detail/article-detail.component').then(m => m.ArticleDetailComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
