import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthData } from "./model/auth-data.model";
import { AngularFirestore } from "@angular/fire/firestore";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { take, map, tap } from "rxjs/operators";

import { User } from "./model/user.model";
import * as fromRoot from "../reducers/index";
import * as UIActions from "../shared/ui.actions";
import * as AuthActions from "./reducers/auth.actions";
import { UIService } from "../shared/ui.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private fbAuth: AngularFireAuth,
    private fbStore: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromRoot.State>,
    private router: Router,

  ) {}

  initAuthListener() {
    
    this.fbAuth.authState.subscribe(user => {
      if (user) {
        this.router.navigateByUrl("/home");
        this.store.dispatch(new AuthActions.SetAuthenticaated());
      } else {
        this.router.navigateByUrl("/login");
        this.store.dispatch(new AuthActions.SetUnauthenticated());
      }
    });
  }

  signup(
    email: string,
    password: string,
    fullName: string,
    state: string,
    city: string
  ) {
    this.store.dispatch(new UIActions.StartLoading());
    this.uiService.showLoadingController("Signing up");
    this.fbAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        this.createUser(
          result.user.uid,
          result.user.email,
          fullName,
          "admin",
          null,
          state,
          city
        );
      })
      .catch(error => {
        this.store.dispatch(new UIActions.StopLoading());
        this.showErrors(error.code, error.message);
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(new UIActions.StartLoading());
    this.uiService.showLoadingController("Loging in");
    this.fbAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.loadUser(result.user.email);
      })
      .catch(error => {
        this.store.dispatch(new UIActions.StopLoading());
        this.showErrors(error.code, error.message);
      });
  }

  private createUser(
    uid: string,
    email: string,
    displayName: string,
    role: string,
    imageUrl: string,
    state: string,
    city: string
  ) {
    this.fbStore
      .collection("users")
      .add({
        uid: uid,
        email: email,
        displayName: displayName,
        role: "guest",
        imageUrl: null,
        state: state,
        city: city
      })
      .then(result => {
        this.loginUser(new User(uid, email, displayName, "guest", null, state, city));
      })
      .catch(error => {
        this.store.dispatch(new UIActions.StopLoading());
        this.logout();
      });
  }

  private loadUser(email: string) {
    this.fbStore
      .collection<User>("users", ref => {
        return ref.where("email", "==", email);
      })
      .valueChanges()
      .pipe(
        take(1),
        tap(users => {
          if (users && users.length > 0) {
            this.loginUser(users[0]);
          } else {
            this.store.dispatch(new UIActions.StopLoading());
            this.logout();
          }
        })
      )
      .subscribe();
  }

  private loginUser(user: User) {
    this.store.dispatch(new UIActions.StopLoading());
    this.store.dispatch(new AuthActions.SetAuthenticaated());
    this.store.dispatch(new AuthActions.SetCurrentUser(user));
    this.router.navigateByUrl("/home");
  }

  logout() {
    this.fbAuth.auth.signOut().then().catch(error => {
      console.log(error);
    });
    this.store.dispatch(new AuthActions.SetUnauthenticated());
    this.store.dispatch(new AuthActions.SetCurrentUser(null));
    this.router.navigateByUrl("/login");
  }

  showErrors(code: string, message: string) {
    switch (code) {
      case "auth/email-already-in-use":
        this.uiService.showToastNotication(message, 3000);
        break;
      case "auth/user-not-found":
        this.uiService.showToastNotication(message, 3000);
        break;
      case "auth/wrong-password":
        this.uiService.showToastNotication(message, 3000);
        break;
      case "auth/user-disabled":
        this.uiService.showToastNotication(message, 3000);
        break;
      default:
        this.uiService.showToastNotication(
          "Failed to authenticate. Please try again later.",
          3000
        );
        break;
    }
  }
}
