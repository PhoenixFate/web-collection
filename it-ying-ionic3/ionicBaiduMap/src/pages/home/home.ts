import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

// baidu map
declare var BMap;
declare var baidumap_location;
declare var BMAP_NORMAL_MAP;
declare var BMAP_HYBRID_MAP;
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
  constructor(public navCtrl: NavController, private platform: Platform) {
    console.log("constructor");
    var that = this;
    if (typeof (this.myInternal) !== 'undefined' || this.myInternal != '') {
      clearInterval(this.myInternal);
    }
    this.myInternal = setInterval(function () {
      //alert(that.index+"");
      that.index += 1;
      if (typeof (baidumap_location) === 'undefined') {

      } else {
        baidumap_location.getCurrentPosition(function (result) {
          alert(JSON.stringify(result, null, 4));
        }, function (error) {
          alert(error);
        });
      }
    }, 5000)
  }

  ionViewDidEnter() {
    let map = this.map = new BMap.Map(this.map_container.nativeElement, { enableMapClick: true });//创建地图实例
    //控件
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
    //map.addControl(new BMap.MapTypeControl());

    let point = new BMap.Point(116.404, 39.915);//坐标可以通过百度地图坐标拾取器获取
    map.centerAndZoom(point, 15);//设置中心和地图显示级别

    let sizeMap = new BMap.Size(10, 80);//显示位置

    map.enableScrollWheelZoom(true);//启动滚轮放大缩小，默认禁用
    // map.enableContinuousZoom(true);//连续缩放效果，默认禁用

    this.pointArray = [new BMap.Point(116.404, 39.915),
    new BMap.Point(116.41, 39.92),
    new BMap.Point(116.407, 39.90),
    new BMap.Point(116.393, 39.905),
    new BMap.Point(116.392, 39.92),
    new BMap.Point(116.385, 39.885),
    new BMap.Point(116.389, 39.95),
    new BMap.Point(116.388, 39.932),
    new BMap.Point(116.417, 39.912)];

    for (var i = 0; i < this.pointArray.length; i++) {
      this.markerArray.push(new BMap.Marker(this.pointArray[i]));
      this.circleArray.push(new BMap.Circle(this.pointArray[i], 500, { strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.5 }));
    }

    // var geolocationControl = new BMap.GeolocationControl();
    // geolocationControl.addEventListener("locationSuccess", function (e) {
    //   // 定位成功事件
    //   var address = '';
    //   address += e.addressComponent.province;
    //   address += e.addressComponent.city;
    //   address += e.addressComponent.district;
    //   address += e.addressComponent.street;
    //   address += e.addressComponent.streetNumber;
    //   alert("当前定位地址为：" + JSON.stringify(e));
    // });
    // geolocationControl.addEventListener("locationError", function (e) {
    //   // 定位失败事件
    //   alert(e.message);
    // });
    // map.addControl(geolocationControl);



    // var p1 = new BMap.Point(116.301934, 39.977552);
    // var p2 = new BMap.Point(116.508328, 39.919141);

    // var driving = new BMap.DrivingRoute(map, { renderOptions: { map: map, autoViewport: true }, policy: 4 });
    // driving.search(p1, p2);


    // var p3 = new BMap.Point(116.312934, 39.967552);
    // var p4 = new BMap.Point(116.519328, 39.959141);
    // driving.search(p3, p4);
    map.addControl(new BMap.MapTypeControl({
      mapTypes: [
        BMAP_NORMAL_MAP
        //BMAP_HYBRID_MAP
      ]
    }));

    //创建小狐狸
    var pt = new BMap.Point(116.417, 39.909);
    var myIcon = new BMap.Icon("http://lbsyun.baidu.com/jsdemo/img/fox.gif", new BMap.Size(200, 50));
    var marker2 = new BMap.Marker(pt, { icon: myIcon });  // 创建标注
    map.addOverlay(marker2);              // 将标注添加到地图中
    //var routePolicy = [BMAP_DRIVING_POLICY_LEAST_TIME,BMAP_DRIVING_POLICY_LEAST_DISTANCE,BMAP_DRIVING_POLICY_AVOID_HIGHWAYS];

    var driving = new BMap.DrivingRoute(map, {renderOptions: {map: map, panel: "r2", autoViewport: true}});
	driving.search("中关村一街", "魏公村");
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

  hideResult(){
    let result =document.getElementById('r-result2');
    result.style.display = "none";
  }

}
