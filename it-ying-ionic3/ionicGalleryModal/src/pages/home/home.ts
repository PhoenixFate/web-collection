import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public image = 'assets/imgs/badu-live.png';
  private photos: any[] = [];
  imageArray: any[] = ['assets/imgs/badu-live.png', 'assets/imgs/card-portland.png', 'assets/imgs/card-saopaolo.png'];
  constructor(public navCtrl: NavController, private modalCtrl: ModalController) {

  }

  changeArrayToGallery(array) {
    for (let i = 0; i < array.length; i++) {
      var object = {
        "url": array[i]
      };
      this.photos.push(object);
    }
  }

  getIndexOfArray(object) {
    var index = this.imageArray.indexOf('assets/imgs/card-portland.png');
    return index;
  }

  openModal(image) {
    // 获取当前点击图片所在数组下标 
    var index = this.getIndexOfArray(image);
    // 图片数组转换成插件需要的数组 
    this.changeArrayToGallery(this.imageArray);
    // 显示图片预览 
    let modal = this.modalCtrl.create(GalleryModal, {
      photos: this.photos, initialSlide: index,
    });
    modal.present();
  }

}
