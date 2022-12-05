import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EnvironmentInjector,
  ViewChild,
} from '@angular/core';
import { App } from '@capacitor/app';
import { IonicModule, IonTabs, Platform } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  standalone: true,
  templateUrl: 'tabs.component.html',
  styleUrls: ['tabs.component.scss'],
  imports: [CommonModule, IonicModule],
})
export default class TabsComponent implements AfterViewInit {
  @ViewChild(IonTabs, { static: true }) private ionTabs!: IonTabs;

  tabs = [
    {
      routerPath: 'showcase',
      label: 'Showcase',
      icon: 'prism-outline',
      iconActive: 'prism',
    },
    {
      routerPath: 'home',
      label: 'Home',
      icon: 'home-outline',
      iconActive: 'home',
      default: true,
    },
    {
      routerPath: 'settings',
      label: 'Settings',
      icon: 'settings-outline',
      iconActive: 'settings',
    },
  ];

  constructor(
    private platform: Platform,
    public environmentInjector: EnvironmentInjector
  ) {}

  ngAfterViewInit() {
    const defaultTab = this.tabs.find((it) => it.default === true);
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.ionTabs.outlet.canGoBack()) {
        if (
          defaultTab?.routerPath &&
          this.ionTabs.getSelected() !== defaultTab.routerPath
        ) {
          this.ionTabs.select(defaultTab.routerPath);
        } else {
          App.exitApp();
        }
      }
    });
  }
}
