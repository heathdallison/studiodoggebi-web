import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService, ArticleDetail } from '@services/article.service';
import { LayoutInfoService } from '@services/layout-info.service';

@Component({
  selector: 'sd-article-detail',
  standalone: true,
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
    const slug = this.route.snapshot.paramMap.get('slug');
    const brand = this.layoutInfo.currentSection;

    console.log('[ArticleDetail] slug:', slug, 'brand:', brand);

    this.article = this.articleService.getArticleBySlug(brand, slug ?? '');
    console.log('[ArticleDetail] article:', this.article);
  }
}
