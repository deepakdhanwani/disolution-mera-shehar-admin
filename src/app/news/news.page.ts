import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';

import * as fromRoot from '../reducers';
import * as AuthActions from '../auth/reducers/auth.actions';
import { Store } from '@ngrx/store';
import { User } from '../auth/model/user.model';

@Component({
  selector: "app-news",
  templateUrl: "./news.page.html",
  styleUrls: ["./news.page.scss"]
})
export class NewsPage implements OnInit {

  loggedInUser: Observable<User>;
  selectedDate: Date;

  constructor(private router: Router, private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.loggedInUser = this.store.select(fromRoot.getCurrentUser);
    this.selectedDate = new Date();
  }

  onPostNews() {
    this.router.navigateByUrl("/news/new");
  }
}
