import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public msg="home组件";
  public list;
  constructor() { }

  ngOnInit() {
  }

  run(){
    console.log("home run function");
  }

  getDataFromChild(childData){ 
    alert(childData);
  }

  runParent(event){
    console.log("run parent");
    console.log(event);
    this.list=event;
  }
}
