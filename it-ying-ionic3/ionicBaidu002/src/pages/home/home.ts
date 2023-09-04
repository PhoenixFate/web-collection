import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

// baidu map
declare var BMap;
declare var baidumap_location;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') map_container: ElementRef;
  map: any;//地图对象
  marker: any;//标记
  pointArray: any;
  markerArray: any = [];
  circleArray: any = [];
  public myInternal;
  public index = 0;
  public mylongitude;
  public mylatitude;
  constructor(public navCtrl: NavController, private platform: Platform) {
    console.log("constructor");
    var that = this;
    if (typeof (this.myInternal) !== 'undefined' || this.myInternal != '') {
      clearInterval(this.myInternal);
    }
    this.myInternal = setInterval(function () {
      alert(that.index + "");
      that.index += 1;
      if (typeof (baidumap_location) === 'undefined') {

      } else {
        baidumap_location.getCurrentPosition(function (result) {
          alert(JSON.stringify(result, null, 4));
          that.mylongitude = JSON.stringify(result.longitude);
          that.mylatitude = JSON.stringify(result.latitude);
        }, function (error) {
          alert(error);
        });
      }
    }, 5000)
  }

  ionViewDidEnter() {
    //   let map = this.map = new BMap.Map(this.map_container.nativeElement, { enableMapClick: true });//创建地图实例
    //   //控件
    //   map.addControl(new BMap.NavigationControl());
    //   map.addControl(new BMap.ScaleControl());
    //   map.addControl(new BMap.OverviewMapControl());
    //   map.addControl(new BMap.MapTypeControl());

    //   let point = new BMap.Point(116.404, 39.915);//坐标可以通过百度地图坐标拾取器获取
    //   map.centerAndZoom(point, 15);//设置中心和地图显示级别

    //   let sizeMap = new BMap.Size(10, 80);//显示位置

    //   map.enableScrollWheelZoom(true);//启动滚轮放大缩小，默认禁用
    //   // map.enableContinuousZoom(true);//连续缩放效果，默认禁用

    //   this.pointArray=[new BMap.Point(116.404, 39.915),
    //                   new BMap.Point(116.41, 39.92),
    //                   new BMap.Point(116.407, 39.90),
    //                   new BMap.Point(116.393, 39.905),
    //                   new BMap.Point(116.392, 39.92),
    //                   new BMap.Point(116.385, 39.885),
    //                   new BMap.Point(116.389, 39.95),
    //                   new BMap.Point(116.388, 39.932),
    //                   new BMap.Point(116.417, 39.912)];

    //   for(var i=0;i<this.pointArray.length;i++) {
    //     this.markerArray.push( new BMap.Marker(this.pointArray[i]));
    //     this.circleArray.push( new BMap.Circle(this.pointArray[i],500,{strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5}));
    //   }
    //   var opts = {
    //     width : 250,     // 信息窗口宽度
    //     height: 80,     // 信息窗口高度
    //     title : "信息窗口" , // 信息窗口标题
    //     enableMessage:true//设置允许信息窗发送短息
    //      };
    //   for(var i=0;i<this.markerArray.length;i++){
    //     var that=this;
    //     this.markerArray[i].addEventListener("click",function(){
    //       var sContent=
    //       '<ul><li>sss</li></ul>';
    //       var infoWindow=new BMap.InfoWindow(sContent,opts);
    //       map.openInfoWindow(infoWindow,that.pointArray[i]); //开启信息窗口
    //     })

    //   }

    // //   var geolocationControl = new BMap.GeolocationControl();
    // // geolocationControl.addEventListener("locationSuccess", function(e){
    // //   // 定位成功事件
    // //   var address = '';
    // //   address += e.addressComponent.province;
    // //   address += e.addressComponent.city;
    // //   address += e.addressComponent.district;
    // //   address += e.addressComponent.street;
    // //   address += e.addressComponent.streetNumber;
    // //   alert("当前定位地址为：" + JSON.stringify(e));
    // // });
    // // geolocationControl.addEventListener("locationError",function(e){
    // //   // 定位失败事件
    // //   alert(e.message);
    // // });
    // // map.addControl(geolocationControl);



    let map = this.map = new BMap.Map(this.map_container.nativeElement, { enableMapClick: true });//创建地图实例
    //   //控件
    map.centerAndZoom(new BMap.Point(116.417854, 39.921988), 15);
    var data_info = [[116.417854, 39.921988, "地址：北京市东城区王府井大街88号乐天银泰百货八层"],
    [116.406605, 39.921585, "地址：北京市东城区东华门大街"],
    [116.412222, 39.912345, "地址：北京市东城区正义路甲5号"]
    ];
    var opts = {
      width: 250,     // 信息窗口宽度
      height: 80,     // 信息窗口高度
      title: "信息窗口", // 信息窗口标题
      enableMessage: true//设置允许信息窗发送短息
    };
    for (var i = 0; i < data_info.length; i++) {
      var marker = new BMap.Marker(new BMap.Point(data_info[i][0], data_info[i][1]));  // 创建标注
      var content = data_info[i][2];
      map.addOverlay(marker);               // 将标注添加到地图中
      addClickHandler(content, marker);
    }

    function addClickHandler(content, marker) {
      marker.addEventListener("click", function (e) {
        openInfo(content, e)
      }
      );
    }
    function openInfo(content, e) {
      var p = e.target;
      var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
      var infoWindow = new BMap.InfoWindow(content, opts);  // 创建信息窗口对象 
      map.openInfoWindow(infoWindow, point); //开启信息窗口
    }
  }

  //添加覆盖物
  add_overlay() {
    for (var i = 0; i < this.pointArray.length; i++) {
      this.map.addOverlay(this.markerArray[i]);            //增加点
      this.map.addOverlay(this.circleArray[i]);            //增加圆
    }
  }

  //清除覆盖物
  remove_overlay() {
    this.map.clearOverlays();
  }

  showLocation() {
    if (typeof baidumap_location === "undefined") {
      alert("baidumap_location is undefined");
      return;
    };
    baidumap_location.getCurrentPosition(function (result) {
      alert(JSON.stringify(result, null, 4));
    }, function (error) {
      alert(error);
    });
  }






  // ionViewDidLoad() { console.log("1.0 ionViewDidLoad 当页面加载的时候触发，仅在页面创建的时候触发一次，如果被缓存了，那么下次再打开这个页面则不会触发"); } 
  // ionViewWillEnter() { console.log("2.0 ionViewWillEnter 顾名思义，当将要进入页面时触发"); } 
  // ionViewDidEnter() { console.log("3.0 ionViewDidEnter 当进入页面时触发"); } 
  // ionViewWillLeave() { console.log("4.0 ionViewWillLeave 当将要从页面离开时触发"); } 
  // ionViewDidLeave() { console.log("5.0 ionViewDidLeave 离开页面时触发"); } 
  // ionViewWillUnload() { console.log("6.0 ionViewWillUnload 当页面将要销毁同时页面上元素移除时触发"); } 
  // ionViewCanEnter() { console.log("ionViewCanEnter"); } 
  // ionViewCanLeave() { console.log("ionViewCanLeave"); }


}
