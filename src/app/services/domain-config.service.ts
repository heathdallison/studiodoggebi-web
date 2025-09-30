import { Injectable } from '@angular/core';

export interface SiteConfig {
  masthead: string;
  buttons: {
    label: string;
    href: string;
    isActive: boolean;
  }[];
}

@Injectable({ providedIn: 'root' })
export class DomainConfigService {
  private readonly domain = window.location.hostname.replace(/^www\./, '').toLowerCase();

  getConfig(): SiteConfig {
    const isLegendary = this.domain === 'legendarysisters.com';

    return {
      masthead: isLegendary ? 'Legendary Sisters' : 'Studio Doggebi',
      buttons: [
        {
          label: 'Legendary Sisters',
          href: 'https://legendarysisters.com',
          isActive: isLegendary
        },
        {
          label: 'Studio Doggebi',
          href: 'https://studiodoggebi.com',
          isActive: !isLegendary
        }
      ]
    };
  }
}
