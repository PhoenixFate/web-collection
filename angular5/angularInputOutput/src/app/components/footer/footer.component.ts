import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() msg:string;
  @Input() run:Function;//接收父组件传递过来的run方法
  @Input() getDataFromChild:any;

  public list=['111','222','333'];
  //EventEmitter实现子组件给父组件传值
  @Output() private outer1=new EventEmitter<any>();


  constructor() {

  }

  public childMsg="这是子组件的数据";

  ngOnInit() {
  }

  footerRun(){
    console.log("footerRun");
    this.run();
  }

  sendToParent(){//子组件自己的方法
    this.getDataFromChild(this.childMsg);//子组件调用父组件的方法并传值
  }

  sendDataByEventEmitter(){
    console.log("sendDataByEventEmitter");
    this.outer1.emit(this.list);
  }

}
