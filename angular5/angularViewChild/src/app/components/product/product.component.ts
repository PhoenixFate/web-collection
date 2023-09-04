import { Component, OnInit ,ViewChild} from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @ViewChild('cart') cart;//定义子组件, 和#name对应起来

  constructor() { }

  ngOnInit() {
  }

  getChildData(){
    //通过cart执行子组件的方法
    // this.cart.run();

    //通过cart获取子组件的数据
    alert(this.cart.msg);
    this.cart.name='我是父组件改变子组件后的name';
  }
}
