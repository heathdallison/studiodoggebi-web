import { Component } from '@angular/core';
import { DomainConfigService, SiteConfig } from '@services/domain-config.service';

@Component({
  selector: 'sd-masthead',
  standalone: true,
  templateUrl: './masthead.component.html'
})
export class MastheadComponent {
  siteConfig: SiteConfig;

  constructor(private domainService: DomainConfigService) {
    this.siteConfig = this.domainService.getConfig();
  }
}
