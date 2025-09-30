import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ArticleService, ArticleDetail } from '@services/article.service';
import { LayoutInfoService } from '@services/layout-info.service';

@Component({
  selector: 'sd-article-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent {
  article: ArticleDetail | null = null;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private layoutInfo: LayoutInfoService
  ) {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      const brand = this.layoutInfo.currentSection || 'legendarysisters';
      this.article = this.articleService.getArticleBySlug(brand, slug);
      console.log('[ArticleDetail] slug:', slug, 'brand:', brand, 'article:', this.article);
    });
  }
}
