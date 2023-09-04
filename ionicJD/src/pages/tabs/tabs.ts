import { UserPage } from './../user/user';
import { Component } from '@angular/core';

import { CategoryPage } from '../category/category';
import { CartPage } from '../cart/cart';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CategoryPage;
  tab3Root = CartPage;
  tab4Root = UserPage;
  constructor() {

  }
}
