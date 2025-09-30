import { Component } from '@angular/core';
import { ArticleGridComponent } from '../article-grid/article-grid.component';

@Component({
  selector: 'sd-body',
  standalone: true,
  imports: [ArticleGridComponent],
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {}
