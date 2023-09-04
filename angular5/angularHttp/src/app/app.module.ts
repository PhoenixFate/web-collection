import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//引入http,jsonp模块//引入jsonp模块
import {HttpModule,JsonpModule} from '@angular/http';


import { AppComponent } from './app.component';
import { NewsComponent } from './components/news/news.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,HttpModule,JsonpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
