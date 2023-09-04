import { ShopPage } from './../shop/shop';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  public list:any=[];
  constructor(public navCtrl: NavController) {
    for(let i=0;i<10;i++){
      this.list.push(`这是第${i}条数据`);
    }
  }

  goShop(index){
    console.log(index);
    this.navCtrl.push(ShopPage,{
      index:index
    });
  }

}
