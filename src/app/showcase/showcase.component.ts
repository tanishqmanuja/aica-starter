import { Component } from '@angular/core';
import LayoutComponent from '../shared/ui/layout/layout.component';

@Component({
  selector: 'app-showcase',
  standalone: true,
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.scss'],
  imports: [LayoutComponent],
})
export default class ShowcaseComponent {
  constructor() {}
}
