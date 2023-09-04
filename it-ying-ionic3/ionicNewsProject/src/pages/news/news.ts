import { NewsDetailsPage } from './../news-details/news-details';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Jsonp} from '@angular/http';

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
  public newsDetailsPage=NewsDetailsPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public jsonp:Jsonp) {
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
    let that=this;
    let url='http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1';
    this.http.get(url).subscribe(data=>{
      console.log(data);
      console.log(data['_body']);
      that.list=JSON.parse(data['_body']).result;
      console.log(that.list); 
    },err=>{
      console.log(err);
    })
  }

}
