import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

//引入新增的页面
import { IonbuttonPage } from '../pages/ionbutton/ionbutton';
import { IoncolorPage } from '../pages/ioncolor/ioncolor';
import { IoniconPage } from '../pages/ionicon/ionicon';
import { IoninputPage } from '../pages/ioninput/ioninput';
import { IonlistPage } from '../pages/ionlist/ionlist';
import { GridPage } from '../pages/grid/grid';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    IonbuttonPage,
    IoncolorPage,
    IoniconPage,
    IoninputPage,
    IonlistPage,
    GridPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    IonbuttonPage,
    IoncolorPage,
    IoniconPage,
    IoninputPage,
    IonlistPage,
    GridPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
