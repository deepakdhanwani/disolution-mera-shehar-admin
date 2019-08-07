import { Injectable } from "@angular/core";
import { ToastController, LoadingController } from "@ionic/angular";
import * as fromRoot from "../reducers";
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: "root"
})
export class UIService {
  loadingContollerElement;

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private store: Store<fromRoot.State>
  ) {
    this.store.select(fromRoot.getLoadingStatus).subscribe(isLoading => {
      if (!isLoading && this.loadingContollerElement) {
        this.loadingContollerElement.dismiss();
      }
    });
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
