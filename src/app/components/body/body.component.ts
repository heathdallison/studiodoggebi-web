import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SdArticleDetailComponent } from '../article-detail/article-detail.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [CommonModule, SdArticleDetailComponent, SdArticleDetailComponent],
  templateUrl: './body.component.html'
})
export class BodyComponent {
  constructor(private router: Router) {}

  get isArticleView(): boolean {
    return this.router.url.startsWith('/article/');
  }
}
