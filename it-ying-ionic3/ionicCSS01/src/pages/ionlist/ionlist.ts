import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the IonlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ionlist',
  templateUrl: 'ionlist.html',
})
export class IonlistPage {
  public list:any=[];
  public list1=[
    {
      cate:'国内',
      list:[
        {"title":"国内新闻111"},
        {"title":"国内新闻222"},
        {"title":"国内新闻333"},
        {"title":"国内新闻444"}
      ]
    },
    {
      cate:'国外',
      list:[
        {"title":"国外新闻111"},
        {"title":"国外新闻222"},
        {"title":"国外新闻333"},
        {"title":"国外新闻444"}
      ]
    }
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IonlistPage');
    for(var i=0;i<10;i++){
      this.list.push(`这是第${i}条数据`);
    }
  }

}
