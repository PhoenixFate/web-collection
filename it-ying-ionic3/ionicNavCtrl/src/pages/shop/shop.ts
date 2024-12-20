import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {
  public index;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.index=this.navParams.get("index");
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
  }

}
