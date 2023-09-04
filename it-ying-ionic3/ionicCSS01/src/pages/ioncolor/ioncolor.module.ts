import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IoncolorPage } from './ioncolor';

@NgModule({
  declarations: [
    IoncolorPage,
  ],
  imports: [
    IonicPageModule.forChild(IoncolorPage),
  ],
})
export class IoncolorPageModule {}
