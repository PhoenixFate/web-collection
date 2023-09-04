import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  public aid;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.aid=this.navParams.get("aid");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }

}
