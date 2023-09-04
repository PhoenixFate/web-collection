import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public res;
  public light = false;
  public frontCamera = false;
  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner, private qrScanner: QRScanner) {

  }

  doScanner() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.res = JSON.stringify(barcodeData);
    }).catch(err => {
      console.log('Error', err);
    });
  }


  ionViewDidLoad() {
    this.qrScanNerMethod();
  }

  public qrScanNerMethod(callBack?: any): void {

    this.qrScanner.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        // 相机扫描信息承诺
        // 开始扫描
        let scanSub = this.qrScanner.scan().subscribe((text: string) => {
          //alert(text);
          console.log("deatilText", text);
          this.qrScanner.hide();// 隐藏相机
          scanSub.unsubscribe();// 停止扫描事件
          callBack && callBack(1, text);
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

* 切换灯光

*/

  public toggleLight(): void {

    this.light = !this.light;

    if (this.light) {

      this.qrScanner.enableLight();

    } else {

      this.qrScanner.disableLight();

    }

  }

  /**

* 切换相机

*/

  public toggleCamera(): void {

    this.light = true;

    this.frontCamera = !this.frontCamera;

    if (this.frontCamera) {

      this.qrScanner.useFrontCamera();

    } else {

      this.qrScanner.useBackCamera();

    }

  }

  /**
* 销毁事件
*/
  public ionViewDidLeave() {
    console.log("销毁相机");
    this.qrScanner.hide(); // 隐藏相机
    this.qrScanner.destroy();//销毁相机
  }

}
