import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EnvironmentInjector,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
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
    public environmentInjector: EnvironmentInjector,
    private router: Router
  ) {}

  ngAfterViewInit() {
    const defaultTab = this.tabs.find((it) => it.default === true);
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.ionTabs.outlet.canGoBack()) {
        if (
          defaultTab?.routerPath &&
          this.ionTabs.getSelected() !== defaultTab.routerPath
        ) {
          const urlTree = this.router.parseUrl(this.router.url);
          if (urlTree.root.children['primary'].segments.length > 1) return;

          const firstPath = urlTree.root.children['primary'].segments[0].path;
          if (this.tabs.findIndex((it) => it.routerPath === firstPath) > -1)
            this.ionTabs.select(defaultTab.routerPath);
        } else {
          App.exitApp();
        }
      }
    });
  }
}
