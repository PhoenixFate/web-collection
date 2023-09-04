//引入input
import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  msg;//通过input 接收父组件传过来的值
  @Input()
  name;//通过input 接收父组件传过来的值
  constructor() { }

  ngOnInit() {
  }

}
