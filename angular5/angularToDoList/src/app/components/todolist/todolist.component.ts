import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  public username:any;
  public list=[];
  constructor() {
    this.username='';
   }

  ngOnInit() {
  }

  addData(e){
    // alert(this.username);//双向数据绑定，获取文本框的值
    if(e.keyCode==13){
      var obj={
        "username":this.username,
        "status":0
      }
      this.list.push(obj);
      this.username='';
    }
    // console.log(e);

  }

  deleteData(key){
    // alert(key);
    this.list.splice(key,1);
  }

  changeData(key){
    this.list[key].status=1;
  }

}
