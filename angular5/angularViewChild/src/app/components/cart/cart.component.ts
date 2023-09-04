import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public msg='我是子组件的数据';
  public name='子组件';
  constructor() { }

  ngOnInit() {
  }

  run(){
    alert('这是购物车子组件的run方法');
  }
}
