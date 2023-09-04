// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http,Jsonp,Headers } from '@angular/http';
import { ConfigProvider } from '../config/config';
/*
  Generated class for the HttpServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpServiceProvider {
  private headers=new Headers({'Content-Type':'application/json'});

  constructor(public jsonp:Jsonp,public http:Http,public configProvider:ConfigProvider) {
    //console.log('Hello HttpServiceProvider Provider');
  }

  requestDataJsonp(url,callback){
    let realUrl;
    if(url.indexOf('?')==-1){
      realUrl=this.configProvider.urlHead+url+"?callback=JSONP_CALLBACK";
    }else {
      realUrl=this.configProvider.urlHead+url+'&callback=JSONP_CALLBACK';
    }
    this.jsonp.get(realUrl).subscribe((success)=>{
      callback(success['_body']);
    },(failure)=>{
      callback(failure);
    })
  }

  requestDataHttp(url,callback){
    let realUrl=this.configProvider.urlHead+url;
    this.jsonp.get(realUrl).subscribe((success)=>{
      callback(success['_body']);
    },(failure)=>{
      callback(failure);
    })
  }

  doPost(url,json,callback){
    let realUrl=this.configProvider.urlHead+url;
    this.http.post(realUrl,JSON.stringify(json),{headers:this.headers}).subscribe((data)=>{
      callback(data.json());
    })
  }
}
