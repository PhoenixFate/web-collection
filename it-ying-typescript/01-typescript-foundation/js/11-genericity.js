"use strict";
/*
泛型：软件工程中，我们不仅要创建一致的定义良好的API，同时也要考虑可重用性。 组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，
这在创建大型系统时为你提供了十分灵活的功能。
在像C#和Java这样的语言中，可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。 这样用户就可以以自己的数据类型来使用组件。
通俗理解：泛型就是解决 类 接口 方法的复用性、以及对不特定数据类型的支持(类型校验)
*/
//any放弃了类型检查,传入什么 返回什么。比如:传入number 类型必须返回number类型  传入 string类型必须返回string类型
//传入的参数类型和返回的参数类型可以不一致
function getData1(value) {
    return '哈哈哈';
}
// 泛型：可以支持不特定的数据类型   要求：传入的参数和返回的参数一直
function getData2(value) {
    return value;
}
console.log(getData2(234));
console.log(getData2('aaa'));
//类的泛型
var MinClass = /** @class */ (function () {
    function MinClass() {
        this.list = [];
    }
    MinClass.prototype.add = function (value) {
        this.list.push(value);
    };
    MinClass.prototype.getMin = function () {
        var min = this.list[0];
        for (var i_1 = 0; i_1 < this.list.length; i_1++) {
            if (min > this.list[i_1]) {
                min = this.list[i_1];
            }
        }
        return min;
    };
    return MinClass;
}());
var minClass = new MinClass();
minClass.add(23);
minClass.add(234);
minClass.add(45);
minClass.add(12);
minClass.add(99);
console.log("min: " + minClass.getMin());
var minClass2 = new MinClass();
minClass2.add('a');
minClass2.add('b');
minClass2.add('c');
minClass2.add('d');
console.log("min string: " + minClass2.getMin());
