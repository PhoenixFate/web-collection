import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SelectRolePage } from '../select-role/select-role';
import $ from 'jquery';
import { EventListener } from '@angular/core/src/debug/debug_node';

/**
 * Generated class for the IndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})


export class IndexPage {
  private userInfo={"avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoL5DuMo0qa0iaZZ8NoVSuML5DogibWOiaNvYfzygy4ZqedbNjCG6QJNNz3qGZyHXkxOY84wWibzBbumQ/132","city":"常州","country":"中国","gender":1,"language":"en","nickname":"Dacaman","province":"江苏"};
  public EventListener=EventListener;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }
  
 

  ionViewDidLoad() {
    var that=this;
    console.log('ionViewDidLoad IndexPage');
    $("#btn1").click(function(){
      console.log("------------------");
      that.navCtrl.push(SelectRolePage);
    })

    
  }

  personal(){
    
    this.navCtrl.push(SelectRolePage);
  }

 

}


