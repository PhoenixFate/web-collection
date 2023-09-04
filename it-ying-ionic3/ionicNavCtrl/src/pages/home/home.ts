
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewsPage } from './../news/news';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public pushPage=NewsPage;
  public params={aid:'23234'};
  constructor(public navCtrl: NavController) {

  }

}
