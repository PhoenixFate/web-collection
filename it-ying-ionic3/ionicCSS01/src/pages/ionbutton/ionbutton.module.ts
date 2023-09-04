import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonbuttonPage } from './ionbutton';

@NgModule({
  declarations: [
    IonbuttonPage,
  ],
  imports: [
    IonicPageModule.forChild(IonbuttonPage),
  ],
})
export class IonbuttonPageModule {}
