// 这个根模块会告诉angular如何组装该应用


//引入模块
import { BrowserModule } from '@angular/platform-browser';//browser模块
import{FormsModule}from'@angular/forms';
import { NgModule } from '@angular/core';//angular核心模块

import { AppComponent } from './app.component';//引入自定义组件
import { TodolistComponent } from './components/todolist/todolist.component';
import { StorageService } from './services/storage.service';//引入服务


//@NgModule装饰器将angular标记为Angular模块类（也叫NgModule类）
//@NgModule接收一个元数据对象，告诉angular如何编辑和启动
@NgModule({
  declarations: [//引入当前项目运行的组件  自定义组件都需要引入并在这个里面配置
    AppComponent,TodolistComponent
  ],
  imports: [//当前项目依赖哪些模块
    BrowserModule,FormsModule
  ],
  providers: [StorageService],//定义的服务，放在这个里面
  bootstrap: [AppComponent]//默认启动的组件
})
export class AppModule { }
