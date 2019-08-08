import { Component, OnInit } from '@angular/core';

import { Platform, PopoverController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth/auth.service';
import * as fromRoot from './reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SettingsPopoverComponent } from './home/settings-popover/settings-popover.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{

  isAuthenticated: Observable<boolean>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private store: Store<fromRoot.State>,
    private popoverControl: PopoverController
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.authService.initAuthListener();
    this.isAuthenticated = this.store.select(fromRoot.getAuthenticationStatus);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  onLogout() {
    this.authService.logout();
  }

  onSettingButton(event: any) {
    this.popoverControl
      .create({
        component: SettingsPopoverComponent,
        event: event
      })
      .then(popoverElement => {
        popoverElement.present();
        popoverElement.onDidDismiss().then(result => {
          if (result && result.data) {
            this.selectedPopoverOption(result.data.selectedEvent);
          }
        });
      });
  }

  selectedPopoverOption(selectedOption: string) {
    switch (selectedOption) {
      case "management":
        break;
      case "profile":
        break;
      case "logout":
        this.onLogout();
        break;
    }
  }
}
