import { Injectable } from "@angular/core";
import {
  AngularFireStorage,
  AngularFireUploadTask
} from "@angular/fire/storage";
import { AngularFirestore } from "@angular/fire/firestore";

import { User } from "../auth/model/user.model";
import { AuthService } from "../auth/auth.service";
import * as fromRoot from "../reducers";
import { Store } from "@ngrx/store";
import { NewsStatus } from "./model/news.model";
import { DBObject } from "../shared/db-obects.model";
import { UIService } from "../shared/ui.service";
import * as UIActions from "../shared/ui.actions";
import { Router } from "@angular/router";
import { take, tap, finalize } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class NewsService {
  constructor(
    private firestoreStorage: AngularFireStorage,
    private firestoreDb: AngularFirestore,
    private router: Router,
    private store: Store<fromRoot.State>,
    private uiService: UIService
  ) {}

  saveNews(
    headliine: string,
    content: string,
    category: string,
    region: string,
    source: string,
    videoUrl: string,
    newsStatus: string,
    selectedImages: FileList
  ) {
    this.store
      .select(fromRoot.getCurrentUser)
      .pipe(take(1))
      .subscribe(user => {
        this.store.dispatch(new UIActions.StartLoading());
        this.uiService.showLoadingController("Saving news");
        this.firestoreDb
          .collection(DBObject.News)
          .add({
            headline: headliine,
            content: content,
            newsPostedByEmail: user.email,
            newsPostedByName: user.displayName,
            newsPostedOn:
              newsStatus === NewsStatus.Published ? new Date() : null,
            newsCreatedOn: new Date(),
            newsStatus: newsStatus,
            newsCategory: category,
            newsSource: source,
            newsRegion: region,
            imagePath: null,
            videoUrl: videoUrl,
            isDeleted: false,
            comments: null,
            commentsCount: 0,
            likes: null,
            likesCounts: 0,
            shared: null,
            shareCount: 0
          })
          .then(document => {
            this.uploadImagesAndUpdateNews(document.id, selectedImages);
            this.router.navigateByUrl("/news");
          });
      });
  }

  uploadImagesAndUpdateNews(newsId: string, selectedImages: FileList) {
    if (selectedImages && selectedImages.length > 0) {
      const imageUrls = [];
      for (let i = 0; i < selectedImages.length; i++) {
        const path = `news/${new Date().getTime()}_${selectedImages[i].name}`;
        const ref = this.firestoreStorage.ref(path);
        const task: AngularFireUploadTask = this.firestoreStorage.upload(
          path,
          selectedImages[i]
        );
        task.then(url => {
          url.ref.getDownloadURL().then(downloadUrl => {
            imageUrls.push(downloadUrl);
            this.firestoreDb.doc(DBObject.News + "/" + newsId).update({
              imagePath: imageUrls
            });
          });
        });
      }
    }
    this.store.dispatch(new UIActions.StopLoading());
  }
}
