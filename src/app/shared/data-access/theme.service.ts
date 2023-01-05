import { SafeAreaController } from '@aashu-dubey/capacitor-statusbar-safe-area';
import { Injectable } from '@angular/core';
import { DarkMode } from '@aparajita/capacitor-dark-mode';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { MonetController } from '@tanishqmanuja/capacitor-plugin-monet';
import { injectIonicColor } from '@tanishqmanuja/ionic-color-injector';
import { take, tap } from 'rxjs';
import { isDarkMode } from '../util/prefers-color-scheme';
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {}

  async onAppInit() {
    SafeAreaController.injectCSSVariables();
    const cs = await MonetController.autoInjectStyle();

    injectIonicColor('primary', cs.accent1[600], cs.accent1[500]);
    injectIonicColor('secondary', cs.accent2[600], cs.accent2[500]);
    injectIonicColor('tertiary', cs.accent3[600], cs.accent3[500]);

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
