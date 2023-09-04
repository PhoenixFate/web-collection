import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Jsonp} from '@angular/http';
/**
 * Generated class for the NewsDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news-details',
  templateUrl: 'news-details.html',
})
export class NewsDetailsPage {
  public index;
  public aid;
  public list:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public jsonp:Jsonp) {
    this.index=navParams.get('index');
    this.aid=navParams.get('aid');
    this.requestContent(this.aid);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsDetailsPage');
  }

  requestContent(aid) {
    let url=`http://www.phonegap100.com/appapi.php?a=getPortalArticle&aid=${aid}&callback=JSONP_CALLBACK`;
    this.jsonp.get(url).subscribe(data=>{
      this.list=data['_body'].result[0];
      console.log('-------------------list-----------------');
      console.log(this.list);
    },err=>{

    })
  }

}
