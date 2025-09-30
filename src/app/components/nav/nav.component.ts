import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { LayoutService } from '../../services/layout.service';
import { DomainConfigService, SiteConfig } from '@services/domain-config.service';


@Component({
  selector: 'sd-nav',
  standalone: true,
  imports: [],
  template: `
<nav class="sd-nav">
  <!-- Active domain button (not a link) -->
  <span class="nav-button active">{{ siteConfig.currentLabel }}</span>

  <!-- Link to other domain -->
  <a class="nav-button" [href]="siteConfig.otherHref">{{ siteConfig.otherLabel }}</a>
</nav>
`,
styles: [`
  .sd-nav {
    display: flex;
    gap: 16px;
    justify-content: center;
    padding: 10px 0 12px;
    border-bottom: 1px solid rgba(0,0,0,.2);
  }
  .nav-button {
    padding: 6px 10px;
    border-radius: 6px;
    text-decoration: none;
    color: #222;
  }
  .nav-button.active {
    background: #000;
    color: #fff;
    pointer-events: none;
  }
`]

})
export class NavComponent {
  siteConfig: SiteConfig;

  constructor(
    public layout: LayoutService,
    private domainService: DomainConfigService
  ) {
    this.siteConfig = this.domainService.getConfig();
  }
}
