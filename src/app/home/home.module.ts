import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";

import { HomePage } from "./home.page";
import { SettingsPopoverComponent } from "./settings-popover/settings-popover.component";
import { UsersPage } from './users/users.page';
import { StoreModule } from "@ngrx/store";
import { usersReducer } from './users/reducer/users.reducer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    StoreModule.forFeature('userList', usersReducer),
    RouterModule.forChild([
      {
        path: "",
        component: HomePage,
        
      },
      {
        path: "users",
        component: UsersPage
      }
    ])
  ],
  declarations: [HomePage, UsersPage]
})
export class HomePageModule {}
