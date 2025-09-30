import { Component } from '@angular/core';
import { LayoutInfoService } from '../../services/layout-info.service';

@Component({
  selector: 'sd-body',
  standalone: true,
  templateUrl: './body.component.html'
})

export class BodyComponent {
  constructor(public layout: LayoutInfoService) {}
}
