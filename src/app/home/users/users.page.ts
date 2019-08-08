import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from "@angular/core";
import { MatPaginator, MatTableDataSource, MatSort } from "@angular/material";
import { Subscription } from "rxjs";

import { UserService } from "./user.service";
import * as fromUsers from "./reducer/users.reducer";
import { Store } from "@ngrx/store";
import { User } from "../../auth/model/user.model";

@Component({
  selector: "app-users",
  templateUrl: "./users.page.html",
  styleUrls: ["./users.page.scss"]
})
export class UsersPage implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    "email",
    "displayName",
    "role",
    "city",
    "state"
  ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  usersSubscription: Subscription;

  constructor(
    private userService: UserService,
    private store: Store<fromUsers.State>
  ) {}

  ngOnInit() {
    this.userService.fetchUserList(0, 0);
    this.usersSubscription = this.store
      .select(fromUsers.getUsersList)
      .subscribe((users: User[]) => {
        this.dataSource.data =  users;
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }
}
