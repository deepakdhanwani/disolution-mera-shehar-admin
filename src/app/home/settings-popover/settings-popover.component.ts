import { Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";

@Component({
  selector: "app-settings-popover",
  templateUrl: "./settings-popover.component.html",
  styleUrls: ["./settings-popover.component.scss"]
})
export class SettingsPopoverComponent implements OnInit {
  constructor(private popoverController: PopoverController) {}

  ngOnInit() {}

  closePopover(selectedEvent: string) {
    this.popoverController.dismiss({
      selectedEvent: selectedEvent
    });
  }
}
