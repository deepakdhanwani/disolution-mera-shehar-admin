import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { HomePage } from "./home.page";
import { SettingsPopoverComponent } from "./settings-popover/settings-popover.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: "",
        component: HomePage,
        
      },

      {
        path: "users",
        loadChildren: "./users/users.module#UsersPageModule"
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
