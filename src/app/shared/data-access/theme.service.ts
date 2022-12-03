import { SafeAreaController } from '@aashu-dubey/capacitor-statusbar-safe-area';
import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { MonetController } from '@tanishqmanuja/capacitor-plugin-monet';
import { tap } from 'rxjs';
import { isDarkMode } from '../util/prefers-color-scheme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {}

  init() {
    SafeAreaController.injectCSSVariables();
    MonetController.autoInjectStyle();

    isDarkMode()
      .pipe(
        tap((value) => {
          document.body.classList.remove(value ? 'light' : 'dark');
          document.body.classList.add(value ? 'dark' : 'light');

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
