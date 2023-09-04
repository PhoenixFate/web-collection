import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public profilePicture='assets/imgs/logo.png';
  public profilePicture2='assets/imgs/logo.png';
  constructor(public navCtrl: NavController,public camera: Camera) {

  }

  doCamera(){
    var that=this;
    const options: CameraOptions = {
      quality: 100,//图片质量

      //destinationType: this.camera.DestinationType.DATA_URL,//图片返回的类型：data_url || file_uri
      destinationType: this.camera.DestinationType.FILE_URI,//图片返回的类型：data_url || file_uri
      //destinationType:this.camera.DestinationType.NATIVE_URI,
      //encodingType: this.camera.EncodingType.JPEG,
      //mediaType: this.camera.MediaType.PICTURE,

      sourceType:this.camera.PictureSourceType.CAMERA,
      //sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      cameraDirection:0,
      //allowEdit:true,
      saveToPhotoAlbum:true,
      targetWidth:300,//图片宽度
      targetHeight:300//图片高度
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
    //let base64Image = 'data:image/jpeg;base64,' + imageData;
    //that.profilePicture="content://"+imageData.slice(8);//给image设置source。
    that.profilePicture=imageData;//给image设置source。
    
    }, (err) => {
     // Handle error
    });

    //sthis.camera.cleanup().then();
  }

  select(){
    var that=this;
    const options: CameraOptions = {
      quality: 100,//图片质量

      // destinationType: this.camera.DestinationType.DATA_URL,//图片返回的类型：data_url || file_uri
      //destinationType: this.camera.DestinationType.FILE_URI,//图片返回的类型：data_url || file_uri
      destinationType:this.camera.DestinationType.NATIVE_URI,
      //encodingType: this.camera.EncodingType.JPEG,
      //mediaType: this.camera.MediaType.PICTURE,

      //sourceType:this.camera.PictureSourceType.CAMERA,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      cameraDirection:0,
      //allowEdit:true,
      saveToPhotoAlbum:true,
      targetWidth:300,//图片宽度
      targetHeight:300//图片高度
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
    //  let base64Image = 'data:image/jpeg;base64,' + imageData;
    //  this.imgSrc=base64Image;
    //let base64Image =  imageData;
    that.profilePicture2=imageData;//给image设置source。
    //this.imgSrc=imageData;
    //  console.log(base64Image);
    }, (err) => {
     // Handle error
    });
  }

}
