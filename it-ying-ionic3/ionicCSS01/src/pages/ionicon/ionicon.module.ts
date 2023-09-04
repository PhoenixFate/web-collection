import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IoniconPage } from './ionicon';

@NgModule({
  declarations: [
    IoniconPage,
  ],
  imports: [
    IonicPageModule.forChild(IoniconPage),
  ],
})
export class IoniconPageModule {}
