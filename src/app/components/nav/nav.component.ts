import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { LayoutInfoService } from '@services/layout-info.service';

@Component({
  selector: 'sd-nav',
  standalone: true,
  imports: [NgIf],
  templateUrl: './nav.component.html'
})
export class NavComponent {
  siteConfig: {
    masthead: string;
    lsIsActive: boolean;
    sdIsActive: boolean;
  };

  constructor(private layoutInfo: LayoutInfoService) {
    this.siteConfig = {
      masthead: this.layoutInfo.masthead,
      lsIsActive: this.layoutInfo.flags.lsIsActive,
      sdIsActive: this.layoutInfo.flags.sdIsActive
    };
  }
}
