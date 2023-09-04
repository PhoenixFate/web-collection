import { Device } from '@ionic-native/device';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public cordova;
  public model;
  public platform;
  public uuid;
  public version;
  public manufacturer;
  public isVirtual;
  public serial;
  constructor(public navCtrl: NavController, public device: Device) {
    this.cordova=device.cordova;
    this.model=device.model;
    this.platform=device.platform;
    this.uuid=device.uuid;
    this.version=device.version;
    this.manufacturer=device.manufacturer;
    this.isVirtual=device.isVirtual;
    this.serial=device.serial;
  }

}
