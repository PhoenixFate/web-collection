import { LoadingPage } from './../loading/loading';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertPage } from '../alert/alert';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goAlert(){
    this.navCtrl.push(AlertPage);
  }

  goLoading(){
    this.navCtrl.push(LoadingPage);
  }

}
