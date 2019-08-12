import { Injectable } from "@angular/core";
import { ToastController, LoadingController } from "@ionic/angular";
import { Platform } from "@ionic/angular";
import { Store } from "@ngrx/store";

import * as fromRoot from "../reducers";

@Injectable({
  providedIn: "root"
})
export class UIService {
  loadingContollerElement;
  isDesktopOrWeb = false;

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private store: Store<fromRoot.State>,
    private platform: Platform
  ) {
    this.store.select(fromRoot.getLoadingStatus).subscribe(isLoading => {
      if (!isLoading && this.loadingContollerElement) {
        this.loadingContollerElement.dismiss();
      }
    });

    if (
      (this.platform.is("mobile") && !this.platform.is("hybrid")) ||
      this.platform.is("desktop")
    ) {
      this.isDesktopOrWeb = true;
    }
  }

  showToastNotication(message: string, duration: number) {
    this.toastController
      .create({
        message: message,
        duration: duration
      })
      .then(toastElement => {
        toastElement.present();
      });
  }

  showLoadingController(message: string) {
    this.loadingController
      .create({
        message: message
      })
      .then(loadingElement => {
        this.loadingContollerElement = loadingElement;
        loadingElement.present();
      });
  }
}
