"use strict";
/*
接口的作用：在面向对象的编程中，接口是一种规范的定义，它定义了行为和动作的规范，在程序设计里面，
接口起到一种限制和规范的作用。接口定义了某一批类所需要遵守的规范，接口不关心这些类的内部状态数据，
也不关心这些类里方法的实现细节，它只规定这批类里必须提供某些方法，提供这些方法的类就可以满足实际需要。
 typescrip中的接口类似于java，同时还增加了更灵活的接口类型，包括属性、函数、可索引和类等。
定义标准。
*/
// 1、属性接口     对json的约束
function printLable(lable) {
    console.log("print label");
}
printLable('aaa');
// ts中对传入的对象限制为json，并且json必须包含label字段
/*
    ts中自定义方法传入参数,对json进行约束
*/
function printLabelJson(lableInfo) {
    console.log("print lable json");
}
printLabelJson({ label: 'bbb' });
function printName(name) {
    //必须传入对象  firstName  secondName
    console.log(name.firstName + '--' + name.secondName);
}
var obj = {
    age: 30,
    firstName: "phoenix",
    secondName: "fate"
};
printName(obj);
//原生js封装的ajax 
function ajax(config) {
    var xhr = new XMLHttpRequest();
    xhr.open(config.type, config.url, true);
    xhr.send(config.data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log('chengong');
            if (config.dataType == 'json') {
                console.log(JSON.parse(xhr.responseText));
            }
            else {
                console.log(xhr.responseText);
            }
        }
    };
}
ajax({
    type: 'get',
    data: 'name=zhangsan',
    url: 'http://a.itying.com/api/productlist',
    dataType: 'json'
});
