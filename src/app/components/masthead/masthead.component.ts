import { Component } from '@angular/core';
import { LayoutInfoService } from '@services/layout-info.service';

@Component({
  selector: 'sd-masthead',
  standalone: true,
  templateUrl: './masthead.component.html'
})
export class MastheadComponent {
  masthead: string;

  constructor(private layoutInfo: LayoutInfoService) {
    this.masthead = layoutInfo.masthead;
  }
}
