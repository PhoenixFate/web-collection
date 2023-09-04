import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public msg="这是新闻组件的msg";
  public name="张三";

  public list;

  constructor() { }

  ngOnInit() {
  }



}
