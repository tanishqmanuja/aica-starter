import { Component } from '@angular/core';
import LayoutComponent from '../shared/ui/layout/layout.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [LayoutComponent],
})
export default class HomeComponent {
  constructor() {}
}
