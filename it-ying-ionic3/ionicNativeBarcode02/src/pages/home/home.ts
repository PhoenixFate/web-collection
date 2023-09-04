import { ScanPage } from './../scan/scan';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private qrScanner: QRScanner) {

  }

  doIt() {
    // Optionally request the permission early
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted


          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);

            // this.qrScanner.hide(); // hide camera preview
            // scanSub.unsubscribe(); // stop scanning
          });

        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }


  /**

* 【手机扫描方法qrscanner插件】


*/

  public qrScanNerMethod(callBack?: any): void {

    this.qrScanner.prepare()

      .then((status: QRScannerStatus) => {

        if (status.authorized) {

          // 相机扫描信息承诺

          // 开始扫描

          let scanSub = this.qrScanner.scan().subscribe((text: string) => {

            //alert(text);

            console.log("deatilText", text);

            // this.qrScanner.hide();// 隐藏相机

            // scanSub.unsubscribe();// 停止扫描事件

            // callBack && callBack(1, text);

          });

          // 显示相机预览

          this.qrScanner.show();

          callBack && callBack(2);

          // 等待用户扫描某个东西，然后就会调用可观察的回调

        } else if (status.denied) {

          // camera permission was permanently denied

          // you must use QRScanner.openSettings() method to guide the user to the settings page

          // then they can grant the permission from there

          callBack && callBack(3);

        } else {

          // permission was denied, but not permanently. You can ask for permission again at a later time.

        }

      })

      .catch((e: any) => console.log('Error is', e));

  }

  /**
* 销毁事件
*/
  // public ionViewDidLeave() {
  //   console.log("销毁相机");
  //   this.qrScanner.hide(); // 隐藏相机
  //   this.qrScanner.destroy();//销毁相机
  // }



  a(){
    this.navCtrl.push(ScanPage);
  }

}
