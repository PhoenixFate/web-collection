import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File, FileEntry } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { Http, Jsonp, Headers } from "@angular/http";
import { normalizeURL } from 'ionic-angular';
import { Base64 } from '@ionic-native/base64';

import { Observable } from 'rxjs/Observable';
import { ForkJoinObservable } from "rxjs/observable/ForkJoinObservable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public src;
  public src2;
  public src3;
  public src4;
  public a;
  public b;
  formData;
  //private headers = new Headers({ 'Content-Type': "multipart/form-data" });
  private headers = new Headers();

  constructor(public navCtrl: NavController, private transfer: FileTransfer, private file: File,
    private camera: Camera, private imagePicker: ImagePicker,
    private http: Http, private jsonp: Jsonp,
    private base64: Base64) {
    let path = "file:///Users/manuelmartinez-almeida/Library/Developer/CoreSimulator/Devices/94646EFE-DE04-46BD-AFC1-B4F312BA06CB/data/Containers/Bundle/Application/6AD1018C-6836-4BF9-83DA-4430392D10D5/ionic-wk-test.app/www/index.html"
    console.log('Original: ' + path);

    path = normalizeURL(path);
    console.log('Fixed: ' + path);
  }


  doCameraUpload() {
    const options: CameraOptions = {
      quality: 100, //图片质量 
      //destinationType: this.camera.DestinationType.DATA_URL, /*返回的类型*/
      //destinationType: this.camera.DestinationType.FILE_URI, /*返回的类型*/
      destinationType: this.camera.DestinationType.NATIVE_URI, /*返回的类型*/
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.CAMERA, // 
      mediaType: this.camera.MediaType.PICTURE,
      // allowEdit: true, 
      targetWidth: 300, /*宽度高度要设置*/
      targetHeight: 300,
    }
    this.camera.getPicture(options).then((imageData) => {
      // 返回拍照的地址 
      // let src = normalizeURL(imageData);
      // this.src = src;
      // this.base64.encodeFile(imageData).then((base64File: string) => {
      //   this.src=base64File;
      // this.src2='data:image/jpeg;base64,'+base64File.split(",")[1];
      // }, (err) => {
      //   console.log(err);
      // });
      this.src3 = imageData;
      //this.src4=imageData.slice(7);
      //this.src='data:image/jpeg;base64,'+imageData;
      //this.doUpload(imageData);
    }, (err) => { // Handle error

    });
  }

  doUpload(src) {
    let timestamp = new Date().getTime();
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: 'myfiles',
      fileName: timestamp + '.jpg',
      mimeType: 'image/jpeg',
      httpMethod: "POST",
      params: { id: "5308175f2b304c4c9db949bc2ff51f4c" }
      /*附带的一些信息*/ // headers: {}
    }
    var api = 'https://njrzzk.com/app/a/app/tblInformation/uploadFiles';
    fileTransfer.upload(src, api, options).then((data) => {
      // success 
      let temp = JSON.parse(data['response']);
      alert(JSON.stringify(temp.rows[0].src));
      //this.src="https://njrzzk.com"+temp.rows[0].src;
    }, (err) => { // error 
      alert('err');
      alert(JSON.stringify(err));
    })

  }

  doCameraLibrary() {
    const options: CameraOptions = {
      quality: 100, //图片质量 
      //destinationType: this.camera.DestinationType.DATA_URL, /*返回的类型*/
      destinationType: this.camera.DestinationType.NATIVE_URI, /*返回的类型*/
      encodingType: this.camera.EncodingType.JPEG,
      //sourceType: this.camera.PictureSourceType.CAMERA, // 
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      targetWidth: 300, /*宽度高度要设置*/
      targetHeight: 300,
    }
    this.camera.getPicture(options).then((imageData) => {
      // 返回拍照的地址 
      this.src = imageData;
      alert(JSON.stringify(imageData));
      //this.doUpload(imageData);
    }, (err) => { // Handle error

    });
  }

  doImageUpload() {
    // 设置选项
    const options: ImagePickerOptions = {
      maximumImagesCount: 5,
      width: 300,
      height: 300,
      quality: 100
    };

    // 获取图片
    this.imagePicker.getPictures(options).then((results) => {
      // for (var i = 0; i < results.length; i++) {
      //   console.log('Image URI: ' + results[i]);
      //   alert(JSON.stringify(results[i]));
      // }
      this.doIt(results);
    }, (err) => {
      console.log('获取图片失败');
    });
  }


  doPost() {
    let url = 'https://njrzzk.com/app/a/app/tblPicTextShare/submitShare';
    let headers = new Headers();
    headers.set("Content-Type", "application/json");
    this.http.post(url, JSON.stringify({
      "content": "汉字站姿", "images": "/a/b//c/3.jpg|/c/d/e/4.jpg",
      "tblRegistrar": {
        "id": "1a2cc1ee1842493ead34e5bf6a5cf0d7"
      }
    }), { headers: headers }).subscribe((data) => {
      alert(JSON.stringify(data))
    }, err => {
      alert(JSON.stringify(err));
    });

  }

  private upload(filePaths: Array<string>): Observable<any> {
    //每个文件上传任务创建一个信号
    var observables: Array<any> = [];
    filePaths.forEach((value: string, i, array) => {
      if (!value.startsWith('file://')) {
        value = 'file://' + value;
      }
      console.log('这里应该执行了吧.........');
      var observable = new Observable((sub: any) => {
        this.file.resolveLocalFilesystemUrl(value).then(entry => {
          (<FileEntry>entry).file(file => {
            // this.readFile(<Blob>file);
            let blob: Blob = <Blob>file;
            const reader = new FileReader();
            let timestamp = new Date().getTime();
            reader.onloadend = () => {
              const imgBlob = new Blob([reader.result], { type: blob.type });
              this.formData.append('myfiles', imgBlob, timestamp + 'multy.jpg');

              //console.log('已经成功一半了.................'+ + imgBlob);
              sub.next(null);
              sub.complete();
            };
            reader.readAsArrayBuffer(blob);
          });
        })
          .catch(error => console.log('报错了，日了狗----->' + JSON.stringify(error)));
      });

      observables.push(observable);
    });
    return ForkJoinObservable.create(observables);
  }


  uploadFile(host: string, params: Map<string, string>, filePaths: Array<string>, context: any, success: Function, fail: Function) {
    this.formData = new FormData();

    this.upload(filePaths).subscribe(data => {

      console.log('开始上传........');

      params.forEach((value, key) => {
        this.formData.append(key, value);
      });
      this.http.post(host, this.formData).toPromise().then(res => {
        success.call(context, res);
      }).catch(error => {
        fail.call(context, error);
      });
      // .catch(e => this.handleError(e))
      // .map(response => response.text())
      // // .finally(() => console.log('完成了'))
      // .subscribe(ok => console.log('上传成功了'));

    }, error => {
      console.log('文件处理失败');
    });
  }

  doIt(images) {

    let host = 'https://njrzzk.com/app/a/app/tblPicTextShare/uploadFiles';
    let params = new Map();
    params.set('id', '5308175f2b304c4c9db949bc2ff51f4c');

    this.uploadFile(host, params, images, self, res => {
      alert(JSON.stringify(res));
    }, error => {
      alert(JSON.stringify(error));
    });
  }


  doPost2() {
    let url = 'https://njrzzk.com/app/a/app/tblPicTextShare/uploadImages';
    let headers = new Headers();
    headers.set("Content-Type", "multipart/form-data");
    //let url:string = "/web/";
    this.http.post(url, { headers: headers }).subscribe((data) => {
      //alert(JSON.stringify(data))
      console.log(JSON.stringify(data));
    }, err => {
      alert(JSON.stringify(err));
    });

  }

  doPost3() {
    let url = 'https://njrzzk.com/app/a/app/tblRegistrar/login';
    let headers = new Headers();
    headers.set("Content-Type", "");
    //let url:string = "/web/";
    this.http.post(url, JSON.stringify({ username: 'ss', password: '123' }), { headers: headers }).subscribe((data) => {
      //alert(JSON.stringify(data))
    }, err => {
      alert(JSON.stringify(err));
    });

  }

  doPost4() {
    let url = 'https://njrzzk.com/app/a/app/tblPicTextShare/submitShare';
    let headers = new Headers();
    headers.set("Content-Type", "application/json");
    //let url:string = "/web/";
    this.http.post(url, JSON.stringify({
      "content": "aaaaaaaaaaaafbbbb",
      "images": "/a/b//c/3.jpg|/c/d/e/4.jpg",
      "tblRegistrar": {
        "id": "1a2cc1ee1842493ead34e5bf6a5cf0d7"
      }

    }), { headers: headers }).subscribe((data) => {
      alert(JSON.stringify(data))
    }, err => {
      alert(JSON.stringify(err));
    });

  }

  doGet() {
    let url = 'http://localhost:8080/jeeplus/a/test/tree/testTree/list2';
    let headers = new Headers();
    headers.set("Content-Type", "application/json");
    this.http.post(url, JSON.stringify({
      "content": "aaaaaaaaaaaafbbbb",
      "images": "/a/b//c/3.jpg|/c/d/e/4.jpg",
      "tblRegistrar": {
        "id": "1a2cc1ee1842493ead34e5bf6a5cf0d7"
      }

    }), { headers: headers }).subscribe((data) => {
      console.log(JSON.stringify(data));
      alert(JSON.stringify(data))
    }, err => {
      alert(JSON.stringify(err));
    });
  }


}
