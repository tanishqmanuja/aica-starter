import { Component } from '@angular/core';
import LayoutComponent from '../shared/ui/layout/layout.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  imports: [LayoutComponent],
})
export default class SettingsComponent {
  constructor() {}
}
