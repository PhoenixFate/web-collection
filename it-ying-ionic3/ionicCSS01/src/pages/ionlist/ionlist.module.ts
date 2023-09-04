import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonlistPage } from './ionlist';

@NgModule({
  declarations: [
    IonlistPage,
  ],
  imports: [
    IonicPageModule.forChild(IonlistPage),
  ],
})
export class IonlistPageModule {}
