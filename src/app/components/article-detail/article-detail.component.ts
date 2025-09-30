import { Component } from '@angular/core';

@Component({
  selector: 'sd-article-detail',
  standalone: true,
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class SdArticleDetailComponent {
  article = {
    title: 'Placeholder Title',
    excerpt: 'This is a short summary of the article.',
    author: 'Jane Doe',
    published: '2025-09-30',
    image: 'https://via.placeholder.com/800x400',
    content: '<p>This is the full article content rendered as HTML.</p>'
  };
}

