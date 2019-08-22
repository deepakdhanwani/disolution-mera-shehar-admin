import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "../app-routing.module";
import { TruncatePipe } from './truncate-pipe.pipe';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, AppRoutingModule],
  exports: [CommonModule, FormsModule, AppRoutingModule]
})
export class SharedModule {}
