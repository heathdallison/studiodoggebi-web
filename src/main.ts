import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { domainConfig } from './app/config/domain';
import { AppComponent } from 'app/app';
import { DOMAIN_CONFIG } from './app/config/domain-config.token';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    {
      provide: DOMAIN_CONFIG,
      useValue: domainConfig
    }
  ]
});

