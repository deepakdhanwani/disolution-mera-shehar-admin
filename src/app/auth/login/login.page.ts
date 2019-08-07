import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Observable } from "rxjs";

import * as fromRoot from "../../reducers";
import * as UIActions from "../../shared/ui.actions";
import { Store } from "@ngrx/store";
import { MenuController } from '@ionic/angular';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  @ViewChild("loginForm", { static: false }) loginForm: NgForm;
  isLoading: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromRoot.State>,
    private menuController: MenuController
  ) {}

  ngOnInit() {
    this.isLoading = this.store.select(fromRoot.getLoadingStatus);
  }

  ionViewWillEnter() {
    this.menuController.enable(false);
  }

  ionViewDidLeave() {
    this.menuController.enable(true);
  }

  onRegister() {
    this.router.navigateByUrl("/signup");
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }
}
