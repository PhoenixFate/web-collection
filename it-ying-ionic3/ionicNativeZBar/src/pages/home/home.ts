import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ZBar, ZBarOptions } from '@ionic-native/zbar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public res;
  constructor(public navCtrl: NavController,private zbar: ZBar) {

  }

  doScanner() {
    let options: ZBarOptions = {
      flash: 'off',
      drawSight: false
    };

    this.zbar.scan(options)
      .then(result => {
        this.res=result;
        console.log(result); // Scanned code
      })
      .catch(error => {
        console.log(error); // Error message
      });
  }
}
