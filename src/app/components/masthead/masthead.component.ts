import { Component } from '@angular/core';
import { DomainConfigService, SiteConfig } from '@services/domain-config.service';

@Component({
  selector: 'sd-masthead',
  standalone: true,
  templateUrl: './masthead.component.html',
  styles: [`
    .sd-masthead {
      text-align: center;
      padding: 20px 0;
      font-size: 2rem;
      font-weight: bold;
    }
  `]
})
export class MastheadComponent {
  siteConfig: SiteConfig;

  constructor(private domainService: DomainConfigService) {
    this.siteConfig = this.domainService.getConfig();
  }
}
