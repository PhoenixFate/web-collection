import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Jsonp } from '@angular/http'
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
  public list=[];
  public page=1;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http) {
    this.requestData('');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }

  requestData(infiniteScroll){
    let that=this;
    let url='http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page='+that.page;
    this.http.get(url).subscribe(data=>{
      that.list=that.list.concat(JSON.parse(data['_body']).result);
      that.page++;
      if(infiniteScroll){
        infiniteScroll.complete();
      }
      if(JSON.parse(data['_body']).result.length<20){
        infiniteScroll.enable(false);
      }
    },err=>{
      console.log(err);
    })
  }

  doInfinite(infiniteScroll){
    this.requestData(infiniteScroll);
  }
}
