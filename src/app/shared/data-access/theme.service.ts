import { SafeAreaController } from '@aashu-dubey/capacitor-statusbar-safe-area';
import { Injectable } from '@angular/core';
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

    if (Capacitor.getPlatform() === 'android') {
      StatusBar.setOverlaysWebView({ overlay: true });
    }
  }
}
