import { Component } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'sd-body',
  standalone: true,
  template: `
    <p class="sd-note">
      You can also get to this page via {{ layout.altDomain() }}
    </p>
  `,
  styles: [`.sd-note{ text-align:center; margin-top:16px; font-size:18px; }`]
})
export class BodyComponent {
  constructor(public layout: LayoutService) {}
}
