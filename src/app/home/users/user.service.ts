import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { tap } from "rxjs/operators";
import { User } from '../../auth/model/user.model';

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private fireStore: AngularFirestore) {}

  fetchUserList(pageSize: number, startIndex: number) {
    this.fireStore
      .collection<User>("users")
      .valueChanges()
      .pipe(
        tap(result => {
          console.log(result);
        })
      )
      .subscribe();
  }
}
