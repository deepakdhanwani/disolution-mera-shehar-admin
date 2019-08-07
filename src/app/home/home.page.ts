import { Component } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { PopoverController } from "@ionic/angular";
import { SettingsPopoverComponent } from "./settings-popover/settings-popover.component";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  constructor(
    private authService: AuthService,
    private popoverControl: PopoverController
  ) {}

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
