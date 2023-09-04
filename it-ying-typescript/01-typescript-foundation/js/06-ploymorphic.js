"use strict";
//[ˌpɑˌliˈmɔrfɪk]  多态;   多型;   多态性;   多形的;   多态的;  
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
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name2 = name;
    }
    Animal.prototype.eat = function () {
        console.log("animal eat");
    };
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog(name) {
        var _this = _super.call(this, name) || this;
        _this.name2 = name;
        return _this;
    }
    Dog.prototype.eat = function () {
        console.log("dog eat");
    };
    return Dog;
}(Animal));
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat(name) {
        var _this = _super.call(this, name) || this;
        _this.name2 = name;
        return _this;
    }
    Cat.prototype.eat = function () {
        console.log("cat eat");
    };
    return Cat;
}(Animal));
var dog = new Dog("旺财");
var cat = new Cat("喵喵");
dog.eat();
cat.eat();
