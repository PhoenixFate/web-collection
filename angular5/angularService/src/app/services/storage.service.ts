import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {/*构造函数 */


   }

   setItem(key,value){
     localStorage.setItem(key,JSON.stringify(value));
   }

   getItem(key){
     return JSON.parse(localStorage.getItem(key));
   }

   removeItem(key){
     localStorage.removeItem(key);
   }
}
