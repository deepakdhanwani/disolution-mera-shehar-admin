import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material';

import { IonicModule } from '@ionic/angular';

import { NewsPage } from './news.page';
import { NewNewsComponent } from './new-news/new-news.component';
import { TruncatePipe } from '../shared/truncate-pipe.pipe';

const routes: Routes = [
  {
    path: '',
    component: NewsPage
  },
  {
    path: 'new',
    component: NewNewsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewsPage, NewNewsComponent, TruncatePipe]
})
export class NewsPageModule {}
