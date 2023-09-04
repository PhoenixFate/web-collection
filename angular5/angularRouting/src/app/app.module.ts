import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';//新建项目时加--routing，自动添加路由模块
import { AppComponent} from './app.component';

import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { NewsComponent } from './components/news/news.component';

@NgModule({
  declarations: [
    HomeComponent,
    AppComponent,
    NewsComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule //依赖注入路由模块
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
