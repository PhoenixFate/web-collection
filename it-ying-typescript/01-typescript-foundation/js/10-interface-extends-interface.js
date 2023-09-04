"use strict";
var Man6 = /** @class */ (function () {
    function Man6(name) {
        this.name = name;
    }
    Man6.prototype.eat = function () {
        console.log("man is eating");
    };
    Man6.prototype.work = function () {
        console.log("man is working");
    };
    return Man6;
}());
