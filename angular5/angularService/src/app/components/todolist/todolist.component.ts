import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';//引入自定义服务

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  //使用storageservice服务
  //private storage=new StorageService();//可以这样引入和使用服务，但官方不推荐这样的方法

  public username: any;
  public list = [];

  //官方推荐的引用和使用服务的方式：依赖注入服务
  constructor(private storage: StorageService) {
    console.log("consturctor");
    this.username = '';
    console.log(this.storage);
    this.storage.setItem('userInfo', 'zhangsan');
    // alert(storage.getItem('userInfo'));
  }

  ngOnInit() {
    console.log("ngOnInit");
    //每次刷新，获取storage的值
    var todolist=this.storage.getItem("todolist");
    if(todolist){
      this.list=todolist;
    }
  }

  addData(e) {
    //1.从storage获取todolist数据
    //2.如果有数据，拿到这个数据然后把这个数据和新数据拼接，重新写入
    //3.如果没有数据，直接给storage写入数据

    // alert(this.username);//双向数据绑定，获取文本框的值

    if (e.keyCode == 13) {
      var obj = {
        "username": this.username,
        "status": 0
      }
      var todolist = this.storage.getItem("todolist");
      //如果有数据，拿到这个数据，然后把新数据和这个storage数据拼接，并重新写入。
      if (todolist) {
        todolist.push(obj);
        this.storage.setItem("todolist",todolist);
      }else{
        //如果没有数据，直接给storage写入数据
        var arr=[];
        arr.push(obj);
        this.storage.setItem("todolist",arr);
      }
      this.list.push(obj);
      this.username = '';
    }
    // console.log(e);

  }

  deleteData(key) {
    // alert(key);
    this.list.splice(key, 1);
    this.storage.setItem("todolist",this.list);
  }

  changeData(key,status) {
    this.list[key].status = status;
    this.storage.setItem("todolist",this.list);
  }

}
