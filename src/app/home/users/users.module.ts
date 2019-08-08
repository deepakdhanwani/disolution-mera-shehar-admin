import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";

import { UsersPage } from "./users.page";

const routes: Routes = [
  {
    path: "",
    component: UsersPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UsersPage]
})
export class UsersPageModule {}
