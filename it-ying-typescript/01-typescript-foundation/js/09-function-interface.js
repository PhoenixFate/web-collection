"use strict";
/*
接口的作用：在面向对象的编程中，接口是一种规范的定义，它定义了行为和动作的规范，
在程序设计里面，接口起到一种限制和规范的作用。接口定义了某一批类所需要遵守的规范，
接口不关心这些类的内部状态数据，也不关心这些类里方法的实现细节，它只规定这批类里必须提供某些方法，
提供这些方法的类就可以满足实际需要。 typescrip中的接口类似于java，同时还增加了更灵活的接口类型，包括属性、函数、可索引和类等。
定义标准。
*/
var md5 = function (key, value) {
    return key + " ---  " + value;
};
console.log(md5('aaa', 'bbb'));
// 可索引接口：数组、对象的约束  （不常用）
var arr = [2342, 235325];
var arr1 = ['111', '222'];
var arr4 = ['aaa', 'bbb'];
console.log(arr4[0]);
var arr9 = { name: '张三' };
console.log(arr9);
var Dog3 = /** @class */ (function () {
    function Dog3(name) {
        this.name = name;
    }
    Dog3.prototype.eat = function () {
        console.log("dog3 is eating");
    };
    return Dog3;
}());
var dog3 = new Dog3("旺旺");
dog3.eat();
var Cat3 = /** @class */ (function () {
    function Cat3(name) {
        this.name = name;
    }
    Cat3.prototype.eat = function () {
        console.log("cat3 is eating");
    };
    return Cat3;
}());
var cat3 = new Cat3("xx");
cat3.eat();
