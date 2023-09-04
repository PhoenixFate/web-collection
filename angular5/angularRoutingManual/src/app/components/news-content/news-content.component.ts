import { Component, OnInit } from '@angular/core';

//引入Router,ActivatedRoute,Params
import {Router,ActivatedRoute,Params} from '@angular/router';

@Component({
  selector: 'app-news-content',
  templateUrl: './news-content.component.html',
  styleUrls: ['./news-content.component.css']
})
export class NewsContentComponent implements OnInit {

  constructor(private route:ActivatedRoute) {
    
   }

  ngOnInit() {
    console.log(this.route.params);
    console.log(this.route.params['_value'].id);

    //获取动态路由的传值
    this.route.params.subscribe(function(data){
      console.log(data);
      console.log(data.id);
    })
  }

}
