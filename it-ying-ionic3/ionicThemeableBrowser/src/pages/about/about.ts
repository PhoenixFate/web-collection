import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, private themeableBrowser: ThemeableBrowser) {
    
  }

  ionViewDidEnter(){
    this.doWebView();
  }

  doWebView() {
    const options: ThemeableBrowserOptions = {
      statusbar: {
        color: '#ffffffff'
      },
      toolbar: {
        height: 44,
        color: '#f0f0f0ff'
      },
      title: {
        color: '#003264ff',
        showPageTitle: true
      },
      backButton: {
        image: 'back',
        imagePressed: 'back_pressed',
        align: 'left',
        event: 'backPressed'
      },
      forwardButton: {
        wwwImage: 'images/forward.png',
        wwwImagePressed: 'images/forward_pressed.png',
        align: 'left',
        event: 'forwardPressed'
      },
      closeButton: {
        wwwImage: 'images/close.png',
        wwwImagePressed: 'images/close_pressed.png',
        align: 'left',
        event: 'closePressed'
      },
      // customButtons: [
      //   {
      //     image: 'share',
      //     imagePressed: 'share_pressed',
      //     align: 'right',
      //     event: 'sharePressed'
      //   }
      // ],
      // menu: {
      //   image: 'menu',
      //   imagePressed: 'menu_pressed',
      //   title: 'Test',
      //   cancel: 'Cancel',
      //   align: 'right',
      //   items: [
      //     {
      //       event: 'helloPressed',
      //       label: 'Hello World!'
      //     },
      //     {
      //       event: 'testPressed',
      //       label: 'Test!'
      //     }
      //   ]
      // },
      backButtonCanClose: false
    };

    this.themeableBrowser.create('http://baidu.com', '_self', options);
    


  }
}
