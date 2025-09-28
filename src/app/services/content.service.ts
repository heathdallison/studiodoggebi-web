import { Injectable } from '@angular/core';

export interface ContentItem {
  id: string;
  title: string;
  thumbnail: string;  // URL (can be local asset for now)
  etsyUrl: string;    // external link
}

@Injectable({ providedIn: 'root' })
export class ContentService {
  // stub feeds; swap with API later
  private feeds: Record<string, ContentItem[]> = {
    onetsy: [
      { id: '1', title: 'Ink Study #1', thumbnail: '/assets/ink1.jpg', etsyUrl: 'https://etsy.com/listing/xxxxx' },
      { id: '2', title: 'Ink Study #2', thumbnail: '/assets/ink2.jpg', etsyUrl: 'https://etsy.com/listing/yyyyy' },
    ],
    wip: [
      { id: 'w1', title: 'WIP Sketch', thumbnail: '/assets/wip1.jpg', etsyUrl: 'https://etsy.com' }
    ]
  };

  getFeed(key: 'onetsy' | 'wip'): ContentItem[] {
    return this.feeds[key] ?? [];
  }
}
