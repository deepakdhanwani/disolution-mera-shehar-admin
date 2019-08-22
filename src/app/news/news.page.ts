import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';

import * as fromRoot from '../reducers';
import * as AuthActions from '../auth/reducers/auth.actions';
import { Store } from '@ngrx/store';
import { User } from '../auth/model/user.model';
import { IonSlide, IonSlides } from '@ionic/angular';

@Component({
  selector: "app-news",
  templateUrl: "./news.page.html",
  styleUrls: ["./news.page.scss"]
})
export class NewsPage implements OnInit {

  loggedInUser: Observable<User>;
  selectedDate: Date;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  imageSource = 'https://firebasestorage.googleapis.com/v0/b/disolution-mera-shehar-app.appspot.com/o/news%2F1566282234799_download_5%20-%20Copy%20(2).jpg?alt=media&token=c77f0fdb-7f65-4bfb-b94a-08ecfbd1062e';
  newsTitle = 'Founded in 1829 on an isthmus between Lake Monona and Lake Mendota, Madison was named the capital of the Wisconsin Territory in 1836.';

  constructor(private router: Router, private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.loggedInUser = this.store.select(fromRoot.getCurrentUser);
    this.selectedDate = new Date();
  }

  onPostNews() {
    this.router.navigateByUrl("/news/new");
  }

  onDateChange(event: CustomEvent) {
    console.log(event.detail.value);
  }

  slidesDidLoad(slider: IonSlides) {
    slider.startAutoplay();
  }
}
