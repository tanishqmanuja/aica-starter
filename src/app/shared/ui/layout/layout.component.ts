import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { IonContent, IonHeader, IonicModule } from '@ionic/angular';

const COLLAPSE_CLASS = 'md3-header-collapsed';

@Component({
  selector: 'app-layout',
  standalone: true,
  template: `
    <ion-header class="ion-no-border" [translucent]="true" #header>
      <ion-toolbar>
        <ion-title> {{ title }} </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <ng-content></ng-content>
    </ion-content>
  `,
  styleUrls: ['./layout.component.scss'],
  imports: [IonicModule],
})
export default class LayoutComponent implements AfterViewInit {
  @Input() title = 'AICA Starter';

  @ViewChild(IonHeader, { static: true, read: ElementRef })
  private ionHeader!: ElementRef;
  @ViewChild(IonContent, { static: true }) private IonContent!: IonContent;

  private isHeaderCollapsed = false;
  private triggerDistance = 40;

  constructor(private elRef: ElementRef) {
    this.elRef.nativeElement.classList.add('ion-page');
  }

  async ngAfterViewInit() {
    this.IonContent.scrollEvents = true;
    this.IonContent.ionScroll.subscribe(
      (scrollEvent: { detail: { scrollTop: number; currentY: number } }) => {
        const delta = scrollEvent.detail.scrollTop;
        if (scrollEvent.detail.currentY === 0 && this.isHeaderCollapsed) {
          this.uncollapseHeader();
        } else if (!this.isHeaderCollapsed && delta > this.triggerDistance) {
          this.collapseHeader();
        } else if (this.isHeaderCollapsed && delta < -this.triggerDistance) {
          this.uncollapseHeader();
        }
      }
    );
  }

  collapseHeader() {
    this.ionHeader.nativeElement.classList.add(COLLAPSE_CLASS);
    this.isHeaderCollapsed = true;
  }
  uncollapseHeader() {
    this.ionHeader.nativeElement.classList.remove(COLLAPSE_CLASS);
    this.isHeaderCollapsed = false;
  }
}
