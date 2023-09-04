import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


//引入新增的页面
import { IonbuttonPage } from '../ionbutton/ionbutton';
import { IoncolorPage } from '../ioncolor/ioncolor';
import { IoniconPage } from '../ionicon/ionicon';
import { IoninputPage } from '../ioninput/ioninput';
import { IonlistPage } from '../ionlist/ionlist';
import { GridPage } from '../grid/grid';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goColor(){
    this.navCtrl.push(IoncolorPage);
  }

  goButton(){
    this.navCtrl.push(IonbuttonPage);
  }

  goIcon(){
    this.navCtrl.push(IoniconPage);
  }

  goList(){
    this.navCtrl.push(IonlistPage);
  }

  goInput(){
    this.navCtrl.push(IoninputPage);
  }

  goGrid(){
    this.navCtrl.push(GridPage);
  }

}
