import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { LayoutInfoService } from '../../services/layout-info.service'; // ← use relative path

@Component({
  selector: 'sd-nav',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './nav.component.html'
})
export class NavComponent {
  siteConfig: {
    masthead: string;
    lsIsActive: boolean;
    sdIsActive: boolean;
  };

  nav: { label: string; url: string; disabled: boolean }[];

  constructor(private layoutInfo: LayoutInfoService) {
    this.siteConfig = {
      masthead: this.layoutInfo.masthead,
      lsIsActive: this.layoutInfo.flags.lsIsActive,
      sdIsActive: this.layoutInfo.flags.sdIsActive
    };

    this.nav = this.layoutInfo.nav;
  }
}
