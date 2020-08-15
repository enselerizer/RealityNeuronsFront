import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PageStartComponent } from './page-start/page-start.component';
import { PageStartTimelineComponent } from './page-start-timeline/page-start-timeline.component';
import { PageNameClassComponent } from './page-name-class/page-name-class.component';
import { PageNameClassTimelineComponent } from './page-name-class-timeline/page-name-class-timeline.component';
import { PageImagesComponent } from './page-images/page-images.component';
import { StepsTimelineComponent } from './steps-timeline/steps-timeline.component';
import { PageImagesItemComponent } from './page-images-item/page-images-item.component';
import { PageTrainingComponent } from './page-training/page-training.component';


const appRoutes: Routes =[
  { path: '', component: PageStartComponent},
  { path: 'name-class', component: PageNameClassComponent},
  { path: 'images', component: PageImagesComponent},
  { path: 'training', component: PageTrainingComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    PageStartComponent,
    PageStartTimelineComponent,
    PageNameClassComponent,
    PageNameClassTimelineComponent,
    PageImagesComponent,
    StepsTimelineComponent,
    PageImagesItemComponent,
    PageTrainingComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
