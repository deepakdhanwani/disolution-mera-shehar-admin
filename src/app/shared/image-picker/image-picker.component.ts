import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  Capacitor,
  Plugins,
  CameraSource,
  CameraResultType
} from "@capacitor/core";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-image-picker",
  templateUrl: "./image-picker.component.html",
  styleUrls: ["./image-picker.component.scss"]
})
export class ImagePickerComponent implements OnInit {
  @ViewChild("filePicker", { static: false }) filePicker: ElementRef<
    HTMLInputElement
  >;
  selectedImages: string[];
  usePicker = false;
  constructor(private platform: Platform) {}

  ngOnInit() {
    if (
      (this.platform.is("mobile") && !this.platform.is("hybrid")) ||
      this.platform.is("desktop")
    ) {
      this.usePicker = true;
    }
    console.log(this.usePicker);
  }

  onFileChosen(event: Event) {
    const pickedFile = (event.target as HTMLInputElement).files;
    if (!pickedFile || pickedFile.length <= 0) {
      return;
    }

    console.log(pickedFile.length);
    for (let i = 0; i < pickedFile.length; i++) {
      if (!this.selectedImages) {
        this.selectedImages = [];
      }
      const fr = new FileReader();
      fr.onload = () => {
        const dataUrl = fr.result.toString();
        this.selectedImages.push(dataUrl);
      };
      fr.readAsDataURL(pickedFile[i]);
    }
    console.log(this.selectedImages);
  }

  onPickImage() {
    if (this.usePicker) {
      this.filePicker.nativeElement.click();
    } else {
      if (!Capacitor.isPluginAvailable("Camera")) {
        this.filePicker.nativeElement.click();
        return;
      }
      Plugins.Camera.getPhoto({
        quality: 50,
        source: CameraSource.Prompt,
        correctOrientation: true,
        width: 600,
        resultType: CameraResultType.DataUrl
      })
        .then(image => {
          //this.selectedImage = image.dataUrl;
          //console.log(this.selectedImage);
        })
        .catch(err => {
          console.log(err);
          if (this.usePicker) {
            this.filePicker.nativeElement.click();
          }
          return;
        });
    }
  }
}
