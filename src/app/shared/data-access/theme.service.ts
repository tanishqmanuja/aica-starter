import { SafeAreaController } from '@aashu-dubey/capacitor-statusbar-safe-area';
import { Injectable } from '@angular/core';
import { DarkMode } from '@aparajita/capacitor-dark-mode';
import { Capacitor } from '@capacitor/core';
import { StatusBar } from '@capacitor/status-bar';
import { MonetController } from '@tanishqmanuja/capacitor-plugin-monet';
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {}

  init() {
    SafeAreaController.injectCSSVariables();
    MonetController.autoInjectStyle();

    DarkMode.configure({
      syncStatusBar: true,
    });

    if (Capacitor.getPlatform() === 'android') {
      StatusBar.setOverlaysWebView({ overlay: true });
    }
  }
}
