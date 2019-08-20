import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { noWhitespaceValidator } from "../../shared/nowhitespace.validator";
import { NewsCategory, NewsRegion, NewsStatus } from "../model/news.model";
import { ModalController } from "@ionic/angular";
import { ImagePickerComponent } from "src/app/shared/image-picker/image-picker.component";
import { NewsService } from "../news.service";

interface NewsCategoryInterface {
  name: string;
  value: string;
}

interface NewsRegionInterface {
  name: string;
  value: string;
}

@Component({
  selector: "app-new-news",
  templateUrl: "./new-news.component.html",
  styleUrls: ["./new-news.component.scss"]
})
export class NewNewsComponent implements OnInit {
  newNewsFormGroup: FormGroup;
  newsCategories: NewsCategoryInterface[] = [];
  newsRegions: NewsRegionInterface[] = [];
  selectedImageCount = 0;
  selectedImages: FileList;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private newsService: NewsService
  ) {
    this.newsCategories.push({
      name: "Environmental",
      value: NewsCategory.Environmental
    });
    this.newsCategories.push({
      name: "Government",
      value: NewsCategory.Government
    });
    this.newsCategories.push({
      name: "Politics",
      value: NewsCategory.Politics
    });
    this.newsCategories.push({
      name: "Religion & Spirituality",
      value: NewsCategory.ReligionAndSpirituality
    });
    this.newsCategories.push({ name: "Sports", value: NewsCategory.Sports });
    this.newsCategories.push({
      name: "Technology",
      value: NewsCategory.Technology
    });
    this.newsCategories.push({ name: "Weather", value: NewsCategory.Weather });
    this.newsCategories.push({ name: "Other", value: NewsCategory.Other });

    this.newsRegions.push({ name: "Local News", value: NewsRegion.LocalNews });
    this.newsRegions.push({
      name: "State Level",
      value: NewsRegion.StateLevel
    });
    this.newsRegions.push({ name: "National", value: NewsRegion.National });
  }

  ngOnInit() {
    this.newNewsFormGroup = this.formBuilder.group({
      headline: new FormControl(null, [
        Validators.required,
        noWhitespaceValidator
      ]),
      content: new FormControl(null, [
        Validators.required,
        noWhitespaceValidator
      ]),
      newsCategory: new FormControl(null, [Validators.required]),
      newsSource: new FormControl(null, [Validators.required]),
      videoUrl: new FormControl(null, [
        Validators.pattern("^(https?://)?(www.youtube.com|youtu.?be)/.+$")
      ]),
      newsRegion: new FormControl(null, [Validators.required])
    });
  }

  onSelectImage() {
    this.modalController
      .create({
        component: ImagePickerComponent,
        backdropDismiss: false
      })
      .then(modalElement => {
        modalElement.present();
        modalElement.onDidDismiss().then((data: any) => {
          if (data) {
            this.selectedImageCount = data.data.selectedImages.length;
            this.selectedImages = data.data.selectedImages;
          }
        });
      });
  }

  onSubmit(status: NewsStatus.Draft | NewsStatus.Published) {
    if (this.newNewsFormGroup.invalid) {
      return;
    }
    this.newsService.saveNews(
      this.newNewsFormGroup.value.headline,
      this.newNewsFormGroup.value.content,
      this.newNewsFormGroup.value.newsCategory,
      this.newNewsFormGroup.value.newsRegion,
      this.newNewsFormGroup.value.newsSource,
      this.newNewsFormGroup.value.videoUrl,
      status,
      this.selectedImages
    );
  }
}
