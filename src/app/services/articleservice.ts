import { Injectable } from '@angular/core';

export interface ArticleSummary {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
}

export interface ArticleDetail extends ArticleSummary {
  content: string;
  published: string;
  author?: string;
}

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private mockFeeds: Record<string, ArticleDetail[]> = {
    sisters: [
      {
        slug: 'sisters-unite',
        title: 'Sisters Unite',
        excerpt: 'A rallying cry from the inked archives...',
        image: 'https://cdn.example.com/sisters1.jpg',
        content: 'Full article content for Sisters Unite...',
        published: '2025-09-01',
        author: 'L. Sister'
      },
      {
        slug: 'comic-rituals',
        title: 'Comic Rituals',
        excerpt: 'How repetition shapes the creative flow...',
        image: 'https://cdn.example.com/sisters2.jpg',
        content: 'Full article content for Comic Rituals...',
        published: '2025-09-15',
        author: 'L. Sister'
      }
    ],
    doggebi: [
      {
        slug: 'doggebi-rising',
        title: 'Doggebi Rising',
        excerpt: 'A myth reborn in digital ink...',
        image: 'https://cdn.example.com/doggebi1.jpg',
        content: 'Full article content for Doggebi Rising...',
        published: '2025-09-03',
        author: 'J. Doggebi'
      },
      {
        slug: 'studio-notes',
        title: 'Studio Notes',
        excerpt: 'Behind the scenes of the Doggebi process...',
        image: 'https://cdn.example.com/doggebi2.jpg',
        content: 'Full article content for Studio Notes...',
        published: '2025-09-20',
        author: 'J. Doggebi'
      }
    ],
    hero: [
      {
        slug: 'hero-origins',
        title: 'Hero Origins',
        excerpt: 'Where the cape meets the code...',
        image: 'https://cdn.example.com/hero1.jpg',
        content: 'Full article content for Hero Origins...',
        published: '2025-09-05',
        author: 'B. Hero'
      }
    ]
  };

  getArticles(brand: string): ArticleSummary[] {
    return this.mockFeeds[brand]?.map(({ slug, title, excerpt, image }) => ({
      slug, title, excerpt, image
    })) ?? [];
  }

  getArticleBySlug(brand: string, slug: string): ArticleDetail | null {
    return this.mockFeeds[brand]?.find(article => article.slug === slug) ?? null;
  }
}
