import { Component, OnInit } from '@angular/core';
import { ArticleService} from '@services/article.service';
import { LayoutInfoService } from '@services/layout-info.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticleSummary } from 'app/Models/interfaces';

@Component({
    selector: 'sd-article-grid',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './article-grid.component.html',
    styleUrls: ['./article-grid.component.scss']
})
export class ArticleGridComponent implements OnInit {
    articles: ArticleSummary[] = [];

    constructor(
        private articleService: ArticleService,
        private layoutInfo: LayoutInfoService
    ) { }

    ngOnInit(): void {
        const brand = this.layoutInfo.currentSection;
        console.log('[layoutInfo.currentSection]', brand);
        this.articles = this.articleService.getArticles(brand || 'sisters');
    }

}
