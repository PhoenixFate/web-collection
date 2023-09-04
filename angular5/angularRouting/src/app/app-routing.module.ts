//新建项目时 ng new projectName --routing
//路由配置文件
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//引入组件
import {HomeComponent} from './components/home/home.component';
import {NewsComponent} from './components/news/news.component';
import {UserComponent} from './components/user/user.component';


//配置路由
const routes: Routes = [
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'news',
    component:NewsComponent
  },
  {
    path:'user',
    component:UserComponent
  },
  //默认跳转的路由
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },

  //匹配不到路由的时候加载的组件
  {
    path:'**',//任意的路由
    // component:NewsComponent
    redirectTo:'home',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
