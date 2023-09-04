import { RefresherPage } from './../refresher/refresher';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }


  toRefresher(){
    this.navCtrl.push(RefresherPage);
  }
}
