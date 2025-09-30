import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleDetailComponent } from '../article-detail/article-detail.component';
import { CommonModule } from '@angular/common';
import { ArticleGridComponent } from '@components/article-grid/article-grid.component';

@Component({
  selector: 'sd-body',
  standalone: true,
  imports: [
    CommonModule, 
    ArticleDetailComponent, 
    ArticleGridComponent],
  templateUrl: './body.component.html'
})
export class BodyComponent {
  constructor(private router: Router) {}

  get isArticleView(): boolean {
    return this.router.url.startsWith('/article/');
  }
}
