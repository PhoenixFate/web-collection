import { Component, OnInit } from '@angular/core';
import {Http,Jsonp,Headers} from '@angular/http';//引入http，jsonp

//引入rxjs
// import {Observable} from 'rxjs';
// import 'rxjs/Rx';
// import { map } from"rxjs/operators";

// import 'rxjs/add/operator/map';
// import 'rxjs/Rx'
// // import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/operator/map';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  private headers=new Headers({'Content-Type':'application/json;charset=utf-8'});
  public list:any=[];
  constructor(private http:Http,private jsonp:Jsonp) {

   }

  ngOnInit() {

  }

  requestData(){
    var that=this;
    console.log("begin requesting data");
    var url="http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1";
    console.log(url);
    this.http.get(url).subscribe(function(data){
        console.log(data);
        console.log("success");
        that.list=JSON.parse(data["_body"]);
        console.log(that.list);
    },function(err){
        console.log("failure");
        console.log(err);
    });
  }

  requestJsonpData(){
    var that=this;
    console.log("begin jsonp requesting data");
    var url="http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1&callback=JSONP_CALLBACK";
    console.log(url);
    this.jsonp.get(url).subscribe(function(data){
        console.log("success");
        console.log(data);
        that.list=data["_body"];
    },function(err){
        console.log("failure");
        console.log(err);
    })
  }

  postData(){
    //headers定义请求头
    //1.引入headers，import {Http,Jsonp,Headers} from '@angular/http';//引入http，jsonp
    //2.实例化headers     private headers=new Headers({'Content-Type':'application/json'});

    //3.post提交数据
    var url="http://127.0.0.1:3000/dologin";
    this.http.post(url,
      JSON.stringify({username:"张三"}),
      {headers:this.headers}).subscribe(function(data){
        console.log("success");
        console.log(data);
      },function(err){
        console.log("failure");
        console.log(err);
      })
  }

  requestDataRxjs(){
    var that=this;
    console.log("begin requesting data using rxjs");
    var url="http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1";
    this.http.get(url).pipe(
      map(res=> res.json())
    ).subscribe(function(data){
        console.log("success");
        console.log(data);
        that.list=data;
    },function(err){
        console.log("failure");
        console.log(err);
    });

  }

  requestJsonpDataRxjs(){
    var that=this;
    console.log("begin jsonp requesting data");
    var url="http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1&callback=JSONP_CALLBACK";
    console.log(url);
    this.jsonp.get(url).pipe(
      map(res=>res.json())
    ).subscribe(function(data){
        console.log("success");
        console.log(data);
        that.list=data;
    },function(err){
        console.log("failure");
        console.log(err);
    })
  }


}
