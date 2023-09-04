import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Jsonp} from '@angular/http';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  public list=[];

  constructor(public navCtrl: NavController,public http:Http,public jsonp:Jsonp) {
    var url='http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1';
    console.log("news starts");
    this.http.get(url).subscribe(data=>{
      console.log(data);
    },err=>{
      
    })
  }

}
