import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

import { DOMAIN_CONFIG } from './config/domain-config.token';
import { DomainConfig } from './Models/interfaces';

const domainConfig: DomainConfig = {
  defaultSection: 'studiodoggebi',
  order: ['studiodoggebi', 'legendarysisters'],
  sections: {
    studiodoggebi: {
      id: 'studiodoggebi',
      label: 'Studio Doggebi',
      masthead: 'Studio Doggebi, Inc.',
      path: '/studiodoggebi',
      domain: 'LegendarySisters.com'
    },
    legendarysisters: {
      id: 'legendarysisters',
      label: 'Sisters',
      masthead: 'Legendary Sisters',
      path: '/legendarysisters',
      domain: 'StudioDoggebi.com'
    }
  }
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    { provide: DOMAIN_CONFIG, useValue: domainConfig }
  ]
};
