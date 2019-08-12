import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewsPage } from './news.page';
import { NewNewsComponent } from './new-news/new-news.component';

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
    RouterModule.forChild(routes)
  ],
  declarations: [NewsPage, NewNewsComponent]
})
export class NewsPageModule {}
