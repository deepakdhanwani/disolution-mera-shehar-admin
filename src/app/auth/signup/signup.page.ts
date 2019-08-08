import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

import * as fromRoot from '../../reducers';
import { Store } from '@ngrx/store';
import { MenuController } from '@ionic/angular';

@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"]
})
export class SignupPage implements OnInit {
  @ViewChild("registrationForm", { static: false }) registrationForm: NgForm;
  isLoading: Observable<boolean>;

  customAlertOptionsState: any = {
    header: "States"
  };

  customAlertOptionsDistrict: any = {
    header: "Cities"
  };

  stateList: string[] = [];
  cityList: string[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private store: Store<fromRoot.State>,
    private menuController: MenuController
  ) {}

  ngOnInit() {
    this.isLoading = this.store.select(fromRoot.getLoadingStatus);
    this.http
      .get<any>("./assets/states-and-districts.json")
      .subscribe(result => {
        for (const state of result.states) {
          this.stateList.push(state.state);
        }
      });
  }

  ionViewWillEnter() {
    this.menuController.enable(false);
  }

  ionViewWillLeave() {
    this.menuController.enable(true);
  }

  onLogin() {
    this.router.navigateByUrl("/login");
  }

  onRegister() {
    if (this.registrationForm.invalid) {
      return;
    }

    this.authService.signup(
      this.registrationForm.value.email,
      this.registrationForm.value.password,
      this.registrationForm.value.fullName,
      this.registrationForm.value.selectedState,
      this.registrationForm.value.selectedCity
    );
  }

  onSelectState(selectedState: string) {
    this.http
      .get<any>("./assets/states-and-districts.json")
      .subscribe(result => {
        for (const state of result.states) {
          if (selectedState === state.state) {
            this.cityList = state.districts;
            break;
          }
        }
      });
  }
}
