import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ArticleService } from '@services/article.service';
import { LayoutInfoService } from '@services/layout-info.service';
import { ArticleDetail } from 'app/Models/interfaces';
imports: [CommonModule, RouterModule]

@Component({
  selector: 'sd-article-detail',
  standalone: true,
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
  imports: [CommonModule, RouterModule]
})

export class ArticleDetailComponent {
  article: ArticleDetail | null = null;

  constructor() {
    const route = inject(ActivatedRoute);
    const articleService = inject(ArticleService);
    const layoutInfo = inject(LayoutInfoService);

    console.log('[ArticleDetailComponent] Constructor fired');

    const slug = route.snapshot.paramMap.get('slug');
    const brand = layoutInfo.currentSection;

    console.log('[ArticleDetail] slug:', slug, 'brand:', brand);

    this.article = articleService.getArticleBySlug(brand, slug ?? '');
    console.log('[ArticleDetail] article:', this.article);
  }
}
