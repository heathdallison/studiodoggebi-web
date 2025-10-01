import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app/app';
import { routes } from './app/app.routes';
import { DOMAIN_CONFIG } from '@config/domain-config.token';
import { domainConfig } from '@config/domain-config.';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    { provide: DOMAIN_CONFIG, useValue: domainConfig } // ✅ this is the missing piece
  ]
});


