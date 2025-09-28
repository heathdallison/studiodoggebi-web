import { Component } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'sd-masthead',
  standalone: true,
  template: `<header class="sd-masthead">{{ layout.masthead() }}</header>`,
  styles: []
})
export class MastheadComponent {
  constructor(public layout: LayoutService) {}
}
