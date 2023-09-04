"use strict";
var NewPerson = /** @class */ (function () {
    function NewPerson(name) {
        this.name = name;
    }
    NewPerson.prototype.run = function () {
        console.log(this.name + " is running");
    };
    NewPerson.prototype.work = function () {
        console.log(this.name + " is working");
    };
    NewPerson.print = function () {
        console.log(this.className + "is printing");
    };
    NewPerson.className = 'NewPerson';
    return NewPerson;
}());
var p2 = new NewPerson('张三');
p2.run();
NewPerson.print();
