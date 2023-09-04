import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  constructor(public navCtrl: NavController) {

  }

  public toggled: boolean = false;
  public emojitext: string;
  //切换当前选中的emoje表情
  public handleSelection(event) {
     　　this.emojitext = this.emojitext + " " + event.char;
  }

}
