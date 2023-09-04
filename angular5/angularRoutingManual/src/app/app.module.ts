import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
//引入app-routing模块
import {AppRoutingModule} from './app-routing.module';

import { HomeComponent } from './components/home/home.component';
import { NewsComponent } from './components/news/news.component';
import { NewsContentComponent } from './components/news-content/news-content.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewsComponent,
    NewsContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
