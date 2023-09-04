import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RefresherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-refresher',
  templateUrl: 'refresher.html',
})
export class RefresherPage {
  public list=[];
  j=0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    for(let i=0;i<5;i++){
      this.list.unshift(`这是第${this.j}条数据`);
      this.j++;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RefresherPage');
  }

  doRefresh(refresher){
    setTimeout(
      () => { 
        for(let i=0;i<5;i++){
          this.list.unshift(`这是第${this.j}条数据`);
          this.j++;
        }
        refresher.complete(); //当数据请求完成调用 
      }, 2000);
    }

}
