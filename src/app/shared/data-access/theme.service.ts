import { SafeAreaController } from '@aashu-dubey/capacitor-statusbar-safe-area';
import { Injectable } from '@angular/core';
import { DarkMode } from '@aparajita/capacitor-dark-mode';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { MonetController } from '@tanishqmanuja/capacitor-plugin-monet';
import { take, tap } from 'rxjs';
import { isDarkMode } from '../util/prefers-color-scheme';
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {}

  async onAppInit() {
    SafeAreaController.injectCSSVariables();
    MonetController.autoInjectStyle();

    DarkMode.configure({
      syncStatusBar: true,
    });

    isDarkMode()
      .pipe(
        take(1),
        tap((value) => {
          if (Capacitor.getPlatform() === 'android') {
            StatusBar.setStyle({ style: value ? Style.Dark : Style.Light });
          }
        })
      )
      .subscribe();

    if (Capacitor.getPlatform() === 'android') {
      StatusBar.setOverlaysWebView({ overlay: true });
    }
  }
}
