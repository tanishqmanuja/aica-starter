import {
  APP_INITIALIZER,
  Component,
  EnvironmentInjector,
  importProvidersFrom,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import appRoutes from './app.routes';
import { ThemeService } from './shared/data-access/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <ion-app>
      <ion-router-outlet
        [environmentInjector]="environmentInjector"
      ></ion-router-outlet>
    </ion-app>
  `,
  imports: [IonicModule],
})
export default class AppComponent {
  constructor(public environmentInjector: EnvironmentInjector) {}

  static providers = [
    provideRouter(appRoutes),
    importProvidersFrom(IonicModule.forRoot()),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: APP_INITIALIZER,
      useFactory: (themeService: ThemeService) => async () =>
        await themeService.onAppInit(),
      deps: [ThemeService],
      multi: true,
    },
  ];

  static async bootstrap() {
    try {
      return await bootstrapApplication(this, {
        providers: this.providers,
      });
    } catch (err) {
      return console.log(err);
    }
  }
}
