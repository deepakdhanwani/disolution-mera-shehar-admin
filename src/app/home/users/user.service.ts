import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireFunctions } from "@angular/fire/functions";
import { tap } from "rxjs/operators";
import { Store } from "@ngrx/store";

import { User } from "../../auth/model/user.model";
import * as fromUsers from "./reducer/users.reducer";
import * as UsersActions from "./reducer/users.action";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(
    private fireStore: AngularFirestore,
    private fireFunctions: AngularFireFunctions,
    private store: Store<fromUsers.State>
  ) {}

  fetchUserList(pageSize: number, startIndex: number) {
    this.fireStore
      .collection<User>("users", ref => {
        return ref.orderBy("email");
      })
      .valueChanges()
      .pipe(
        tap(result => {
          this.store.dispatch(new UsersActions.SetUserList(result));
        })
      )
      .subscribe();

    //this.fireFunctions.functions.httpsCallable.call();
    // console.log(
    //   this.fireFunctions
    //     .httpsCallable("addMessage")
    //     .call({ name: "Deepak Dhanwani" })
    // );
    const callable = this.fireFunctions.httpsCallable("addMessage");
    callable({name: "test_fun" }).subscribe(
      value => {
        console.log(value);
      },
      error => {
        console.log(error);
      }
    );
  }

  resultOfRequest(data) {
    console.log(data);
  }
}
