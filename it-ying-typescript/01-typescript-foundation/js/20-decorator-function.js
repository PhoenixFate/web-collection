"use strict";
/*
3、方法装饰器
    它会被应用到方法的 属性描述符上，可以用来监视，修改或者替换方法定义。
    方法装饰会在运行时传入下列3个参数：
        1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
        2、成员的名字。
        3、成员的属性描述符。
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function logMethod6(params) {
    return function (target, methodName, desc) {
        console.log(target);
        console.log(methodName);
        console.log(desc);
        target.apiUrl = "xxx";
        target.run = function () {
            console.log('run');
        };
        //修改装饰器修饰的方法 把装饰器方法里面的传入的所有参数改为string
        var oldMethod = desc.value;
        desc.value = function () {
            var list = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                list[_i] = arguments[_i];
            }
            list = list.map(function (temp) {
                return String(temp);
            });
            console.log(list);
            oldMethod.apply(this.list);
        };
    };
}
var HttpClient6 = /** @class */ (function () {
    function HttpClient6() {
    }
    HttpClient6.prototype.getData = function () {
        console.log('我是getData里面的方法');
    };
    __decorate([
        logMethod6('http://www.phoenix.com')
    ], HttpClient6.prototype, "getData", null);
    return HttpClient6;
}());
var http6 = new HttpClient6();
console.log(http6.apiUrl);
http6.run();
http6.getData(123, 'sss');
/*
4、方法参数装饰器
参数装饰器表达式会在运行时当作函数被调用，可以使用参数装饰器为类的原型增加一些元素数据 ，传入下列3个参数：
1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2、方法的名字。
3、参数在函数参数列表中的索引。
*/
function logParams7(params) {
    return function (target, methodName, paramsIndex) {
        console.log(params);
        console.log(target);
        console.log(methodName);
        console.log(paramsIndex);
        target.apiUrl = params;
    };
}
var HttpClient7 = /** @class */ (function () {
    function HttpClient7() {
    }
    HttpClient7.prototype.getData = function (uuid) {
        console.log(uuid);
    };
    __decorate([
        __param(0, logParams7('xxxxx'))
    ], HttpClient7.prototype, "getData", null);
    return HttpClient7;
}());
var http7 = new HttpClient7();
http7.getData(123456);
console.log(http7.apiUrl);
//装饰器执行顺序
//属性》方法》方法参数》类
// 如果有多个同样的装饰器，它会先执行后面的
