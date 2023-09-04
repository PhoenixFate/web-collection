"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//typescript中的抽象类：它是提供其他类继承的基类，不能直接被实例化。
//用abstract关键字定义抽象类和抽象方法，抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。
// abstract抽象方法只能放在抽象类里面
// 抽象类和抽象方法用来定义标准 。   标准：Animal 这个类要求它的子类必须包含eat方法
var Animal2 = /** @class */ (function () {
    function Animal2(name) {
        this.name = name;
    }
    //可以包含非抽象方法
    Animal2.prototype.run = function () {
        console.log("animal2 run");
    };
    return Animal2;
}());
var Dog2 = /** @class */ (function (_super) {
    __extends(Dog2, _super);
    function Dog2(name) {
        var _this = _super.call(this, name) || this;
        _this.name = name;
        return _this;
    }
    // 抽象类的子类必须实现抽象类里面的抽象方法
    Dog2.prototype.eat = function () {
        console.log("dog2 eat");
    };
    return Dog2;
}(Animal2));
var Cat2 = /** @class */ (function (_super) {
    __extends(Cat2, _super);
    function Cat2(name) {
        var _this = _super.call(this, name) || this;
        _this.name = name;
        return _this;
    }
    // 抽象类的子类必须实现抽象类里面的抽象方法
    Cat2.prototype.eat = function () {
        console.log("cat2 eat");
    };
    return Cat2;
}(Animal2));
