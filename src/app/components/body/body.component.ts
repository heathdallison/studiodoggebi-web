import { Component } from '@angular/core';
import { LayoutInfoService } from '../../services/layout-info.service';

@Component({
  selector: 'sd-body',
  standalone: true,
  templateUrl: './body.component.html',
  styles: [`.sd-note{ text-align:center; margin-top:16px; font-size:18px; }`]
})
export class BodyComponent {
  constructor(public layout: LayoutInfoService) {}
}
